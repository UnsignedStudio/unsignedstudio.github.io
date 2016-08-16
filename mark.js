

//Size of each grid cell in pixels
var gridSize = 100;
var xColour = null;
var yColour = null;
var triStrokeWidth = 1;
var triStroke = false;
var triStrokeColour = null;
var logoMark = null;

var oldMouseX = 0;
var oldMouseY = 0;
var mouseMoved = true;
var xOffset = 100;
var yOffset = 100;
var borderPadding = 10;
var fade = 255.0;

var MarkGrid =  {
	rows: [
		[ 
			{x: 1, y:1, flipped:false}, 
			{x: 1, y:1, flipped:false},
			{x: 1, y:1, flipped:false},
			{x: 1, y:1, flipped:false},
			{x: 0, y:1, flipped:true},
			{x: 0, y:0, flipped:false},
			{x: 1, y:1, flipped:false},
			{x: 1, y:1, flipped:false},
			{x: 1, y:1, flipped:false},
			{x: 1, y:1, flipped:false}
		],
		[ 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false},
			{x: 0, y:1, flipped:false},
			{x: 1, y:0, flipped:false},
			{x: 1, y:0, flipped:true},
			{x: 0, y:1, flipped:true},
			{x: 1, y:1, flipped:false},
			{x: 0, y:0, flipped:false},
			{x: 0, y:1, flipped:false},
			{x: 1, y:1, flipped:false}
		],
		[ 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:1, flipped:false},
			{x: 1, y:0, flipped:false},
			{x: 0, y:0, flipped:false},
			{x: 0, y:1, flipped:false},
			{x: 1, y:0, flipped:false},
			{x: 1, y:1, flipped:false}, 
			{x: 0, y:1, flipped:false}, 
			{x: 1, y:0, flipped:false}, 
			{x: 1, y:1, flipped:false}
		],
		[ 
			{x: 0, y:1, flipped:false}, 
			{x: 1, y:0, flipped:false},
			{x: 0, y:0, flipped:false},
			{x: 0, y:0, flipped:false},
			{x: 1, y:0, flipped:false},
			{x: 0, y:0, flipped:false},
			{x: 1, y:1, flipped:false},
			{x: 1, y:0, flipped:false},
			{x: 0, y:0, flipped:false},
			{x: 1, y:1, flipped:false}
		],
		[ 
			{x: 1, y:1, flipped:false}, 
			{x: 1, y:1, flipped:false},  
			{x: 1, y:1, flipped:false}, 
			{x: 1, y:1, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 1, y:1, flipped:false}, 
			{x: 1, y:1, flipped:false}, 
			{x: 1, y:1, flipped:false}, 
			{x: 1, y:1, flipped:false}
		],
		[ 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 1, y:1, flipped:false}, 
			{x: 1, y:1, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false}, 
			{x: 0, y:0, flipped:false}
		]
	]
};


function setup() {
	createCanvas(windowWidth, windowHeight);
	gridSize = windowWidth / 50;
	borderPadding = windowWidth * 0.025;

	//xOffset = (windowWidth / 2) - ((gridSize * 10) / 2);
	//yOffset = (windowHeight / 2) - ((gridSize * 6) / 2);

	xOffset = windowWidth - (gridSize * 10) - (borderPadding / 2) - 2;
	yOffset = windowHeight - (gridSize * 6) - (borderPadding / 2) - 2;

	//xOffset = 0;
	//yOffset = gridSize * 6;

	

	//Init Colours
	xColour = color(25/2,53/2,73/2);
	//xColour = color(0,0,0);
	yColour =  color(25/2,53/2,73/2);
	//yColour = color(0,0,0);
	triStrokeColour = color(0,136,255);

	//Init the Mark
	logoMark = new Mark();
	logoMark.Init(MarkGrid);
};

function draw() {
	clear();

	/*
	var _left = xOffset - ((gridSize * 10) / 2);
	var _right = xOffset + ((gridSize * 10) / 2);
	var _top = yOffset - ((gridSize * 6) / 2);
	var _bottom = yOffset + ((gridSize * 6) / 2);
	fill(color(0,120));
	rect(xOffset - (borderPadding / 2), yOffset - (borderPadding / 2), _right - _left + borderPadding, _bottom - _top + borderPadding);
	*/

	if (mouseX == oldMouseX && mouseY == oldMouseY) {
		mouseMoved = false;
		oldMouseX = mouseX;
		oldMouseY = mouseY;
	}else{
		mouseMoved = true;
		oldMouseX = mouseX;
		oldMouseY = mouseY;
	}
	logoMark.Draw();
	if (mouseMoved) {
		if (!(Math.random()+.675|0)) {
			drawRandLine();
		}	
	}else{
		if (!(Math.random()+.975|0)) {
			drawRandLine();
		}	
	}
	drawFadeOverlay();
};

function drawFadeOverlay() {
	background(color(0, fade));
	fade -= 0.6;
};

function drawRandLine() {
	noFill();
	stroke(triStrokeColour);
	
	beginShape();
	if (mouseMoved) {
		vertex(mouseX, mouseY);
	}
	
	for (var i = 0; i < Math.floor((Math.random() * 40) + 1); i++) {
		
		stroke(triStrokeColour);
		var cl = logoMark.cells[Math.floor((Math.random() * logoMark.cells.length))];
		var pt = cl.cachedTri.RandPoint();
		vertex(pt[0], pt[1]);
	}
	
	endShape(CLOSE);
};


