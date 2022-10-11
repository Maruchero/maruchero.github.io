// functions
function randomize(min, max) {
  return Math.random() * (max - min) + min;
}
function angle(deg) {
  return (deg * Math.PI) / 180;
}

const pow = Math.pow;
const sqrt = Math.sqrt;
const arctan = Math.atan;
const sin = Math.sin;
const cos = Math.cos;
const abs = Math.abs;

// Classes
class Circle {
  constructor(ctx, x, y, radius, direction = 0, speed = 0, number = 0) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.number = number;

    this.direction = angle(direction);
    this.speed = speed;
  }

  static from(circle) {
    return new Circle(
      circle.ctx,
      circle.x,
      circle.y,
      circle.radius,
      (circle.direction * 180) / Math.PI,
      circle.speed,
      circle.number
    );
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  draw() {
    //ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.arc(this.x, this.y, this.radius, 0, angle(360));
    // if (fill) this.ctx.fill();
    if (DEBUG) {
      this.ctx.stroke();
      this.ctx.strokeStyle = "black";
    } else {
      this.ctx.fillStyle = "black";
      //this.ctx.fill();
    }

    if (DEBUG) {
      this.ctx.font = "20px sans-serif";
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.number, this.x, this.y);
      this.ctx.fillStyle = "black";
    }
    //ctx.closePath();

    this.update();
  }

  async update() {
    if (this.y < 0 || this.y > canvas.height) this.direction = -this.direction;
    if (this.x < 0 || this.x > canvas.width)
      this.direction = Math.PI - this.direction;
    // Calc translation vector
    let xV = cos(this.direction) * this.speed;
    let yV = sin(this.direction) * this.speed;
    this.x += xV;
    this.y += yV;
  }
}

class Joint {
  constructor(ctx, c1, c2) {
    this.ctx = ctx;
    this.c1 = c1;
    this.c2 = c2;
  }

  draw() {
    let x1 = this.c1.x;
    let y1 = this.c1.y;
    let radius1 = this.c1.radius;
    let x2 = this.c2.x;
    let y2 = this.c2.y;
    let radius2 = this.c2.radius;
    // Calculations
    let d = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

    let a = abs(d - radius1 - radius2);
    let radC = a;

    let l1 = radius1 + radC;
    let l2 = radius2 + radC;

    let p = (d + l1 + l2) / 2;
    let surface = sqrt(p * (p - l1) * (p - l2) * (p - d));

    let b = (2 * surface) / d;
    //d1 = radA - a / 2;
    //d2 = radB - a / 2;
    let d1 = sqrt(pow(l1, 2) - pow(b, 2));
    let d2 = d - d1;

    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    let xMul = deltaX >= 0 ? 1 : -1;
    let beta = arctan(deltaX / deltaY);
    if (deltaY < 0) beta = Math.PI - xMul * abs(beta);

    let xC = b * cos(-beta) + d1 * sin(beta) + x1;
    let yC = b * sin(-beta) + d1 * cos(beta) + y1;
    let xD = x1 - b * cos(-beta) + d1 * sin(beta);
    let yD = y1 - b * sin(-beta) + d1 * cos(beta);

    let teta1 = arctan(d1 / b);
    let teta2 = arctan(d2 / b);

    //this.ctx.beginPath();
    ctx.moveTo(x1, y1)
    this.ctx.arc(
      xC,
      yC,
      radC,
      Math.PI + teta1 - beta,
      Math.PI - teta2 - beta,
      true
    );
    this.ctx.arc(xD, yD, radC, teta2 - beta, -teta1 - beta, true);
    //this.ctx.closePath();

    if (DEBUG) {
      this.ctx.strokeStyle = "blue";
      this.ctx.stroke();
      this.ctx.strokeStyle = "black";
    } else {
      //this.ctx.fillStyle = "black";
      //this.ctx.fill();
    }
  }
}

// Global stuff
const DEBUG = false;
const FPS = 100;
const N_CIRCLES = 20;

// elements
const canvas = document.getElementById("canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");

const circles = [];
// Generate circles
for (let i = 0; i < N_CIRCLES; i++) {
  let c = new Circle(
    ctx,
    randomize(0, canvas.width),
    randomize(0, canvas.height),
    randomize(50, 100),
    randomize(0, 360),
    randomize(0.05, 0.3),
    i
  );
  circles.push(c);
}

// First draw
ctx.clearRect(0, 0, canvas.width, canvas.height);
draw();
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
}, 1000 / FPS);

// Main drawing function
function draw() {
  if (DEBUG) console.log("# Frame");
  let drawed = [];

  // Cycle through the circles
  ctx.beginPath()
  for (let i = 0; i < circles.length; i++) {
    let c1 = circles[i];

    let distances = {};
    for (let j = i + 1; j < circles.length; j++) {
      let c1 = circles[i];
      let c2 = circles[j];
      let distance = sqrt(pow(c2.x - c1.x, 2) + pow(c2.y - c1.y, 2));

      // If circles touching
      if (distance < c1.radius + c2.radius) {
        // Take the biggest circle first (because of bugs) and make a joint
        let joint;
        if (c1.radius > c2.radius) {
          joint = new Joint(ctx, c1, c2);
        } else {
          joint = new Joint(ctx, c2, c1);
        }

        // Draw joint and circles
        joint.draw();
        if (!drawed.includes(i)) {
          c1.draw();
          drawed.push(i);
        }
        if (!drawed.includes(j)) {
          c2.draw();
          drawed.push(j);
        }

        if (DEBUG) console.log("drawing", i, j);
      }

      if (DEBUG)
        distances[j] = {
          x: c1.x,
          y: c1.y,
          distance,
          "c2.x": c2.x,
          "c2.y": c2.y,
        };
    }
    if (DEBUG) console.log(i + ":", distances);
    // They not touching
    if (!drawed.includes(i)) {
      c1.draw();

      drawed.push(i);
      if (DEBUG) console.log("drawing", i);
    }
  }
  let grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grd.addColorStop(0, "lime");
  grd.addColorStop(1, "dodgerblue");
  
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.closePath();
}
