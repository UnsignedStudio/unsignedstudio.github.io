var parallaxElements = $('.parallax-img'),
    parallaxQuantity = parallaxElements.length;
var buffer = -700;

$(window).on('scroll', function ()
{
  window.requestAnimationFrame(function ()
  {
    for (var i = 0; i < parallaxQuantity; i++)
    {
      var currentElement = parallaxElements.eq(i);
      var scrolled = buffer + $(window).scrollTop() * 0.4 + 'px';
      console.log(scrolled);

      currentElement.css({
        'margin-top': scrolled
      });
    }
  });
});