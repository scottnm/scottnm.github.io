'use strict';

var logHeaderText = "Here's a (non-exhaustive) list of albums from Nov 2017 to Nov 2018 that I grew really attached to. While not every album on this list is a 10/10, I think they each have something really interesting that kept me coming back for repeat listens. This year my list was heavily inspired by Spotify recommendations as that's been my primary means of discovering new music since I stopped browsing \"core\" subreddits regularly. I found a lot of great stuff, but I think it led to a polarized year of music. In 2019, I'd like to find another avenue to discover music to balance it out a bit.";

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
            'description': 'Delta Sleep\'s "Ghost City" is an album that knows where to draw the line between being "Mathy" and being palatable. Rhythmically, the album adopts a lot of the jerky,rapid-start-stop patterns that I love without sacrificing memorable hooks or catchy motifs in their melodies. There are a lot of familiar math-rock-y timbres and tones on this album: bright guitars, indie-rock vocals, and sharp drums. Narratively the album touches upon themes of "nature vs machine" that I find a bit goofy and cliche, but the themes are sonically well-supported and delivered. I don\'t think this is an album that will convince anyone to like math rock if they don\'t already, but it might convince them it\'s not a hopeless contest to write the least presentable music in the holy name of "odd time signatures."',
            'image': 'deltasleep.jpg',
            'favtrack': 'El Pastor, Dotwork, Single File',
        },
        {
            'album': 'Raytracing',
            'artist': 'Monobody',
            'date': '01 Nov 2018',
            'link': 'https://open.spotify.com/album/291cUbF4RbZOUqViqmJ9K6?si=gFT7zDuVTyujMUyhfre-4g',
            'description': 'I don\'t have too much to say about this album. I really like it, but a lot of it feels foreign to me. It\'s a blend of jazz, progrock, mathrock, and ambient electronic music (ala C418) that either has me bobbing my head or scratching it. It\'s a very indulgent record with long track-times and wandering arrangements that can make you feel lost if you don\'t know what to expect. But this indulgence affords them the opportunity to write an album that always has something new to discover. I first found this band through their stellar Audiotree Live performance awhile ago and was pleasantly surprised to find their drummer was Nnamdi Ogbannaya who took a spot in my "favorite albums of 2017" last year with his release "Drool."',
            'image': 'monobody.jpg',
            'favtrack': 'Ilha Verde, Former Islands'
        },
        {
            'album': 'Literary Math',
            'artist': 'Paranoid Void',
            'date': '01 Nov 2017',
            'link': 'https://open.spotify.com/album/7cHvJpTVGuum5Y69ZbKUmg?si=fbJ2U3SDRA62rT7iG4xHVQ',
            'description': 'Paranoid Void is a japanese rock outfit and their debut(?) album "Literary Math" sees the band toying around in a pretty progressive/experimental place. The guitars flip between enormous ethereal, yet distorted echo tones and a twangy jam-band sound. The bass is incredibly present in the mix and is often found riffing right alongside the guitars. I\'m no drummer so I have difficulty describing the drums (maybe bombastic?), but they feel like a lot of fun. I\'ve come back to this album A LOT this year and it\'s the reason I made an exception to allow for albums from the end of 2017 to make this list. Sadly, I don\'t speak japanese so a lot of the vocal themes are lost on me. But despite the language barrier, I still love this album.',
            'image': 'paranoidvoid.jpg',
            'favtrack': 'Track 1, Track 3, Track 8'
        },
        {
            'album': 'Sloth & Turtle',
            'artist': 'Sloth & Turtle',
            'date': '03 Apr 2018',
            'link': 'https://open.spotify.com/album/5rzJOlcNZdjp2JTgvGfdze?si=OTs2pygIQUCloFmh-9nSqg',
            'description': 'Sloth & Turtle\'s eponymous 2018 record scratched is probably my favorite album in the "instrumental" space that I stumbled across this year. Lots of tippy-tapping, noodly riffs paired with wild effect-chains and acoustic guitars. The closing track is one of my favorites and takes on more of a post-rock slant with a super beachy reverb and marching-band-esque drums.',
            'image': 'slothandturtle.jpg',
            'favtrack': 'The Toys Are Back In Town, Toys, A Song For Ants'
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
