var oct = function(p) {
  var threshhold = 10;
  var aver = 1.05;
  var drag = 0.0012;
  var lineCount = 150;
  var lines = [];
  var mX = 0;
  var mY = 0;

  var hasRun = false;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.strokeWeight(1);
    p.background("#040e15");
    p.smooth();
    for(var i = 0; i < lineCount; i++) {
      lines[i] = new lnObj()
    }
  }

  p.draw = function() {
    if (p.mouseY < 0 || p.mouseY > p.windowHeight)
      return;
    
    if(p.mouseIsPressed) {
      p.background("#040e15");
      mX += 0.3 * (p.mouseX - mX);
      mY += 0.3 * (p.mouseY - mY);
    }
    if (!hasRun) {
      p.background("#040e15");
      mX += 0.3 * (p.windowWidth/2 - mX);
      mY += 0.3 * (p.windowHeight/2 - mY);
      hasRun = true;
    }
    mX += 0.3 * (p.mouseX - mX);
    mY += 0.3 * (p.mouseY - mY);

    for(var i = 0; i < lineCount; i++) {
      if (i == lineCount - 1) {
        p.stroke(0,136,255,255);
        lines[i].draw();
      }else if (i == 1) {
        p.stroke(255,198,0,255);
        lines[i].draw();
      }else{
        p.stroke(255, 255, 255, 8);
        lines[i].draw();
      }
    }
  }

  function lnObj() {
    this.X = p.random(p.windowWidth / 2);
    this.Y = p.random(p.windowHeight / 2);
    this.w = p.random(1 / threshhold, threshhold);

    this.Xv = 0;
    this.Yv = 0;
    this.pX = 0;
    this.pY = 0;
  }
  
  lnObj.prototype.draw = function () {

      if(!p.mouseIsPressed) {
        this.Xv /= aver;
        this.Yv /= aver;
      }

      this.Xv += drag * (mX - this.X) * this.w;
      this.Yv += drag * (mY - this.Y) * this.w;
      this.X += this.Xv;
      this.Y += this.Yv;
      p.line(this.X, this.Y, this.pX, this.pY);

      this.pX = this.X;
      this.pY = this.Y;

  }
  
  p.windowResized = function() {
    p.background("#040e15");
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    $('#oct').height(p.windowHeight);
  }
}

var octp5 = new p5(oct, 'oct');