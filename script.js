windowHeight = innerHeight;
vh = windowHeight / 100;
console.log(vh);

window.onscroll = function ()
{
    scroll = document.body.scrollTop || document.documentElement.scrollTop;

    mainTitle = document.getElementById("main-title");
    mainSubtitle = document.getElementById("main-subtitle");

    if (scroll > 15 * vh && scroll < 45*vh)
    {
        rotation = (scroll - 15 * vh) / vh * 3;
        console.log(rotation)
        mainTitle.style = "perspective: 100px; transform: rotateX(" + rotation + "deg)";
        mainSubtitle.style = "perspective: 100px; transform: rotateX(" + rotation + "deg)";
    }
}