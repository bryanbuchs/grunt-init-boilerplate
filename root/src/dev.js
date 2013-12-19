// supress clicks on placeholder links (LINK)

(function($){

  $('a[href="LINK"]').on('click', function(e) {
    e.preventDefault();
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
  });

})(jQuery);
