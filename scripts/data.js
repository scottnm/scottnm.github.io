(function () {'use strict'; }());

var githubPrefix = 'https://github.com/scottnm/';

var welcomeMessage = "I am a software engineer who loves video game development, punk music, and poorly quoting old " + 
                     "episodes of the Simpsons. Most of the projects' source listed on this site can be found on my " +
                     "Github. This page is more or less just a dumping ground of things I've created.";

var technicalProjectData = [
        {
            'title': 'IK2D',
            'dates': 'Winter 2016',
            'description': 'A simple IK solver for a 2D, 3-point arm',
            'src': 'https://github.com/scottnm/IK2D',
            'video': 'https://www.youtube.com/watch?v=kuFz9OplPNk',
            'tools': 'Unity, C#',
            'video': 'https://www.youtube.com/watch?v=kuFz9OplPNk'
        },
        {
            'title': 'Filibusters',
            'dates': 'Fall 2016',
            'description': 'A 2D, side-scrolling, arena, shooter, collect-athon game featuring a light-hearted political theme',
            'src': 'https://github.com/nanomachines/filibusters-game',
            'tools': 'Unity, C#, Photon Unity Networking',
            'video': 'https://www.youtube.com/watch?v=MjQtU9LpsCc',
            'liveapp': 'https://nanomachines.itch.io/filibusters'
        },
        {
            'title': 'Pixitor',
            'dates': 'Summer 2016',
            'description': 'A layer-based pixel art editor built using MIT\'s Processing'
            'src': 'https://github.com/scottnm/Pixitor',
            'tools': 'Processing, Java',
            'video': 'https://www.youtube.com/watch?v=mx1m7fG-8IM'
        },
        {
            'title': 'Ogre JRPG',
            'dates': 'Spring 2016',
            'description': 'A JRPG battle system demo using Ogre3D',
            'src': 'https://github.com/scottnm/ogre-jrpg',
            'tools': 'C++, Ogre3D, SDL',
            'video': 'https://www.youtube.com/watch?v=PkhYBI-yMf4'
        },
        {
            'title': '3D Pong-like',
            'dates': 'Spring 2016',
            'description': 'A 3D ball game with physics simulation, audio playback, keyboard/mouse controls, a GUI ' +
                           'system, and both singleplayer and networked multiplayer game modes.',
            'src': '',
            'tools': 'C++, Ogre3D, SDL, Bullet',
            'video': 'https://www.youtube.com/watch?v=6lbZnm3dlUU'
        },
        {
            'title': 'Scene Graph',
            'dates': 'Fall 2015',
            'description': 'A scene graph and model viewer that supports animations',
            'src': '',
            'tools': 'C++, OpenGL, GLUI',
            'video': 'https://www.youtube.com/watch?v=4P6eWLGV2sc'
        },
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
        {
            'title': 'Menger Sponge',
            'dates': 'Fall 2015',
            'description': 'An OpenGL menger sponge that can be fully rotated and have ' +
                           'the level of recursion updated on the fly via popup menus',
            'src': '',
            'tools': 'C++, OpenGL, GLUT',
            'video': 'https://www.youtube.com/watch?v=vYaWWKJ4s1M'
        },
        {
            'title': 'Quick-Radio',
            'dates': 'Fall 2015',
            'description': 'A webapp generates that' +
                           'radio-like playlist from multiple artist seeds, and launches ' +
                           'the playlist in the spotify webapp',
            'src': githubPrefix + 'Quick-Radio.git',
            'tools': 'Javascript, Knockoutjs',
            'liveapp': 'http://scottnm.github.io/Quick-Radio/liveapp/index.html'
        },
        {
            'title': 'Go-Fish Probability Simulation',
            'dates': 'Spring 2015',
            'description': 'A simulation of GoFish that displays the ' +
                           'probabilities of a player\'s guess being correct ' +
                           'allowing for a player to make more educated guesses',
            'src': 'http://github.com/gordineerandrew/Go-Fish',
            'tools': 'Java'
        },
        {
            'title': 'Space Raiders (Game)',
            'dates': 'Spring 2015',
            'description': 'A simple text-based form of the game Space Invaders, ' +
                           'called Space Raiders. Implemented simple ' +
                           'mechanics such as collisions, win-lose ' +
                           'conditions, and a simple enemy AI.',
            'src': githubPrefix + 'Space-Raiders.git',
            'tools': 'C++, Ncurses',
            'video': 'https://www.youtube.com/watch?v=gu7laqzLF3Y'
        },
        {
            'title': 'Binary Tree Builder',
            'dates': 'Fall 2014',
            'description': 'A program that builds a binary tree from a ' +
                           'post-order traversal and outputs the breadth-' +
                           'first traversal of that tree',
            'src': githubPrefix + 'BinaryTreeBuilder.git',
            'tools': 'Java'
        },
        {
            'title': 'Neural Network Pong',
            'dates': 'Spring 2014',
            'description': 'Classic game Pong, with a trained neural network opponent',
            'src': githubPrefix + 'Neuroevolution-Pong.git',
            'tools': 'Python, Pygame',
            'video': 'https://www.youtube.com/watch?v=amNObCushrU'
        },
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
    ];

var creativeProjectData = [
        {
            'title': 'Squid Mantazord',
            'dates': 'Spring 2017',
            'description': 'A top-down 2D gauntlet of sea-creatures to take the throne and become the next Squid ' + 
                           'Mantazord. Made for Global Game Jam 2017.',
            'video': 'https://www.youtube.com/watch?v=jA9G3lyVIXA&',
            'src': 'https://github.com/scottnm/squid-mantazord',
            'tools': 'Unity, C#'
        },
        {
            'title': 'Monkey Muck',
            'dates': 'Fall 2016',
            'description': 'Designed, modeled, and textured an original 3D character. ' +
                           'This character was inspired by horriffic figures from franchises like Silent Hill, ' +
                           'the Legend of Zelda, and the Thing.',
            'liveapp': 'https://skfb.ly/UuUG',
            'tools': 'Maya, Photoshop',
        },
        {
            'title': 'Labyrinth',
            'dates': 'Fall 2015',
            'description': 'A game with procedurally ' +
                           'generated maps, and a lighting effect where only a certain ' +
                           'radius of the map away from the character is lit (a torch effect). ' +
                           'Built for the 2015 Fall GameJam',
            'src': '',
            'tools': 'C#, Unity, Gimp',
            'video': 'https://www.youtube.com/watch?v=sFsm_7buEzA'
        },
        {
            'title': 'Top Down Shooter (Game)',
            'dates': 'Winter 2014',
            'description': 'The framework/basic mechanics for a ' +
                           'topdown zombie shooter game. Currently only in ' +
                           'the prototyping phase, but mechanics such as ' +
                           'walking, turning, shooting, reloading, ' +
                           'collision, and enemy generation have already ' +
                           'been implemented',
            'src': githubPrefix + 'itchnscratch.git',
            'tools': 'Python, Pygame',
            'video': 'https://www.youtube.com/watch?v=RpATc4tDGIs'
        }
    ];
