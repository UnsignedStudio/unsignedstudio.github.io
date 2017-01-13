var parallaxElements = $('.parallax-img'),
    parallaxQuantity = parallaxElements.length;

$(window).on('scroll', function ()
{
  parallax();
});

$(window).on('resize', function ()
{
  parallax();
});

function parallax() {
  window.requestAnimationFrame(function ()
  {
    for (var i = 0; i < parallaxQuantity; i++)
    {
      var currentElement = parallaxElements.eq(i);
      var height = currentElement.height();
      var scrolled = height * -0.4 + $(window).scrollTop() * 0.3 + 'px';

      currentElement.css({
        'margin-top': scrolled
      });
    }
  });
}