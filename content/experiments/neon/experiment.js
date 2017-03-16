var bubbles = [];
var numberOfBubblesPct = 0.00006;
var bubbleSize = 100;
var maxSpeed = 5;
var maxDistance = 100;
var maxClickDistance = 500;
var impulse = 20;

var exp = function(p)
{
  function bubble()
  {
    this.x = p.random(0, p.windowWidth);
    this.y = p.random(0, p.windowHeight);
    this.dX = p.random(0, maxSpeed * 2) - maxSpeed;
    this.dY = p.random(0, maxSpeed * 2) - maxSpeed;
    this.iX = 0; //impulse
    this.iY = 0;
    this.radius = bubbleSize;
    this.color = p.color(p.random(80, 255), p.random(80, 255), p.random(80, 255));
  }

  p.setup = function()
  {
    var myWidth = $("#popup-holder").width();
    var myHeight = $("#popup-holder").height()
    p.createCanvas(myWidth, myHeight);
    
    maxDistance = Math.pow(maxDistance, 2);
    maxClickDistance = Math.pow(maxClickDistance, 2);
    refreshBubbles();

    p.noFill();
    p.strokeWeight(10);
  }

  function refreshBubbles()
  {
    for (var i = 0; i < bubbles.length; i++)
      bubbles[i] = null;

    bubbles = [];
    var numberOfBubbles = numberOfBubblesPct * p.windowWidth * p.windowHeight;
    for (var i = 0; i < numberOfBubbles; i++)
      bubbles[i] = new bubble();
  }

  p.draw = function()
  {
    p.background(0, 0, 0, 80);
    p.blendMode(p.ADD);
    for (var i = 0; i < bubbles.length; i++)
    {
      bubbles[i].x += bubbles[i].dX;
      bubbles[i].y += bubbles[i].dY;

      bubbles[i].x += bubbles[i].iX;
      bubbles[i].y += bubbles[i].iY;

      if (Math.abs(bubbles[i].iX) > 1)
        bubbles[i].iX *= 0.9;

      if (Math.abs(bubbles[i].iY) > 1)
        bubbles[i].iY *= 0.9;

      //wrap
      if (bubbles[i].x < 0)
        bubbles[i].x = p.windowWidth;
      if (bubbles[i].x > p.windowWidth)
        bubbles[i].x = 0;
      if (bubbles[i].y < 0)
        bubbles[i].y = p.windowHeight;
      if (bubbles[i].y > p.windowHeight)
        bubbles[i].y = 0;

      p.stroke(bubbles[i].color);
      p.ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].radius)
    }
    p.blendMode(p.NORMAL);
  }

  p.mouseMoved = function() { moveBubbles(false); }
  p.mouseClicked = function() { moveBubbles(true); }
  
  function moveBubbles(click)
  {
    for (var i = 0; i < bubbles.length; i++)
      if (Math.pow(bubbles[i].x - p.mouseX, 2) + Math.pow(bubbles[i].y - p.mouseY, 2) < (click == true ? maxClickDistance : maxDistance))
      {
        var distPct = 1 - Math.sqrt(Math.pow(bubbles[i].x - p.mouseX, 2) + Math.pow(bubbles[i].y - p.mouseY, 2)) / (click == true ? maxClickDistance : maxDistance);
        var dir = p.createVector(bubbles[i].x - p.mouseX, bubbles[i].y - p.mouseY);
        dir = dir.normalize();
        bubbles[i].iX = dir.x * impulse * (click == true ? 2 : 1) * distPct;
        bubbles[i].iY = dir.y * impulse * (click == true ? 2 : 1) * distPct;
      }
  }

  p.windowResized = function()
  {
    refreshBubbles();
    var myWidth = $("#popup-holder").width();
    var myHeight = $("#popup-holder").height()
    p.resizeCanvas(myWidth, myHeight);
  }
}

var p5obj = new p5(exp, 'popup-holder');