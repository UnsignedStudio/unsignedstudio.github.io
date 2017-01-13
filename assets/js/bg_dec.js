//Misc Vars
var NUM_PARTICLES = 750;
var xVal = 0;
var yVal = 0;
var mDown = false;
var ppp = null;

//Setup
function setup() {
  var _cnv = createCanvas(windowWidth, 600);
  _cnv.parent('canvas-parent');
  
  xVal = random(windowWidth);
  yVal = random(windowHeight);
  ppp = new particleSys();
  strokeWeight(1);
  background(4,14,21);
  smooth();
}

//Vector Stand In
function uVec() {
  this.x = 0;
  this.y = 0;
  this.r = 255;
  this.g = 255;
  this.b = 255;
}
uVec.prototype.add = function(vec) {
  this.x += vec.x;
  this.y += vec.y;
}

//Particle
function particleObj() {
  this.position = new uVec();
  this.position.x = random(windowWidth);
  this.position.y = random(windowHeight);
  this.velocity = new uVec();
}
particleObj.prototype.update = function () {
    this.velocity.x = 10 * ( noise( xVal * 1000 + this.position.y / 100 ) - 0.5);
    this.velocity.y = 45 * ( noise( yVal * 1000 + this.position.x / 100 ) - 0.5);
    this.position.add(this.velocity);
    
    if(this.position.x < 0) this.position.x += windowWidth;
    if(this.position.x > windowWidth) this.position.x -= windowWidth;
    if(this.position.y < 0) this.position.y += windowHeight;
    if(this.position.y > windowHeight) this.position.y -= windowHeight;
}
particleObj.prototype.render = function() {
  if (mDown) {
    fill(this.r, this.g, this.b)
    ellipse(this.position.x, this.position.y, 2, 2);
  }else{
    stroke(this.r, this.g, this.b);
    line(this.position.x, this.position.y, this.position.x - this.velocity.x, this.position.y - this.velocity.y);
  }
}

//Particle System
function particleSys() {
  this.particles = [];
  for(var i = 0; i < NUM_PARTICLES; i++) {
    this.particles[i] = new particleObj();
    if (random(100) < 5) {
      if (random(100) > 50) {
        this.particles[i].r = 0;
        this.particles[i].g = 136;
        this.particles[i].b = 255;
      }else{
        this.particles[i].r = 255;
        this.particles[i].g = 198;
        this.particles[i].b = 0;
      }
    }else{
     this.particles[i].r = 255;
      this.particles[i].g = 255;
      this.particles[i].b = 255;
    }
  }
}
particleSys.prototype.update = function() {
  for (var i = 0; i < NUM_PARTICLES; i++) {
    this.particles[i].update();
  }
}
particleSys.prototype.render = function() {
  for (var i = 0; i < NUM_PARTICLES; i++) {
    this.particles[i].render()
  }
}
particleSys.prototype.reset = function () {
  for (var i = 0; i < NUM_PARTICLES; i++) {
    this.particles[i].position.x = random(windowWidth);
    this.particles[i].position.y = random(windowHeight);
  }
}

//P5 Stuff
function draw() {
  noStroke();
  //ll("#040e15");
  fill(4,14,21,15);
  rect(0,0,windowWidth, windowHeight);
  ppp.update();
  ppp.render();
}
function mouseMoved() {
  xVal = mouseX;
  yVal = mouseY;
}
function touchMoved() {
  xVal = mouseX;
  yVal = mouseY;
}
function mousePressed() {
  background("#040e15");
  mDown = true;
}
function mouseReleased() { mDown = false; }
function windowResized() {
  background("#040e15");
  resizeCanvas(windowWidth, 600);
  ppp.reset();
}

function onHoverEnter() { };
function onHoverExit() { };
