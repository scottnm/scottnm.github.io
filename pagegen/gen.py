import os
import pathlib
import jinja2
import json

def main():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    json_data_dir = pathlib.Path(dir_path) / "index_data"
    site_data_json_path = json_data_dir / "site_data.json"
    project_data_json_path = json_data_dir / "projects.json"
    text_posts_json_path = json_data_dir / "text_posts.json"

    with open(site_data_json_path, "r", encoding="utf8") as site_data_json_file:
        site_data = json.load(site_data_json_file)
        with open(project_data_json_path, "r", encoding="utf8") as project_data_json_file:
            projects = json.load(project_data_json_file)
            with open(text_posts_json_path, "r", encoding="utf8") as text_posts_json_file:
                text_posts = json.load(text_posts_json_file)

    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(f"{dir_path}/"),
        trim_blocks=True,
        lstrip_blocks=True)
    template = env.get_template("index.html.jinja")

    html_render = template.render(
        welcome_text=site_data['welcome_msg'],
        highlights=filter_highlights(projects, text_posts),
        projects=projects,
        text_posts=text_posts)

    print(html_render)

def filter_highlights(*project_lists):
    highlights = []
    for project_list in project_lists:
        for project in project_list:
            if "highlight" in project and project["highlight"]:
                highlights.append(project)
    return highlights

if __name__ == "__main__":
    main()
