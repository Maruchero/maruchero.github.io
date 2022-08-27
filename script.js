
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
