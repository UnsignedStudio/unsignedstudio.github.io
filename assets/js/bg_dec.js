var dec = function(p) {
  //Misc Vars
  var NUM_PARTICLES = 750;
  var xVal = 0;
  var yVal = 0;
  var mDown = false;
  var ppp = null;

  //Setup
  p.setup = function() {
    var _cnv_dec = p.createCanvas(p.windowWidth, p.windowHeight);
    xVal = p.random(p.windowWidth);
    yVal = p.random(p.windowHeight);
    ppp = new particleSys();
    p.strokeWeight(1);
    p.background(4,14,21);
    p.smooth();
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
    this.position.x = p.random(p.windowWidth);
    this.position.y = p.random(p.windowHeight);
    this.velocity = new uVec();
  }
  particleObj.prototype.update = function () {
      this.velocity.x = 10 * ( p.noise( xVal * 1000 + this.position.y / 100 ) - 0.5);
      this.velocity.y = 45 * ( p.noise( yVal * 1000 + this.position.x / 100 ) - 0.5);
      this.position.add(this.velocity);

      if(this.position.x < 0) this.position.x += p.windowWidth;
      if(this.position.x > p.windowWidth) this.position.x -= p.windowWidth;
      if(this.position.y < 0) this.position.y += p.windowHeight;
      if(this.position.y > p.windowHeight) this.position.y -= p.windowHeight;
  }
  particleObj.prototype.render = function() {
    if (mDown) {
      p.fill(this.r, this.g, this.b)
      p.ellipse(this.position.x, this.position.y, 2, 2);
    }else{
      p.stroke(this.r, this.g, this.b);
      p.line(this.position.x, this.position.y, this.position.x - this.velocity.x, this.position.y - this.velocity.y);
    }
  }

  //Particle System
  function particleSys() {
    this.particles = [];
    for(var i = 0; i < NUM_PARTICLES; i++) {
      this.particles[i] = new particleObj();
      if (p.random(100) < 5) {
        if (p.random(100) > 50) {
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
      this.particles[i].position.x = p.random(p.windowWidth);
      this.particles[i].position.y = p.random(p.windowHeight);
    }
  }

  //P5 Stuff
  p.draw = function() {
    if (p.mouseY < 0 || p.mouseY > p.windowHeight)
      return;
    
    p.noStroke();
    //ll("#040e15");
    p.fill(4,14,21,15);
    p.rect(0,0,p.windowWidth, p.windowHeight);
    ppp.update();
    ppp.render();
  }
  p.mouseMoved = function() {
    xVal = p.mouseX;
    yVal = p.mouseY;
  }
  p.touchMoved = function() {
    xVal = p.mouseX;
    yVal = p.mouseY;
  }
  p.mousePressed = function() {
    p.background("#040e15");
    mDown = true;
  }
  p.mouseReleased = function() { mDown = false; }
  p.windowResized = function() {
    p.background("#040e15");
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    ppp.reset();
  }
}

var decp5 = new p5(dec, 'dec');