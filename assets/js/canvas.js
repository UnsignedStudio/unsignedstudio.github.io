function dot()
{
  this.x = random(0, windowWidth);
  this.y = random(0, windowHeight);
  this.vX = random(minSpeed, maxSpeed);
  
  if (random() > 0.5)
    this.vX = -this.vX;
  if (random() > 0.5)
    this.vY = -this.vY;
  
  this.vY = random(minSpeed, maxSpeed);
}

function aLine()
{
  var y;
  var fade = 0;
}

var numberOfDots;
var lines = [];
var widthPercent = 0.3;
var dots = [];
var minSpeed = 0.1;
var maxSpeed = 2;
var maxDistance = 70;
var img;
var started = false;

function preload()
{
  img = loadImage("../images/cutout.png");
}

function setup()
{
  maxDistance *= maxDistance;
  numberOfDots = windowWidth * widthPercent;
  createCanvas(windowWidth, windowHeight);
  fill("black");
  
  for (var i = 0; i < 50; i++)
    lines[i] = new aLine();
  
  started = true;
}

function draw()
{
  background("white");
  
  fill("black");
  strokeWeight(1);
  stroke("black");

  for (var i = 0; i < 50; i++) {
    stroke(0, 0, 0, lines[i].fade);
    lines[i].y = mouseY + random(-100, 100);
    line(0, lines[i].y, windowWidth, lines[i].y);
    var aa = random(0, 5);
    lines[i].fade -= aa;
  }
  
  // cutout image
  var w = windowWidth * 0.8;
  var h = windowHeight * 0.8;
  image(img, windowWidth * 0.5 - w * 0.5, windowHeight * 0.5 - h * 0.5, w, h);
  
  // borders
  fill("white");
  noStroke();
  rect(0, 0, windowWidth, 0.1 * windowHeight);
  rect(0, 0.9 * windowHeight, windowWidth, 0.1 * windowHeight);
  rect(0, 0, 0.1 * windowWidth, windowHeight);
  rect(0.9 * windowWidth, 0, 0.1 * windowWidth, windowHeight);
}

function mouseMoved() {
  if (!started)
    return;
  
  for (var i = 0; i < 50; i++)
    lines[i].fade = 100;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //numberOfDots = windowWidth * widthPercent;
  //for (var i = 0; i < numberOfDots; i++)
  //{
    //dots[i].x = random(0, windowWidth);
    //dots[i].y = random(0, windowHeight);
  //}
}