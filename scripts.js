/**********************************************************************
 * Fade-in
 */
const windowHeight = window.innerHeight;
const activationPoint = windowHeight * 0.9;
const fadeIn = Array.from(document.querySelectorAll(".fade-in"));

window.onscroll = () => {
  for (let i = 0; i < fadeIn.length; i++) {
    if (fadeIn[i].getBoundingClientRect().top < activationPoint) {
      fadeIn[i].classList.add("active");
      fadeIn.splice(i, 1);
    }
  }
};
