/*
 * To use this script you just need to add the "fade-in" class
 * to the element you want to use the fade-in animation on.
 *
 * It will inject a some style in the head, but don't worry,
 * it won't change anything. Enjoy the magic.
 *
 * You can change the attributes down below to personalize your animation.
 */

/***********************************
 * PREDEFINED VALUES
 * Do not modify!
 */
const vh = window.innerHeight / 100;

/* ******************************************
 * ATTRIBUTES
 * you can change the values to get the animation you prefer
 */

// time needed for completing the animation(must be string)
// default is 0.5 seconds
const time = ".5s";

// decides at which distance from the top(in pixels) the element will animate
// default is 80% of the screen height
const animationAt = 80 * vh;

// this is the name of the class that fade-in animation will be applied on
// default value is "fade-in"
const affectedClass = "fade-in";

// ******************************************

// Create and inject needed style
let style = document.createElement("style");
style.innerHTML =
    "/*Injected from FADE-IN*/\n" +
    "." +
    affectedClass +
    " {\n" +
    "    transform: translateY(50px);\n" +
    "    filter: opacity(0);\n" +
    "}\n\n" +
    "@keyframes fadeIn {\n" +
    "    0% {\n" +
    "        transform: translateY(50px);\n" +
    "        filter: opacity(0);\n" +
    "    }\n" +
    "    100% {\n" +
    "        transform: translateY(0);\n" +
    "        filter: opacity(1);\n" +
    "    }\n" +
    "}\n";
document.head.appendChild(style);

// Get fade-in elements
const fadeIn = document.getElementsByClassName(affectedClass);

// Get offset top of elements
const fadeOffsetTop = [];
for (i = 0; i < fadeIn.length; i++) {
    fadeOffsetTop.push(fadeIn[i].offsetTop);
}

// Onscroll
window.onscroll = () => {
    yScroll = document.body.scrollTop || document.documentElement.scrollTop;

    // for each element check if it passed animationAt
    let k = 0;
    for (i = 0; i < fadeIn.length; i++) {
        let windowTopDistance = fadeOffsetTop[i] - yScroll;

        // if passed animationAt
        if (windowTopDistance < animationAt) {
            // search for elements at the same height(like cards)
            for (j = 0; j <= i; j++) {
                if (fadeOffsetTop[j] == fadeOffsetTop[i]) {
                    fadeIn[i].style.animation =
                        "fadeIn " +
                        time +
                        " " +
                        k++ * 300 +
                        "ms cubic-bezier(0.29, 0.73, 0.29, 0.7) forwards";
                    break;
                } else {
                    k = 0;
                }
            }
        }
    }
};
