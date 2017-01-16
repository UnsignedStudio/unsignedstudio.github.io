//Front Edge of Z
var _L1 = [{"x":0.0, "y":0.791333},{"x":0.217352, "y":0.791333},{"x":0.217352, "y":0.690988},{"x":0.386685, "y":0.690988},{"x":0.217352, "y":0.389953},{"x":0.217352, "y":0.289608},{"x":0.217352, "y":0.0},{"x":0.217352, "y":0.289608}];

//Back Edge of Z
var _L2 = [{"x":0.217352, "y":0.289608},{"x":0.443129, "y":0.289608},{"x":0.443129, "y":0.389953},{"x":0.273796, "y":0.389953},{"x":0.443129, "y":0.690988},{"x":0.499573, "y":0.590643},{"x":0.443129, "y":0.490298},{"x":0.443129, "y":0.389953},{"x":0.556017, "y":0.590643},{"x":0.443129, "y":0.791333},{"x":0.0, "y":0.791333}];

//Front Edge of 0
var _L3 = [{"x":1.0, "y":0.289608},{"x":0.443129, "y":0.289608},{"x":0.443129, "y":0.189262},{"x":0.556017, "y":0.189262},{"x":0.556017, "y":0.791333},{"x":0.781794, "y":0.791333},{"x":0.781794, "y":1.0}];

//Back Edge of 0
var _L4 = [{"x":1.0, "y":0.289608},{"x":0.781794, "y":0.289608},{"x":0.781794, "y":1.0}];

//Top Triangle on 0
var _L5 = [{"x":0.612461, "y":0.490298},{"x":0.725349, "y":0.690988},{"x":0.612461, "y":0.690988},{"x":0.612461, "y":0.490298}]; 

//Bottom Triangle on 0 
var _L6 = [{"x":0.612461, "y":0.389953},{"x":0.725349, "y":0.389953},{"x":0.725349, "y":0.590643},{"x":0.612461, "y":0.389953}]; 

//Line arr
var _markLines = [_L1, _L2, _L3, _L4, _L5, _L6];
var _longestLine = 12;
var _lineHandlers = [_markLines.length];

//Line Handler
//Looks after rendering lines and stuff 
function lineHandlder(pointArray) {
	this.pArray = pointArray;
	this.currentPosition = createVector(0,0,0);
	this.totalLength = 0;
	
	//Calc total line length
	for (var i = 1; i < this.pArray.length; i++) { this.totalLength += this.distance(this.pArray[i-1], this.pArray[i]); }
	console.log(this.totalLength);

	this.lastPoint = 0;
	this.nextPoint = 1;
	this.currentPosition = createVector(this.pArray[this.nextPoint - 1].x, this.pArray[this.nextPoint - 1].y);
	this.lastPosition = this.currentPosition;
	//Calc anim time 
	this.normalisedAnimTime = _animTime * (this.totalLength / _longestLine);
	console.log(this.normalisedAnimTime);

	this.delayTime = 0;
}
lineHandlder.prototype.distance = function(v1, v2) { return sqrt(((v1.x - v1.x)^2) + ((v1.y - v2.y)^2)); }
lineHandlder.prototype.distanceToPoint = function(ele1) {
	var calcDist = 0;
	if (ele1 == 1) {
		calcDist = this.distance(this.pArray[0], this.pArray[1]);
	}else{
		for (var i = 1; i < ele1; i++) {
			calcDist += this.distance(this.pArray[i - 1], this.pArray[i]);
		}	
	}
	return calcDist;
}
lineHandlder.prototype.updateAnimation = function() {
	var targetDistance = this.totalLength * _d;
	
	//Cap max target dist.
	if (targetDistance > this.totalLength) { targetDistance = this.totalLength; }


	if (this.nextPoint < this.pArray.length) {
		var distToNextPoint = this.distanceToPoint(this.nextPoint);
		console.log("Distance Opts: " + targetDistance + " distToNextPoint: " + distToNextPoint + " Total Dist: " + this.totalLength);
		if (distToNextPoint > targetDistance) {
		//if (targetDistance < distToNextPoint) {
			//Do Nothing?
			console.log("am i getting here??? nextPoint: " + this.nextPoint + " Last Point: " + this.lastPoint)

		}else{
			this.lastPoint = this.nextPoint;
			this.nextPoint += 1;
		}


		
		//Calc Pos
		if (this.nextPoint < this.pArray.length) {
			var distToLast = this.distanceToPoint(this.lastPoint);
			var distToNext = this.distanceToPoint(this.nextPoint);
			var normalTargetDist = targetDistance - distToLast;
			distToNext = distToNext - distToLast;
			normalTargetDist = normalTargetDist / distToNext;

			console.log(normalTargetDist);
			
			var newVect = createVector(0,0,0);
			newVect.x = ((this.pArray[this.nextPoint].x - this.pArray[this.lastPoint].x) * normalTargetDist) +  this.pArray[this.lastPoint].x;
			newVect.y = ((this.pArray[this.nextPoint].y - this.pArray[this.lastPoint].y) * normalTargetDist) +  this.pArray[this.lastPoint].y;

			this.lastPosition = this.currentPosition;
			this.currentPosition = newVect;

		}else{
			this.currentPosition = this.pArray[this.pArray.length];
		}
	}
}
lineHandlder.prototype.render = function() {
	fill(255,0,0);
	//var _renderPoint = normalisePoint(this.currentPosition.x, this.currentPosition.y);
	//ellipse(_renderPoint.x, _renderPoint.y, 20, 20);
}


