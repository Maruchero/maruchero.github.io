windowHeight = innerHeight;
vh = windowHeight / 100;
console.log(vh);

window.onscroll = function () {
    scroll = document.body.scrollTop || document.documentElement.scrollTop;

    mainTitle = document.getElementById("main-title");

    if (scroll < 15 * vh) {
        mainTitle.style = "";
    } else if (scroll > 15 * vh && scroll < 45 * vh) {
        // (scroll - 15 * vh) / vh    --->    0 - 30 vh

        // !use sin() and cos()!
        
        rotation = (scroll - 15 * vh) / vh * 3;
        translate = ((scroll - 15 * vh) / vh) /  (30 / (mainTitle.offsetHeight / 2));
        scale = 1 - ((scroll - 15 * vh) / vh / 70)
        console.log(rotation + ", " + translate + ", " + scale);
        mainTitle.style = "transform: perspective(800px) rotateX(" + rotation + "deg) translateY(" + translate + "px) scale(" + scale + ")";
    } else {
        mainTitle.style = "transform: rotateX(90deg) translateY(" + mainTitle.offsetHeight / 2 + "px) scale(0.7)";
    }
}

function codepen_left() {
    
}

function codepen_right() {
    
}
