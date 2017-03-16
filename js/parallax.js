var parallaxElements = $('.parallax-img');
var scale = 0.9;

$(window).on('scroll', function () {
  parallax();
});

$(window).on('resize', function () {
  parallax();
});

function parallax() {
  for (var i = 0; i < parallaxElements.length; i++) {
    var currentElement = parallaxElements.eq(i);
    var parallax = currentElement.parent();
    var height = currentElement.height();
    var topOfParallax = parallax.offset().top;
    var windowBottom = $(window).scrollTop() + window.innerHeight;
    var pct = (windowBottom - topOfParallax) / (window.innerHeight + parallax.height()) * scale;
    var initialOffset = parallax.height() - height;
    var margin = initialOffset * (1 - pct);
    var translateY = 'translateY(' + margin + 'px)';
    
    currentElement.css({
      'transform': translateY
    });
  }
}