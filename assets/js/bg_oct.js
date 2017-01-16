var threshhold = 10;
var aver = 1.05;
var drag = 0.0012;
var lineCount = 150;
var lines = [];
var mX = 0;
var mY = 0;

var hasRun = false;

function setup() {
  var _cnv = createCanvas(windowWidth, windowHeight);
  _cnv.parent('canvas-parent');
  
  strokeWeight(1);
  //stroke(255, 255, 255, 10);
  background("#040e15");
  smooth();
  for(var i = 0; i < lineCount; i++) {
    lines[i] = new lnObj()
  }
}

function draw() {
  
  if(mouseIsPressed) {
    background("#040e15");
    mX += 0.3 * (mouseX - mX);
    mY += 0.3 * (mouseY - mY);
  }
  if (!hasRun) {
    background("#040e15");
    mX += 0.3 * (windowWidth/2 - mX);
    mY += 0.3 * (windowHeight/2 - mY);
    hasRun = true;
  }
  mX += 0.3 * (mouseX - mX);
  mY += 0.3 * (mouseY - mY);

  for(var i = 0; i < lineCount; i++) {
    if (i == lineCount - 1) {
      stroke(0,136,255,255);
      lines[i].draw();
    }else if (i == 1) {
      stroke(255,198,0,255);
      lines[i].draw();
    }else{
      stroke(255, 255, 255, 8);
      lines[i].draw();
    }
  }
}

function lnObj() {
  this.X = random(windowWidth / 2);
  this.Y = random(windowHeight / 2);
  this.w = random(1 / threshhold, threshhold);
  
  this.Xv = 0;
  this.Yv = 0;
  this.pX = 0;
  this.pY = 0;
  
}
lnObj.prototype.draw = function () {
    
    if(!mouseIsPressed) {
      this.Xv /= aver;
      this.Yv /= aver;
    }
    
    this.Xv += drag * (mX - this.X) * this.w;
    this.Yv += drag * (mY - this.Y) * this.w;
    this.X += this.Xv;
    this.Y += this.Yv;
    //stroke(255,255,255,2);
    line(this.X, this.Y, this.pX, this.pY);
    
    this.pX = this.X;
    this.pY = this.Y;

}
function windowResized() {
  background("#040e15");
  resizeCanvas(windowWidth, windowHeight);
}

function onHoverEnter() { };
function onHoverExit() { };
