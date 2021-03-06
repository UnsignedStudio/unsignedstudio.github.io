$(document).ready(function()
{
  // Get media - with autoplay disabled (audio or video)
  var media = $('video.video-scroll');
  var tolerancePixel = 80;

  function checkMedia()
  {
    // Get current browser top and bottom
    var scrollTop = $(window).scrollTop() + tolerancePixel;
    var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

    media.each(function(index, el)
    {
        var yTopMedia = $(this).offset().top;
        var yBottomMedia = $(this).height() + yTopMedia;

        if (scrollTop < yBottomMedia && scrollBottom > yTopMedia)
            $(this).get(0).play();
        else
            $(this).get(0).pause();
    });
}
  $(document).on('scroll', checkMedia);
});