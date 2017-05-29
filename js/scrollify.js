$(window).load(function() {
  $.scrollify({
    section : ".scroll-snap",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 850,
    offset: 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: false,
    updateHash: true,
    touchScroll: false,
    before:function() {},
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
  });
});