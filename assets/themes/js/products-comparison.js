$(document).ready(function() {
  $(document).on('click', '.add_to_compare', function(e) {
    e.preventDefault();
    if (typeof addToCompare != 'undefined') {
      addToCompare(parseInt($(this).data('id-product')));
    }
  });
  reloadProductComparison();
  compareButtonsStatusRefresh();
});
function addToCompare(productId) {
  var totalValueNow = parseInt($('.bt_compare').next('.compare_product_count').val());
  var action, totalVal;
  if ($.inArray(parseInt(productId), comparedProductsIds) === -1) {
    action = 'add';
  } else {
    action = 'remove';
  }
  $.ajax({
    url: baseUri + '?controller=products-comparison&ajax=1&action=' + action + '&id_product=' + productId,
    async: true,
    cache: false,
    success: function(data) {
      if (action === 'add' && comparedProductsIds.length < comparator_max_item) {
        comparedProductsIds.push(parseInt(productId)),
          compareButtonsStatusRefresh(),
          totalVal = totalValueNow + 1,
          $('.bt_compare').next('.compare_product_count').val(totalVal),
          totalValue(totalVal);
        $('.bt_compare').find('.total-compare-val').removeClass('hidden');
      } else if (action === 'remove') {
        comparedProductsIds.splice($.inArray(parseInt(productId), comparedProductsIds), 1),
          compareButtonsStatusRefresh(),
          totalVal = totalValueNow - 1,
          $('.bt_compare').next('.compare_product_count').val(totalVal),
          totalValue(totalVal);
      } else {
        if (!!$.prototype.fancybox) {
          $.fancybox.open([
            {
              type: 'inline',
              autoScale: true,
              minHeight: 30,
              content: '<p class="fancybox-error">' + max_item + '</p>'
            }
          ], {
            padding: 0
          });
        } else {
          alert(max_item);
        }
      }
    },
    error: function() {
    }
  });
}
function reloadProductComparison() {
  $(document).on('click', 'a.cmp_remove', function(e) {
    e.preventDefault();
    var idProduct = parseInt($(this).data('id-product'));
    $.ajax({
      url: baseUri + '?controller=products-comparison&ajax=1&action=remove&id_product=' + idProduct,
      async: false,
      cache: false
    });
    $('td.product-' + idProduct).fadeOut(600);
    var compare_product_list = get('compare_product_list');
    var bak = compare_product_list;
    var new_compare_product_list = [];
    compare_product_list = decodeURIComponent(compare_product_list).split('|');
    for (var i in compare_product_list) {
      if (parseInt(compare_product_list[i]) != idProduct) {
        new_compare_product_list.push(compare_product_list[i]);
      }
    }
    if (new_compare_product_list.length) {
      window.location.search = window.location.search.replace(bak, new_compare_product_list.join(encodeURIComponent('|')));
    } else {
      totalValue(0);
    }
  });
};
function compareButtonsStatusRefresh() {
  $('.add_to_compare').each(function() {
    if ($.inArray(parseInt($(this).data('id-product')), comparedProductsIds) !== -1) {
      $(this).addClass('checked');
    } else {
      $(this).removeClass('checked');
    }
  });
}
function totalValue(value) {
  var compareVal = $('.bt_compare').find('.total-compare-val');
  compareVal.html(value);
  if (value == 0) {
    compareVal.addClass('hidden');
  }
}
function get(name) {
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if (results == null) {
    return '';
  } else {
    return results[1];
  }
}