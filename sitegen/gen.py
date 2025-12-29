#!/usr/bin/env python3

# std python modules
import argparse
import base64
import dataclasses
import datetime
import hashlib
import json
import os
import pathlib
import logging

# 3P modules
import jinja2
import cryptography.hazmat.primitives.ciphers.aead

# my modules
import mdtohtml
import genlogger

@dataclasses.dataclass
class PasswordEncodedData:
    ciphertext: bytes
    salt: bytes
    iv: bytes

@dataclasses.dataclass
class PasswordCryptParams:
    password: str
    salt: bytes
    iv: bytes

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-g", "--out-generated", action="store_true", default=False, help="Write generated intermediate output to the filesystem")
    parser.add_argument("-v", "--verbose", action="store_true", default=False, help="Whether to log verbose")

    args = parser.parse_args()

    genlogger.setup_logger(args.verbose)

    gen_html_site(args.out_generated)
    gen_gemini_site()

def gen_html_site(write_interim_output: bool) -> None:
    dir_path_name = os.path.dirname(os.path.realpath(__file__))
    dir_path = pathlib.Path(dir_path_name)
    pages_dir_path = dir_path / "pages"
    root_dir = dir_path.parent
    gen_pages_root_path = dir_path.parent / "pages"
    site_data_json_path = dir_path / "index_data" / "site_data.json"
    interim_output_dir = dir_path / "output_int"

    if write_interim_output:
        interim_output_dir.mkdir(parents=True, exist_ok=True)

    with open(site_data_json_path, "r", encoding="utf8") as site_data_json_file:
        site_data = json.load(site_data_json_file)

    with open(dir_path / ".prettierrc", "r", encoding="utf8") as f:
        prettier_fmt_config = json.load(f)

    with genlogger.time_section("loading templates"):
        env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(f"{dir_path_name}/"),
            trim_blocks=True,
            lstrip_blocks=True)
        env.filters['datetime_to_date'] = pub_datetime_to_date
        feed_template = env.get_template("atomfeed.xml.jinja")
        page_template = env.get_template("page.html.jinja")
        index_template = env.get_template("index.html.jinja")
        unlisted_index_template = env.get_template("unlisted.html.jinja")
        subindex_template = env.get_template("subindex.html.jinja")
        links_page_template = env.get_template("links.html.jinja")
        textpost_template = env.get_template("textpost.html.jinja")
        pswd_locked_page_template = env.get_template("pswd_locked_page.html.jinja")
        recipe_template = env.get_template("recipe.md.jinja")

    projects = site_data["projects"]
    text_posts = site_data["text_posts"]
    hidden_text_posts = site_data["hidden_text_posts"]
    recipe_posts = site_data["recipe_posts"]

    with genlogger.time_section("generating html from markdown"):
        gen_count = 0
        for section in [ projects, text_posts, hidden_text_posts ]:
            for entry in section:
                if "md_src" not in entry:
                    continue

                md_filepath = (root_dir / entry["md_src"]).resolve()
                with open(md_filepath, "r", encoding="utf8") as f:
                    md_file_contents = f.read()

                html = mdtohtml.mdtohtml(md_file_contents, prettier_fmt_config)
                is_password_protected = "pswd" in entry
                if is_password_protected:
                    encoded_html_data = password_encode_entry_html(html, get_entry_password_params(entry))
                    html = pswd_locked_page_template.render(
                        base64_ciphertext=bin2b64string(encoded_html_data.ciphertext),
                        base64_salt=bin2b64string(encoded_html_data.salt),
                        base64_iv=bin2b64string(encoded_html_data.iv))

                html_output_path = md_filepath.with_suffix(".html")

                with open(html_output_path, "w", encoding="utf8") as f:
                    f.write(html)

                logging.debug("Generated %s <- %s%s",
                    html_output_path.relative_to(root_dir),
                    "🔒 <- " if is_password_protected else "",
                    md_filepath.relative_to(root_dir))
                gen_count += 1
        logging.info("generated %d html posts from markdown", gen_count)

    with genlogger.time_section("generating markdown from recipe json"):
        for entry in recipe_posts:
            recipe_json_filepath = (root_dir / str(entry["recipe_json_src"])).resolve()
            with open(recipe_json_filepath, "r", encoding="utf8") as f:
                recipe_json = json.load(f)

            recipe_md = recipe_template.render(
                intro=recipe_json.get("intro", None),
                image=entry["image"],
                image_alt=entry["image_alt"],
                ingredient_sections=recipe_json["ingredient_sections"],
                instruction_sections=recipe_json["instruction_sections"],
                footnotes=recipe_json.get("footnotes", [])
                )

            if write_interim_output:
                md_path = interim_output_dir / recipe_json_filepath.with_suffix(".md").name
                write_page_render(md_path, recipe_md)

            recipe_html = mdtohtml.mdtohtml(recipe_md, prettier_fmt_config)
            html_output_path = recipe_json_filepath.with_suffix(".html")
            with open(html_output_path, "w", encoding="utf8") as f:
                f.write(recipe_html)

            logging.debug("Generated %s <- %s",
                html_output_path.relative_to(root_dir),
                recipe_json_filepath.relative_to(root_dir))

        logging.info("generated %d html posts from recipe template", len(recipe_posts))

    with genlogger.time_section("rendering final index page"):
        index_body = index_template.render(
            welcome_text=site_data['welcome_msg'],
            highlights=filter_highlights(projects, text_posts),
            projects=projects,
            text_posts=text_posts)

        index_render = page_template.render(
            title="homepage",
            content_description=site_data['site_description'],
            page_html=index_body,
            custom_style_css=None)

        write_page_render(root_dir / "index.html", index_render)

    with genlogger.time_section("rendering final unlisted index page"):
        unlisted_index_body = unlisted_index_template.render(pages=hidden_text_posts)
        unlisted_index_render = page_template.render(
            title="Unlisted",
            content_description="unlisted posts",
            page_html=unlisted_index_body,
            custom_style_css=None)
        write_page_render(root_dir / "unlisted.html", unlisted_index_render)

    with genlogger.time_section("rendering final recipes index page"):
        recipes_index_body = subindex_template.render(index_title="Recipes", pages=recipe_posts)
        recipes_index_render = page_template.render(
            title="Recipes",
            content_description="recipe posts",
            page_html=recipes_index_body,
            custom_style_css=None)
        write_page_render(root_dir / "recipes.html", recipes_index_render)

    with genlogger.time_section("rendering final links page"):
        links_page_render = links_page_template.render(links=site_data['links_page'])
        write_page_render(root_dir / "links.html", links_page_render)

    with genlogger.time_section("rendering playlists page"):
        playlists_md = (dir_path / "playlists.md").resolve()
        playlists_html_output = (root_dir / "playlists.html").resolve()
        with open(playlists_md, "r", encoding="utf8") as f:
            md_file_contents = f.read()
            playlists_page_html = mdtohtml.mdtohtml(md_file_contents, prettier_fmt_config)
            page_render = page_template.render(
                title="Playlists",
                content_description="My list of playlists",
                page_html=playlists_page_html)

            write_page_render(playlists_html_output, page_render)
            logging.debug("writing playlists page: %s -> %s",
                playlists_md.relative_to(root_dir),
                playlists_html_output.relative_to(root_dir))


    with genlogger.time_section("final text-post rendering"):
        for html_page in pages_dir_path.rglob('*.html'):
            relative_html_path = html_page.absolute().relative_to(pages_dir_path.absolute())
            relative_html_subdirs = relative_html_path.parent
            dest_parent_path = gen_pages_root_path / relative_html_subdirs
            dest_parent_path.mkdir(parents=True, exist_ok=True)
            dest_page_path = dest_parent_path / html_page.name

            logging.debug("template filling... %s -> %s",
                html_page.relative_to(root_dir),
                dest_page_path.relative_to(root_dir))

            page_data = find_page_data([hidden_text_posts, text_posts, projects, recipe_posts], "pages" / relative_html_path)
            if page_data is None:
                raise RuntimeError(f"Failed to find {'pages' / relative_html_path} in site data @ {site_data_json_path}")

            custom_css_data = None
            custom_css_file = html_page.absolute().with_name("styles.css")
            if custom_css_file.exists():
                with open(custom_css_file, "r", encoding="utf8") as css_file:
                    custom_css_data = css_file.read()

            with open(html_page.absolute(), "r", encoding="utf8") as page_content_file:
                page_content = page_content_file.read()

            page_body = textpost_template.render(
                title=page_data['title'],
                pub_date=pub_datetime_to_date(page_data['pub_datetime']),
                display_date=page_data.get('display_date', None),
                post_content=page_content)

            page_render = page_template.render(
                title=page_data['title'],
                content_description=page_data['description'],
                page_html=page_body,
                custom_style_css=custom_css_data)

            write_page_render(dest_page_path.absolute(), page_render)

    feed_entries = [
        {
            "title": p["title"],
            "link": select_project_link(p),
            "uuid": p["feed_uuid"],
            "pub_datetime": p["pub_datetime"],
            "lastupdate_datetime": p.get("lastupdate_datetime", p["pub_datetime"]),
            "description": p["description"]
        } for p in (text_posts + projects) if "feed_uuid" in p ]
    feed_entries.sort(key=lambda p: p["pub_datetime"], reverse=True)
    feed_content = feed_template.render(entries=feed_entries)
    write_file(root_dir / "atomfeed.xml", feed_content)