function triPoint () {
	
	this.x1 = 0;
	this.y1 = 0;
	
	this.x2 = 0;
	this.y2 = 0;
	
	this.x3 = 0;
	this.y3 = 0;
};

triPoint.prototype.RandPoint = function() {
	var index = (Math.floor(Math.random() * 3) + 1);
	if (index == 1) {
		return [this.x1, this.y1];
	}else if (index == 2) {
		return [this.x2, this.y2];
	}else if (index == 3) {
		return [this.x3, this.y3];
	}else{
		return [this.x2, this.y2];
	}
};

//Mark Cell 
function MarkCell () {
	//Which part of the cell is shaded
	this.x = 1;
	this.y = 0;
	
	//If the triangles should be flipped
	this.flipped = false;

	//Position in the grid
	this.gridXPos = 0;
	this.gridYPos = 0;

	this.startX = 1;
	this.startY = 1;
	this.startFlipped = false;

	this.cachedTri = new triPoint();
};

MarkCell.prototype.Draw  = function () {
	var p_left = (this.gridXPos * gridSize) + xOffset;
	var p_top = (this.gridYPos * gridSize) + yOffset;

	if (triStroke) {
		strokeWeight(triStrokeWidth);
		stroke(triStrokeColour);
	}else{
		noStroke();
	}

	if (this.flipped) {

		//X Tri
		if (this.x == 1) {
			fill(xColour);
			triangle(p_left, p_top, p_left + gridSize, p_top, p_left + gridSize, p_top + gridSize);
			this.cachedTri.x1 = p_left;
			this.cachedTri.y1 = p_top;
			this.cachedTri.x2 = p_left + gridSize;
			this.cachedTri.y2 = p_top;
			this.cachedTri.x3 = p_left + gridSize;
			this.cachedTri.y3 = p_top + gridSize;
		}

		//Y Tri
		if (this.y == 1) {
			fill(yColour);
			triangle(p_left, p_top, p_left + gridSize, p_top + gridSize, p_left, p_top + gridSize);
			this.cachedTri.x1 = p_left;
			this.cachedTri.y1 = p_top;
			this.cachedTri.x2 = p_left + gridSize;
			this.cachedTri.y2 = p_top + gridSize;
			this.cachedTri.x3 = p_left;
			this.cachedTri.y3 = p_top + gridSize;
		}

	}else{
		//X Tri
		if (this.x == 1) {
			fill(xColour);
			triangle(p_left, p_top, p_left + gridSize, p_top, p_left, p_top + gridSize);
			this.cachedTri.x1 = p_left;
			this.cachedTri.y1 = p_top;
			this.cachedTri.x2 = p_left + gridSize;
			this.cachedTri.y2 = p_top;
			this.cachedTri.x3 = p_left;
			this.cachedTri.y3 = p_top + gridSize;
		}

		//Y Tri
		if (this.y == 1) {
			fill(yColour);
			triangle(p_left + gridSize, p_top, p_left + gridSize, p_top + gridSize, p_left, p_top + gridSize);
			this.cachedTri.x1 = p_left + gridSize;
			this.cachedTri.y1 = p_top;
			this.cachedTri.x2 = p_left + gridSize;
			this.cachedTri.y2 = p_top + gridSize;
			this.cachedTri.x3 = p_left;
			this.cachedTri.y3 = p_top + gridSize;
		}
	}
};

MarkCell.prototype.SetInitial = function () {
	this.x = this.startX;
	this.y = this.startY;
	this.flipped = this.startFlipped;
};

MarkCell.prototype.Randomise = function () {
	this.x = Math.round(Math.random());
	this.y = Math.round(Math.random());
	this.flipped = !(Math.random()+.5|0);
};


//Mark 
function Mark () {
	this.cells = [];
	this.display = false;
};

//Creates the cells based on the initial grid
Mark.prototype.Init = function(startStateGrid) {
	for (var row = 0; row < startStateGrid.rows.length; row++) {
		for (var col = 0; col < startStateGrid.rows[row].length; col++) {
			var cl = new MarkCell();
			cl.gridXPos = col;
			cl.gridYPos = row;
			cl.startX = startStateGrid.rows[row][col].x;
			cl.startY = startStateGrid.rows[row][col].y;
			cl.startFlipped = startStateGrid.rows[row][col].flipped;
			cl.SetInitial();
			this.cells.push(cl);
		}
	}
};

Mark.prototype.Draw = function() {
	//If display is false call random then draw else 	
	var shouldRand = (!(Math.random()+.175|0));
	for (var i = 0; i < this.cells.length; i++) {
		if (mouseMoved == false) {
			xColour = color(25/2,53/2,73/2);
			yColour =  color(25/2.5,53/2.5,73/2.5);
			triStroke = false;
			this.cells[i].SetInitial();
			this.cells[i].Draw();
		}else{
			yColour =  color(255,198,0);
			if ((!(Math.random()+.575|0))) {
				yColour = triStrokeColour;	
			}
			triStroke = true;
			if (shouldRand) {
				this.cells[i].Randomise();
			}
			this.cells[i].Draw();
		}
	};
};

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  	gridSize = windowWidth / 50;
	borderPadding = windowWidth * 0.025;
	//xOffset = (windowWidth / 2) - ((gridSize * 10) / 2);
	//yOffset = (windowHeight / 2) - ((gridSize * 6) / 2);
	xOffset = windowWidth - (gridSize * 10) - (borderPadding / 2) - 2;
	yOffset = windowHeight - (gridSize * 6) - (borderPadding / 2) - 2;
};
function onHoverEnter() { };
function onHoverExit() { };
