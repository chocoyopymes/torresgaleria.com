$(document).ready(function() {
  countItemsRelated();
  if ($('#tmrelatedproducts').length && !!$.prototype.bxSlider) {
    tmrelatedproducts_slider = $('#tmrelatedproducts').bxSlider({
      minSlides: related_carousel_items,
      maxSlides: related_carousel_items,
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
    if ($('#tmrelatedproducts').length) {
      resizeCarouselRelated()
    }
  });
} else {
  $(window).on("orientationchange", function() {
    var orientation_time;
    clearTimeout(orientation_time);
    orientation_time = setTimeout(function() {
      if ($('#tmrelatedproducts').length) {
        resizeCarouselRelated()
      }
    }, 500);
  });
}
function resizeCarouselRelated() {
  countItemsRelated();
  tmrelatedproducts_slider.reloadSlider({
    minSlides: related_carousel_items,
    maxSlides: related_carousel_items,
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
function countItemsRelated() {
  if ($('.related-block').width() < 460)
    related_carousel_items = 1;
  if ($('.related-block').width() > 459)
    related_carousel_items = 2;
  if ($('.related-block').width() >= 900)
    related_carousel_items = 3;
  if ($('.related-block').width() >= 1500)
    related_carousel_items = 4;
  if ($('.related-block').width() >= 2048)
    related_carousel_items = 5;
}