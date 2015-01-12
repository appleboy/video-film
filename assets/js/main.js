
$(function(){

  var loading = !!$('[data-module=loading]').length;

  if (loading) {
    var url = $('[data-module=loading]').data('url') || '',
      limit = +$('[data-module=loading]').data('limit') || 30,
      page = +$('[data-module=loading]').data('page') || 1,
      is_ajax = false;

    $(window).scroll(function() {
      if (!is_ajax && ($(window).scrollTop() + $(window).height() > $(document).height() - 100)) {
        is_ajax = true;
        $.get(url, {limit: limit, page: page}, function(data) {
          $('#video_list').append(data);
          page += 1;
          is_ajax = false;
        }, 'html');
      }
    });
  }
});
