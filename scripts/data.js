(function () {'use strict'; }());

var githubPrefix = 'https://github.com/scottnm/';

var currentWorkData = [
        {
            'title': 'Filibusters',
            'description': 'A 2D, side-scrolling, arena, shooter, collect-athon game featuring light-hearted political satire and tons of fun',
            'src': 'https://github.com/nanomachines/filibusters-game'
        },
        {
            'title': 'IK2D',
            'description': 'A simple IK solver for a 2D, 3-point arm',
            'src': 'https://github.com/scottnm/IK2D'
        }
    ];

var tech_projectData = [
        {
            'title': 'Pixitor',
            'dates': 'Summer 2016',
            'description': 'Using the Processing graphics library, building a pixel art editor',
            'src': 'https://github.com/scottnm/Pixitor',
            'tools': 'Processing, Java',
            'videodemo': 'https://youtu.be/mx1m7fG-8IM'
        },
        {
            'title': 'Ogre JRPG',
            'dates': 'Spring 2016',
            'description': 'Using Ogre3D, developed a JRPG battle system',
            'src': 'https://github.com/scottnm/ogre-jrpg',
            'tools': 'C++, Ogre3D, SDL',
            'videodemo': 'https://www.youtube.com/watch?v=PkhYBI-yMf4'
        },
        {
            'title': '3D Pong-like',
            'dates': 'Spring 2016',
            'description': 'Using Ogre3D, SDL, and Bullet, built a 3D ball game with physics simulation, audio playback, keyboard/mouse controls, a GUI system, and both singleplayer and networked multiplayer game modes.',
            'src': '',
            'tools': 'C++, Ogre3D, SDL, Bullet',
            'videodemo': 'https://www.youtube.com/watch?v=6lbZnm3dlUU'
        },
        {
            'title': 'Scene Graph',
            'dates': 'Fall 2015',
            'description': 'Using OpenGL and GLUT, built a scene graph & model viewer with animations',
            'src': '',
            'tools': 'C++, OpenGL, GLUI',
            'videodemo': 'https://www.youtube.com/watch?v=4P6eWLGV2sc'
        },
        {
            'title': 'Torus Shader',
            'dates': 'Fall 2015',
            'description': 'Using glsl shaders, transformed a flat sheet into a torus' +
                           ' and replicated phong shading, texture mapping, bump mapping, ' +
                           'and reflective surfaces.',
            'src': '',
            'tools': 'Glsl, C++',
            'videodemo': 'https://www.youtube.com/watch?v=Z1-I8NzdXhw'
        },
        {
            'title': 'Menger Sponge',
            'dates': 'Fall 2015',
            'description': 'Built a menger sponge in openGl that can be fully rotated and have ' +
                           'the level of recursion updated on the fly via popup menus',
            'src': '',
            'tools': 'C++, OpenGL, GLUT',
            'videodemo': 'https://www.youtube.com/watch?v=vYaWWKJ4s1M'
        },
        {
            'title': 'Quick-Radio',
            'dates': 'Fall 2015',
            'description': 'Using the Spotify and Echonest API, this webapp generates ' +
                           'radio-like playlist from multiple artist seeds, and launches ' +
                           'the playlist in the spotify webapp',
            'src': githubPrefix + 'Quick-Radio.git',
            'tools': 'Javascript, Knockoutjs',
            'liveapp': 'http://scottnm.github.io/Quick-Radio/liveapp/index.html'
        },
        {
            'title': 'Go-Fish Probability Simulation',
            'dates': 'Spring 2015',
            'description': 'Created a simulation of GoFish that displays the ' +
                           'probabilities of a player\'s guess being correct ' +
                           'allowing for a player to make more educated guesses',
            'src': 'http://github.com/gordineerandrew/Go-Fish',
            'tools': 'Java'
        },
        {
            'title': 'Space Raiders (Game)',
            'dates': 'Spring 2015',
            'description': 'Developed a simple ' +
                           'text-based form of the game Space Invaders, ' +
                           'called Space Raiders. Implemented simple ' +
                           'mechanics such as collisions, win-lose ' +
                           'conditions, and a simple enemy AI.',
            'src': githubPrefix + 'Space-Raiders.git',
            'tools': 'C++, Ncurses',
            'videodemo': 'https://www.youtube.com/watch?v=gu7laqzLF3Y'
        },
        {
            'title': 'Binary Tree Builder',
            'dates': 'Fall 2014',
            'description': 'Built a program that builds a binary tree from a ' +
                           'post-order traversal and outputs the breadth-' +
                           'first traversal of that tree',
            'src': githubPrefix + 'BinaryTreeBuilder.git',
            'tools': 'Java'
        },
        {
            'title': 'Neural Network Pong',
            'dates': 'Spring 2014',
            'description': 'Built classic game Pong, with a trained neural ' +
                           'network opponent',
            'src': githubPrefix + 'Neuroevolution-Pong.git',
            'tools': 'Python, Pygame',
            'videodemo': 'https://www.youtube.com/watch?v=amNObCushrU'
        },
        {
            'title': 'Evolving Boss Battles',
            'dates': 'Spring 2014',
            'description': 'Developed a neural network and game environment ' +
                           'to train a simple boss-character to compete ' +
                           'against a player character, and researched the ' +
                           'effects of different training methods and neural ' +
                           'network structures',
            'src': githubPrefix + 'Evolving-Boss-Battles.git',
            'tools': 'Python, Pygame',
            'videodemo': 'https://www.youtube.com/playlist?list=PL32gaNsQmlxtmjOjnfAN15zOAn-oJbRHV',
            'doc': 'files/evolving-boss-behavior-report.pdf'
        }
    ];

var creative_projectData = [
        {
            'title': 'Monkey Muck',
            'dates': 'Fall 2016',
            'description': 'Designed, modeled, and textured an original 3D character. ' +
                           'This character was inspired by horriffic figures from franchises like Silent Hill, ' +
                           'the Legend of Zelda, and the Thing.',
            'src': 'https://skfb.ly/UuUG',
            'tools': 'Maya, Photoshop',
        },
        {
            'title': 'Labyrinth',
            'dates': 'Fall 2015',
            'description': 'During a 24 hour gamejam, built a game with procedurally ' +
                           'generated maps, and a lighting effect where only a certain ' +
                           'radius of the map away from the character is lit (a torch effect)',
            'src': '',
            'tools': 'C#, Unity, Gimp',
            'videodemo': 'https://www.youtube.com/watch?v=sFsm_7buEzA'
        },
        {
            'title': 'Top Down Shooter (Game)',
            'dates': 'Winter 2014',
            'description': 'Developing the framework/basic mechanics for a ' +
                           'topdown zombie shooter game. Currently only in ' +
                           'the prototyping phase, but mechanics such as ' +
                           'walking, turning, shooting, reloading, ' +
                           'collision, and enemy generation have already ' +
                           'been implemented',
            'src': githubPrefix + 'itchnscratch.git',
            'tools': 'Python, Pygame',
            'videodemo': 'https://www.youtube.com/watch?v=RpATc4tDGIs'
        }
    ];
