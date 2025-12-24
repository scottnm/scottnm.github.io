#!/usr/bin/env python3

import os
import pathlib
import jinja2
import json

import mdtohtml

def main() -> None:
    gen_html_site()
    gen_gemini_site()

def gen_html_site() -> None:
    dir_path_name = os.path.dirname(os.path.realpath(__file__))
    dir_path = pathlib.Path(dir_path_name)
    pages_dir_path = dir_path / "pages"
    root_dir = dir_path.parent
    gen_index_path = root_dir / "index.html"
    gen_links_page_path = root_dir / "links.html"
    gen_pages_root_path = dir_path.parent / "pages"
    site_data_json_path = dir_path / "index_data" / "site_data.json"

    with open(site_data_json_path, "r", encoding="utf8") as site_data_json_file:
        site_data = json.load(site_data_json_file)

    with open(dir_path / ".prettierrc", "r", encoding="utf8") as f:
        prettier_fmt_config = json.load(f)

    projects = site_data["projects"]
    text_posts = site_data["text_posts"]
    hidden_text_posts = site_data["hidden_text_posts"]
    for section in [ projects, text_posts, hidden_text_posts]:
        for entry in section:
            if "md_src" not in entry:
                continue

            md_filepath = (root_dir / str(entry["md_src"])).resolve()
            with open(md_filepath, "r", encoding="utf8") as f:
                md_file_contents = f.read()

            html = mdtohtml.mdtohtml(md_file_contents, prettier_fmt_config)
            html_output_path = md_filepath.with_suffix(".html")
            with open(html_output_path, "w", encoding="utf8") as f:
                f.write(html)
            print(f"Generated {html_output_path} <- {md_filepath}")

    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(f"{dir_path_name}/"),
        trim_blocks=True,
        lstrip_blocks=True)

    page_template = env.get_template("page.html.jinja")
    index_template = env.get_template("index.html.jinja")
    links_page_template = env.get_template("links.html.jinja")
    textpost_template = env.get_template("textpost.html.jinja")

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

    write_page_render(gen_index_path, index_render)

    links_page_render = links_page_template.render(links=site_data['links_page'])
    write_page_render(gen_links_page_path, links_page_render)

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
        print(f"writing playlists page: {playlists_md} -> {playlists_html_output}")

    for html_page in pages_dir_path.rglob('*.html'):
        relative_html_path = html_page.absolute().relative_to(pages_dir_path.absolute())
        relative_html_subdirs = relative_html_path.parent
        dest_parent_path = gen_pages_root_path / relative_html_subdirs
        dest_parent_path.mkdir(parents=True, exist_ok=True)
        dest_page_path = dest_parent_path / html_page.name

        print(f"template filling... {html_page.absolute()} -> {dest_page_path.absolute()}")
        page_data = find_page_data([hidden_text_posts, text_posts, projects], "pages" / relative_html_path)
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
            pub_date=page_data['pub_date'],
            display_date=page_data.get('display_date', None),
            post_content=page_content)

        page_render = page_template.render(
            title=page_data['title'],
            content_description=page_data['description'],
            page_html=page_body,
            custom_style_css=custom_css_data)

        write_page_render(dest_page_path.absolute(), page_render)

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
    highlights.sort(key=lambda e: e["pub_date"], reverse=True)
    return highlights

def write_page_render(path: os.PathLike|str, content: str) -> None:
    with open(path, "w", encoding="utf8") as file:
        file.write(content + '\n')

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
            project_desc = "[%s] %s" % (project["pub_date"], project["title"])
            project_line = gemtext_link(project_desc, project_link)
            index_lines.append(project_line)

    if text_posts:
        index_lines.append("## All Text Posts")
        for text_post in text_posts:
            text_post_link = select_project_link(text_post) or "/"
            text_post_desc = "[%s] %s" % (text_post["pub_date"], text_post["title"])
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
