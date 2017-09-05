//global variables
var responsiveflag = false;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var isiPad = /iPad/i.test(navigator.userAgent);
$(document).ready(function() {
  controller = new ScrollMagic();
  highdpiInit();
  responsiveResize();
  $(window).resize(responsiveResize);
  if (navigator.userAgent.match(/Android/i)) {
    var viewport = document.querySelector('meta[name="viewport"]');
    viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
    window.scrollTo(0, 1);
  }
  blockHover();
  if (typeof quickView !== 'undefined' && quickView) {
    quick_view();
  }
  dropDown();
  sitemapAccordion();
  counter();
  testimonialsSlider();
  toTop();
  if ($('#homepage-blog').length) {
    smartblogCarousel();
  }
  if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'product'])) {
    bindGrid();
    $(document).on('change', '.selectProductSort', function(e) {
      if (typeof request != 'undefined' && request) {
        var requestSortProducts = request;
      }
      var splitData = $(this).val().split(':');
      var url = '';
      if (typeof requestSortProducts != 'undefined' && requestSortProducts) {
        url += requestSortProducts;
        if (typeof splitData[0] !== 'undefined' && splitData[0]) {
          url += ( requestSortProducts.indexOf('?') < 0 ? '?' : '&') + 'orderby=' + splitData[0] + (splitData[1] ? '&orderway=' + splitData[1] : '');
          if (typeof splitData[1] !== 'undefined' && splitData[1]) {
            url += '&orderway=' + splitData[1];
          }
        }
        document.location.href = url;
      }
    });
    $(document).on('change', 'select[name="n"]', function() {
      $(this.form).submit();
    });
    $(document).on('change', 'select[name="currency_payment"]', function() {
      setCurrency($(this).val());
    });
  }
  $(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function() {
    if (this.value != '') {
      location.href = this.value;
    }
  });
  $(document).on('click', '.back', function(e) {
    e.preventDefault();
    history.back();
  });
  jQuery.curCSS = jQuery.css;
  if (!!$.prototype.cluetip) {
    $('a.cluetip').cluetip({
      local: true,
      cursor: 'pointer',
      dropShadow: false,
      dropShadowSteps: 0,
      showTitle: false,
      tracking: true,
      sticky: false,
      mouseOutClose: true,
      fx: {
        open: 'fadeIn',
        openSpeed: 'fast'
      }
    }).css('opacity', 0.8);
  }
  if (typeof(FancyboxI18nClose) !== 'undefined' && typeof(FancyboxI18nNext) !== 'undefined' && typeof(FancyboxI18nPrev) !== 'undefined' && !!$.prototype.fancybox) {
    $.extend($.fancybox.defaults.tpl, {
      closeBtn: '<a title="' + FancyboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
      next: '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
      prev: '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
    });
  }
  // Close Alert messages
  $('.alert.alert-danger').on('click', this, function(e) {
    if (e.offsetX >= 16 && e.offsetX <= 39 && e.offsetY >= 16 && e.offsetY <= 34) {
      $(this).fadeOut();
    }
  });
  if (navigator.userAgent.search(/Trident/) > -1) {
    $('html').addClass("ie");
  }
});
function highdpiInit() {
  if (typeof highDPI === 'undefined') {
    return;
  }
  if (highDPI && $('.replace-2x').css('font-size') == '1px') {
    var els = $('img.replace-2x').get();
    for (var i = 0; i < els.length; i++) {
      src = els[i].src;
      extension = src.substr((src.lastIndexOf('.') + 1));
      src = src.replace('.' + extension, '2x.' + extension);
      var img = new Image();
      img.src = src;
      img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
    }
  }
}
// Used to compensante Chrome/Safari bug (they don't care about scroll bar for width)
function scrollCompensate() {
  var inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';
  var outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);
  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) {
    w2 = outer.clientWidth;
  }
  document.body.removeChild(outer);
  return (w1 - w2);
}
function responsiveResize() {
  compensante = scrollCompensate();
  if (($(window).width() + scrollCompensate()) <= 767 && responsiveflag == false) {
    accordion('enable');
    accordionFooter('enable');
    responsiveflag = true;
    if (typeof bindUniform !== 'undefined') {
      bindUniform();
    }
  } else if (($(window).width() + scrollCompensate()) >= 768) {
    accordion('disable');
    accordionFooter('disable');
    responsiveflag = false;
    if (typeof bindUniform !== 'undefined') {
      bindUniform();
    }
  }
}
function blockHover(status) {
  $(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function(e) {
    if ('ontouchstart' in document.documentElement) {
      return;
    }
    if ($('body').find('.container').width() >= 1100) {
      $(this).parent().addClass('hovered');
    }
  });
  $(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function(e) {
    if ($('body').find('.container').width() >= 1100) {
      $(this).parent().removeClass('hovered');
    }
  });
}
function quick_view() {
  $(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function(e) {
    e.preventDefault();
    var url = $(this).attr('data-href');
    if (!url && url == 'undefined') {
      var url = this.rel;
    }
    var anchor = '';
    if (url.indexOf('#') != -1) {
      anchor = url.substring(url.indexOf('#'), url.length);
      url = url.substring(0, url.indexOf('#'));
    }
    if (url.indexOf('?') != -1) {
      url += '&';
    } else {
      url += '?';
    }
    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding': 0,
        'width': 732,
        'height': 410,
        'type': 'iframe',
        'href': url + 'content_only=1' + anchor
      });
    }
  });
}
function bindGrid() {
  var storage = false;
  if (typeof(getStorageAvailable) !== 'undefined') {
    storage = getStorageAvailable();
  }
  if (!storage) {
    return;
  }
  var view = $.totalStorage('display');
  if (!view && (typeof displayList != 'undefined') && displayList) {
    view = 'list';
  }
  if (view && view != 'grid') {
    display(view);
  } else {
    $('.display').find('li#grid').addClass('selected');
  }
  $(document).on('click', '#grid, #list', function(e) {
    e.preventDefault();
    if (!$(this).hasClass('selected')) {
      display($(this).attr('id'));
    }
  });
}
function display(view) {
  if (view == 'list') {
    $('ul.product_list').removeClass('grid').addClass('list row');
    $('.product_list > li:visible')
      .removeAttr('class')
      .addClass('ajax_block_product col-xs-12');
    $('.product_list > li:visible').each(function(index, element) {
      var html = '';
      html += '<div class="product-container"><div class="row"><div class="left-block col-xs-4">' + $(element).find('.left-block').html() + '</div>';
      html += '<div class="right-block col-xs-8">' + $(element).find('.right-block').html() + '</div></div></div>';
      $(element).html(html);
      var hookReviews = $(element).find('.hook-reviews');
      if (hookReviews.length) {
        $(element).find('.button-container').before(hookReviews);
      }
    });
    $('.display').find('li#list').addClass('selected');
    $('.display').find('li#grid').removeAttr('class');
    $.totalStorage('display', 'list');
    if ($('.product_list li div.wishlist').length) {
      WishlistButton();
    }
  } else {
    $('ul.product_list').removeClass('list').addClass('grid row');
    if (nbItemsPerLine && nbItemsPerLineTablet && nbItemsPerLineMobile) {
      var totModulo = ($('.product_list > li').length) % nbItemsPerLine;
      totModulo == 0 ? totModulo = nbItemsPerLine : totModulo = totModulo;
      var totModuloLine = ($('.product_list > li').length) - totModulo;
      var totModuloTab = ($('.product_list > li').length) % nbItemsPerLineTablet;
      totModuloTab == 0 ? totModuloTab = nbItemsPerLineTablet : totModuloTab = totModuloTab;
      var totModuloTabLine = ($('.product_list > li').length) - totModuloTab;
      var totModuloMob = ($('.product_list > li').length) % nbItemsPerLineMobile;
      totModuloMob == 0 ? totModuloMob = nbItemsPerLineMobile : totModuloMob = totModuloMob;
      var totModuloMobLine = ($('.product_list > li').length) - totModuloMob;
    }
    $('.product_list > li:visible').each(function(index, element) {
      if (nbItemsPerLine && nbItemsPerLineTablet && nbItemsPerLineMobile) {
        $(element)
          .removeAttr('class')
          .addClass('ajax_block_product col-xs-' + 12 / nbItemsPerLineMobile + ' col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine);
        (index + 1) % nbItemsPerLine == 0 ? $(element).addClass('last-in-line') : false;
        (index + 1) % nbItemsPerLine == 1 ? $(element).addClass('first-in-line') : false;
        (index + 1) > totModuloLine ? $(element).addClass('last-line') : false;
        (index + 1) % nbItemsPerLineTablet == 0 ? $(element).addClass('last-item-of-tablet-line') : false;
        (index + 1) % nbItemsPerLineTablet == 1 ? $(element).addClass('first-item-of-tablet-line') : false;
        (index + 1) > totModuloTabLine ? $(element).addClass('last-tablet-line') : false;
        (index + 1) % nbItemsPerLineMobile == 0 ? $(element).addClass('last-item-of-mobile-line') : false;
        (index + 1) % nbItemsPerLineMobile == 1 ? $(element).addClass('first-item-of-mobile-line') : false;
        (index + 1) > totModuloMobLine ? $(element).addClass('last-mobile-line') : false;
      }
      var html = '';
      html += '<div><div class="product-container"><div class="left-block">' + $(element).find('.left-block').html() + '</div>';
      html += '<div class="right-block">' + $(element).find('.right-block').html() + '</div></div></div>';
      $(element).html(html);
      var hookReviews = $(element).find('.hook-reviews');
      if (hookReviews.length) {
        hookReviews.appendTo($(element).find('.view-content'));
      }
    });
    $('.display').find('li#grid').addClass('selected');
    $('.display').find('li#list').removeAttr('class');
    $.totalStorage('display', 'grid');
    if ($('.product_list li div.wishlist').length) {
      WishlistButton();
    }
  }
}
function dropDown() {
  elementClick = '#header .current';
  elementSlide = 'ul.toogle_content';
  activeClass = 'active';
  $(elementClick).on('click', function(e) {
    e.stopPropagation();
    var subUl = $(this).next(elementSlide);
    if (subUl.is(':hidden')) {
      subUl.slideDown();
      $(this).addClass(activeClass);
    } else {
      subUl.slideUp();
      $(this).removeClass(activeClass);
    }
    $(elementClick).not(this).next(elementSlide).slideUp();
    $(elementClick).not(this).removeClass(activeClass);
    e.preventDefault();
  });
  $(elementSlide).on('click', function(e) {
    e.stopPropagation();
  });
  $(document).on('click', function(e) {
    e.stopPropagation();
    if (e.which != 3) {
      var elementHide = $(elementClick).next(elementSlide);
      $(elementHide).slideUp();
      $(elementClick).removeClass('active');
    }
  });
}
function accordionFooter(status) {
  if (status == 'enable') {
    $('#footer .footer-block h4').on('click', function(e) {
      $(this)
        .toggleClass('active')
        .parent()
        .find('.toggle-footer')
        .stop()
        .slideToggle('medium');
      e.preventDefault();
    });
    $('#footer')
      .addClass('accordion')
      .find('.toggle-footer')
      .slideUp('fast');
  } else {
    $('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
    $('#footer').removeClass('accordion');
  }
}
//  TOGGLE COLUMNS
function accordion(status) {
  if (status == 'enable') {
    $('#product .product-information .tab-content > h3, #right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').on('click', function() {
      $(this)
        .toggleClass('active')
        .parent()
        .find('.block_content')
        .stop()
        .slideToggle('medium');
      $(this)
        .next('.tab-pane')
        .stop()
        .slideToggle('medium');
    });
    $('#right_column, #left_column')
      .addClass('accordion')
      .find('.block:not(#layered_block_left) .block_content')
      .slideUp('fast');
    $('#product .product-information .tab-content > h3:first').addClass('active');
    if (typeof(ajaxCart) !== 'undefined') {
      ajaxCart.collapse();
    }
  } else {
    $('#product .product-information .tab-content > h3, #right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4')
      .removeClass('active')
      .off()
      .parent()
      .find('.block_content, .tab-pane')
      .removeAttr('style')
      .not('.tab-pane')
      .slideDown('fast');
    $('#left_column, #right_column').removeClass('accordion');
    $('#product .product-information .tab-content > h3:first').addClass('active');
  }
}
function bindUniform() {
  if (!!$.prototype.uniform) {
    $('select.form-control').not('.not_uniform').uniform();
  }
}
//  TOGGLE SITEMAP
function sitemapAccordion() {
  $('#sitemap #center_column ul.tree > li > ul')
    .addClass('accordion_content')
    .parent()
    .find('> a')
    .wrap('<p class="page-subheading accordion_current"></p>');
  $('#center_column .accordion_current').on('click', function() {
    $(this)
      .toggleClass('active')
      .parent()
      .find('.accordion_content')
      .stop()
      .slideToggle('medium');
  });
  $('#center_column')
    .addClass('accordionBox')
    .find('.accordion_content')
    .slideUp('fast');
  if (typeof(ajaxCart) !== 'undefined') {
    ajaxCart.collapse();
  }
}
function counter() {
  $('.count').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
}
function testimonialsSlider() {
  var testimonials_slider = $('#testimonials');
  testimonials_slider.bxSlider({
    responsive: true,
    useCSS: false,
    minSlides: 1,
    maxSlides: 1,
    slideWidth: 2560,
    slideMargin: 0,
    moveSlides: 1,
    pager: false,
    autoHover: false,
    speed: 500,
    pause: 3000,
    controls: true,
    autoControls: true,
    startText: '',
    stopText: '',
    prevText: '',
    nextText: ''
  });
}
function smartblogCarousel() {
  countPosts();
  var blogCarousel = $('#homepage-blog .block_content ul');
  var slideControls;
  if (blogCarousel.length && !!$.prototype.bxSlider) {
    blog_slider = blogCarousel.bxSlider({
      minSlides: blog_carousel_items,
      maxSlides: blog_carousel_items,
      slideWidth: 500,
      slideMargin: 30,
      pager: true,
      nextText: '',
      prevText: '',
      moveSlides: 1,
      infiniteLoop: true,
      hideControlOnEnd: true,
      responsive: true,
      useCSS: false,
      autoHover: false,
      speed: 500,
      pause: 3000,
      controls: true,
      autoControls: false,
      onSliderLoad: function() {
        slideControls = $('#homepage-blog').find('.bx-controls-direction');
      },
      onSlideBefore: function() {
        slideControls.addClass('load');
      },
      onSlideAfter: function() {
        slideControls.removeClass('load');
      }
    });
  }
  $(window).resize(function() {
    if (blogCarousel.length) {
      resizeBlogCarousel()
    }
  });
}
function resizeBlogCarousel() {
  countPosts();
  blog_slider.reloadSlider({
    minSlides: blog_carousel_items,
    maxSlides: blog_carousel_items,
    slideWidth: 500,
    slideMargin: 30,
    pager: true,
    nextText: '',
    prevText: '',
    moveSlides: 1,
    infiniteLoop: true,
    hideControlOnEnd: true,
    responsive: true,
    useCSS: false,
    autoHover: false,
    speed: 500,
    pause: 3000,
    controls: true,
    autoControls: false,
    onSliderLoad: function() {
      slideControls = $('#homepage-blog').find('.bx-controls-direction');
    },
    onSlideBefore: function() {
      slideControls.addClass('load');
    },
    onSlideAfter: function() {
      slideControls.removeClass('load');
    }
  });
}
function countPosts() {
  var smartblog = $('#homepage-blog');
  var itemsCount = smartblog.find('ul > li:not(.bx-clone)').length;
  blog_carousel_items = 1;
  if (smartblog.width() >= 480) {
    blog_carousel_items = 3;
  }
  if (smartblog.width() >= 992) {
    blog_carousel_items = 4;
  }
  if (smartblog.width() >= 1400) {
    blog_carousel_items = 5;
  }
  if (smartblog.width() >= 2200) {
    blog_carousel_items = 6;
  }
  if (itemsCount < blog_carousel_items) {
    smartblog.addClass('slider-off');
  } else {
    smartblog.removeClass('slider-off');
  }
}
function toTop() {
  var o = $('html');
  if (o.hasClass('desktop')) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }
}