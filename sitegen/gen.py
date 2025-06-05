import os
import pathlib
import jinja2
import json

import mdtohtml

def main() -> None:
    dir_path_name = os.path.dirname(os.path.realpath(__file__))
    dir_path = pathlib.Path(dir_path_name)
    pages_dir_path = dir_path / "pages"
    root_dir = dir_path.parent
    gen_index_path = root_dir / "index.html"
    gen_pages_root_path = dir_path.parent / "pages"
    json_data_dir = dir_path / "index_data"
    site_data_json_path = json_data_dir / "site_data.json"

    with open(site_data_json_path, "r", encoding="utf8") as site_data_json_file:
        site_data = json.load(site_data_json_file)
        projects = site_data["projects"]
        text_posts = site_data["text_posts"]

    with open(dir_path / ".prettierrc", "r", encoding="utf8") as f:
        prettier_fmt_config = json.load(f)

    for section in [ projects, text_posts ]:
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

    with open(gen_index_path, "w", encoding="utf8") as gen_index_file:
        gen_index_file.write(index_render + '\n')

    for html_page in pages_dir_path.rglob('*.html'):
        relative_html_path = html_page.absolute().relative_to(pages_dir_path.absolute())
        relative_html_subdirs = relative_html_path.parent
        dest_parent_path = gen_pages_root_path / relative_html_subdirs
        dest_parent_path.mkdir(parents=True, exist_ok=True)
        dest_page_path = dest_parent_path / html_page.name

        print(f"template filling... {html_page.absolute()} -> {dest_page_path.absolute()}")
        page_data = find_page_data(text_posts, projects, "pages" / relative_html_path)
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

        with open(dest_page_path.absolute(), "w", encoding="utf8") as dest_page_file:
            dest_page_file.write(page_render + '\n')


def find_page_data(text_post_data: dict, projects: dict, relative_html_path: pathlib.Path) -> dict|None:
    for section in [text_post_data, projects]:
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

if __name__ == "__main__":
    main()