def bin2b64string(data: bytes) -> str:
    return base64.b64encode(data).decode("utf8")

def pub_datetime_to_date(d: str) -> str:
    return datetime.datetime.fromisoformat(d).date().isoformat()

def password_encode_entry_html(
    plaintext: str,
    password_params: PasswordCryptParams) -> PasswordEncodedData:

    # https://en.wikipedia.org/wiki/PBKDF2
    # must match iterations value in /site_scripts/pswd_locked_page.js
    MIN_HMAC_SHA256_ITER = 210_000

    enc_key = hashlib.pbkdf2_hmac(
        'sha256',
        password_params.password.encode("utf8"),
        password_params.salt,
        iterations=MIN_HMAC_SHA256_ITER)

    aesgcm = cryptography.hazmat.primitives.ciphers.aead.AESGCM(enc_key)
    ciphertext = aesgcm.encrypt(password_params.iv, plaintext.encode("utf8"), None)

    return PasswordEncodedData(
        ciphertext=ciphertext,
        salt=password_params.salt,
        iv=password_params.iv)

def get_entry_password_params(entry: dict) -> PasswordCryptParams:
    pswd_value = entry.get("pswd")
    if pswd_value is None:
        raise RuntimeError("entry '%s' missing required 'pswd' object", entry["title"])

    if not isinstance(pswd_value, dict):
        raise RuntimeError("entry '%s' 'pswd' value is not an object. was %s", entry["title"], type(pswd_value))

    pswd_env_key = pswd_value.get("env_key", None)
    if pswd_env_key is None:
        raise RuntimeError("entry '%s' missing required 'pswd.env_key' value", entry["title"])

    pswd = os.environ.get(pswd_env_key, None)
    if pswd is None:
        raise RuntimeError("Password for entry '%s' must be stored in environment at key '%s'" % (
            entry["title"],
            pswd_env_key))

    salt_b64 = pswd_value.get("crypt_salt_b64", None)
    if salt_b64 is None:
        raise RuntimeError("entry '%s' missing required 'pswd.crypt_salt_b64' value", entry["title"])

    iv_b64 = pswd_value.get("crypt_iv_b64", None)
    if iv_b64 is None:
        raise RuntimeError("entry '%s' missing required 'pswd.crypt_iv_b64' value", entry["title"])

    return PasswordCryptParams(
        password=pswd,
        salt=base64.b64decode(salt_b64),
        iv=base64.b64decode(iv_b64))

