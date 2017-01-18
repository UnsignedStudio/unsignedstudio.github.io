var jan = function(p) {
  var uColours = {orange: '#ffc600', blue: '#1E3C71', black: "#211F21"};
  var shouldFill = true;
  var mMoved = false;
  var gResolution = 128;
  var grid = [];

  p.setup = function() {
    var _ctx = p.createCanvas(p.windowWidth, p.windowHeight);

    //Background Colour
    p.background(p.color(uColours.orange));

    //Frame Rate
    p.frameRate(25);

    p.stroke(p.color(uColours.black));

     for (var k = 0; k < gResolution; k++) {
      for (var j = 0; j < gResolution; j++) {
        grid[j] = [];
      }
    }
  }

  p.draw = function() {

    var nMult = 96;
    var newOrange = p.color(255, 198, 0, 15);
    p.background(newOrange);
    p.noFill();

    if (mMoved == true) {
      nMult = 15;
      //background(color(255, 198, 0));
      //noFill();
    }

    for (var k = 0; k < gResolution; k++) {
      for (var j = 0; j < gResolution; j++) {
        grid[j][k] = p.noise(j / gResolution * 2, k / gResolution * 2, p.frameCount / nMult);
      }
    }


    p.scale(p.windowWidth/gResolution, p.windowHeight/gResolution);
    p.translate(0.5,0.5);
    p.strokeWeight(0.02);

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
          p.strokeWeight(0.03);
        }

        var ab = (val - a) / (b - a);
        var cd = (val - c) / (d - c);
        var ac = (val - a) / (c - a);
        var bd = (val - b) / (d - b);

        p.beginShape();
        if(a < 0.5) p.vertex(j,k);
        //if(ab > 0 && ab < 1) vertex(j+ab,k);
        if(b < 0.5) p.vertex(j+1,k);
        //if(bd > 0 && bd < 1) vertex(j+1,k+bd);
        if(d < 0.5) p.vertex(j+1,k+1);
        //if(cd > 0 && cd < 1) vertex(j+cd,k+1);
        if(c < 0.5) p.vertex(j,k+1);
        //if(ac > 0 && ac < 1) vertex(j,k+ac);
        p.endShape(p.CLOSE);
      }
    }
    mMoved = false;
  }

  p.mousePressed = function() { shouldFill = false; }

  p.mouseReleased = function() { shouldFill = true; }

  p.mouseMoved = function() { mMoved = true; }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

var janp5 = new p5(jan, 'jan');