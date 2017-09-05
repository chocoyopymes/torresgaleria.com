$(document).ready(function() {
  if (typeof(homeslider_speed) == 'undefined') {
    homeslider_speed = 500;
  }
  if (typeof(homeslider_pause) == 'undefined') {
    homeslider_pause = 3000;
  }
  if (typeof(homeslider_loop) == 'undefined') {
    homeslider_loop = true;
  }
  if (typeof(homeslider_width) == 'undefined') {
    homeslider_width = 10000;
  }
  if (!!$.prototype.bxSlider) {
    var slideControls;
    $('#homeslider').bxSlider({
      mode: 'horizontal',
      useCSS: false,
      maxSlides: 1,
      slideWidth: homeslider_width,
      infiniteLoop: homeslider_loop,
      hideControlOnEnd: true,
      pager: true,
      autoHover: true,
      autoControls: false,
      auto: homeslider_loop,
      speed: parseInt(homeslider_speed),
      pause: homeslider_pause,
      controls: true,
      startText: '',
      stopText: '',
      nextText: '<span>Next</span>',
      prevText: '<span>Prev</span>',
      //pagerCustom: '#bx-pager-thumb',
      onSliderLoad: function() {
        slideControls = $('#homepage-slider').find('.bx-controls-direction');
      },
      onSlideBefore: function() {
        slideControls.addClass('load');
      },
      onSlideAfter: function() {
        slideControls.removeClass('load');
      }
    });
  }
  $('.homeslider-description').click(function() {
    window.location.href = $(this).prev('a').prop('href');
  });
});