var uColours = {orange: '#ffc600', blue: '#1E3C71', black: "#211F21"};
var shouldFill = true;
var mMoved = false;
var rectCount = 100;


var scrollPos = 0;

window.onwheel = function(e) {scrollHandler(e);};

function scrollHandler(e) {
  
  scrollPos += e.deltaY;
  //console.log(scrollPos);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  smooth();

  //Background Colour
  background(color(uColours.orange));

  //Frame Rate 
  frameRate(25);

  stroke(color(uColours.black));
}

function draw() {

  background(color(uColours.orange));

  for (var i = 0; i < rectCount/4; i++ ) {
    var w = (windowWidth / (rectCount/4)) / 2;
    var offset = (w*2);
    //color(10,10,10);
    fill(50,50,50,50);
    noStroke();
    rect( (i * offset + (scrollPos/2)), 0, w, windowHeight);
  }

  for (var i = 0; i < rectCount; i++ ) {
    var w = (windowWidth / rectCount) / 4;
    var offset = (w*2)*2;
    //color(10,10,10);
    fill(10,10,10,255);
    noStroke();
    rect( (i * offset + scrollPos), (windowHeight - (windowHeight*0.8))/2, 1, windowHeight*0.8);
  }
  if ((scrollPos > windowWidth) || (scrollPos < -windowWidth)) {
    scrollPos = 0;
  }


  mMoved = false;
}

function mousePressed() {
  shouldFill = false;
}

function mouseReleased() {
  shouldFill = true;
}

function mouseMoved() {
  mMoved = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}