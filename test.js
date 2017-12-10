'use strict';

function project_info(id, data, msg)
{
    var info = {};
    info["id"] = id;
    info["data"] = data;
    info["start_index"] = 0;
    info["msg"] = msg;
    return info;
}


var welcome_message = "Vivamus ut venenatis magna, eu pharetra enim. Sed consectetur finibus ex, at luctus velit tincidunt nec. Aenean sed diam ligula. Cras massa justo, porta at nulla ut, bibendum consequat sem. Donec elementum cursus efficitur. Phasellus at convallis sem, quis rutrum tellus. Quisque quis semper ligula. Sed eros neque, imperdiet et ante sit amet, tristique pulvinar eros. Mauris posuere quis nunc consectetur fringilla. Ut interdum dui sit amet ligula tincidunt sodales. Curabitur tincidunt nulla sit amet metus pretium, nec scelerisque ipsum efficitur. Phasellus nec enim non est fermentum venenatis sed sed turpis. Suspendisse non nisi nulla.";

var technical_message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit tortor nulla, non hendrerit magna luctus quis. Vestibulum maximus sodales ligula, in suscipit mauris fringilla ac. Nunc non fringilla dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus pharetra magna, ut pulvinar arcu finibus a. Vestibulum semper nisl leo, eget feugiat enim finibus id. Aenean scelerisque leo non odio faucibus, at gravida nulla pulvinar. Ut sodales ex condimentum facilisis semper. In sodales sem tellus, at malesuada turpis accumsan vitae. Suspendisse ac suscipit nunc, a pretium nibh. Vivamus sed nisl at dui ultricies eleifend non ut nulla.";

var creative_message = "Duis ac quam eget ligula accumsan luctus non a elit. Suspendisse potenti. Duis vestibulum bibendum tellus, vel egestas metus gravida sit amet. Aliquam risus est, commodo vel sapien eget, suscipit porttitor quam. Sed vehicula at lectus a feugiat. Donec quis vehicula sem. Suspendisse eget est a turpis tristique mollis. Maecenas ligula ante, aliquam dapibus dignissim quis, laoreet in tellus. Suspendisse aliquet metus a est hendrerit, et tincidunt lectus varius. Sed condimentum risus purus, nec sollicitudin ante venenatis vel.";

var button_id_to_project_id_map = {"technical-btn": "technical", "creative-btn": "creative"};
var id_to_project_map = {
    "technical": project_info("technical", technicalProjectData, technical_message), 
    "creative": project_info("creative", creativeProjectData, creative_message)
    };

var current_project_id = null;
var project_display_count = 3;

function reload_project_data(project_id)
{
    var project_template = "<section class=\"{section_color}\"><div class=\"project section-with-small-buffer\">{project_data}</div></section>"
    var project_subpane_elements = "";
    var project = id_to_project_map[project_id];
    var project_data = project.data;

    for (var i = project.start_index;
         i < Math.min(project_data.length, project_display_count + project.start_index);
         i++)
    {
        project_subpane_elements += project_template
            .replace("{section_color}", i % 2 == 0 ? "bg-blue-lightest" : "bg-blue-lighter")
            .replace("{project_data}", project.msg);//JSON.stringify(project_data));
    }
    document.getElementById("projects-subpane").innerHTML = project_subpane_elements;
}

function project_tab_clicked_callback(clicked_tab_id)
{
    return function () {
		var project_tabs = document.getElementsByClassName("project-tab");
        for (var i = 0; i < project_tabs.length; i++)
        {
            var project_tab = project_tabs[i];
            if (project_tab.id === clicked_tab_id)
            {
                project_tab.classList.add("tab-active");
                project_tab.classList.remove("tab-inactive");
            }
            else
            {
                project_tab.classList.add("tab-inactive");
                project_tab.classList.remove("tab-active");
            }
        }

        current_project_id = button_id_to_project_id_map[clicked_tab_id];
        reload_project_data(current_project_id);
        update_pagination_controls();
    };
}

function prev_page()
{
    console.log("prev");
    var start_index = id_to_project_map[current_project_id].start_index;
    id_to_project_map[current_project_id].start_index = Math.max(start_index - project_display_count, 0);
    update_pagination_controls();
}

function next_page()
{
    console.log("next");
    id_to_project_map[current_project_id].start_index += project_display_count;
    update_pagination_controls();
}

function update_pagination_controls()
{
    var start_index = id_to_project_map[current_project_id].start_index;
    var end_index = id_to_project_map[current_project_id].data.length - 1;

    document.getElementById("prev-page").disabled = start_index === 0;
    document.getElementById("next-page").disabled = start_index + project_display_count >= end_index;
    document.getElementById("project-element-range").innerText = " {start} ... {end} "
        .replace("{start}", start_index)
        .replace("{end}", Math.min(end_index, start_index + project_display_count));
}

window.onload =
    function()
    {
        document.getElementById("welcome-text").innerText = welcome_message;
        var project_tabs = document.getElementsByClassName("project-tab");
        for (var i = 0; i < project_tabs.length; i++)
        {
            var project_tab = project_tabs[i];
            project_tab.addEventListener("click", project_tab_clicked_callback(project_tab.id));
        }
        project_tab_clicked_callback(project_tabs[0].id)();
        update_pagination_controls();

        document.getElementById("prev-page").addEventListener("click", prev_page);
        document.getElementById("next-page").addEventListener("click", next_page);
    };
