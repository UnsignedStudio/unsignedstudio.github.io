$(function() {
  var temp = new p5();
  var height = temp.windowHeight;
  $('#oct').height(height);
  $('#dec').height(height);
  $('#jan').height(height);
  
  temp.draw = function() {
    remove();
  }
});

