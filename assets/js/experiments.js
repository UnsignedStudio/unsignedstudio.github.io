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
  
  // Calculate grid size
  var gridSize;
  if (window.innerWidth < 768) {
    gridSize = 2;
  }
  else {
    var area = (window.innerHeight - 160) * window.innerWidth;
    var imageSize = Math.ceil(Math.sqrt(area / numOfImages));
    gridSize = Math.ceil(window.innerWidth / imageSize);
  }
  
  // Calculate image dimensions and number of gaps based on gridSize
  var calc = "calc(" + 100 / gridSize + "% - " + (gridSize - 1) * 5 / gridSize + "px)";
  var numToMove = numOfImages % gridSize == 0 ? 0 : gridSize - numOfImages % gridSize;
  
  // Reset images
  for (var i = 0; i < numOfImages; i++) {
    $(".grid").eq(i).css({
      'margin-right': '5px',
      'width': calc
    });
  }
  
  // Remove old gaps
  for (var i = 0; i < gaps.length; i++)
    gaps[i].remove();
  
  // Create gaps at random points
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
    gaps[i].height(gaps[i].width());
  }
  
  // Remove right margin from far-right items
  var gridElements = $("#experiments-holder").children();
  for (var i = gridSize - 1; i < gridElements.length; i += gridSize)
    gridElements.eq(i).css({
      'margin-right': '0'
    });
}