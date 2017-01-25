var parallaxElements = $('.parallax-img');
var parallaxQuantity = parallaxElements.length;
var scale = 0.9;

$(window).on('scroll', function ()
{
  parallax();
});

$(window).on('resize', function ()
{
  parallax();
});

function parallax() {
  for (var i = 0; i < parallaxQuantity; i++)
  {
    var currentElement = parallaxElements.eq(i);
    var parallax = currentElement.parent();
    var height = currentElement.height();
    var topOfParallax = parallax.offset().top;
    var windowBottom = $(window).scrollTop() + $(window).height();
    var pct = (windowBottom - topOfParallax) / ($(window).height() + parallax.height()) * scale;
    var initialOffset = parallax.height() - height;
    var margin = initialOffset * (1 - pct);
    
    currentElement.css({
      'margin-top': margin + "px"
    });
  }
}