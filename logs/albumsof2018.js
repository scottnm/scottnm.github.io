'use strict';

var logHeaderText = "Here's a (non-exhaustive) list of albums from Nov 2017 to Nov 2018 that I grew really attached to. While not every album on this list is a 10/10, I think they each have something really interesting that kept me coming back for repeat listens.";

/*
Runners up

C418 - Excursions
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
            'description': 'Is it cheating to put a single here? Oh well. I cannot get enough of this track. It kicks off sounding like an emo "Monster Mash" remix and before you know it the guitars swell to this beautiful ringing chorus. Bolm\'s vocal delivery is fairly tempered throughout most of the song and to good effect as it juxtaposes really well against the aggressive closing lines of the chorus.',
            'image': 'toucheamore.jpg',
        },
        {
            'album': 'Cannonball!',
            'artist': 'Sen Morimoto',
            'date': '18 May 2018',
            'link': 'https://open.spotify.com/album/0Gy6pQqmY6QATlaYxqflek?si=G-3v98EQSqOFBxmxKUzlqA',
            'description': 'Cannonball!\`s biggest strength is by far its wild jazz instrumentation. Morimoto\'s background is as a saxaphonist and he makes great use of his horn to set dreamy atmospheres (see: Sections) and toot out cacophonous brass tones (see: Picture of a Painting). You\'ll also find lots of fun drum bits, bright piano, and strange synth tones such as the bloopy foundation of the title track, "Cannonball!." Vocally, Morimoto has a soft, monotonous vibe that meshes well with his vocal delivery and occassionally touches on something that sounds mildly annoyed (see: This is Not). I had the pleasure of seeing Sen Morimoto perform live this year and it was a blast. The drumming was insane, the saxaphone was powerful, and the tone was inviting.',
            'image': 'senmorimoto.jpg',
            'favtrack': 'Sections, This Is Not, People Watching',
        },
        {
            'album': 'Ghost City',
            'artist': 'Delta Sleep',
            'date': '10 Aug 2018',
            'link': 'https://open.spotify.com/album/63PgGSb6ZkwPVfMZVOhObO?si=d8YJPFT0TpSqH-E5Pu8rGw',
            'description': '',
            'image': 'deltasleep.jpg',
        },
        {
            'album': 'Raytracing',
            'artist': 'Monobody',
            'date': '01 Nov 2018',
            'link': 'https://open.spotify.com/album/291cUbF4RbZOUqViqmJ9K6?si=gFT7zDuVTyujMUyhfre-4g',
            'description': 'test description 2',
            'image': 'monobody.jpg',
        },
        {
            'album': 'Literary Math',
            'artist': 'Paranoid Void',
            'date': '01 Nov 2017',
            'link': 'https://open.spotify.com/album/7cHvJpTVGuum5Y69ZbKUmg?si=fbJ2U3SDRA62rT7iG4xHVQ',
            'description': 'test description 2',
            'image': 'paranoidvoid.jpg',
        },
        {
            'album': 'Sloth & Turtle',
            'artist': 'Sloth & Turtle',
            'date': '03 Apr 2018',
            'link': 'https://open.spotify.com/album/5rzJOlcNZdjp2JTgvGfdze?si=OTs2pygIQUCloFmh-9nSqg',
            'description': 'test description 2',
            'image': 'slothandturtle.jpg',
        },
        {
            'album': 'Our Place',
            'artist': 'Ben Levin Group',
            'date': '18 May 2018',
            'link': 'https://open.spotify.com/album/5rzJOlcNZdjp2JTgvGfdze?si=OTs2pygIQUCloFmh-9nSqg',
            'description': 'test description 2',
            'image': 'benlevingroup.jpg',
        },
        {
            'album': 'Gay Story',
            'artist': 'In Love With A Ghost',
            'date': '01 Apr 2018',
            'link': 'https://open.spotify.com/album/6wNgoamY7ZcZA1mEVXAuZV?si=FWU0uNxJS_aDi_9mtovI0g',
            'description': 'test description 2',
            'image': 'inlovewithaghost.jpg',
        },
        {
            'album': 'Clear Tamei/Steel Mogu',
            'artist': 'Iglooghost',
            'date': '08 Aug 2018',
            'link': 'https://open.spotify.com/artist/7LCDnUQYE07fnKbo46SVLB?si=WEwGXqWdRBicTkRmMc_flw',
            'description': 'test description 2',
            'image': 'iglooghost.jpg',
        },
        {
            'album': 'Ballads 1',
            'artist': 'Joji',
            'date': '26 Oct 2018',
            'link': 'https://open.spotify.com/album/34GQP3dILpyCN018y2k61L?si=7jbV9ivQQU6nJXobLLYR4w',
            'description': 'test description 2',
            'image': 'joji.jpg',
        },
    ];

function stringDateStringLex(stringDate)
{
    var stringDateSplit = stringDate.split(" ");

    var month = stringDateSplit[1].toLowerCase();
    var numericMonth = ""
    if      (month === "jan") numericMonth = "01";
    else if (month === "feb") numericMonth = "02";
    else if (month === "mar") numericMonth = "03";
    else if (month === "apr") numericMonth = "04";
    else if (month === "may") numericMonth = "05";
    else if (month === "jun") numericMonth = "06";
    else if (month === "jul") numericMonth = "07";
    else if (month === "aug") numericMonth = "08";
    else if (month === "sep") numericMonth = "09";
    else if (month === "oct") numericMonth = "10";
    else if (month === "nov") numericMonth = "11";
    else if (month === "dec") numericMonth = "12";

    var year = stringDateSplit[2].toLowerCase();
    var day = stringDateSplit[0].toLowerCase();
    return year + numericMonth + day;
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
    if (entry.favtrack)
    {
        entry_element += `<div class="entry_favtrack">favorite track(s): ${entry.favtrack}</div>`;
    }
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
