// window height
const window_height = window.innerHeight;
const vh = window_height / 100;

// get slide-up elements
cards = document.getElementsByClassName("slide-up");

// ONSCROLL
window.onscroll = () => {
    // scrolled pixels
    let scrolled = document.body.scrollTop || document.documentElement.scrollTop;

    // if cards[0] passed 80% of the screen: apply animation for every element
    if (cards[0].offsetTop - scrolled < 75 * vh) {
        for (i=0; i<cards.length; i++) {
            cards[i].style.animation = "get-in .3s linear forwards";
            cards[i].style.animationDelay = (i*300) + "ms";
        }
    }
}