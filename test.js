'use strict';

function project_tab(id, projects)
{
    var info = {};
    info.id = id;
    info.projects = projects;
    info.start_index = 0;
    return info;
}


var button_id_to_project_tab_id_map = {"technical-btn": "technical", "creative-btn": "creative"};
var project_tab_table = {
    "technical": project_tab("technical", technicalProjectData),
    "creative": project_tab("creative", creativeProjectData)
    };

var current_project_tab_id = null;
var project_display_count = 3;

function format_project_element(project)
{
    var project_element =
        "<div class=\"project_info_frame\">" +
            "<div class=\"project_title\">" +
                `<h3>${project.title}</h3>` +
            "</div>" +
            `<div class="project_dates">${project.dates}</div>` +
            `<div class="project_description">${project.description}</div>` +
            `<div class="project_tools">Tools: ${project.tools}</div>` +
            "<div class=\"project_links\">" +
                (project.src ? `<a class="project_src" href=${project.src} target="_blank">src</a>` : "") +
                (project.doc ? `<a class="project_doc" href=${project.doc} download>doc</a>` : "") +
                (project.liveapp ? `<a class="project_liveapp" href=${project.liveapp} target="_blank">try me</a>` : "") +
            "</div>" +
        "</div>";
    if (project.video)
    {
        project_element += `<iframe class="video_embed" src=${project.video.replace("watch?v=", "embed/")} ` +
                           "gesture=\"media\" allow=\"encrypted-media\" allowfullscreen=\"\"></iframe>";
    }
    else if (project.image)
    {
        project_element += `<img class="image_embed" src=${project.image} />`;
    }

    return project_element;
}

function populate_project_subpane(project_tab_id)
{
    var project_container_template = "<section class=\"{section_color}\"><div class=\"project section-with-small-buffer\">{project_data}</div></section>"

    var project_subpane_elements_string = "";
    var project_tab = project_tab_table[project_tab_id];

    for (var project_index = project_tab.start_index;
         project_index < Math.min(project_tab.projects.length, project_display_count + project_tab.start_index);
         project_index++)
    {
        var project = project_tab.projects[project_index];
        project_subpane_elements_string += project_container_template
            .replace("{section_color}", project_index % 2 == 0 ? "bg-blue-lightest" : "bg-blue-lighter")
            .replace("{project_data}", format_project_element(project));
    }
    document.getElementById("projects-subpane").innerHTML = project_subpane_elements_string;
}

function project_tab_clicked_callback(clicked_tab_id)
{
    return function () {
		var project_tab_elements = document.getElementsByClassName("project-tab");
        for (var i = 0; i < project_tab_elements.length; i++)
        {
            var project_tab_element = project_tab_elements[i];
            if (project_tab_element.id === clicked_tab_id)
            {
                project_tab_element.classList.add("tab-active");
                project_tab_element.classList.remove("tab-inactive");
            }
            else
            {
                project_tab_element.classList.add("tab-inactive");
                project_tab_element.classList.remove("tab-active");
            }
        }

        current_project_tab_id = button_id_to_project_tab_id_map[clicked_tab_id];
        populate_project_subpane(current_project_tab_id);
        update_pagination_controls();
    };
}

function prev_page()
{
    var start_index = project_tab_table[current_project_tab_id].start_index;
    project_tab_table[current_project_tab_id].start_index = Math.max(start_index - project_display_count, 0);
    populate_project_subpane(current_project_tab_id);
    update_pagination_controls();
}

function next_page()
{
    project_tab_table[current_project_tab_id].start_index += project_display_count;
    populate_project_subpane(current_project_tab_id);
    update_pagination_controls();
}

function update_pagination_controls()
{
    var start_index = project_tab_table[current_project_tab_id].start_index;
    var prev_page_e = document.getElementById("prev-page");
    if (start_index === 0)
    {
        prev_page_e.disabled = true;
        prev_page_e.classList.add("hide");
    }
    else
    {
        prev_page_e.disabled = false;
        prev_page_e.classList.remove("hide");
    }

    var end_index = project_tab_table[current_project_tab_id].projects.length - 1;
    var next_page_e = document.getElementById("next-page");
    if (start_index + project_display_count - 1 >= end_index)
    {
        next_page_e.disabled = true;
        next_page_e.classList.add("hide");
    }
    else
    {
        next_page_e.disabled = false;
        next_page_e.classList.remove("hide");
    }


    document.getElementById("project-element-range").innerText = " {start} ... {end} "
        .replace("{start}", start_index)
        .replace("{end}", Math.min(end_index, start_index + project_display_count - 1));
}

window.onload =
    function()
    {
        document.getElementById("welcome-text").innerText = welcomeMessage;
        var project_tab_elements = document.getElementsByClassName("project-tab");
        for (var i = 0; i < project_tab_elements.length; i++)
        {
            var project_tab_element = project_tab_elements[i];
            project_tab_element.addEventListener("click", project_tab_clicked_callback(project_tab_element.id));
        }
        project_tab_clicked_callback(project_tab_elements[0].id)();
        update_pagination_controls();

        document.getElementById("prev-page").addEventListener("click", prev_page);
        document.getElementById("next-page").addEventListener("click", next_page);
    };
