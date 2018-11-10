'use strict';

var logHeaderText = "Here's a (non-exhaustive) list of albums from Nov 2017 to Nov 2018 that I grew really attached to. While not every album on this list is a 10/10, I think they each have something really interesting that kept me coming back for repeat listens.";

/*
SCOTT N.
Joji - ^ slow dancing in the dark
C418 - Excursions
Paranoid Void - literary math
Sloth & turtle +1 + 1
Our Place - Ben Levin Groupp
ILWAG - gay story maybe
Dance Gavin dance - artificial selection
Mouse on the keys - tres
Royal coda - royal coda
(10th anniversary) somewhere at the bottom of the river between vega and altair - ladispute

 */
var musicData2018 = [
        {
            'album': 'Green (single)',
            'artist': 'Touche Amore',
            'date': '19 Aug 2018',
            'link': 'https://open.spotify.com/track/5FR0YMb1HFGI2gHHPiW9qk?si=2o7ERLbPSo28nUX_Aw4UzQ',
            'description': 'test description',
            'image': 'toucheamore.jpg'
        },
        {
            'album': 'Cannonball!',
            'artist': 'Sen Morimoto',
            'date': '18 May 2018',
            'link': 'https://open.spotify.com/album/0Gy6pQqmY6QATlaYxqflek?si=G-3v98EQSqOFBxmxKUzlqA',
            'description': 'test description 2',
            'image': 'senmorimoto.jpg'
        },
        {
            'album': 'Ghost City',
            'artist': 'Delta Sleep',
            'date': '10 Aug 2018',
            'link': 'https://open.spotify.com/album/63PgGSb6ZkwPVfMZVOhObO?si=d8YJPFT0TpSqH-E5Pu8rGw',
            'description': 'test description 2',
            'image': 'deltasleep.jpg'
        },
        {
            'album': 'Raytracing',
            'artist': 'Monobody',
            'date': '01 Nov 2018',
            'link': 'https://open.spotify.com/album/291cUbF4RbZOUqViqmJ9K6?si=gFT7zDuVTyujMUyhfre-4g',
            'description': 'test description 2',
            'image': 'monobody.jpg'
        },
    ];

function stringDateStringLex(stringDate)
{
    var stringDateSplit = stringDate.split(" ");
    var month = stringDateSplit[1].toLowerCase();
    var lexed = stringDateSplit[0];
    if (month === "jan")
    {
        lexed = "1" + lexed;
    }
    else if (month === "feb")
    {
        lexed = "2" + lexed;
    }
    else if (month === "mar")
    {
        lexed = "3" + lexed;
    }
    else if (month === "apr")
    {
        lexed = "4" + lexed;
    }
    else if (month === "may")
    {
        lexed = "5" + lexed;
    }
    else if (month === "jun")
    {
        lexed = "6" + lexed;
    }
    else if (month === "jul")
    {
        lexed = "7" + lexed;
    }
    else if (month === "aug")
    {
        lexed = "8" + lexed;
    }
    else if (month === "sep")
    {
        lexed = "9" + lexed;
    }
    else if (month === "oct")
    {
        lexed = "10" + lexed;
    }
    else if (month === "nov")
    {
        lexed = "11" + lexed;
    }
    else if (month === "dec")
    {
        lexed = "12" + lexed;
    }
    return lexed;
};

function format_entry(entry)
{
    var entry_element = "";

    entry_element += "<div class=\"entry entry_info_frame\">";
    entry_element += "<div class=\"entry_title\">";
    entry_element += `<h3>${entry.album}</h3>`;
    entry_element += "</div>";
    entry_element += "<div class=\"entry_title\">";
    entry_element += `<h4>${entry.artist}</h4>`;
    entry_element += "</div>";
    entry_element += `<div class="entry_date">${entry.date}</div>`;
    entry_element += `<div class="entry_description">${entry.description}</div>`;
    entry_element += "<div class=\"entry_link\">";
    entry_element += (entry.link ? `<a class="social-btn" href=${entry.link} target="_blank">listen on spotify</a>` : "");
    entry_element += "</div>";
    entry_element += "</div>";

    return `<section class="center-cropped" style="background-image: url('../site_images/${entry.image}');">` +
           `<div class="entry entry_info_frame_border section-with-small-buffer">${entry_element}</div>` +
           "</section>";
}

function generate_entries()
{
    var entry_subpane_elements_string = "";
    musicData2018.sort(function(a, b)
    {
        var lexedA = stringDateStringLex(a.date);
        var lexedB = stringDateStringLex(b.date);
        return lexedA.localeCompare(lexedB);
    });

    for (var i = 0; i < musicData2018.length; i++)
    {
        var entry = musicData2018[i];
        entry_subpane_elements_string += format_entry(entry);
    }

    document.getElementById("entry-subpane").innerHTML = entry_subpane_elements_string;
}

window.onload =
    function()
    {
        document.getElementById("log-header-text").innerText = logHeaderText;
        generate_entries();
    };
