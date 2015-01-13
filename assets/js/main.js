
(function(w, d) {
  var $g = $('#gotop');
  var $w = $(w);
  var loading = !!$('[data-module=loading]').length;
  var $b = (window.opera) ?
    (document.compatMode === 'CSS1Compat' ? $('html') : $('body')) :
    $('html,body');

  $g.on('click', function(e) {
    $b.animate({
      scrollTop: 0
    }, 600, function () {
      $b.scrollTop(0);
    });
  });

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

 $w.scroll(function(event) {
    var scroll = $w.scrollTop();
    // Do something
    if (scroll > 500) {
      $g.show(200);
    } else {
      $g.hide(200);
    }
  });

})(window, document);
