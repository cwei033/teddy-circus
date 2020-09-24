var armSwingRight;
var armSwingLeft;
var stringMoveUpRight;
var stringMoveUpLeft;
var eyeMovement = 45;
let eyeStart = false;
let balloon = [0, 15];
let color = ['rgba(255, 0, 0, 1)', 'rgba(255, 244, 48,1)', 'rgba(0, 255, 229,1)', 'rgba(255, 0, 0, 1)', 'rgba(255, 244, 48,1)', 'rgba(0, 255, 229,1)', 'rgba(255, 0, 0, 1)', 'rgba(255, 244, 48,1)', 'rgba(0, 255, 229,1)', 'rgba(255, 0, 0, 1)', 'rgba(255, 244, 48,1)', 'rgba(0, 255, 229,1)', 'rgba(255, 0, 0, 1)', 'rgba(255, 244, 48,1)', 'rgba(0, 255, 229,1)', 'rgba(255, 0, 0, 1)'];
let S1 = 250;
let stripe = [0, 11];
let column = [0, -40, 40, 80, 120, 160, 200, 240, 280, 320, 360];
let dots = [0, 8];
let dotsx = [0, 57.2, 114.4, 170, 227.2, 286, 343.2, 400];
let dotsy = [315, 304, 296, 290, 290, 296, 304, 315];
let confetti = [0, 65];
let confettiStart = false;
let counted = 0;
// let bowMove;
// let controllerMove;
var mic;
let menu = [0, 11];
let titleFont;
let gameStart = false;
let menuDisappear = false;
let sketchStarted = false;

