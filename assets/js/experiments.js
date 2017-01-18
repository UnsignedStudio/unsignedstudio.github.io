$(function() {
  var tempp5 = new p5();
  var height = tempp5.windowHeight;
  $('#oct').height(height);
  $('#dec').height(height);
  $('#jan').height(height);
  
  tempp5.draw = function() {
    remove();
  }
});

