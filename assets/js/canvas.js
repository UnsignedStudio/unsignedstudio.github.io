function aLine()
{
  var y;
  var fade = 0;
}

function circ()
{
  var radius;
  var colour;
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
var circs = [];
var delay = 0;

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
    
  started = true;
}

function draw()
{
  background("white");
  strokeWeight(1);
  stroke("black");

  if (delay == 0)
  {
    var newCircle = new circ();
    newCircle.radius = 0;
    newCircle.colour = color(random(0, 255), random(0, 255), random(0, 255));
    circs.push(newCircle);
    delay = 4;
  }
  delay -= 1;
  
  for (var i = 0; i < circs.length; i++) {
    fill(circs[i].colour);
    circs[i].radius += 6;
    ellipse(windowWidth / 2, windowHeight / 2, circs[i].radius);
    
    if (circs[i].radius > 1800)
      circs.splice(i, 1);
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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}