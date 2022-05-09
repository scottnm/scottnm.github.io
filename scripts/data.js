var githubPrefix = 'https://github.com/scottnm/';

var welcomeMessage =
    "Sometimes, I'm a software engineer working for Xbox. When I'm not, I like to make things. " +
    "Here you'll find a (lightly pruned) archive of such things. Most of it's code, some of it's not, " +
    "and all of it's useful to no one but myself! Take a look around."

var projectData = [
    {
        'title': 'Dig Deep',
        'dates': 'Spring 2022',
        'description': 'An isometric pico-8 game about digging and family history for the <a href="https://itch.io/jam/culture-bytes-classic-collards-jam">Classic Collards Game Jam</a>.',
        'image': 'https://raw.githubusercontent.com/scottnm/collards.p8/main/promo/quick-demo.gif',
        'src': 'https://github.com/scottnm/collards.p8',
        'liveapp': 'https://scottnm.itch.io/dig-deep',
        'tools': 'pico8, lua'
    },
    {
        'title': 'Avipaper.p8',
        'dates': 'Winter 2021',
        'description': 'A Pico-8 demo. Fly a paper airplane through some targets.',
        'image': 'https://raw.githubusercontent.com/scottnm/avipaper.p8/main/demo.gif',
        'src': 'https://github.com/scottnm/avipaper.p8',
        'tools': 'pico8, lua'
    },
    {
        'title': 'Bman3D',
        'dates': 'Spring 2021',
        'description': 'Modeled, textured, and rigged a 3D model of Bomberman from "Bomberman 64: the Second Attack!"',
        'liveapp': 'https://skfb.ly/osJ6Y',
        'image': 'https://raw.githubusercontent.com/scottnm/b64-sa-model/main/progress_renders/tposing.gif',
        'tools': 'blender'
    },
    {
        'title': 'Scrapewood',
        'dates': 'Spring 2021',
        'description': 'Wrote a web-scraper to grab all of the main Achewood comics from the website. I then merged them into a unified PDF so that I could read them on my e-reader. Source not available because web scrappers always feel like they\'re in dubiously legal territory and I don\'t intend to distribute the resulting PDF or web scraper source.',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/scrapewood_on_reader.jpg',
        'tools': 'rust'
    },
    {
        'title': 'Lost-n-found',
        'dates': 'Winter 2021',
        'description': 'A quick puzzle game for GGJ21 that I never properly named. The theme was "lost and found". ' +
            'The core idea I tried to execute on was a "hot or cold" style guessing game where you use reveal clues which guide you toward finding something.',
        'src': 'https://github.com/scottnm/lost-n-found-game',
        'image': 'https://raw.githubusercontent.com/scottnm/lost-n-found-game/main/demo/05_traps-empty-cells-and-more.gif',
        'tools': 'rust, pancurses/ncurses'
    },
    {
        'title': 'Wasteland Cracker',
        'dates': 'Winter 2021',
        'description': 'A clone of the Fallout hacking mini-game with an included tool for solving real puzzles',
        'src': 'https://github.com/scottnm/wasteland-cracker',
        'image': 'https://raw.githubusercontent.com/scottnm/wasteland-cracker/main/demo/07-improved-word-generation.gif',
        'tools': 'rust, pancurses/ncurses'
    },
    {
        'title': 'Tetrust',
        'dates': 'Winter 2021',
        'description': 'A TUI tetris clone written in rust',
        'src': 'https://github.com/scottnm/tetrust',
        'image': 'https://raw.githubusercontent.com/scottnm/tetrust/master/demo/main-demo.gif',
        'tools': 'rust, pancurses/ncurses'
    },
    {
        'title': 'WSR Image Extractor',
        'dates': 'Fall 2020',
        'description': 'A tool to extract the images captured in a Windows Steps Recorder file',
        'src': 'https://github.com/scottnm/WSR-Image-Extractor',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/wsr.png',
        'tools': 'rust'
    },
    {
        'title': 'NoteVis',
        'dates': 'Summer 2020',
        'description': 'A tool to help visualize notes on a fretboard',
        'image': 'https://raw.githubusercontent.com/scottnm/notevis/master/demo/demo3.PNG',
        'src': 'https://github.com/scottnm/notevis',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/notevis.png',
        'tools': 'rust'
    },
    {
        'title': 'The Treachery of Self-image',
        'dates': 'Spring 2018',
        'description': 'A silly joke that I took too far and spent too much time on. The result? a ' +
            'parody of "the Treachery of Images" by Rene Magritte. ' +
            'In a funny turn of events, I like how it turned out. ',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/the_treachery_of_self_image.png',
        'tools': 'Paint Tool Sai'
    },
    {
        'title': 'Tinyrenderer',
        'dates': 'Summer 2017',
        'description':
            'A cpu-based, didactic renderer project from ' +
            '<a href="https://github.com/ssloy/tinyrenderer/wiki" target="_blank">Dmitry V. Sokolov\'s Tiny Renderer</a> ' +
            'project.',
        'src': 'https://github.com/scottnm/tinyrenderer',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/tiny_renderer.png',
        // 'image': 'https://instagram.fsnc1-1.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/20225592_128806921055908_7636245869951451136_n.jpg',
        'tools': 'C++'
    },
    {
        'title': 'Squid Mantazord',
        'dates': 'Spring 2017',
        'description': 'A top-down 2D gauntlet of sea-creatures to take the throne and become the next Squid ' +
            'Mantazord. Made for Global Game Jam 2017.',
        'video': 'https://www.youtube.com/watch?v=jA9G3lyVIXA&',
        'src': 'https://github.com/scottnm/squid-mantazord',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/squid-mantazord.webp',
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
    {
        'title': 'Filibusters',
        'dates': 'Fall 2016',
        'description': 'A multiplayer objective-based, arena-shooter game',
        'src': 'https://github.com/nanomachines/filibusters-game',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/filibusters.webp',
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
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/monkeymuck.webp'
    },
    {
        'title': 'Pixitor',
        'dates': 'Summer 2016',
        'description': 'A layer-based pixel art editor built using MIT\'s Processing',
        'src': 'https://github.com/scottnm/Pixitor',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/pixitor.png',
        'tools': 'Processing, Java',
        'video': 'https://www.youtube.com/watch?v=mx1m7fG-8IM'
    },
    {
        'title': 'Ogre JRPG',
        'dates': 'Spring 2016',
        'description': 'A turn-based battle system demo using Ogre3D for one of my university courses.',
        'src': 'https://github.com/scottnm/ogre-jrpg',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/sudden_death.webp',
        'tools': 'C++, Ogre3D, SDL',
        'video': 'https://www.youtube.com/watch?v=PkhYBI-yMf4'
    },
    /*
    {
        'title': '3D Pong-like',
        'dates': 'Spring 2016',
        'description': 'A 3D ball game with physics simulation, audio playback, keyboard/mouse controls, a GUI ' +
                       'system, and both singleplayer and networked multiplayer game modes.',
        'src': '',
        'tools': 'C++, Ogre3D, SDL, Bullet',
        'video': 'https://www.youtube.com/watch?v=6lbZnm3dlUU'
    },
    */
    /*
    {
        'title': 'Scene Graph',
        'dates': 'Fall 2015',
        'description': 'A scene graph and model viewer that supports animations',
        'src': '',
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
            'src': '',
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
        'src': '',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/labyrinth.webp',
        'tools': 'C#, Unity, Gimp',
        'video': 'https://www.youtube.com/watch?v=sFsm_7buEzA'
    },
    {
        'title': 'Menger Sponge',
        'dates': 'Fall 2015',
        'description': 'An OpenGL menger sponge that can be fully rotated and have ' +
            'the level of recursion updated on the fly via popup menus',
        'src': '',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/menger_sponge.webp',
        'tools': 'C++, OpenGL, GLUT',
        'video': 'https://www.youtube.com/watch?v=vYaWWKJ4s1M'
    },
    /*
        {
            'title': 'Quick-Radio',
            'dates': 'Fall 2015',
            'description': 'A webapp generates that' +
                           'radio-like playlist from multiple artist seeds, and launches ' +
                           'the playlist in the spotify webapp',
            'src': githubPrefix + 'Quick-Radio.git',
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
            'src': githubPrefix + 'Space-Raiders.git',
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
            'src': githubPrefix + 'BinaryTreeBuilder.git',
            'tools': 'Java'
        },
        */
    /*
        {
            'title': 'Neural Network Pong',
            'dates': 'Spring 2014',
            'description': 'Classic game Pong, with a trained neural network opponent',
            'src': githubPrefix + 'Neuroevolution-Pong.git',
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
            'src': githubPrefix + 'Evolving-Boss-Battles.git',
            'tools': 'Python, Pygame',
            'video': 'https://www.youtube.com/playlist?list=PL32gaNsQmlxtmjOjnfAN15zOAn-oJbRHV',
            'doc': 'files/evolving-boss-behavior-report.pdf'
        }
        */
    {
        'title': 'Itchnscratch',
        'dates': 'Winter 2014',
        'description': 'A demo for a topdown twin stick wave shooter in Pygame. I do not remember for the life of me ' +
            ' why I named this project "Itchnscratch. I think I just needed a name and I was watching Simpsons re-runs.',
        'src': githubPrefix + 'itchnscratch.git',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/webps/tdsg.webp',
        'tools': 'Python, Pygame',
        'video': 'https://www.youtube.com/watch?v=RpATc4tDGIs'
    }
];

var textPostData = [
    {
        'title': 'Dig Deep Retrospective',
        'dates': 'May 2022',
        'description': 'Reflecting on my experience making Dig Deep during the "Classic Collards" Game Jam',
        'image': 'https://raw.githubusercontent.com/scottnm/collards.p8/main/promo/quick-demo.gif',
        'read': 'pages/text/digdeepretro/digdeepretro.html',
    },
    {
        'title': 'Favorite Albums of 2018',
        'dates': 'Nov 2018',
        'description':
            'A non-exhaustive list of my favorite albums released in 2018.',
        'image': 'https://raw.githubusercontent.com/scottnm/scottnm.github.io/master/files/aoty-2018.jpg',
        'read': 'pages/text/albumsof2018.html',
    },
];

export { projectData, textPostData, welcomeMessage };