def find_page_data(sections: list[dict], relative_html_path: pathlib.Path) -> dict|None:
    for section in sections:
        for site_entry_data in section:
            if "read" in site_entry_data and str(relative_html_path) == site_entry_data["read"]:
                return site_entry_data

    return None

def filter_highlights(*project_lists):
    highlights = []
    for project_list in project_lists:
        for project in project_list:
            if "highlight" in project and project["highlight"]:
                highlights.append(project)
    highlights.sort(key=lambda e: e["pub_datetime"], reverse=True)
    return highlights

def write_file(path: os.PathLike|str, content: str) -> None:
    with open(path, "w", encoding="utf8") as file:
        file.write(content + '\n')

def write_page_render(path: os.PathLike|str, content: str) -> None:
    write_file(path, content)

def gen_gemini_site():
    dir_path = pathlib.Path(os.path.dirname(os.path.realpath(__file__)))
    root_dir = dir_path.parent
    site_data_json_path = dir_path / "index_data" / "site_data.json"

    gem_index_path = root_dir / "gemini" / "site" / "index.gmi"

    with open(site_data_json_path, "r", encoding="utf8") as site_data_json_file:
        site_data = json.load(site_data_json_file)

    index_lines = []

    # Add Title
    index_lines.append("# Scott Munro")

    # Add Welcome section
    index_lines.append("## Hello")
    index_lines.append(site_data["welcome_msg"])
    index_lines.append("")
    index_lines.append("Still working to re-format my posts for geminispace. Until then, most things will just link back to my main site.")

    # Add Links
    index_lines.append("")
    index_lines.append(gemtext_link("homepage", "https://scottnm.com"))
    for link in site_data["links_page"]:
        index_lines.append(gemtext_link(link["type"], link["href"]))

    projects = site_data["projects"]
    text_posts = site_data["text_posts"]
    highlights = filter_highlights(projects, text_posts)
    if highlights:
        index_lines.append("## Highlights")
        for highlight in highlights:
            highlight_link = select_project_link(highlight) or "/"
            highlight_line = gemtext_link(highlight["title"], highlight_link)
            index_lines.append(highlight_line)

    if projects:
        index_lines.append("## All Projects")
        for project in projects:
            project_link = select_project_link(project) or "/"
            project_desc = "[%s] %s" % (pub_datetime_to_date(project["pub_datetime"]), project["title"])
            project_line = gemtext_link(project_desc, project_link)
            index_lines.append(project_line)

    if text_posts:
        index_lines.append("## All Text Posts")
        for text_post in text_posts:
            text_post_link = select_project_link(text_post) or "/"
            text_post_desc = "[%s] %s" % (pub_datetime_to_date(text_post["pub_datetime"]), text_post["title"])
            text_post_line = gemtext_link(text_post_desc, text_post_link)
            index_lines.append(text_post_line)

    write_page_render(gem_index_path, "\n".join(index_lines) + "\n")

def select_project_link(project: dict) -> str|None:
    link = \
        project.get("liveapp", None) or \
        project.get("src", None) or \
        project.get("doc", None) or \
        project.get("video", None) or \
        project.get("read", None)
    return link

def gemtext_link(desc: str, url: str) -> str:
    if url.startswith("pages/"):
        url = "https://scottnm.com/" + url
    return "=> %s %s" % (url, desc)

if __name__ == "__main__":
    main()
