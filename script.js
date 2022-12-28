
class Slider {
  constructor(query) {
    this.slider = document.querySelector(query);
    this.sliderContent = this.slider.querySelector('.slider-content');
    this.itemCount = this.sliderContent.children.length;
    this.itemWidth = this.slider.querySelector(".slider-container").offsetWidth;
    this.currentItem = 0;
  }

  scroll() {
    this.sliderContent.style.left = -this.currentItem * this.itemWidth + "px";
  }

  next() {
    this.currentItem = (this.currentItem + 1) % this.itemCount;
    this.scroll();  
  }

  previous() {
    this.currentItem = (this.itemCount + this.currentItem - 1) % this.itemCount;
    this.scroll();  
  }
}

// Main
const projectSlider = new Slider("#project-slider");


// Background
const bg = document.getElementById("background");
let items = ["circle_8.svg", "square_18.svg", "triangle_6.svg"]
let t = {min: -5, max: 5}
for (let i=0; i<500; i++) {
  let n = Math.floor(Math.random() * items.length);
  let x = Math.floor(Math.random() * (t.max - t.min) + t.min);
  let y = Math.floor(Math.random() * (t.max - t.min) + t.min);
  let r = Math.floor(Math.random() * 360);
  let img = document.createElement("span");
  img.style.backgroundImage = "url(/img/" + items[n] + ")";
  img.style.setProperty("--x", x + "px");
  img.style.setProperty("--y", y + "px");
  img.style.setProperty("--r", r + "deg");
  bg.appendChild(img)
}
