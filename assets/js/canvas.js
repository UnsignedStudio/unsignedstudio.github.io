var colour = "black";
var sounds = [];

function preload()
{
  img = loadImage("../images/cutout.png");
  for (var i = 0; i < 10; i++)
    {
      console.log("sounds/tone" + (i + 1) + ".ogg");
      sounds[i] = loadSound("sounds/tone" + (i + 1) + ".ogg");
    }
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
}

function draw()
{
  background(colour);
  
  // cutout image
  var w = windowWidth * 0.8;
  var h = w * (9 / 16);
  image(img, windowWidth * 0.5 - w * 0.5, windowHeight * 0.5 - h * 0.5, w, h);
  var borderHeight = (1 - h / windowHeight) * 0.5 * windowHeight + 2;
  
  // borders
  fill("white");
  noStroke();
  // Top
  rect(0, 0, windowWidth, borderHeight);
  // Bottom
  rect(0, windowHeight - borderHeight, windowWidth, borderHeight);
  // Left
  rect(0, 0, 0.11 * windowWidth, windowHeight);
  // Right
  rect(0.89 * windowWidth, 0, 0.11 * windowWidth, windowHeight);
}

function mouseClicked()
{
  colour = color(random(0, 200), random(0, 200), random(0, 200));
  var index = parseInt(random(0, 10));
  sounds[index].play();
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}