//Timing
var _d = new Date();
var _animTime = 10;
var _sT = (new Date()).getTime(); //Start Time

function setup() {
	//Canvas Setup
	var _cnv = createCanvas(windowWidth, windowHeight);
	_cnv.parent('intro-parent');
	_cnv.position(0,0);
	
	//Intial Drawing States
	smooth();

	for (var i = 0; i < _markLines.length; i++) {  _lineHandlers[i] = new lineHandlder(_markLines[i]); }
}

function normalisePoint(x, y) {
	//Normalize
	var _x = x * 1920
	var _y = 1080 - y * 1080
	var _mult = 1;

	//Scale To screen
	if (windowWidth > windowHeight) { _mult = windowWidth / 1920; }
	else{ _mult = windowHeight / 1920; }
	
	//Extra Scaling
	_mult = _mult * 0.8;
	_x = _x * _mult;
	_y = _y * _mult;

	//Centre on screen
	_x = _x + ((windowWidth - (1920 * _mult)) / 2)
	_y = _y + ((windowHeight - (1080 * _mult)) / 2)

	if (x == 0) { _x = 0; }
	if (y == 0) { _y = windowHeight; }
	if (x == 1) { _x = windowWidth; }
	if (y == 1) { _y = 0; }

	//Return Vector
	return createVector(_x, _y, 0);
}

function drawMarkLines() {
	strokeWeight(1);
	stroke(10,10,10);
	noFill();

	for (var i = 0; i < _markLines.length; i++) {
		var _ln = _markLines[i];
		beginShape();
		for (var l = 0; l < _ln.length; l++) {
			var _pt = _ln[l];
			var _vec = normalisePoint(_pt.x, _pt.y);
			vertex(_vec.x, _vec.y);
		}
		endShape();
	}
}

function drawMarkPoints() {
	for (var i = 0; i < _markLines.length; i++) {
		var _ln = _markLines[i];
		for (var l = 0; l < _ln.length; l++) {
			var _pt = _ln[l];
			var _vec = normalisePoint(_pt.x, _pt.y);
			fill(0,0,0)
			ellipse(_vec.x, _vec.y, 10, 10);
		}
	}
}

function handleTime() { 
	_d = (new Date()).getTime(); 
	_d = (_d - _sT)/1000;
	_d = _d / _animTime; 
}

function draw() {
	handleTime();

	clear();
	background(124, 123, 122);
	
	drawMarkLines();
	drawMarkPoints();

	for (var i = 0; i < _lineHandlers.length; i++) {
		_lineHandlers[i].updateAnimation();
		_lineHandlers[i].render();
	}
}

function windowResized() { resizeCanvas(windowWidth, windowHeight);	}

