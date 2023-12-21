function project_tab(id, projects) {
    var info = {};
    info.id = id;
    info.projects = projects;
    return info;
}

const button_id_to_project_tab_id_map = {
    "project-btn": "projects",
    "text-post-btn": "textposts"
};

const project_tab_table = {
    "projects": project_tab("projects", data.projectData),
    "textposts": project_tab("textposts", data.textPostData)
};

let current_project_tab_id = null;

function format_project_element(project) {
    let project_element =
        "<div class=\"project_info_frame\">" +
        "<div class=\"project_title\">" +
        `<h3>${project.title}</h3>` +
        "</div>" +
        `<div class="project_dates">${project.dates}</div>` +
        `<div class="project_description">${project.description}</div>` +
        (project.tools ? `<div class="project_tools">Tools: ${project.tools}</div>` : "") +
        "<div class=\"project_links\">" +
        (project.src ? `<a class="project_src" href=${project.src} target="_blank">src</a>` : "") +
        (project.doc ? `<a class="project_doc" href=${project.doc} download>doc</a>` : "") +
        (project.liveapp ? `<a class="project_liveapp" href=${project.liveapp} target="_blank">try me</a>` : "") +
        (project.video ? `<a class="project_video" href=${project.video} target="_blank">vid</a>` : "") +
        (project.read ? `<a class="project_read" href=${project.read} target="_blank">read</a>` : "") +
        "</div>" +
        "</div>";
    if (project.image) {
        // N.B. all project thumbnails use empty alt text since the thumbnails are mostly decorative
        //      and all project blurbs come with a text description
        project_element += `<img class="image_embed" src=${project.image} alt="" loading="lazy"/>`;
    }

    return project_element;
}

function generate_project_elements() {
    let project_subpane_elements_string = "";
    const project_container_template = "<section class=\"{project_tab_id} {section_color} hide-project\">" +
        "<div class=\"project section-with-small-buffer\">{project_data}</div></section>";
    for (const project_tab_id in project_tab_table) {
        const project_tab = project_tab_table[project_tab_id];
        for (let project_index = 0; project_index < project_tab.projects.length; project_index++) {
            const project = project_tab.projects[project_index];
            project_subpane_elements_string += project_container_template
                .replace("{project_tab_id}", project_tab_id)
                .replace("{section_color}", project_index % 2 == 0 ? "bg-lighter" : "bg-light")
                .replace("{project_data}", format_project_element(project));
        }
    }

    document.getElementById("projects-subpane").innerHTML = project_subpane_elements_string;
}


function get_project_id_from_element(element) {
    for (let i = 0; i < element.classList.length; i++) {
        const e_class = element.classList[i];
        if (e_class in project_tab_table) {
            return e_class;
        }
    }
    return null;
}

function update_visible_projects(visible_project_tab_id) {
    const project_list = document.getElementById("projects-subpane").children;
    let current_project_id = null;
    let current_project_offset = 0;
    for (let project_index = 0; project_index < project_list.length; project_index++) {
        let project_element = project_list[project_index];
        const project_id = get_project_id_from_element(project_element);
        if (project_id === visible_project_tab_id) {
            if (project_id !== current_project_id) {
                current_project_offset = project_index;
                current_project_id = project_id;
            }
            project_element.classList.remove("hide-project");
        }
        else {
            project_element.classList.add("hide-project");
        }
    }
}

function project_tab_clicked_callback(clicked_tab_id) {
    return function () {
        let project_tab_elements = document.getElementsByClassName("project-tab");
        for (let i = 0; i < project_tab_elements.length; i++) {
            const project_tab_element = project_tab_elements[i];
            if (project_tab_element.id === clicked_tab_id) {
                project_tab_element.classList.add("tab-active");
                project_tab_element.classList.remove("tab-inactive");
            }
            else {
                project_tab_element.classList.add("tab-inactive");
                project_tab_element.classList.remove("tab-active");
            }
        }

        current_project_tab_id = button_id_to_project_tab_id_map[clicked_tab_id];
        update_visible_projects(current_project_tab_id);
    };
}

window.onload =
    function () {
        document.getElementById("welcome-text").innerHTML = data.welcomeMessage;
        let project_tab_elements = document.getElementsByClassName("project-tab");
        for (let i = 0; i < project_tab_elements.length; i++) {
            let project_tab_element = project_tab_elements[i];
            project_tab_element.addEventListener("click", project_tab_clicked_callback(project_tab_element.id));
        }
        generate_project_elements();
        project_tab_clicked_callback(project_tab_elements[0].id)();
    };
