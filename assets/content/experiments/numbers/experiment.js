var numbers = function(p) {

  var grid = [];
  var gridDensity = 12;
  var gridDensityVert = gridDensity;

  var shouldAnimate = false;
  var mouseXCell = 0;
  var mouseYCell = 0;

  function gridCell() {
      this.x = 0;
      this.width = 100;
      this.y = 0;
      this.height = 100;
      this.number = "00.000";
      this.actualNumber = 0;
      this.drawText = false;
      this.siblings = [];
      this.influence = 0;
  }
  gridCell.prototype.updateNumber = function () {
      var num = (Math.random() * 2) - 1;
      this.actualNumber = num;
      this.number = num.toPrecision(3);
      
  }
  gridCell.prototype.renderText = function() {
      //fill(0,0,0);
      var tWidth = p.textWidth(this.number);
      var xOffset = 0;
      if (tWidth < this.width) { xOffset = (this.width - tWidth) / 2; }
      p.fill(225,225,225);
      p.text(this.number, this.x*this.width+xOffset, (this.y*this.height) + this.height/2);
  }
  gridCell.prototype.render = function () {
      this.width = Math.round(p.width / gridDensity);
      this.height = Math.round(p.height / gridDensityVert);
      
      p.noStroke();
      if (shouldAnimate) {
          this.influence = 0;
          if (Math.random() > 0.98) {
              p.fill(0, 0, 0);
              p.rect(this.x * this.width, this.y * this.height, this.width, this.height);
          }
          p.fill(0,0,0)
          this.updateNumber();
      }
      this.renderText();
  }
  gridCell.prototype.setActive = function () {
      //fill(25, 50, 75);
      p.fill("#F2AB28");
      p.rect(this.x * this.width, this.y * this.height, this.width, this.height);
      this.renderText();
  }
  gridCell.prototype.addInfluence = function () {
      this.influence += 0.2;
      if (this.influence > 255) {this.influence = 255;}
      p.fill(255 - this.influence, 255 - this.influence, 255 - this.influence);
      p.rect(this.x * this.width, this.y * this.height, this.width, this.height);
      this.renderText();
  }



  //P5 Shit
  p.setup = function() {
      var myWidth = $("#popup-holder").width();
      var myHeight = $("#popup-holder").height()

      var cnv = p.createCanvas(myWidth, myHeight);
      
      //Text
      p.textFont("Anonymous Pro");
      p.textAlign(p.LEFT);
      p.textSize(10);
      
      //Create Grid
      if (p.width > p.height) {
          gridDensityVert = Math.floor(gridDensity * (p.width/p.height));
      }
      for (var x = 0; x < gridDensity; x++) {
          grid[x] = []
          for (var y = 0; y < gridDensityVert; y++){
              grid[x][y] = new gridCell();
              grid[x][y].x = x;
              grid[x][y].y = y;
          }
      }
      for (var x = 0; x < grid.length; x++) {
          for (var y = 0; y < grid[x].length; y++) {
              var cell = grid[x][y];
              if (x - 1 > 0) { cell.siblings.push(grid[x - 1][y]); }
              if (x + 1 < gridDensity) { cell.siblings.push(grid[x + 1][y]); }
              if (y - 1 > 0) { cell.siblings.push(grid[x][y - 1]); }
              if (y + 1 < gridDensityVert) { cell.siblings.push(grid[x][y + 1]); }
              if (x - 1 > 0 && y - 1 > 0) { cell.siblings.push(grid[x - 1][y - 1]); }
              if (x + 1 < gridDensity && y - 1 > 0) { cell.siblings.push(grid[x + 1][y - 1]); }
              if (x - 1 > 0 && y + 1 < gridDensityVert) { cell.siblings.push(grid[x - 1][y + 1]); }
              if (x + 1 < gridDensity && y + 1 < gridDensityVert) { cell.siblings.push(grid[x + 1][y + 1]); }
          }
      }
      shouldAnimate = true;
  }

  p.draw = function() {
      mouseXCell = Math.floor(p.mouseX  / (p.width / gridDensity));
      mouseYCell = Math.floor(p.mouseY / (p.height / gridDensityVert));
      
      var goodXCell = -1;
      var goodYCell = -1;
      
      p.background(255,255,255, 100);
      for (var x = 0; x < grid.length; x++) {
          for (var y = 0; y < grid[x].length; y++) {
              grid[x][y].render();
          }
      }
      
      if (mouseXCell >= 0 && mouseXCell < gridDensity && 
          mouseYCell >= 0 && mouseYCell < gridDensityVert) {

          goodXCell = mouseXCell;
          goodYCell = mouseYCell;
          grid[mouseXCell][mouseYCell].setActive();
      }
      
      
      if (!shouldAnimate) {
          if (goodXCell != -1 && goodYCell != -1) {
              for (var x = 0; x < grid.length; x++) {
                  for (var y = 0; y < grid[x].length; y++) {
                      for (var s = 0; s < grid[x][y].siblings.length; s++) {
                          if (grid[x][y].siblings[s].actualNumber - grid[x][y].actualNumber > 0.025) {
                              grid[x][y].siblings[s].updateNumber();
                              grid[x][y].siblings[s].addInfluence();
                          }
                      }
                  }
              }   
          }
      }
      
      shouldAnimate = false;
  }

  p.mouseMoved = function() {
      shouldAnimate = true;
  }

  p.mousePressed = function() {
      shouldAnimate = true;
  }
  p.touchMoved = function() {
      shouldAnimate = true;   
  }
  p.windowResized = function() {
    var myWidth = $("#popup-holder").width();
    var myHeight = $("#popup-holder").height()
    p.resizeCanvas(windowWidth, windowHeight);
  }
}

var pgobj = new p5(numbers, 'popup-holder');