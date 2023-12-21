const data = {
    "welcomeMessage": "Sometimes, I'm a software engineer working for Xbox. When I'm not, I like to make things. Here you'll find a (lightly pruned) archive of such things. Most of it's code, some of it's not, and all of it's useful to no one but myself! Take a look around.",

    "projectData": [
        {
            'title': 'VTPP',
            'dates': 'November 2023',
            'description': 'Video-to-Private-Podcast: a home server project',
            'image': 'site_images/vtpp_coverart_thumbnail_med.webp',
            'read': 'pages/bespoke/vtpp/0.1.0/2023_11_04_vtpp_0.1.0.html',
            'tools': 'python, sqlite3, raspberrypi'
        },
        {
            'title': 'Dig Deep',
            'dates': 'Spring 2022',
            'description': 'An isometric pico-8 game about digging and family history for the <a href="https://itch.io/jam/culture-bytes-classic-collards-jam">Classic Collards Game Jam</a>.',
            'image': 'site_images/digdeep-demo.webp',
            'src': 'https://github.com/scottnm/collards.p8',
            'liveapp': 'https://scottnm.itch.io/dig-deep',
            'tools': 'pico8, lua'
        },
        {
            'title': 'Avipaper.p8',
            'dates': 'Winter 2021',
            'description': 'A Pico-8 demo. Fly a paper airplane through some targets.',
            'image': 'site_images/avipaper-demo.webp',
            'src': 'https://github.com/scottnm/avipaper.p8',
            'tools': 'pico8, lua'
        },
        {
            'title': 'Bman3D',
            'dates': 'Spring 2021',
            'description': 'Modeled, textured, and rigged a 3D model of Bomberman from "Bomberman 64: the Second Attack!"',
            'liveapp': 'https://skfb.ly/osJ6Y',
            'image': 'site_images/bman64-demo.webp',
            'tools': 'blender'
        },
        {
            'title': 'Scrapewood',
            'dates': 'Spring 2021',
            'description': 'Wrote a web-scraper to grab all of the main Achewood comics from the website. I then merged them into a unified PDF so that I could read them on my e-reader. Source not available because web scrappers always feel like they\'re in dubiously legal territory and I don\'t intend to distribute the resulting PDF or web scraper source.',
            'image': 'site_images/scrapewood_on_reader.webp',
            'tools': 'rust'
        },
        {
            'title': 'Lost-n-found',
            'dates': 'Winter 2021',
            'description': 'A quick puzzle game for GGJ21 that I never properly named. The theme was "lost and found". ' +
                'The core idea I tried to execute on was a "hot or cold" style guessing game where you use reveal clues which guide you toward finding something.',
            'src': 'https://github.com/scottnm/lost-n-found-game',
            'image': 'site_images/lostnfound-demo.webp',
            'tools': 'rust, pancurses/ncurses'
        },
        {
            'title': 'Wasteland Cracker',
            'dates': 'Winter 2021',
            'description': 'A clone of the Fallout hacking mini-game with an included tool for solving real puzzles',
            'src': 'https://github.com/scottnm/wasteland-cracker',
            'image': 'site_images/wastelandcracker-demo.webp',
            'tools': 'rust, pancurses/ncurses'
        },
        {
            'title': 'Tetrust',
            'dates': 'Winter 2021',
            'description': 'A TUI tetris clone written in rust',
            'src': 'https://github.com/scottnm/tetrust',
            'image': 'site_images/tetrust-demo.webp',
            'tools': 'rust, pancurses/ncurses'
        },
        {
            'title': 'WSR Image Extractor',
            'dates': 'Fall 2020',
            'description': 'A tool to extract the images captured in a Windows Steps Recorder file',
            'src': 'https://github.com/scottnm/WSR-Image-Extractor',
            'image': 'site_images/wsr.webp',
            'tools': 'rust'
        },
        /*
        {
            'title': 'NoteVis',
            'dates': 'Summer 2020',
            'description': 'A tool to help visualize notes on a fretboard',
            'src': 'https://github.com/scottnm/notevis',
            'image': 'site_images/notevis.webp',
            'tools': 'rust'
        },
        */
        {
            'title': 'The Treachery of Self-image',
            'dates': 'Spring 2018',
            'description': 'A silly joke that I took too far and spent too much time on. The result? a ' +
                'parody of "the Treachery of Images" by Rene Magritte. ' +
                'In a funny turn of events, I like how it turned out. ',
            'image': 'files/the_treachery_of_self_image.png',
            'tools': 'Paint Tool Sai'
        },
        {
            'title': 'Tinyrenderer',
            'dates': 'Summer 2017',
            'description':
                'A cpu-based, didactic renderer project from ' +
                '<a href="https://github.com/ssloy/tinyrenderer/wiki" target="_blank">Dmitry V. Sokolov\'s Tiny Renderer</a> ' +
                'project.',
            'src': 'https://github.com/scottnm/Playground/tree/main/gfx/tinyrenderer',
            'image': 'site_images/tiny_renderer.webp',
            'tools': 'C++'
        },
        {
            'title': 'Squid Mantazord',
            'dates': 'Spring 2017',
            'description': 'A top-down 2D gauntlet of sea-creatures to take the throne and become the next Squid ' +
                'Mantazord. Made for Global Game Jam 2017.',
            'video': 'https://www.youtube.com/watch?v=jA9G3lyVIXA&',
            'src': 'https://github.com/scottnm/squid-mantazord',
            'image': 'files/webps/squid-mantazord.webp',
            'tools': 'Unity, C#'
        },
        /*
        {
            'title': 'Vennfridge',
            'dates': 'Spring 2017',
            'description': 'A website for looking up recipes, food items, and ingredients with sorting and filtering ' +
                        ' by various attributes. Relationships are also set up between the different recipes, ' +
                        'food items, and ingredients so that you can more easily find related items while browsing.',
            'src': 'https://github.com/jmsanchez86/idb/',
            'tools': 'Python, Javascript, Html, Google Cloud Platform, TravisCI',
            'video': 'https://www.youtube.com/watch?v=C05VDVHtQHI',
            'doc': 'https://github.com/jmsanchez86/idb/blob/dev/app/static/data/vennfridge-technical-report.md'
        },
        */
        /*
        {
            'title': 'IK2D',
            'dates': 'Winter 2016',
            'description': 'A simple IK solver for a 2D, 3-point arm',
            'src': 'https://github.com/scottnm/IK2D',
            'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/ik2d.webp',
            'video': 'https://www.youtube.com/watch?v=kuFz9OplPNk',
            'tools': 'Unity, C#',
            'video': 'https://www.youtube.com/watch?v=kuFz9OplPNk'
        },
        */
        {
            'title': 'Filibusters',
            'dates': 'Fall 2016',
            'description': 'A multiplayer objective-based, arena-shooter game',
            'src': 'https://github.com/nanomachines/filibusters-game',
            'image': 'files/webps/filibusters.webp',
            'tools': 'Unity, C#, Photon Unity Networking',
            'video': 'https://www.youtube.com/watch?v=MjQtU9LpsCc',
            'liveapp': 'https://nanomachines.itch.io/filibusters'
        },
        {
            'title': 'Monkey Muck',
            'dates': 'Fall 2016',
            'description': 'Designed, modeled, and textured an original 3D character. ' +
                'This character was inspired by horriffic figures from franchises like Silent Hill, ' +
                'the Legend of Zelda, and the Thing.',
            'liveapp': 'https://skfb.ly/UuUG',
            'tools': 'Maya, Photoshop',
            'image': 'files/webps/monkeymuck.webp'
        },
        {
            'title': 'Pixitor',
            'dates': 'Summer 2016',
            'description': 'A layer-based pixel art editor built using MIT\'s Processing',
            'src': 'https://github.com/scottnm/Pixitor',
            'image': 'files/pixitor.png',
            'tools': 'Processing, Java',
            'video': 'https://www.youtube.com/watch?v=mx1m7fG-8IM'
        },
        {
            'title': 'Ogre JRPG',
            'dates': 'Spring 2016',
            'description': 'A turn-based battle system demo using Ogre3D for one of my university courses.',
            'src': 'https://github.com/scottnm/ogre-jrpg',
            'image': 'files/webps/sudden_death.webp',
            'tools': 'C++, Ogre3D, SDL',
            'video': 'https://www.youtube.com/watch?v=PkhYBI-yMf4'
        },
        /*
        {
            'title': '3D Pong-like',
            'dates': 'Spring 2016',
            'description': 'A 3D ball game with physics simulation, audio playback, keyboard/mouse controls, a GUI ' +
                        'system, and both singleplayer and networked multiplayer game modes.',
            'tools': 'C++, Ogre3D, SDL, Bullet',
            'video': 'https://www.youtube.com/watch?v=6lbZnm3dlUU'
        },
        */
        /*
        {
            'title': 'Scene Graph',
            'dates': 'Fall 2015',
            'description': 'A scene graph and model viewer that supports animations',
            'tools': 'C++, OpenGL, GLUI',
            'video': 'https://www.youtube.com/watch?v=4P6eWLGV2sc'
        },
        */
        /*
        {
            'title': 'Torus Shader',
            'dates': 'Fall 2015',
            'description': 'Using glsl shaders, transformed a flat sheet into a torus' +
                        ' and replicated phong shading, texture mapping, bump mapping, ' +
                        'and reflective surfaces.',
            'tools': 'Glsl, C++',
            'video': 'https://www.youtube.com/watch?v=Z1-I8NzdXhw'
        },
        */
        {
            'title': 'Labyrinth',
            'dates': 'Fall 2015',
            'description': 'A game with procedurally generated maps, and a lighting ' +
                'effect where only a certain radius of the map away from the character ' +
                'is lit (a torch effect). Built for the 2015 Fall GameJam at UT Austin.',
            'image': 'files/webps/labyrinth.webp',
            'tools': 'C#, Unity, Gimp',
            'video': 'https://www.youtube.com/watch?v=sFsm_7buEzA'
        },
        {
            'title': 'Menger Sponge',
            'dates': 'Fall 2015',
            'description': 'An OpenGL menger sponge that can be fully rotated and have ' +
                'the level of recursion updated on the fly via popup menus',
            'image': 'files/webps/menger_sponge.webp',
            'tools': 'C++, OpenGL, GLUT',
            'video': 'https://www.youtube.com/watch?v=vYaWWKJ4s1M'
        }
        /*
        {
            'title': 'Quick-Radio',
            'dates': 'Fall 2015',
            'description': 'A webapp generates that' +
                        'radio-like playlist from multiple artist seeds, and launches ' +
                        'the playlist in the spotify webapp',
            'src': 'https://github.com/scottnm/Quick-Radio.git',
            'tools': 'Javascript, Knockoutjs'
            //'liveapp': 'http://scottnm.github.io/Quick-Radio/liveapp/index.html'
        },
        */
        /*
        {
            'title': 'Go-Fish Probability Simulation',
            'dates': 'Spring 2015',
            'description': 'A simulation of GoFish that displays the ' +
                        'probabilities of a player\'s guess being correct ' +
                        'allowing for a player to make more educated guesses',
            'src': 'http://github.com/gordineerandrew/Go-Fish',
            'tools': 'Java'
        },
        */
        /*
        {
            'title': 'TUI Space Raiders',
            'dates': 'Spring 2015',
            'description': 'A simple text-based form of the game Space Invaders, ' +
                        'called Space Raiders. Implemented simple ' +
                        'mechanics such as collisions, win-lose ' +
                        'conditions, and a simple enemy AI.',
            'src': 'https://github.com/scottnm/Space-Raiders.git',
            'tools': 'C++, Ncurses',
            'video': 'https://www.youtube.com/watch?v=gu7laqzLF3Y'
        },
        */
        /*
        {
            'title': 'Binary Tree Builder',
            'dates': 'Fall 2014',
            'description': 'A program that builds a binary tree from a ' +
                        'post-order traversal and outputs the breadth-' +
                        'first traversal of that tree',
            'src': 'https://github.com/scottnm/BinaryTreeBuilder.git',
            'tools': 'Java'
        },
        */
        /*
        {
            'title': 'Neural Network Pong',
            'dates': 'Spring 2014',
            'description': 'Classic game Pong, with a trained neural network opponent',
            'src': 'https://github.com/scottnm/Neuroevolution-Pong.git',
            'tools': 'Python, Pygame',
            'video': 'https://www.youtube.com/watch?v=amNObCushrU'
        },
        */
        /*
        {
            'title': 'Evolving Boss Battles',
            'dates': 'Spring 2014',
            'description': 'A neural network and game environment ' +
                        'to train a simple boss-character to compete ' +
                        'against a player character, and researched the ' +
                        'effects of different training methods and neural ' +
                        'network structures',
            'src': 'https://github.com/scottnm/Evolving-Boss-Battles.git',
            'tools': 'Python, Pygame',
            'video': 'https://www.youtube.com/playlist?list=PL32gaNsQmlxtmjOjnfAN15zOAn-oJbRHV',
            'doc': 'files/evolving-boss-behavior-report.pdf'
        }
        */
        /*
        {
            'title': 'Itchnscratch',
            'dates': 'Winter 2014',
            'description': 'A demo for a topdown twin stick wave shooter in Pygame. I do not remember for the life of me ' +
                ' why I named this project "Itchnscratch. I think I just needed a name and I was watching Simpsons re-runs.',
            'src': 'https://github.com/scottnm/itchnscratch.git',
            'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/tdsg.webp',
            'tools': 'Python, Pygame',
            'video': 'https://www.youtube.com/watch?v=RpATc4tDGIs'
        }
        */
    ],
    "textPostData": [
        {
            'title': 'VTPP v0.2.0',
            'dates': 'December 2023',
            'description': "another VTPP milestone",
            'image': 'site_images/vtpp_update_thumbnail_v020.webp',
            'read': 'pages/bespoke/vtpp/0.2.0/2023_12_13_vtpp_0.2.0.html',
        },
        {
            'title': 'VTPP v0.1.0',
            'dates': 'November 2023',
            'description': "new project: Video-to-Private-Podcast",
            'image': 'site_images/vtpp_update_thumbnail_v010.webp',
            'read': 'pages/bespoke/vtpp/0.1.0/2023_11_04_vtpp_0.1.0.html',
        },
        {
            'title': 'Surprising Monkey Muck Data',
            'dates': 'October 2022',
            'description': "Why are people playing this demo???",
            'image': 'site_images/muckblog.webp',
            'read': 'blog_posts/2022_10_29_surprising_monkey_muck_data.html',
        },
        {
            'title': 'Hair Log',
            'dates': 'June 2022',
            'description': 'I kept track of my hair growing for about a year.',
            'image': 'site_images/hueyfreeman.webp',
            'read': 'pages/bespoke/hair_log/hair_log.html',
        },
        {
            'title': 'Dig Deep Retrospective',
            'dates': 'May 2022',
            'description': 'Reflecting on my experience making Dig Deep during the "Classic Collards" Game Jam',
            'image': 'site_images/digdeep-demo.webp',
            'read': 'pages/bespoke/digdeepretro/digdeepretro.html',
        },
        {
            'title': 'Favorite Albums of 2018',
            'dates': 'Nov 2018',
            'description':
                'A non-exhaustive list of my favorite albums released in 2018.',
            'image': 'site_images/aoty-2018.webp',
            'read': 'pages/bespoke/albumsof2018.html',
        },
    ]
};

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
