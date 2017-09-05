$(document).ready(function() {
  countItemsCross();
  if ($('#crossselling_list_car').length && !!$.prototype.bxSlider) {
    crosseling_slider = $('#crossselling_list_car').bxSlider({
      minSlides: cross_carousel_items,
      maxSlides: cross_carousel_items,
      slideWidth: 500,
      slideMargin: 30,
      pager: false,
      nextText: '',
      prevText: '',
      moveSlides: 1,
      infiniteLoop: false,
      hideControlOnEnd: true,
      responsive: true,
      useCSS: false,
      autoHover: false,
      speed: 500,
      pause: 3000,
      controls: true,
      autoControls: false
    });
  }
});
if (!isMobile) {
  $(window).resize(function() {
    if ($('#crossselling_list_car').length) {
      resizeCarouselCross()
    }
  });
} else {
  $(window).on("orientationchange", function() {
    var orientation_time;
    clearTimeout(orientation_time);
    orientation_time = setTimeout(function() {
      if ($('#crossselling_list_car').length) {
        resizeCarouselCross()
      }
    }, 500);
  });
}
function resizeCarouselCross() {
  countItemsCross();
  crosseling_slider.reloadSlider({
    minSlides: cross_carousel_items,
    maxSlides: cross_carousel_items,
    slideWidth: 500,
    slideMargin: 30,
    pager: false,
    nextText: '',
    prevText: '',
    moveSlides: 1,
    infiniteLoop: false,
    hideControlOnEnd: true,
    responsive: true,
    useCSS: false,
    autoHover: false,
    speed: 500,
    pause: 3000,
    controls: true,
    autoControls: false
  });
}
function countItemsCross() {
  if ($('#crossselling').width() < 460)
    cross_carousel_items = 1;
  if ($('#crossselling').width() > 459)
    cross_carousel_items = 2;
  if ($('#crossselling').width() >= 900)
    cross_carousel_items = 3;
  if ($('#crossselling').width() >= 1500)
    cross_carousel_items = 4;
  if ($('#crossselling').width() >= 2048)
    cross_carousel_items = 5;
}