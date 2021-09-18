var posers = {
    "b5481b4b-b8b3-4430-a69b-f1948730f079": "Scott Munro",
    "697edd0a-1469-4536-a33a-682223ebcd88": "Derrick Gil"
};

function format_doom_poser_text(poser)
{
    return `<span>${poser} is...</span><br/><h1>A DOOM POSER!</h1>`;
}

function generate_doom_poser_text(poser_id)
{
    var poser_text = null;
    if (poser_id === null)
    {
        poser_text = "<h1>Welcome Doom Posers!</h1>";
    }
    else
    {
        poser_text = poser_id in posers ?
            format_doom_poser_text(posers[poser_id]) :
            `<h2>Invalid ID supplied: <span class="error">${poser_id}</span></h2>`;
    }

    document.getElementById("entry-subpane").innerHTML = poser_text;
}

window.onload =
    function()
    {
        var urlParams = new URLSearchParams(window.location.search);
        var poser_id = urlParams.get('pid');
        generate_doom_poser_text(poser_id);
    };
