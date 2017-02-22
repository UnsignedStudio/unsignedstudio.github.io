var gaps = [];

$(document).ready(function() {
  links();
  resizeGrid();
});

$(window).resize(function() {
  resizeGrid();
});

function links() {
  var gridElements = $("#experiments-holder").children();
  gridElements.click(function(e) {
    loadExperiment(e);
            
    $("#popup").css({
      'display': 'block'
    });
  });
  
  //close button
  $("#popup img").click(function() {
    $("#popup").css({
      'display': 'none'
    });
    $("#popup-holder").css({
        'background-image': ''
      });
    if (typeof p5obj !== 'undefined' && p5obj != null) {
      p5obj.remove();
      p5obj = null;
    }
    
    $("#caption").html('');
    $("#popup-holder").children().remove();
  });
}

function loadExperiment(e) {
  var expFile = e.currentTarget.getAttribute("data-path");
  var fileType = expFile.split(".")[1];
  var folder = expFile.split('/');
  folder = folder[folder.length - 2]
    
  $.get('content/experiments/' + folder + '/caption.txt', function(data){
    $("#caption").html(data);
  });
    
  if (fileType == "png" || fileType == "jpg") {
    expFile = "url(" + expFile + ")";
    $("#popup-holder").css({
      'background-image': expFile
    });
  }
  else if (fileType == "txt") {
    $("#popup-holder").append('<video autoplay="" muted="", loop="", width="100%" />');
    $.get('content/experiments/' + folder + '/experiment.txt', function(data){
      $("#popup-holder").children().append('<source src="' + data + '" />');
    });
  }
  else if (fileType == "js") {
    $.getScript(expFile);
  }
}

function resizeGrid() {
  var numOfImages = $(".grid").length;
  
  // Calculate grid size
  var gridSize;
  if (window.innerWidth < 768) {
    gridSize = 2;
    $("#popup").css({
      'position': 'fixed'
    });
  }
  else {
    $("#popup").css({
      'position': 'absolute'
    });
    var area = (window.innerHeight - 160) * window.innerWidth;
    var imageSize = Math.ceil(Math.sqrt(area / numOfImages));
    gridSize = Math.ceil(window.innerWidth / imageSize);
  }
  
  // Calculate image dimensions and number of gaps based on gridSize
  var calc = "calc(" + 100 / gridSize + "% - " + (gridSize - 1) * 5 / gridSize + "px)";
  var numToMove = numOfImages % gridSize == 0 ? 0 : gridSize - numOfImages % gridSize;
  
  // Reset images
  for (var i = 0; i < numOfImages; i++)
    $(".grid").eq(i).css({
      'margin-right': '5px',
      'width': calc
    });
  
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
    if (gridElements.eq(i).children().length > 0)
      gridElements.eq(i).children().css({
        'margin-right': '0'
      });
    else
      gridElements.eq(i).css({
        'margin-right': '0'
      });
}