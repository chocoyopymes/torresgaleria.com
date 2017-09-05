/**
 * 2002-2016 TemplateMonster
 *
 * TM Mega Layout
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the General Public License (GPL 2.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/GPL-2.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the module to newer
 * versions in the future.
 *
 *  @author    TemplateMonster (Alexander Grosul & Alexander Pervakov)
 *  @copyright 2002-2016 TemplateMonster
 *  @license   http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
 */
var isMobile = false;
$(document).ready(function() {
  compareBtn();
  mobileMenu();
  $(window).resize(function() {
    mobileMenu();
  });
  if ($('.top_menu').length > 0) {
    var stickMenu = true;
    var stickUp = $(".stick-up");
    if (stickMenu && stickUp && $('body').width() > 1199) {
      stickUp.wrap('<div class="stickUpTop"><div class="stickUpHolder container">');
      $('.stickUpTop').tmStickUp();
    }
  }
});
function compareBtn() {
  var compare_lnk = $('header .compare-form');
  var compare_div = $('header .compare-button');
  if (compare_div && compare_lnk) {
    compare_lnk.appendTo(compare_div);
  }
}
function mobileMenu() {
  var menu_mobile;
  var html_top;
  var languages = $('#languages-block-top');
  var currencies = $('#currencies-block-top');
  var head_login = $('#header-login');
  var top_menu = $('header .top_menu > .menu');
  var options_content;
  if ($(document).width() <= 1199 && !isMobile) {
    $('#header').append('<div class="options"><span id="options-toggle"></span><div class="options-content"></div></div>');
    options_content = $('#header').find('.options-content');
    if (head_login.length) {
      head_login.parent().addClass('header-login');
      head_login.appendTo(options_content);
    }
    if (languages.length) {
      languages.parent().addClass('languages');
      languages.appendTo(options_content);
    }
    if (currencies.length) {
      currencies.parent().addClass('currencies');
      currencies.appendTo(options_content);
    }
    if (top_menu.length) {
      html_top = $('#tmhtmlcontent_top');
      top_menu.append('<li class="mobile-items"></li>');
      menu_mobile = top_menu.find('.mobile-items');
      if (html_top.length) {
        html_top.parent().addClass('html-top');
        html_top.appendTo(menu_mobile);
      }
    }
    var options_div = $('header .options');
    if (options_div) {
      $('#options-toggle').on('click', function() {
        if (options_content.is(':visible')) {
          options_div.removeClass('active');
          options_content.slideUp();
        } else {
          options_div.addClass('active');
          options_content.slideDown();
        }
      });
      $(document).mouseup(function(e) {
        if (options_div.has(e.target).length === 0) {
          options_div.removeClass('active');
          options_content.slideUp();
        }
      });
    }
    isMobile = true;
  } else if ($(document).width() > 1199 && isMobile) {
    menu_mobile = top_menu.find('.mobile-items');
    html_top = menu_mobile.find('#tmhtmlcontent_top');
    if (head_login.length) {
      head_login.appendTo($('header .header-login'));
    }
    if (languages.length) {
      languages.appendTo($('header .languages'));
    }
    if (currencies.length) {
      currencies.appendTo($('header .currencies'));
    }
    if (html_top.length) {
      html_top.appendTo($('header .html-top'));
    }
    menu_mobile.remove();
    $('#header').find('.options').remove();
    isMobile = false;
  }
}
/* Stik Up menu script */
(function($) {
  $.fn.tmStickUp = function(options) {
    var getOptions = {
      correctionSelector: $('.correctionSelector')
    };
    $.extend(getOptions, options);
    var
      _this = $(this)
      , _window = $(window)
      , _document = $(document)
      , thisOffsetTop = 0
      , thisOuterHeight = 0
      , thisMarginTop = 0
      , thisPaddingTop = 0
      , documentScroll = 0
      , pseudoBlock
      , lastScrollValue = 0
      , scrollDir = ''
      , tmpScrolled
      ;
    init();
    function init() {
      thisOffsetTop = parseInt(_this.offset().top);
      thisMarginTop = parseInt(_this.css('margin-top'));
      thisOuterHeight = parseInt(_this.outerHeight(true));
      $('<div class="pseudoStickyBlock"></div>').insertAfter(_this);
      pseudoBlock = $('.pseudoStickyBlock');
      pseudoBlock.css({'position': 'relative', 'display': 'block'});
      addEventsFunction();
    }//end init
    function addEventsFunction() {
      _document.on('scroll', function() {
        tmpScrolled = $(this).scrollTop();
        if (tmpScrolled > lastScrollValue) {
          scrollDir = 'down';
        } else {
          scrollDir = 'up';
        }
        lastScrollValue = tmpScrolled;
        correctionValue = getOptions.correctionSelector.outerHeight(true);
        documentScroll = parseInt(_window.scrollTop());
        if (thisOffsetTop - correctionValue < documentScroll) {
          _this.addClass('isStuck');
          _this.css({position: 'fixed', top: correctionValue});
          pseudoBlock.css({'height': thisOuterHeight});
        } else {
          _this.removeClass('isStuck');
          _this.css({position: 'relative', top: 0});
          pseudoBlock.css({'height': 0});
        }
      }).trigger('scroll');
    }
  }; //end tmStickUp function
})(jQuery);