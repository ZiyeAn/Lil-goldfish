let fox = [];
let colors = [
  "#2b0f08",
  "#5c2314",
  "#7e4a18",
  "#4d4a3e",
  "#70591e",
  "#2c291d",
  "#282107",
];

//get a fixed random color
let c1;
let c2;
let c3;
let c4;
let c5;
let cAngle = 0;

//preload fox
function preload() {
  for (let i = 0; i < 5; i++) {
    fox[i] = loadImage(i + ".png");
  }
  img = loadImage("texture2.jpeg");
}
function setup() {
  createCanvas(windowHeight, windowHeight);
  c1 = random(colors);
  c2 = random(colors);
  c3 = random(colors);
  c4 = random(colors);
  c5 = random(colors);
}
function draw() {
  background("#15110b");

  //frame
  push();
  noFill();
  rectMode(CENTER);
  stroke(c5);
  strokeWeight(3);
  rect(
    windowHeight / 2,
    windowHeight / 2,
    0.98 * windowHeight,
    0.98 * windowHeight
  );
  strokeWeight(1.5);
  rect(
    windowHeight / 2,
    windowHeight / 2,
    0.96 * windowHeight,
    0.96 * windowHeight
  );
  pop();

  //rotation
  let sec = second();
  let secAngle = map(sec, 0, 60, 0, TWO_PI);
  cAngle = lerp(cAngle, secAngle, 0.1);

  if (0 < mouseX < windowWidth) {
    let rotateAngle = map(mouseX, 0, windowWidth, 0, PI);
    design(
      windowHeight / 2,
      windowHeight / 2,
      windowHeight / 2,
      rotateAngle + cAngle
    );
  } else {
    design(windowHeight / 2, windowHeight / 2, windowHeight / 2, cAngle);
  }

  //display images of fox based on the mouse position
  let a = parseInt(map(mouseX, 0, windowHeight, 0, 5, true));
  //console.log(a)
  imageMode(CENTER);
  if (0 <= a <= 4) {
    image(
      fox[a],
      windowHeight / 2,
      windowHeight / 2,
      0.7 * windowHeight,
      0.7 * windowHeight
    );
  } else {
    image(
      fox[0],
      windowHeight / 2,
      windowHeight / 2,
      0.7 * windowHeight,
      0.7 * windowHeight
    );
  }
  // texture
  push();
  blendMode(OVERLAY);
  image(img, windowHeight / 2, windowHeight / 2, windowHeight, windowHeight);
  pop();
}

function design(x, y, size, rotation) {
  //rings
  push();
  stroke(c4);
  strokeWeight(2);
  noFill();
  ellipse(x, y, size * 1.2);
  pop();

  //ellipse
  noStroke();
  fill(c1);
  ellipse(x, y, size);
  fill(c2);
  ellipse(x, y, size * 0.7);
  fill(c3);
  //ellipse around the large one and rotation
  for (let i = 0; i < TWO_PI; i += TWO_PI / 16) {
    push();
    translate(x, y);
    rotate(i);
    rotate(rotation);
    ellipse(0, 0, size * 0.9, size / 4);
    if (size > 10) {
      design(size * 0.8, 0, size / 6);
    }
    pop();
  } //some circles roatating the other way
  for (let j = 0; j < TWO_PI; j += TWO_PI / 12) {
    push();
    translate(x, y);
    rotate(j - rotation);
    ellipse(size * 0.5, 0, size * 0.1);
    pop();
  }
}
