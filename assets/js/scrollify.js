$(document).ready(function() {
  setProjectNameHeight();
  $.scrollify({
    section : ".scroll-snap",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : -20,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: false,
    updateHash: true,
    touchScroll:true,
    before:function() {},
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
  });
});

window.addEventListener('resize', setProjectNameHeight);

function setProjectNameHeight() {
  var offset = "7em";
  if ($(window).width() < 768)
    offset = "4em";
  
  for (var i = 0; i < $(".scroll-snap").length; i++) {
    var section = $(".scroll-snap").eq(i);
    var bottom;
    var project = section.find(".project");
    
    if (section.height() > $(window).height()) {
      var diff = section.height() - $(window).height();
      bottom = "calc(" + offset + " + " + diff + "px)";
    }
    else
      bottom = offset;
    
    project.css({
      'bottom': bottom
    });
  }
}