


var life = function(p) {

	var WINDOW_WIDTH = null;
	var WINDOW_HEIGHT = null;
	var PADDING = 10;
	var FRAME_RATE = 60;
	 
	var COLUMNS = 75;
	var ROWS = 75;
	var CHANCE_OF_LIVING = 60;
	var DEAD = 0;
	var ALIVE = 1;

	var grid = null;

	p.setup = function () {
		
		WINDOW_HEIGHT = $("#popup-holder").height();
		WINDOW_WIDTH = $("#popup-holder").width();
		p.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
		
		COLUMNS = WINDOW_WIDTH/14;
		ROWS = WINDOW_HEIGHT/14;

		grid = new Grid();
		p.strokeWeight(2);
	
		bgColor = p.color(25,53,73);
		normColor = p.color(0,136,255);
		accColor = p.color(255,198,0);
		whiteColor = p.color(255,239,255);
	}
	p.draw = function() { 
		p.background(20); 
		grid.drawGrid(); 
		grid.updateGrid(); 
	}
	p.keyPressed = function() { grid.randomizeGrid(); }
	 
	p.mousePressed = function() { var cell = grid.getCellUnderMouse(); cell.setState(ALIVE); }
	p.touchEnded = function() { var cell = grid.getTouchedCell(); cell.setState(ALIVE); }
	p.windowResized = function() {
	  	var myWidth = $("#popup-holder").width();
		var myHeight = $("#popup-holder").height();
		WINDOW_WIDTH = myHeight;
		WINDOW_WIDTH = myWidth;
	    p.resizeCanvas(myWidth, myHeight);
	}
	//Cell Object
	function Cell (st) {
	 	this.state = st;
	 	this.nextState = 0;
	 }
	Cell.prototype.setState = function (s) {
		this.state = s;
	}
	Cell.prototype.setNextState = function (s) {
		this.nextState = s;
	}
	Cell.prototype.isAlive = function () {
		if (this.state == ALIVE) { return true; }
		else{ return false; }
	}
	Cell.prototype.updateState = function () {
		this.state = this.nextState;
	}


	//Grid Object
	function Grid() {

		this.aliveColour = p.color(255,198,0);
		this.deadColour = p.color(25,53,73);
		this.underMouseColour = p.color(0,136,255);

		this.grid = [];

		for (var x = 0; x < COLUMNS; x++) {
			this.grid.push([]);
			for (var y = 0; y < ROWS; y++) {
				this.grid[x][y] = new Cell(this.getRandomCellState());
			}
		}	
	}
	Grid.prototype.randomizeGrid = function () {
		for (var x = 0; x < COLUMNS; x++) {
			for (var y = 0; y < ROWS; y++) {
				this.grid[x][y].setState(this.getRandomCellState());
			}
		}	
	}
	Grid.prototype.getNeighborsCells = function (x, y) {
		cells = [];
		for (var dx = -1; dx <= 1; dx++) {
			for (var dy = -1; dy <= 1; dy++) {
				if (dx == 0 && dy == 0) { continue; }

				var nx = dx + x;
				var ny = dy + y;

				if (nx < 0 || nx >= COLUMNS) { continue; }
				if (ny < 0 || ny >= ROWS) { continue; }

				cells.push(this.grid[nx][ny]);
			}
		}
		return cells;
	}
	Grid.prototype.drawGrid = function () {
	    var originX = 0.0;
	    var originY = 0.0;
	    var cellWidth = WINDOW_WIDTH / (0.0 + COLUMNS) / 1.5;
	    var cellHeight = WINDOW_HEIGHT / (0.0 + ROWS) / 1.5;
	     
	    var cellUnderMouse = this.getCellUnderMouse();
	    p.clear()
	 	p.background(25/2,53/2,73/2);
	    p.noStroke();
	    p.ellipseMode(p.CORNER);
	 	
	    for (var x = 0; x < COLUMNS; x++) {
	      	for (var y = 0; y < ROWS; y++) {
	        	originX = p.map(x, 0.0, COLUMNS, PADDING, WINDOW_WIDTH - PADDING);
		        originY = p.map(y, 0.0, ROWS, PADDING, WINDOW_HEIGHT - PADDING);
		        if (this.grid[x][y].isAlive()) {
		          	p.fill(255,198,0)
		        } else if(this.grid[x][y] == cellUnderMouse) {
		          	p.fill(0,136,255)
		        } else {
		          	p.fill(25,53,73);
		        }
		        p.ellipse(originX, originY, cellWidth, cellHeight);
	      	}
		}
	}
	Grid.prototype.getCellUnderMouse = function () {
	    var x = Math.floor(p.constrain(p.map(p.mouseX, PADDING, WINDOW_WIDTH - PADDING, 0.0, COLUMNS), 0.0, COLUMNS-1));
	    var y = Math.floor(p.constrain(p.map(p.mouseY, PADDING, WINDOW_HEIGHT - PADDING, 0.0, ROWS), 0.0, ROWS-1));
	    return this.grid[x][y];
	}
	Grid.prototype.getTouchedCell = function () {
		var x = Math.floor(p.constrain(p.map(p.touchX, PADDING, WINDOW_WIDTH - PADDING, 0.0, COLUMNS), 0.0, COLUMNS-1));
	    var y = Math.floor(p.constrain(p.map(p.touchY, PADDING, WINDOW_HEIGHT - PADDING, 0.0, ROWS), 0.0, ROWS-1));
	    return this.grid[x][y];	
	}
	Grid.prototype.updateGrid = function () {
	 	var numberLiveNeighbors = 0;
		for (var x = 0; x < COLUMNS; x++) {
	      	for (var y = 0; y < ROWS; y++) {
	        	var neighbors = this.getNeighborsCells(x, y);

		        for (var i = 0; i < neighbors.length; i++) {
		          	if (neighbors[i].isAlive()) {
		            	numberLiveNeighbors++;
		          	}
		        }
	         
		        if (numberLiveNeighbors < 2 || numberLiveNeighbors > 3) {
		          	this.grid[x][y].setNextState(DEAD);
		        }
	 
		        if (numberLiveNeighbors == 3) {
		          this.grid[x][y].setNextState(ALIVE);
		        }
		        numberLiveNeighbors = 0;
	      	}
	    }
	     
	    for (var x = 0; x < COLUMNS; x++) {
	      	for (var y = 0; y < ROWS; y++) {
	        	this.grid[x][y].updateState();
	      	}
	    }
	}
	Grid.prototype.getRandomCellState = function () {
	    if (p.random(100) > CHANCE_OF_LIVING) {
	      	return ALIVE;
	    } else {
	      	return DEAD;
	    }
	}
}


var p5obj = new p5(life, 'popup-holder');