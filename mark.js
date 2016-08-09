

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
	gridSize = windowWidth / 20;

	xOffset = (windowWidth / 2) - ((gridSize * 10) / 2);
	yOffset = (windowHeight / 2) - ((gridSize * 6) / 2);

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
		}

		//Y Tri
		if (this.y == 1) {
			fill(yColour);
			triangle(p_left, p_top, p_left + gridSize, p_top + gridSize, p_left, p_top + gridSize);
		}
	}else{
		//X Tri
		if (this.x == 1) {
			fill(xColour);
			triangle(p_left, p_top, p_left + gridSize, p_top, p_left, p_top + gridSize);
		}

		//Y Tri
		if (this.y == 1) {
			fill(yColour);
			triangle(p_left + gridSize, p_top, p_left + gridSize, p_top + gridSize, p_left, p_top + gridSize);
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
}

Mark.prototype.Draw = function() {
	//If display is false call random then draw else 	
	for (var i = 0; i < this.cells.length; i++) {
		if (mouseMoved == false) {
			xColour = color(25/2,53/2,73/2);
			yColour =  color(25/2.5,53/2.5,73/2.5);
			triStroke = false;
			this.cells[i].SetInitial();
			this.cells[i].Draw();
		}else{
			yColour =  color(255,198,0);
			triStroke = true;
			this.cells[i].Randomise();
			this.cells[i].Draw();
		}
	};
};

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  	gridSize = windowWidth / 20;

	xOffset = (windowWidth / 2) - ((gridSize * 10) / 2);
	yOffset = (windowHeight / 2) - ((gridSize * 6) / 2);
};
