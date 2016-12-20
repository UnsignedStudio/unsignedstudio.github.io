var NUM_PARTICLES = 750;

var ppp = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  ppp = new particleSys();
  
  strokeWeight(1);
  //stroke(255, 255, 255, 10);
  background(4,14,21);   
  smooth();
}


function uVec() {
  this.x = 0;
  this.y = 0;
}
uVec.prototype.add = function(vec) {
  this.x += vec.x;
  this.y += vec.y;
  this.r = 255;
  this.g = 255;
  this.b = 255;
}


function particleObj() {
  this.position = new uVec();
  this.position.x = random(windowWidth);
  this.position.y = random(windowHeight);
  this.velocity = new uVec();
}
particleObj.prototype.update = function () {
    this.velocity.x = 10 * ( noise( mouseX*1000 + this.position.y / 100 ) - 0.5);
    this.velocity.y = 45 * ( noise( mouseY*1000 + this.position.x / 100 ) - 0.5);
    this.position.add(this.velocity);
    
    if(this.position.x < 0) this.position.x += windowWidth;
    if(this.position.x > windowWidth) this.position.x -= windowWidth;
    if(this.position.y < 0) this.position.y += windowHeight;
    if(this.position.y > windowHeight) this.position.y -= windowHeight;
}
particleObj.prototype.render = function() {
  stroke(this.r, this.g, this.b);
  line(this.position.x, this.position.y, this.position.x - this.velocity.x, this.position.y - this.velocity.y);
}


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


}





function draw() {
  noStroke();
  //ll("#040e15");
  fill(4,14,21,15);
  rect(0,0,windowWidth, windowHeight);
  ppp.update();
  ppp.render();
}

function windowResized() {
  background("#040e15");   
  resizeCanvas(windowWidth, windowHeight);
}

function onHoverEnter() { };
function onHoverExit() { };
