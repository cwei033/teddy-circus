class Balloon {
  constructor(_x, _y, _color, _string, _scale) {
    this.x = _x;
    this.y = _y;
    this.color = _color;
    this.string = _string;
    this.scale = _scale;
  }

  display() {
    push();
    noFill();
    stroke(this.string);
    scale(this.scale);
    curve(this.x + width * .25, this.y, this.x + width * .01, this.y + height * .10, this.x + width * .01, this.y + height * .40, this.x - width * .1, this.y + height * .60);
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, width * .2, height * .22);
    triangle(this.x, this.y + height * .10, this.x - width * .02, this.y + height * .13, this.x + width * .02, this.y + height * .13);

    if (this.y < -height * .45) {
      this.y = 580;
      this.x = random(width);
      this.scale = random(0.8, 1.4);
    }
    pop();
  }

  move() {
    this.y -= 1
  }
}

class Stripe {
  constructor(_x, _color, _scale) {
    this.x = _x;
    this.color = _color;
    this.scale = _scale;
  }

  display() {
    push();
    fill(this.color);
    scale(this.scale);
    rect(this.x, 0, width * .05, height);
    pop();
  }

  move() {
    this.x += .3
  }
}

class Dots {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  display() {
    push();
    fill(255);
    circle(this.x, this.y, width * .03);
    pop();
  }
}

class Confetti {
  constructor(_x, _y, _rotation) {
    this.x = _x;
    this.y = _y;
    this.rotation = _rotation;
  }

  display() {
    push();
    fill('rgba(255, 215, 0, .8)');
    translate(this.x, this.y);
    rotate(this.rotation);
    rect(0, 0, width * .02, height * .03);
    pop();
  }

  move() {
    this.y += 2;
    this.rotation += .5;
  }
}