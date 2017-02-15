var gaps = [];

$(document).ready(function() {
  imageGrid();
});

$(window).resize(function() {
  imageGrid();
});

function imageGrid() {
  resizeGrid();
}

function resizeGrid(numOfImages) {
  var numOfImages = $(".grid").length;
  var area = (window.innerHeight - 160) * window.innerWidth;
  var imageSize = Math.ceil(Math.sqrt(area / numOfImages));
  var gridSize = Math.ceil(window.innerWidth / imageSize);
  if (window.innerWidth < 768)
    gridSize = 2;
  
  var calc = "calc(" + 100 / gridSize + "% - " + (gridSize - 1) * 5 / gridSize + "px)";
    console.log(calc);
  
  for (var i = 0; i < numOfImages; i++) {
    $(".grid").eq(i).css({
      'margin-right': '5px',
      'width': calc
    });
  }
  
  var numToMove = gridSize - numOfImages % gridSize;
  if (numToMove == gridSize)
    numToMove = 0;
  
  for (var i = 0; i < gaps.length; i++)
    gaps[i].remove();
  
  gaps = [];
  for (var i = 0; i < numToMove; i++) {
    var elem;
    if (window.innerWidth < 768)
      elem = $(".grid").eq(numOfImages - 1).after("<div />");
    else
      elem = $(".grid").eq(Math.floor((Math.random() * numOfImages * 0.8))).after("<div />");
    
    gaps[i] = elem.next();
    gaps[i].css({
      'display': 'inline-block',
      'margin-bottom': '5px',
      'margin-right': '5px',
      'width': calc,
      'border': 'none',
      'vertical-align': 'middle'
    });
    gaps[i].height(gaps[i].width() - 5);
  }
  
  var gridElements = $("#experiments-holder").children();
  for (var i = gridSize - 1; i < gridElements.length; i += gridSize)
    gridElements.eq(i).css({
      'margin-right': '0'
    });
}