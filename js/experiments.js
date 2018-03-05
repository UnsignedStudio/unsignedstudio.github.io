var gaps = [];
var videoAspect = 0;

$(document).ready(function() {
  init();
  resizeGrid();
});

$(window).resize(function() {
  resizeGrid();
  if (videoAspect != 0)
    resizeVideo();
});

function init() {
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
    videoAspect = 0;
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
    // Caption
    $("#caption").html(data);
  });
    
  if (fileType == "png" || fileType == "jpg") {
    // Image
    expFile = "url(" + expFile + ")";
    $("#popup-holder").css({
      'background-image': expFile
    });
  }
  else if (fileType == "txt") {
    // Video
    videoAspect = 0;
    $("#popup-holder").append('<video autoplay="", muted="", playsinline="", loop="", width="100%" />');
    
    $.get('content/experiments/' + folder + '/experiment.txt', function(data){
      $("#popup-holder").children().append('<source src="' + data + '" />');
    });
    
    $("#popup-holder").children().get(0).addEventListener("loadedmetadata", function () {
      videoAspect = this.videoWidth / this.videoHeight;
      resizeVideo();
    });
  }
  else if (fileType == "js") {
    // JavaScript
    $.getScript(expFile);
  }
}

function resizeVideo() {
  var divAspect = $("#popup-holder").width() / $("#popup-holder").height();
  var video = $("#popup-holder").children().eq(0);
  if (videoAspect > divAspect) {
    video.height($("#popup-holder").height());
    video.width(video.height() * videoAspect);
    translate = 'translateX(' + (video.width() - $("#popup-holder").width()) * -0.5 + 'px)';
    video.css({
      'transform': translate
    });
  }
  else {
    video.width($("#popup-holder").width());
    video.height(video.width() * divAspect);
    translate = 'translateY(' + (video.height() - $("#popup-holder").height()) * -0.5 + 'px)';
    video.css({
      'transform': translate
    });
  }
}

function resizeGrid() {
  var numOfImages = $(".grid").length;
  var holderWidth = $("#experiments-holder").width();
  
  if (window.innerWidth < 768) {
    $("#popup").css({
      'position': 'fixed'
    });

    for (var i = 0; i < numOfImages; i++) {
      var width = (holderWidth - 20) / 2 + "px";
      var margin = i % 2 == 0 ?'5px' : '0';
      $(".grid").eq(i).css({
        'margin-right': margin,
        'width': width,
        'height': width,
        'background-size': 'cover'
      });
    }
  }
  else {
    $("#popup").css({
      'position': 'fixed'
    });

    var sections = Math.ceil(numOfImages / 6);
    for (var i = 0; i < sections; i++) {

      // 3 wide
      for (var j = 0; j < 3; j++) {
        if (i * 6 + j == numOfImages)
          return;

        var width = ((holderWidth - 11) / 3) + "px";
        var margin = j < 2 ? '5px' : '0';
        $(".grid").eq(i * 6 + j).css({
          'margin-right': margin,
          'width': width,
          'height': '363px',
          'background-size': 'cover'
        });
      }

      // 1 large
      if (i * 6 + 3 == numOfImages)
        return;

      var width = holderWidth + "px";
      $(".grid").eq(i * 6 + 3).css({
        'width': width,
        'height': '500px',
        'background-size': 'cover'
      });

      // 2 wide
      if (i * 6 + 4 == numOfImages)
        return;

      var rect = (holderWidth - 6) * 2 / 3 + "px";
      var square = (holderWidth - 6) * 1 / 3 + "px";
      $(".grid").eq(i * 6 + 4).css({
        'margin-right': '5px',
        'width': i % 2 == 0 ? rect : square,
        'height': square,
        'background-size': 'cover'
      });

      if (i * 6 + 5 < numOfImages) {
        $(".grid").eq(i * 6 + 5).css({
          'width': i % 2 == 0 ? square : rect,
          'height': square,
          'background-size': 'cover'
        });
      }
    }
  }
}