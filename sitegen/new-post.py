import argparse
import datetime
import re
import logging
import pathlib
import os
import json
import uuid

import genlogger

def main():
    genlogger.setup_logger(log_verbose=False)

    parser = argparse.ArgumentParser()
    parser.add_argument("-n", "--name", required=True)
    parser.add_argument("--hidden", action="store_true", default=False)
    args = parser.parse_args()

    today = datetime.date.today()

    post_raw_name: str = args.name
    post_name = re.sub(r'[^a-zA-Z0-9 ]', '', post_raw_name)
    post_name = re.sub(r'\s+', '_', post_name)

    post_file_basename = today.strftime("%Y_%m_%d") + "_" + post_name

    logging.info("post name: %s <- '%s'", post_file_basename, post_raw_name)

    dir_path = pathlib.Path(os.path.dirname(os.path.realpath(__file__)))
    root_dir = dir_path.parent
    pages_dir_path = dir_path / "pages"
    site_data_json_path = dir_path / "site_data" / "site_data.json"
    new_post_dir = pages_dir_path / post_name
    new_post_filepath = new_post_dir / f"{post_file_basename}.md"

    new_post_dir.mkdir(parents=True, exist_ok=True)
    new_post_filepath.touch(exist_ok=True)

    pub_datetime = datetime.datetime.now().isoformat()
    md_src = new_post_filepath.relative_to(root_dir.absolute())
    read_link = pathlib.Path("pages") / post_name / f"{post_file_basename}.html"
    new_post_desc = {
        "title": post_raw_name,
        "feed_uuid": str(uuid.uuid4()),
        "pub_datetime": pub_datetime,
        "lastupdate_datetime": pub_datetime,
        "description": "",
        "image": "",
        "read": str(read_link),
        "md_src": str(md_src)
    }

    logging.info(json.dumps(new_post_desc))

    with open(site_data_json_path, "r", encoding="utf8") as f:
        site_data: dict = json.load(f)

    section_name = "hidden_text_posts" if args.hidden else "text_posts"
    site_data.get(section_name, []).insert(0, new_post_desc)
    new_site_data = json.dumps(site_data, indent=4)

    logging.debug("json output: %s", new_site_data)

    with open(site_data_json_path, "wb") as f:
        f.write(new_site_data.encode("utf8"))

if __name__ == "__main__":
    main()