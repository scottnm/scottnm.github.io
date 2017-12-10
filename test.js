'use strict';

function project_tab(id, projects)
{
    var info = {};
    info.id = id;
    info.projects = projects;
    info.start_index = 0;
    return info;
}


var welcome_message = "Vivamus ut venenatis magna, eu pharetra enim. Sed consectetur finibus ex, at luctus velit tincidunt nec. Aenean sed diam ligula. Cras massa justo, porta at nulla ut, bibendum consequat sem. Donec elementum cursus efficitur. Phasellus at convallis sem, quis rutrum tellus. Quisque quis semper ligula. Sed eros neque, imperdiet et ante sit amet, tristique pulvinar eros. Mauris posuere quis nunc consectetur fringilla. Ut interdum dui sit amet ligula tincidunt sodales. Curabitur tincidunt nulla sit amet metus pretium, nec scelerisque ipsum efficitur. Phasellus nec enim non est fermentum venenatis sed sed turpis. Suspendisse non nisi nulla.";

var button_id_to_project_tab_id_map = {"technical-btn": "technical", "creative-btn": "creative"};
var project_tab_table = {
    "technical": project_tab("technical", technicalProjectData),
    "creative": project_tab("creative", creativeProjectData)
    };

var current_project_tab_id = null;
var project_display_count = 3;

function populate_project_subpane(project_tab_id)
{
    var project_container_template = "<section class=\"{section_color}\"><div class=\"project section-with-small-buffer\">{project_data}</div></section>"
    var project_element_template = "<div class=\"project_title\"><h3>{project_title}</h3></div>" +
                                "<div class=\"project_dates\">" +
                                "{project_dates}</div><div class=\"project_description\">" +
                                "{project_description}</div><div class=\"project_tools\">Tools: {project_tools}</div></div>"

    var project_subpane_elements_string = "";
    var project_tab = project_tab_table[project_tab_id];

    for (var project_index = project_tab.start_index;
         project_index < Math.min(project_tab.projects.length, project_display_count + project_tab.start_index);
         project_index++)
    {
        var project = project_tab.projects[project_index];
        var project_element_string = project_element_template
            .replace("{project_title}", project.title)
            .replace("{project_dates}", project.dates)
            .replace("{project_description}", project.description)
            .replace("{project_tools}", project.tools)
        project_subpane_elements_string += project_container_template
            .replace("{section_color}", project_index % 2 == 0 ? "bg-blue-lightest" : "bg-blue-lighter")
            .replace("{project_data}", project_element_string);
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
    console.log("prev");
    var start_index = project_tab_table[current_project_tab_id].start_index;
    project_tab_table[current_project_tab_id].start_index = Math.max(start_index - project_display_count, 0);
    populate_project_subpane(current_project_tab_id);
    update_pagination_controls();
}

function next_page()
{
    console.log("next");
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
    if (start_index + project_display_count >= end_index)
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
        .replace("{end}", Math.min(end_index, start_index + project_display_count));
}

window.onload =
    function()
    {
        document.getElementById("welcome-text").innerText = welcome_message;
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
