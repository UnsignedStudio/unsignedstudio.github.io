/*
	Checking out my nasty p5 sketch?? Get in touch dm [at] unsignedstudio.io
	
	Cheers, 
	Dave
*/

//Globals 
var circPoints = [];
var workingCircPoints = []
var length = 300;
var stepSize = 0.2;
var maxLines = 2;
var maxLinePoints = 8;

var bgColor = null;
var whiteColor = null;
var normColor = null;
var accColor = null;

var _hovering = false;
function onHoverEnter() { _hovering = true; }
function onHoverExit() { _hovering = false; }


function setup() {
	createCanvas(windowWidth, windowHeight);

	//Init colors.
	bgColor = color(25,53,73);
	normColor = color(0,136,255);
	accColor = color(255,198,0);
	whiteColor = color(255,239,255);
	
	background(bgColor);
}

function draw() {
	clear();
	background(bgColor);
	
	var randMult = 1;
	if (mouseIsPressed) { randMult = 0.35; }
	if (_hovering) { randMult = 0.1; }

	circPoints = [];
	var ang = 0;
	while (ang < TWO_PI) {

		var x = length * cos(ang);
		var y = length * sin(ang);
		var rX = random(-15*randMult, 15*randMult);
		var rY = random(-15*randMult, 15*randMult);
		x += rX;
		y += rY;
		ang += stepSize;
		circPoints.push(createVector(x + windowWidth/2, y + windowHeight/2));
	}
	
	//Draw Outside Line
	noFill();
	stroke(whiteColor);
	beginShape();
	for (var i = 0; i < circPoints.length; i++) {
		stroke(whiteColor);
		vertex(circPoints[i].x, circPoints[i].y);
	}
	endShape(CLOSE);
	

	//Draw Inner Lines 
	blendMode(ADD);
	noFill();
	stroke(80);
	for (var i = 0; i < maxLines; i++) {
		beginShape();
		for (var x = 0; x < maxLinePoints; x++) {
			var p = circPoints[Math.floor(random(0, circPoints.length -1))];
			vertex(p.x, p.y);
		}
		endShape();
	}
	blendMode(BLEND);

	//Draw Outside Lines
	if (mouseIsPressed || _hovering) {
		noFill();
		stroke(accColor);
		beginShape();
		vertex(mouseX, mouseY);
		for (var i = 0; i <maxLinePoints; i ++) {
			var p = circPoints[Math.floor(random(0, circPoints.length -1))];
			vertex(p.x, p.y);
		}
		endShape(CLOSE);
	}else{
		if (random(0, 1) > 0.85) {
			noFill();
			stroke(normColor);
			beginShape();
			vertex(mouseX, mouseY);
			for (var i = 0; i <maxLinePoints; i ++) {
				var p = circPoints[Math.floor(random(0, circPoints.length -1))];
				vertex(p.x, p.y);
			}
			endShape(CLOSE);
		}
	}	
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}