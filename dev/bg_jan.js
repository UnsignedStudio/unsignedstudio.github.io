var uColours = {orange: '#ffc600', blue: '#1E3C71', black: "#211F21"};
var shouldFill = true;
var mMoved = false;
var gResolution = 128;
var grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Background Colour
  background(color(uColours.orange));

  //Frame Rate 
  frameRate(25);

  stroke(color(uColours.black));

   for (var k = 0; k < gResolution; k++) {
    for (var j = 0; j < gResolution; j++) {
      grid[j] = [];
    }
  }
}

function draw() {

  var nMult = 96;
  var newOrange = color(255, 198, 0, 15);
  background(newOrange);
  noFill();

  if (mMoved == true) {
    nMult = 15;
  	//background(color(255, 198, 0));
  	//noFill();
  }

  for (var k = 0; k < gResolution; k++) {
    for (var j = 0; j < gResolution; j++) {
      grid[j][k] = noise(j / gResolution * 2, k / gResolution * 2, frameCount / nMult);
    }
  }

  
  scale(windowWidth/gResolution, windowHeight/gResolution);
  translate(0.5,0.5);
  strokeWeight(0.02);

  for (var k = 0; k < gResolution - 1; k++) {
    for (var j = 0; j < gResolution - 1; j++) {
      var a = grid[j][k]; 
      var b = grid[j + 1][k];
      var c = grid[j][k + 1];
      var d = grid[j + 1][k + 1];

      if(a < 0.5 && b < 0.5 && c < 0.5 && d < 0.5 && true) continue;

      var val = 0.5;
      if (mMoved == true) {
        val = 0.3;
        strokeWeight(0.03);
      }

      var ab = (val - a) / (b - a);
      var cd = (val - c) / (d - c);
      var ac = (val - a) / (c - a);
      var bd = (val - b) / (d - b);

      beginShape();
      if(a < 0.5) vertex(j,k);
      //if(ab > 0 && ab < 1) vertex(j+ab,k);
      if(b < 0.5) vertex(j+1,k);
      //if(bd > 0 && bd < 1) vertex(j+1,k+bd);
      if(d < 0.5) vertex(j+1,k+1);
      //if(cd > 0 && cd < 1) vertex(j+cd,k+1);
      if(c < 0.5) vertex(j,k+1);
      //if(ac > 0 && ac < 1) vertex(j,k+ac);
      endShape(CLOSE);
    }
  }
  mMoved = false;
}

function mousePressed() { shouldFill = false; }

function mouseReleased() { shouldFill = true; }

function mouseMoved() { mMoved = true; }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}