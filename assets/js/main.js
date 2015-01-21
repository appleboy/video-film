
(function(w, d) {
  var $g = $('#gotop');
  var $w = $(w);
  var loading = !!$('[data-module=loading]').length;
  var $b = (window.opera) ?
    (document.compatMode === 'CSS1Compat' ? $('html') : $('body')) :
    $('html,body');

  var addCommas = function (number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  };

  // intiial video player
  if ($('#video').length > 0) {
    var myPlayer = videojs("video");
    myPlayer.ready(function(){
      this.play();
    });
  }

  // scroll to top
  $g.on('click', function(e) {
    $b.animate({
      scrollTop: 0
    }, 600, function () {
      $b.scrollTop(0);
    });
  });

  // allow video full screen
  $('#fullscreen').on('click', function(e) {
    if (!myPlayer.isFullscreen()){
      myPlayer.requestFullscreen();
    }
  });

  if (loading) {
    var url = $('[data-module=loading]').data('url') || '',
      limit = +$('[data-module=loading]').data('limit') || 30,
      page = +$('[data-module=loading]').data('page') || 1,
      is_ajax = false;

    $(window).scroll(function() {
      if (!is_ajax && ($(window).scrollTop() + $(window).height() > $(document).height() - 100)) {
        is_ajax = true;
        $.get(url, {limit: limit, page: page, ajax: true}, function(data) {
          if ($.trim(data) != '') {
            $('#video_list').append(data);
            page += 1;
            is_ajax = false;
          } else {
            window.setTimeout(function(){
              is_ajax = false;
            }, 10000);
          }
        }, 'html');
      }
    });
  }

  // show scrollup element.
  $w.scroll(function(event) {
    var scroll = $w.scrollTop();
    if (scroll > 500) {
      $g.show(200);
    } else {
      $g.hide(200);
    }
  });

  // socket io.js
  io.socket.on('view_counts', function(msg) {
    $('[data-module="view_counts"][data-nba-id="' + msg.nba_id + '"]').text(addCommas(msg.view_counts + 1));
  }).on('online_user_counts', function(msg) {
    $('.online_user_counts').text(addCommas(msg.online_user_counts));
  });

})(window, document);
