windowHeight = innerHeight;
vh = windowHeight / 100;

mainTitle = document.getElementById("main-title");
works = document.getElementById("works");
root = document.querySelector(":root");

window.onscroll = function () {
    scroll = document.body.scrollTop || document.documentElement.scrollTop;
    random = Math.floor(Math.random() * 100); // 0 - 99

    // mainTitle animation
    if (scroll < 15 * vh) {
        mainTitle.style = "";
    } else if (scroll > 15 * vh && scroll < 45 * vh) {
        // (scroll - 15 * vh) / vh    --->    0 - 30 vh

        // !use sin() and cos()!

        rotation = (scroll - 15 * vh) / vh * 3;
        translate = ((scroll - 15 * vh) / vh) / (30 / (mainTitle.offsetHeight / 2));
        scale = 1 - ((scroll - 15 * vh) / vh / 70);
        mainTitle.style = "transform: perspective(800px) rotateX(" + rotation + "deg) translateY(" + translate + "px) scale(" + scale + ")";
    } else {
        mainTitle.style = "transform: rotateX(90deg) translateY(" + mainTitle.offsetHeight / 2 + "px) scale(0.7)";
    }
    /*
    // works animation
    if (works.offsetTop - scroll > 30 * vh) {
        root.style.setProperty("--background", "rgb(255, 255, 255)")
        root.style.setProperty("--highlight", "rgb(0, 0, 0)")
    } else if (works.offsetTop - scroll > 10 * vh) {
        // scroll related
        s = 20 - ((works.offsetTop - scroll) / vh - 10);
        col1 = 255 - s * 12.5;
        col2 = 255 - s * 11.9;
        col3 = 255 - s * 12.75;
        col4 = s * 8.3;
        col5 = s * 11;
        col6 = s * 0.95;
        root.style.setProperty("--background", "rgb(" + col1 + ", " + col2 + ", " + col3 + ")");
        root.style.setProperty("--highlight", "rgb(" + col4 + ", " + col5 + ", " + col6 + ")");
    } else {
        root.style.setProperty("--background", "rgb(6, 18, 1)");
        root.style.setProperty("--highlight", "rgb(99, 236, 35)");
    }*/
}