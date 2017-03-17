//Front Edge of Z
var _L1 = [{"x":0.217352, "y":0.791333},{"x":0.217352, "y":0.690988},{"x":0.386685, "y":0.690988},{"x":0.217352, "y":0.389953},{"x":0.217352, "y":0.289608},{"x":0.217352, "y":0.0}];
//Back Edge of Z
var _L2 = [{"x":0.217352, "y":0.289608},{"x":0.443129, "y":0.289608},{"x":0.443129, "y":0.389953},{"x":0.273796, "y":0.389953},{"x":0.443129, "y":0.690988},{"x":0.499573, "y":0.590643},{"x":0.443129, "y":0.490298},{"x":0.443129, "y":0.389953},{"x":0.556017, "y":0.590643},{"x":0.443129, "y":0.791333},{"x":0.0, "y":0.791333}];
//Front Edge of 0
var _L3 = [{"x":1.0, "y":0.289608},{"x":0.443129, "y":0.289608},{"x":0.443129, "y":0.189262},{"x":0.556017, "y":0.189262},{"x":0.556017, "y":0.791333},{"x":0.781794, "y":0.791333}];
//Back Edge of 0
var _L4 = [{"x":1.0, "y":0.289608},{"x":0.781794, "y":0.289608},{"x":0.781794, "y":1.0}];
//Top Triangle on 0
var _L5 = [{"x":0.612461, "y":0.490298},{"x":0.725349, "y":0.690988},{"x":0.612461, "y":0.690988},{"x":0.612461, "y":0.490298}]; 
//Bottom Triangle on 0 
var _L6 = [{"x":0.612461, "y":0.389953},{"x":0.725349, "y":0.389953},{"x":0.725349, "y":0.590643},{"x":0.612461, "y":0.389953}]; 
//Line arr
var _markLines = [_L1, _L2, _L3, _L4, _L5, _L6];

//Segemnts
var _segs = [];
var _segSpeed = 0.0000000001;
function segment(p1, p2, st) {
    this.start = p1;
    this.end = p2;
    this.currentEnd = {"x":0,"y":0};
    this.position = 0.01;
    this.hidden = false;
    this.drawPoints = true;
    this.startTime = st;
}
segment.prototype.length = function () {
    return Math.sqrt( Math.pow(this.end.x - this.start.x, 2) + Math.pow(this.end.y - this.start.y, 2));
}
segment.prototype.distance = function (v1,v2) {
    return Math.sqrt( Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}
segment.prototype.draw = function() {
    if (this.startTime > _d) {  return; }
    if (this.hidden) { return; }
    strokeWeight(1);
    if (alphaMult != -1) {
        stroke(200*alphaMult, 200*alphaMult, 220*alphaMult);
    }else{
        stroke(200,200,220);    
    }
    
    noFill();
    
    if (this.position > 1) {
        var startVec = normalisePoint(this.start.x, this.start.y);
        var endVec = normalisePoint(this.end.x, this.end.y);
        
        if (startVec.y != 0 && startVec.y != height) { startVec.y += _mOffset; }
        if (endVec.y != 0 && endVec.y != height) { endVec.y += _mOffset; }
        
        beginShape();
        vertex(startVec.x, startVec.y);
        vertex(endVec.x, endVec.y);
        endShape();
    }else {
        
        var npS = normalisePoint(this.start.x, this.start.y);
        var npE = normalisePoint(this.end.x, this.end.y);
        
        var cx = (npE.x - npS.x);
        var cy = (npE.y - npS.y);

        this.currentEnd.x = (cx * this.position) + npS.x;
        this.currentEnd.y = (cy * this.position) + npS.y;
        
        beginShape();
        vertex(npS.x, npS.y);
        vertex(this.currentEnd.x, this.currentEnd.y);
        endShape();
        fill(200,200,220);
        ellipse(this.currentEnd.x, this.currentEnd.y, 4);
        
        this.position += this.position * 0.055;
    }
}
function convertLinesToSegements() {
    for (var l = 0; l < _markLines.length; l++) {
        for (var i = 0; i < _markLines[l].length; i++) {
            var startSeg = _markLines[l][i];
            if (i+1 < _markLines[l].length) {
                var endSeg = _markLines[l][i+1];
                var ss = new segment(startSeg, endSeg, 0.75 + (random() * 2));
                _segs.push(ss);        
            }
        }
    }
}
//Screen Space Projection
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
//Misc FNs
function markStillAnimating() {
    for (var s = 0; s < _segs.length; s++) { if (_segs[s].position < 1) { return true; } }
    return false;
}
var alphaMult = -1;
function loadProjects() {
    var offsetMult = _mOffset / height;
    if ((offsetMult) < -0.23) {
        window.location.href = "casestudy.html";
    }
    if (offsetMult < 0 && offsetMult > -0.25) { alphaMult = 1 + (offsetMult / 0.25); }
    else{ alphaMult = -1; }
    //if (alphaMult == 0) { window.location.href = "casestudy.html"; }
}

//P5
var _cnv;
var _d = new Date();
var _animTime = 10;
var _sT = (new Date()).getTime();
var _timeTillClear = -1;

function setup() {
	var _cnv = createCanvas(windowWidth, windowHeight);
	_cnv.parent('intro-parent');
	_cnv.position(0,0);
    
    d = (new Date()).getTime();
	_d = (_d - _sT)/1000;
    background(12,18,23,255);
    convertLinesToSegements();
}
function draw() {
	_d = (new Date()).getTime();
	_d = (_d - _sT)/1000;
	
    if (markStillAnimating() == false) {
        if (_timeTillClear != -1) {
            if (_d > _timeTillClear) {
                background(12,18,23);
                _timeTillClear = -1;
            }
        }else{ background(12,18,23, 120); }
    }else{ background(12,18,23, 40);}
    for (var s = 0; s < _segs.length; s++) { _segs[s].draw(); }
    
    if (_oldMOffset != _mOffset) { _timeTillClear = _d + 0.15; }
    _oldMOffset = _mOffset;
    
    loadProjects();
    
    console.log(alphaMult);
}

var _mOffset = 0;
var _oldMOffset = 0;
function mouseWheel(event) {
    if (markStillAnimating() == false) { if (event.delta > 0) { _mOffset -= 10; } else { _mOffset += 10; } }
    return false;
}
function windowResized() { resizeCanvas(windowWidth, windowHeight);	}