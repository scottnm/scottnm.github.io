var posers = {
    "b5481b4b-b8b3-4430-a69b-f1948730f079": "Scott Munro",
    "697edd0a-1469-4536-a33a-682223ebcd88": "Derrick Gil"
};

var border_anims = [
    "bootyshake.webp",
    "caco.webp",
    "goatspin.webp",
    "yeyeye.webp"
]

function generate_doom_poser_text(poser_id)
{
    var poser_text = null;

    if (poser_id === null) {
        poser_text = "<h1>Welcome Doom Posers!</h1>";
    } 
    else if (poser_id in posers) {
        let poser_name = posers[poser_id];
        let poser_name_length = poser_name.length;
        let split_pos = poser_name_length % 2 == 0 ? (poser_name_length/2) : poser_name_length/2+1;
        let poser_name_left = poser_name.substring(0,split_pos);
        let poser_name_right = poser_name.substring(split_pos);
        poser_text = 
            `<div><span class="doom-font-left fire-text">${poser_name_left}</span><span class="doom-font-right fire-text">${poser_name_right}</span></div>` +
            "<div class=\"whisper-position\"><span class=\"whisper-font\">... is a doom poser</span></div>";
    }
    else {
        poser_text = `<span>Invalid ID supplied: <span class="error">${poser_id}</span></span>`;
    }

    document.getElementById("doomposer-text").innerHTML = poser_text;
}

window.onload =
    function()
    {
        //../bespoke/doomposer/doomwebps/caco.webp
        let border_anim = border_anims[Math.floor(Math.random() * border_anims.length)];
        let border_imgs = document.getElementsByClassName("doomposer-border-img");
        for (let border_img of border_imgs) {
            border_img.setAttribute("src", `../bespoke/doomposer/doomwebps/${border_anim}`)
        }
        var urlParams = new URLSearchParams(window.location.search);
        var poser_id = urlParams.get('pid');
        generate_doom_poser_text(poser_id);
    };
