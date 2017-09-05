/**
 * 2002-2016 TemplateMonster
 *
 * TM Advanced Filter
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
 *  @author    TemplateMonster
 *  @copyright 2002-2016 TemplateMonster
 *  @license   http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
 */

if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {
    }

    F.prototype = obj;
    return new F();
  };
}
(function ($, window, document, undefined) {
  var tmAdvancedFilterObj = {
    init: function () {
      tmafself = this;
      $(document).on('change', '.tmadvancedfilter select', function () {
        tmafself.refreshFilter($(this));
      });
      $(document).on('change', '.tmadvancedfilter input[type="radio"]', function () {
        tmafself.refreshFilter($(this));
      });
      $(document).on('change', '.tmadvancedfilter input[type="checkbox"]', function () {
        tmafself.refreshFilter($(this));
      });
      $(document).on('change', '.tmadvancedfilter input[data-type="price"]', function () {
        tmafself.refreshFilter($(this));
      });
      $(document).on('click', '#filter-selected-parameters li', function () {
        tmafself.disableParameter($(this));
      });
      tmafself.refreshUniformScript();
    },
    refreshFilter: function (elem) {
      var elements = elem.parents('.tmadvancedfilter').find('select, input');
      var container = elem.parents('.tmadvancedfilter');
      var form = elem.parents('form');
      var params = {};
      params['action'] = 'refreshFilter';
      container.append('<div class="loading"></div>');
      elements.each(function () {
        if ($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox') {
          if ($(this).attr('checked')) {
            if (params[$(this).attr('name')]) {
              var values = tmafself.getValuesArray(container, $(this).attr('name'));
              params[$(this).attr('name')] = values;
            } else {
              params[$(this).attr('name')] = $(this).val();
            }
          }
        } else if ($(this).attr('data-type') && $(this).attr('data-type') == 'price') {
          var prices = tmafself.getPriceRange(container, $(this).attr('name'));
          params[$(this).attr('name')] = prices;
        } else {
          params[$(this).attr('name')] = $(this).val();
        }
      });
      $.ajax({
          type: 'POST',
          url: baseDir + 'modules/tmadvancedfilter/tmadvancedfilter-ajax.php',
          headers: {"cache-control": "no-cache"},
          dataType: 'json',
          data: params,
          success: function (response) {
            if (response.status) {
              container.parents('form').html(response.message);
              if (response.status) {
                tmafself.refreshHash(response.url);
              }
              if (response.products) {
                form.find('button[name="submit' + response.type + 'TmAdvancedFilter"] .count').html(response.count);
              } else {
                form.find('button[name="submit' + response.type + 'TmAdvancedFilter"] .count').html('0');
              }
              tmafself.refreshUniformScript();
            } else {
            }
            container.find('.loading').remove();
          }
        }
      )
    },
    getValuesArray: function (container, name) {
      var elements = container.find('input[name="' + name + '"]:checked');
      var result = '';
      elements.each(function (index) {
        if (index > 0) {
          result += '|' + $(this).val();
        } else {
          result += $(this).val();
        }
      });
      return result;
    },
    getPriceRange: function (container, name) {
      var type = container.find('select[data-type="price"], input[data-type="price"]').attr('data-element-type');
      var from = container.find(type + '[data-type="price"][data-type-value="from"]').val();
      var to = container.find(type + '[data-type="price"][data-type-value="to"]').val();
      if (from == 0 && to == 0) {
        return;
      }
      if (!from) {
        from = 0;
      }
      if (!to) {
        to = 0;
      }
      return from + '|' + to;
    },
    refreshHash: function (newhash) {
      if ($('body').attr('id') == 'module-tmadvancedfilter-filter') {
        history.pushState({}, null, newhash);
      }
    },
    refreshUniformScript: function () {
      if (typeof bindUniform !== 'undefined') {
        bindUniform();
      }
    },
    disableParameter: function (parameter) {
      var form = parameter.parents('form');
      var field_type = parameter.attr('data-filter-field-type');
      var field_parameter = parameter.attr('data-filter-field');
      var id_parameter = parameter.attr('data-filter-field-id');
      switch (field_type) {
        case 'checkbox':
          if (!id_parameter) {
            form.find('input[name="' + field_parameter + '[]"]').trigger('click');
          } else {
            form.find('input[name="' + field_parameter + '[]"][value="' + id_parameter + '"]').trigger('click');
          }
          break;
        case 'radio':
          if (!id_parameter) {
            form.find('input[name="' + field_parameter + '"]').attr('checked', false).trigger('change');
          } else {
            form.find('input[name="' + field_parameter + '"][value="' + id_parameter + '"]').attr('checked', false).trigger('change');
          }
          break;
        case 'select':
          form.find('select[name="' + field_parameter + '"] option:selected').attr('selected', false).trigger('change');
          break;
        case 'range-select':
          var price_field = false;
          form.find('select[name="' + field_parameter + '[]"] option:selected').each(function () {
            if (!price_field) {
              price_field = $(this);
            }
            $(this).attr('selected', false);
          });
          price_field.trigger('change');
          break;
        case 'range-input':
          form.find('input[name="' + field_parameter + '[]"]').each(function () {
            $(this).val('');
          });
          form.find('input[name="' + field_parameter + '[]"][data-type-value="from"]').trigger('change');
          break;
      }
    }
  };
  $.fn.tmAdvancedFilter = function () {
    return this.each(function () {
      var filter = Object.create(tmAdvancedFilterObj);
      filter.init(this);
      $.data(this, 'tmAdvancedFilter', filter);
    });
  };
})(jQuery, window, document);
$(document).ready(function () {
  $('.tmadvancedfilter').tmAdvancedFilter();
});