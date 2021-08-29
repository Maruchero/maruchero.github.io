windowHeight = innerHeight;
vh = windowHeight / 100;

window.onscroll = () => {
    scroll = document.body.scrollTop || document.documentElement.scrollTop;

    mainTitle = document.getElementById("main-title");

    if (scroll < 15 * vh) {
        mainTitle.style = "";
    } else if (scroll > 15 * vh && scroll < 45 * vh) {
        // (scroll - 15 * vh) / vh    --->    0 - 30 vh

        // !use sin() and cos()!

        rotation = (scroll - 15 * vh) / vh * 3;
        translate = ((scroll - 15 * vh) / vh) / (30 / (mainTitle.offsetHeight / 2));
        scale = 1 - ((scroll - 15 * vh) / vh / 70)
        mainTitle.style = "transform: perspective(800px) rotateX(" + rotation + "deg) translateY(" + translate + "px) scale(" + scale + ")";
    } else {
        mainTitle.style = "transform: rotateX(90deg) translateY(" + mainTitle.offsetHeight / 2 + "px) scale(0.7)";
    }
}



// Codepen
let url = ["https://codepen.io/Under3nder/pen/jOwPJKN", "https://codepen.io/Under3nder/pen/ExXjrjr", "https://codepen.io/Under3nder/pen/YzQXmOo"];
let img = ["img/codepen-1.png", "img/codepen-2.png", "img/codepen-3.png"];
let title = ["animated-button", "transparent-cards", "animated-progress-bar"];
i = 0;
urlE = document.getElementById("codepen-url");
imgE = document.getElementById("codepen-img");
titleE = document.getElementById("codepen-title");

function codepen_left() {
    i = i + url.length - 1;
    i %= url.length;
    urlE.setAttribute("href", url[i]);
    console.log(url[i]);
    imgE.setAttribute("src", img[i]);
    titleE.innerHTML = title[i];
}

function codepen_right() {
    i++;
    i %= url.length;
    urlE.setAttribute("href", url[i]);
    imgE.setAttribute("src", img[i]);
    titleE.innerHTML = title[i];
}


// Programming skills
function progAnimation (bar_, perc, stop){
    bar = document.getElementById(bar_);
    percentage = document.getElementById(perc);

    i = 0;
    load = setInterval( function () {
        bar.style = "width:" + i + "%";
        percentage.innerHTML = i + "%";
        i++;
        if (i == stop + 1) {
            clearInterval(load);
        }
    }, 10);
    return;
}

progAnimation("python-bar", "python-percentage", 90);
setTimeout(() => {
    progAnimation("java-bar", "java-percentage", 80);
}, 1000);
setTimeout(() => {
    progAnimation("c-bar", "c-percentage", 60);
}, 1900);
setTimeout(() => {
    progAnimation("assembly-bar", "assembly-percentage", 70);
}, 2600);
