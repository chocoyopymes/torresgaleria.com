$(document).ready(function() {
  $('#home-page-tabs li:first, #index .tab-content ul:first').addClass('active');
  $('#home-tabs-title').text($('#home-page-tabs li:first a').text());
  $('#home-page-tabs li a').on('click', function() {
    thisClass = $(this).parent().attr('class');
    $('#home-tabs-title').text($(this).text());
  });
});