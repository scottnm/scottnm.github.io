import argparse
import json
import markdown
import os
import pathlib
import tempfile
import subprocess
import asyncio

def mdtohtml(md_file_contents: str) -> str:
    return markdown.markdown(md_file_contents, extensions=['extra'])

def pretty_fmt_html(html_data: str, biome_config: dict|pathlib.Path) -> str:
    biome_config_file = None
    try:
        if isinstance(biome_config, dict):
            biome_config_file = tempfile.NamedTemporaryFile(mode="w", encoding="utf8")
            json.dump(biome_config, biome_config_file)
            biome_config_file.flush()
            biome_config_filename = biome_config_file.name
        else:
            assert(isinstance(biome_config, pathlib.Path))
            biome_config_filename = str(biome_config.absolute())

        formatter_cmd_args = [
            'biome',
            'format',
            f'--config-path={biome_config_filename}',
            '--stdin-file-path', 'test.html' ]
        fmt_result = subprocess.run(formatter_cmd_args, input=html_data.encode("utf8"), stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        if fmt_result.returncode != 0:
            raise RuntimeError(f"Failed to format HTML: output={fmt_result.stdout!r}")

        formatted_html = fmt_result.stdout.decode("utf8")
        return formatted_html

    finally:
        if biome_config_file is not None:
            biome_config_file.close()

def pretty_fmt_html_multi(html_blobs: list[str], biome_config: dict|pathlib.Path) -> list[str]:
    async def pretty_fmt_html_async_multi_helper() -> list[str]:
        fmt_tasks = [
            asyncio.to_thread(pretty_fmt_html, html_blob, biome_config)
            for html_blob in html_blobs
        ]
        return await asyncio.gather(*fmt_tasks)

    return asyncio.run(pretty_fmt_html_async_multi_helper())

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-m", "--markdown", required=True)
    parser.add_argument("-o", "--output-html")
    parser.add_argument("-d", "--output-directory")
    parser.add_argument("-f", "--fmt-config")
    parser.add_argument("-p", "--preview", default=False, action='store_true')

    args = parser.parse_args()

    markdown_filepath = pathlib.Path(args.markdown).resolve()
    if markdown_filepath.suffix.lower() != ".md":
        parser.error(f"-m must be markdown file: {markdown_filepath}")
    if not markdown_filepath.exists():
        parser.error(f"markdown file missing: {markdown_filepath}")

    output_html_filename = \
        pathlib.Path(args.output_html).name if args.output_html \
        else pathlib.Path(markdown_filepath.name).with_suffix(".html").name

    output_directory = \
        pathlib.Path(args.output_directory) if args.output_directory \
        else markdown_filepath.parent
    output_directory = output_directory.resolve()
    if not output_directory.exists():
        parser.error(f"output_directory does not exist: {markdown_filepath}")
    if not output_directory.is_dir():
        parser.error(f"-d must be directory: {output_directory}")

    output_html_filepath = output_directory / output_html_filename

    if args.fmt_config is not None:
        fmt_config_filepath = pathlib.Path(args.fmt_config).resolve()
    else:
        dir_path_name = os.path.dirname(os.path.realpath(__file__))
        fmt_config_filepath = pathlib.Path(dir_path_name) / "biome.json"

    preview_output: bool = args.preview

    print(f"markdown:    {markdown_filepath}")
    print(f"output html: {output_html_filepath}")
    print(f"fmt config:  {fmt_config_filepath}")
    print(f"Run type:    {'Preview' if preview_output else 'Generate'}")

    with open(markdown_filepath, "r", encoding="utf8") as f:
        markdown_file_data = f.read()

    with open(fmt_config_filepath, "r", encoding="utf8") as f:
        fmt_config = json.load(f)

    raw_html = mdtohtml(markdown_file_data)
    html_output = pretty_fmt_html(raw_html, fmt_config)
    if preview_output:
        print(html_output)
        print(f"Preview write to: {output_html_filepath}")
    else:
        with open(output_html_filepath, "w", encoding="utf8") as f:
            f.write(html_output)
        print(f"Generated: {output_html_filepath}")

if __name__ == "__main__":
    main()