function preload() {
  titleFont = loadFont('FrederickatheGreat-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noStroke();

  for (let i = 0; i < 15; i++) {
    balloon[i] = new Balloon(random(width), random(height * .85, height * 1.7), color[i], S1, 1);
  }

  for (let i = 0; i < 11; i++) {
    stripe[i] = new Stripe(column[i], 'rgba(223, 47, 2, 1)', 1);
  }

  for (let i = 0; i < 8; i++) {
    dots[i] = new Dots(dotsx[i], dotsy[i]);
  }

  for (let i = 0; i < 65; i++) {
    confetti[i] = new Confetti(random(width), random(height * -1.2, height * -.1), random(-90, 90));
  }

  for (let i = 0; i < 11; i++) {
    menu[i] = new Stripe(column[i], 'rgba(223, 47, 2, .9)', 2);
  }
  createButton("Start").mousePressed(startSketch);

}

function startSketch() {
  mic = new p5.AudioIn()
  mic.start();

  sketchStarted = true;
}

function draw() {
  // console.log("mic:" + mic.getLevel());
  // console.log(mouseX);
  if (sketchStarted) {

    armSwingRight = map(mic.getLevel(1), 0, .3, 330, 295, true);
    armSwingLeft = map(mic.getLevel(1), 0, .3, 90, 42, true);
    stringMoveUpRight = map(mic.getLevel(1), 0, .3, 116, 100, true);
    stringMoveUpLeft = map(mic.getLevel(1), 0, .3, 80, 120, true);
    // bowMove = map(mic.getLevel(), 0, .1, 0, 10, true);
    // controllerMove = map(mic.getLevel(), 0, .1, 5, -15, true);

    background('#CFC096');

    if (gameStart === true) {
      for (let i = 0; i < 11; i++) {
        stripe[i].display();
        stripe[i].move();

        if (stripe[i].x >= width) {
          stripe[i].x = -40;
        }
      }

      for (let i = 0; i < 15; i++) {
        balloon[i].display();
        balloon[i].move();

        if (balloon[i].y < -height * .45) {
          balloon[i].color = color[i];
          balloon[i].string = 250;
          balloon[i].x = random(width);
          balloon[i].y = random(height * .85, height * 1.7);
        }
      }
    }

    drawFence();
    for (let i = 0; i < 8; i++) {
      dots[i].display();
    }

    drawStage();
    drawLegs();
    drawRightString(stringMoveUpRight);
    drawLeftString(stringMoveUpLeft);
    // drawController(controllerMove);
    drawLeftArm(armSwingLeft);
    drawRightArm(armSwingRight);
    drawBody();
    drawCounter();
    drawHead();
    drawFace(eyeMovement);
    drawBowtie(width * .5, height * .51);
    drawConfettiButton();

    if (confettiStart == true) {
      for (let i = 0; i < 65; i++) {
        confetti[i].display();
        confetti[i].move();

        if (confetti[i].y > height * 1.05) {
          confetti[i].y = height * -.05;
          confetti[i].x = random(width);
        }
      }
    }

    if (eyeStart == true) {
      eyeMovement = mouseX
    }

    if (menuDisappear == false) {
      drawMenuBg();

      for (let i = 0; i < 11; i++) {
        menu[i].display();
        menu[i].move();

        if (menu[i].x >= width) {
          menu[i].x = -40;
        }
      }

      drawBorder();
      drawMenu();
    }
  }
}

function mousePressed() {
  if (mouseX > width * .38 && mouseX < width * .62 && mouseY > height * .507 && mouseY < height * .607) {
    gameStart = true;
    menuDisappear = true;
  }
  if (gameStart === true) {
    if (mouseX > width * .46 && mouseX < width * .54 && mouseY > height * .49 && mouseY < height * .53) {
      eyeStart = !eyeStart;
      // console.log("xxx");
    }
    if (mouseX > width * .825 && mouseX < width * .975 && mouseY > height * .835 && mouseY < height * .985) {
      confettiStart = !confettiStart;
    }

    for (let i = 0; i < 15; i++) {
      if (mouseX > balloon[i].x - width * .11 && mouseX < balloon[i].x + width * .11 && mouseY > balloon[i].y - height * .12 && mouseY < balloon[i].y + height * .12) {
        balloon[i].color = 'rgba(0, 0, 0, 0)';
        balloon[i].string = 'rgba(0, 0, 0, 0)';
        counted = counted + 1;
      }
    }
  }
}

function drawConfettiButton() {
  push();
  fill('#DF2F02');
  circle(width * .9, height * .91, width * .15);
  fill(255);
  circle(width * .9, height * .91, width * .14);
  fill('#DF2F02');
  circle(width * .9, height * .91, width * .135);
  fill(255);
  textAlign(CENTER);
  text('PRESS ME!', width * .828, height * .882, width * .15, height * .15);
  pop();
}

function drawFence() {
  // ground border
  push();
  fill('#f5b800');
  ellipse(width * .5, height * .81, width * 1.3, height * .3);
  fill('#3d5570');
  ellipse(width * .5, height * .83, width * 1.3, height * .3);
  pop();
  // ground
  push();
  fill('#dbaf69');
  ellipse(width * .5, height * .94, width * 1.3, height * .3);
  pop();
}

function drawStage() {
  // stage bottom
  push();
  fill('#940000');
  rectMode(CENTER);
  rect(width * .495, height * .825, width * .5, height * .1);
  ellipse(width * .495, height * .875, width * .5, height * .08);
  fill('#f5b800');
  rect(width * .495, height * .826, width * .5, height * .02);
  ellipse(width * .495, height * .835, width * .5, height * .08);
  fill('#940000');
  ellipse(width * .495, height * .82, width * .5, height * .08);
  pop();
  // stage top
  push();
  fill('#a80000');
  ellipse(width * .495, height * .775, width * .5, height * .08);
  pop();
  // shadow
  push();
  fill(70, 80);
  ellipse(width * .495, height * .77, width * .4, height * .06);
  pop();
}

function drawLegs() {
  //left leg
  push();
  fill(242, 148, 34);
  ellipse(width * .44, height * .7, width * .07, height * .15);
  pop();
  //right leg
  push();
  fill(87, 64, 40);
  ellipse(width * .55, height * .7, width * .07, height * .15);
  pop();
}

function drawRightString(mouseY) {
  push();
  fill(250);
  rectMode(CENTER);
  translate(width * .63, mouseY);
  rotate(-5);
  rect(0, 0, width * .005, height * .61);
  pop();
}

function drawLeftString(mouseY) {
  push();
  fill(250);
  rectMode(CENTER);
  translate(width * .385, mouseY);
  rotate(10);
  rect(0, 0, width * .005, height * .61);
  pop();
}

function drawController(rotation) {
  push();
  rectMode(CENTER);
  rotate(rotation);
  translate(width * .51, height * -.03);
  fill(87, 64, 40);
  rect(0, 0, width * .4, height * .07);
  pop();
}

function drawLeftArm(rotation) {
  //left arm
  push();
  ellipseMode(CORNER)
  translate(width * .415, height * .49);
  rotate(rotation);
  fill(217, 46, 30);
  ellipse(0, 0, width * .05, height * .15);
  pop();
}

function drawRightArm(rotation) {
  //right arm
  push();
  ellipseMode(CORNER);
  translate(width * .56, height * .51);
  rotate(rotation);
  fill(106, 217, 196);
  ellipse(0, 0, width * .05, height * .15);
  pop();
}

function drawBody() {
  //body
  push();
  fill(250, 221, 142);
  ellipse(width * .5, height * .59, width * .22, height * .28);
  pop();

  //pocket
  push();
  fill(250);
  ellipse(width * .5, height * .63, width * .14, height * .1);
  pop();
}

function drawHead() {
  //left ear
  push();
  fill(106, 217, 196);
  circle(width * .35, height * .29, width * .1);
  pop();
  //right ear
  push();
  fill(217, 46, 30);
  circle(width * .65, height * .29, width * .1);
  pop();
  //head
  push();
  fill(250, 221, 142);
  ellipse(width * .5, height * .38, width * .31, height * .29);
  pop();
}

function drawFace(rotation) {
  //eyes
  push();
  fill(87, 64, 40);
  circle(width * .42, height * .43, width * .04);
  circle(width * .58, height * .43, width * .04);
  fill('#261c19');
  circle(width * .42, height * .43, width * .03);
  circle(width * .58, height * .43, width * .03);
  pop();

  // // eyeshine
  // push();
  // fill(250);
  // translate(width*.42, height*.43)
  // rotate(rotation);
  // circle(width*-.01, height*-.005, width*.008);
  // pop();
  // push();
  // translate(width*.58, height*.43);
  // rotate(rotation);
  // circle(width*-.01, height*-.005, width*.008);
  // pop();

  // buttons
  push();
  rectMode(CENTER);
  translate(width * .42, height * .43);
  rotate(rotation);
  fill(250);
  rect(0, 0, width * .003, height * .02);
  rect(0, 0, width * .02, height * .003);
  pop();
  push();
  rectMode(CENTER);
  translate(width * .58, height * .43);
  rotate(rotation);
  fill(250);
  rect(0, 0, width * .003, height * .02);
  rect(0, 0, width * .02, height * .003);
  pop();

  //mouth
  ellipse(width * .5, height * .45, width * .09, height * .05);

  //nose
  push();
  fill(242, 148, 34);
  ellipse(width * .5, height * .445, width * .04, height * .02);
  pop();
}

function drawBowtie(xPos, yPos) {
  //bowtie
  push();
  fill(217, 46, 30);
  translate(xPos, yPos);
  // rotate(rotation);
  triangle(width * 0, height * 0, width * -.04, height * -.02, width * -.04, height * .02);
  triangle(width * 0, height * 0, width * .04, height * -.02, width * .04, height * .02);
  pop();
  push();
  fill(242, 206, 27);
  translate(xPos, yPos);
  circle(width * 0, height * 0, width * .03);
  pop();
}

function drawCounter() {
  push();
  fill('rgb(255, 215, 0)');
  rect(width * .01, height * .84, width * .18, height * .15, width * .03);
  fill(255);
  rect(width * .018, height * .848, width * .165, height * .135, width * .02);
  // fill(255);
  // rect(width * .0205, height * .85, width * .16, height * .13, width * .02);
  fill(0);
  textAlign(CENTER);
  textSize(11);
  text('COUNTER:', width * .103, height * .88);
  textSize(40);
  text(counted, width * .098, height * .967);
  pop();
}

function drawMenuBg() {
  push();
  rectMode(CENTER);
  fill('rgba(245, 229, 186, .95)');
  rect(width * .5, height * .5, width, height);
  pop();
}

function drawBorder() {
  push();
  fill(255);
  beginShape();
  vertex(width * .03, height * .03);
  vertex(width * .97, height * .03);
  vertex(width * .97, height * .97);
  vertex(width * .03, height * .97);
  beginContour();
  vertex(width * .05, height * .05);
  vertex(width * .05, height * .95);
  vertex(width * .95, height * .95);
  vertex(width * .95, height * .05);
  endContour();
  endShape(CLOSE);
  pop();
}

function drawMenu() {
  push();
  fill(40)
  rectMode(CENTER);
  rect(width * .5, height * .5, width * .8, height * .3, width * .05);
  fill(255, 240);
  rect(width * .5, height * .5, width * .76, height * .26, width * .03);
  fill(40);
  rect(width * .5, height * .5, width * .745, height * .245, width * .025);
  textAlign(CENTER);
  fill(255);
  textFont(titleFont, 40);
  text('*Teddy Circus*', width * .5, height * .49);
  textFont(titleFont, 10);
  text('[pop the balloons!]', width * .68, height * .52);
  textFont(titleFont, 20);
  fill('#fffd99');
  text('play', width * .5, height * .569);
  if (mouseX > width * .38 && mouseX < width * .62 && mouseY > height * .507 && mouseY < height * .607) {
    textFont(titleFont, 20);
    text('>', width * .43, height * .569);
  }
  pop();
}
