var parallaxElements = $('.parallax'),
    parallaxQuantity = parallaxElements.length;
var buffer = 170;

$(window).on('scroll', function ()
{
  window.requestAnimationFrame(function ()
  {
    for (var i = 0; i < parallaxQuantity; i++)
    {
      var currentElement = parallaxElements.eq(i);
      var scrolled = buffer + $(window).scrollTop() * -0.15 + 'px';

      currentElement.css({
        'transform': 'translate3d(0,' + scrolled + ', 0)'
      });
    }
  });
});