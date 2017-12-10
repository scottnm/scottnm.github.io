'use strict';

var welcome_message="Vivamus ut venenatis magna, eu pharetra enim. Sed consectetur finibus ex, at luctus velit tincidunt nec. Aenean sed diam ligula. Cras massa justo, porta at nulla ut, bibendum consequat sem. Donec elementum cursus efficitur. Phasellus at convallis sem, quis rutrum tellus. Quisque quis semper ligula. Sed eros neque, imperdiet et ante sit amet, tristique pulvinar eros. Mauris posuere quis nunc consectetur fringilla. Ut interdum dui sit amet ligula tincidunt sodales. Curabitur tincidunt nulla sit amet metus pretium, nec scelerisque ipsum efficitur. Phasellus nec enim non est fermentum venenatis sed sed turpis. Suspendisse non nisi nulla.";

var tech_project_msg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit tortor nulla, non hendrerit magna luctus quis. Vestibulum maximus sodales ligula, in suscipit mauris fringilla ac. Nunc non fringilla dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus pharetra magna, ut pulvinar arcu finibus a. Vestibulum semper nisl leo, eget feugiat enim finibus id. Aenean scelerisque leo non odio faucibus, at gravida nulla pulvinar. Ut sodales ex condimentum facilisis semper. In sodales sem tellus, at malesuada turpis accumsan vitae. Suspendisse ac suscipit nunc, a pretium nibh. Vivamus sed nisl at dui ultricies eleifend non ut nulla.";

var creative_project_msg = "Duis ac quam eget ligula accumsan luctus non a elit. Suspendisse potenti. Duis vestibulum bibendum tellus, vel egestas metus gravida sit amet. Aliquam risus est, commodo vel sapien eget, suscipit porttitor quam. Sed vehicula at lectus a feugiat. Donec quis vehicula sem. Suspendisse eget est a turpis tristique mollis. Maecenas ligula ante, aliquam dapibus dignissim quis, laoreet in tellus. Suspendisse aliquet metus a est hendrerit, et tincidunt lectus varius. Sed condimentum risus purus, nec sollicitudin ante venenatis vel.";

var project_msg_dict = {"technical-btn": tech_project_msg, "creative-btn": creative_project_msg};

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

        var project_msg = project_msg_dict[clicked_tab_id];
        var projects = document.getElementsByClassName("project");
        for (var i = 0; i < projects.length; i++)
        {
            projects[i].innerText = project_msg;
        }
    };
}

window.onload =
    function()
    {
        document.getElementById("welcome-text").innerText = welcome_message;
        var projects = document.getElementsByClassName("project");
        for (var i = 0; i < projects.length; i++)
        {
            projects[i].innerText = welcome_message;
        }

        var project_tabs = document.getElementsByClassName("project-tab");
        for (var i = 0; i < project_tabs.length; i++)
        {
            var project_tab = project_tabs[i];
            project_tab.addEventListener("click", project_tab_clicked_callback(project_tab.id));
        }
    };
