var gaps = [];

$(document).ready(function() {
  imageGrid();
});

$(window).resize(function() {
  imageGrid();
});

function imageGrid() {
  var numOfImages = $(".grid").length;
  var w = window.innerWidth;
  
  if (w >= 1400) {
    console.log(6);
    if (numOfImages % 6 != 0)
      resizeGrid(numOfImages, 6, "calc(16.66% - 4.16px)");
  }
  else if (w >= 1000) {
    console.log(5);
    if (numOfImages % 5 != 0)
      resizeGrid(numOfImages, 5, "calc(20% - 4px)");
  }
  else if (w >= 768) {
    console.log(4);
    if (numOfImages % 4 != 0)
      resizeGrid(numOfImages, 4, "calc(25% - 3.75px)");
  }
  else {
    console.log(2);
    if (numOfImages % 2 != 0)
      resizeGrid(numOfImages, 2, "calc(50% - 2.5px)");
  }
}

function resizeGrid(numOfImages, gridSize, calc) {
  for (var i = 0; i < numOfImages; i++)
    $(".grid").eq(i).css({
      'margin-right': '5px'
    });
  
  var numToMove = gridSize - numOfImages % gridSize;
  for (var i = 0; i < gaps.length; i++)
    gaps[i].remove();
  
  gaps = [];
  for (var i = 0; i < numToMove; i++) {
    var elem = $(".grid").eq(Math.floor((Math.random() * numOfImages * 0.8))).after("<div />");
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