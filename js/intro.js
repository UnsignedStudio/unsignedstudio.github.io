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
    //this.mult =  _segSpeed * ((this.length()) / this.distance( {"x":0, "y":0},{"x":width, "y":height}));
    this.mult = _segSpeed;
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
segment.prototype.easeOutCubic = function(t) { return t*(2 - t); }
segment.prototype.draw = function() {
    if (this.startTime > _d) {  return; }
    if (this.hidden) { return; }
    strokeWeight(1);
    stroke(200,200,220);
    noFill();
    
    if (this.position > 1) {
        
        var startVec = normalisePoint(this.start.x, this.start.y);
        var endVec = normalisePoint(this.end.x, this.end.y);
        
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

        //var startVec = normalisePoint(this.start.x, this.start.y);
        //var endVec = normalisePoint(this.currentEnd.x, this.currentEnd.y);
        //endVec = normalisePoint(this.end.x,this.end.y);

        beginShape();
        vertex(npS.x, npS.y);
        vertex(this.currentEnd.x, this.currentEnd.y);
        endShape();
        this.position = this.easeOutCubic(this.position);
    }
    //this.position += this.mult;
    
}

function convertLinesToSegements() {
    console.log("asd");
    for (var l = 0; l < _markLines.length; l++) {
        console.log(_markLines[l]);    
        for (var i = 0; i < _markLines[l].length; i++) {
            var startSeg = _markLines[l][i];
            if (i+1 < _markLines[l].length) {
                var endSeg = _markLines[l][i+1];
                var ss = new segment(startSeg, endSeg, (random() * 5));
                _segs.push(ss);        
            }
        }
    }
}

var _cnv;

var _d = new Date();
var _animTime = 10;
var _sT = (new Date()).getTime();

function setup() {
	//Canvas Setup
	var _cnv = createCanvas(windowWidth, windowHeight);
	_cnv.parent('intro-parent');
	_cnv.position(0,0);
    
    d = (new Date()).getTime();
	_d = (_d - _sT)/1000;
    
    convertLinesToSegements();
    
    
	//smooth();
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

			//vertex(_pt.x*1280, 720 - _pt.y*720);	
			//ellipse(_pt.x*1280, 720 - _pt.y*720, 10,10);

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

function draw() {
	_d = (new Date()).getTime();
	_d = (_d - _sT)/1000;
	//console.log(_d);

	background(0, 0, 0);
	
    for (var s = 0; s < _segs.length; s++) {
        //if (random() > 0.95) { _segs[s].hidden = true; }
        //else{ _segs[s].hidden = false; }
    
        _segs[s].draw();    
        //_segs[s].position += 0.015;
    }
}

function windowResized() { resizeCanvas(windowWidth, windowHeight);	}