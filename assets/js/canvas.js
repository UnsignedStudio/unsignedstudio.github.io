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

var numberOfDots;
var widthPercent = 0.3;
var dots = [];
var minSpeed = 0.1;
var maxSpeed = 2;
var maxDistance = 70;
var img;

function preload()
{
  img = loadImage("../images/cutout.png");
}

function setup()
{
  maxDistance *= maxDistance;
  numberOfDots = windowWidth * widthPercent;
  createCanvas(windowWidth, windowHeight);
  fill(0, 0, 0);
  
  for (var i = 0; i < numberOfDots; i++)
    dots[i] = new dot();
}

function draw()
{
  background("white");
  
  fill("black");
  strokeWeight(1);
  stroke("black");
  for (var i = 0; i < numberOfDots; i++)
  {
    dots[i].x += dots[i].vX;
    dots[i].y += dots[i].vY;
    
    // Wrap around
    if (dots[i].x > windowWidth)
      dots[i].x = 0;
    
    if (dots[i].x < 0)
      dots[i].x = windowWidth;
    
    if (dots[i].y > windowHeight)
      dots[i].y = 0;
    
    if (dots[i].y < 0)
      dots[i].y = windowHeight;
    
    ellipse(dots[i].x, dots[i].y, 2);
    
    for (var j = 0; j < numberOfDots; j++)
    {
      if (i == j)
        continue;
      
      var distance = sq(dots[j].x - dots[i].x) + sq(dots[j].y - dots[i].y);
      if (distance < maxDistance)
          line(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
    }
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numberOfDots = windowWidth * widthPercent;
  for (var i = 0; i < numberOfDots; i++)
  {
    dots[i].x = random(0, windowWidth);
    dots[i].y = random(0, windowHeight);
  }
}