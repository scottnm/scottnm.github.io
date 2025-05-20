import os
import pathlib
import jinja2
import json
import shutil

def main():
    dir_path_name = os.path.dirname(os.path.realpath(__file__))
    dir_path = pathlib.Path(dir_path_name)
    pages_dir_path = dir_path / "pages"
    gen_index_path = dir_path.parent / "index.html"
    gen_pages_root_path = dir_path.parent / "pages"
    json_data_dir = dir_path / "index_data"
    site_data_json_path = json_data_dir / "site_data.json"

    with open(site_data_json_path, "r", encoding="utf8") as site_data_json_file:
        site_data = json.load(site_data_json_file)
        projects = site_data["projects"]
        text_posts = site_data["text_posts"]

    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(f"{dir_path_name}/"),
        trim_blocks=True,
        lstrip_blocks=True)
    template = env.get_template("index.html.jinja")

    html_render = template.render(
        welcome_text=site_data['welcome_msg'],
        highlights=filter_highlights(projects, text_posts),
        projects=projects,
        text_posts=text_posts)

    with open(gen_index_path, "w", encoding="utf8") as gen_index_file:
        gen_index_file.write(html_render + '\n')

    for html_page in pages_dir_path.rglob('*.html'):
        relative_html_path = html_page.absolute().relative_to(pages_dir_path.absolute())
        relative_html_subdirs = relative_html_path.parent
        dest_parent_path = gen_pages_root_path / relative_html_subdirs
        dest_parent_path.mkdir(parents=True, exist_ok=True)
        dest_page_path = dest_parent_path / html_page.name
        # print(f"relative path: {relative_html_path}")
        # print(f"relative path parents: {relative_html_subdirs}")
        print(f"copying... {html_page.absolute()} -> {dest_page_path.absolute()}")
        shutil.copyfile(html_page.absolute(), dest_page_path.absolute())

def filter_highlights(*project_lists):
    highlights = []
    for project_list in project_lists:
        for project in project_list:
            if "highlight" in project and project["highlight"]:
                highlights.append(project)
    return highlights

if __name__ == "__main__":
    main()
