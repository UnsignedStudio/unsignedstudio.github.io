/*
	Checking out my nasty p5 sketch?? Get in touch dm [at] unsignedstudio.io
	
	Cheers, 
	Dave
*/

var circ = function(p) {

//Globals 

var circPoints = [];
var workingCircPoints = []
var length = 300;
var stepSize = 0.1;
var maxLines = 1;
var maxLinePoints = 8;

var bgColor = null;
var whiteColor = null;
var normColor = null;
var accColor = null;

var _hovering = false;

p.setup = function() {
	var myWidth = $("#popup-holder").width();
    var myHeight = $("#popup-holder").height()
    p.createCanvas(myWidth, myHeight);

	//Init colors.
	bgColor = p.color(25,53,73);
	normColor = p.color(0,136,255);
	accColor = p.color(255,198,0);
	whiteColor = p.color(255,239,255);
	
	p.background(0,0,0);
	
}

p.draw = function() {
	//p.clear();
	if (p.mouseIsPressed) {
		p.background(10,20,30,4);
	}else{
		p.background(10,20,30,25);
	}
	
	

	var randMult = 0.5;
	if (p.mouseIsPressed) { randMult = 0.0; }
	if (_hovering) { randMult = 0.1; }

	circPoints = [];
	var ang = 0;
	while (ang < p.TWO_PI) {

		var x = length * p.cos(ang);
		var y = length * p.sin(ang);
		var rX = p.random(-15*randMult, 15*randMult);
		var rY = p.random(-15*randMult, 15*randMult);
		x += rX;
		y += rY;
		ang += stepSize;
		circPoints.push(p.createVector(x + p.width/2, y + p.height/2));
	}
	
	//Draw Outside Line
	p.noFill();
	p.stroke(whiteColor);
	p.beginShape();
	for (var i = 0; i < circPoints.length; i++) {
		p.stroke(whiteColor);
		p.vertex(circPoints[i].x, circPoints[i].y);

	}
	p.endShape(p.CLOSE);
	
	

	//Draw Inner Lines 
	p.blendMode(p.ADD);
	p.noFill();
	p.stroke(80);
	for (var i = 0; i < maxLines; i++) {
		p.beginShape();

		for (var x = 0; x < maxLinePoints; x++) {
			var pt = circPoints[Math.floor(p.random(0, circPoints.length -1))];
			p.vertex(pt.x, pt.y);
		}
		p.endShape();
	}
	p.blendMode(p.BLEND);


	//Draw Outside Lines
	if (p.mouseIsPressed || _hovering) {
		p.noFill();
		p.stroke(accColor);
		p.beginShape();
		p.vertex(p.mouseX, p.mouseY);
		for (var i = 0; i < maxLinePoints; i ++) {
			var pt = circPoints[Math.floor(p.random(0, circPoints.length -1))];
			p.vertex(pt.x, p.y);
		}
		p.endShape(p.CLOSE);
	}else{
		if (p.random(0, 1) > 0.85) {
			if (p.random() > 0.8) {
				p.fill(0);
			}else{
				p.noFill();
				p.stroke(normColor);	
			}
			
			p.beginShape();
			p.vertex(p.mouseX, p.mouseY);
			for (var i = 0; i < maxLinePoints; i ++) {
				var pt = circPoints[Math.floor(p.random(0, circPoints.length -1))];
				p.vertex(pt.x, pt.y);
			}
			p.endShape(p.CLOSE);
		}
	}

	/*
	p.blendMode(p.ADD);
	p.noFill();
	p.stroke(255,0,0);
	p.beginShape();
	p.vertex(p.mouseX, p.mouseY);
	var tp1 = circPoints[Math.floor(p.random(0, maxLinePoints))];
	var tp2 = circPoints[Math.floor(p.random(0, maxLinePoints))];
	var tp3 = circPoints[Math.floor(p.random(0, maxLinePoints))]
	p.vertex(tp1.x, tp1.y);
	p.vertex(tp2.x, tp2.y);
	p.vertex(tp3.x, tp3.y);
	p.endShape(p.CLOSE);
	p.blendMode(p.NORMAL);
	*/
}

p.windowResized = function() {
  	var myWidth = $("#popup-holder").width();
	var myHeight = $("#popup-holder").height()
    p.resizeCanvas(myWidth, myHeight);
}

}

var p5obj = new p5(circ, 'popup-holder');