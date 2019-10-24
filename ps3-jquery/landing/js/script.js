/* Adds scroll button in the window */
const addScrollButton = () => {
  const btn = $('#to-top-button');
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '500');
  });
};

/* Animates scrolling to the anchor. Stops when the anchor is in the middle of the screen */
const addNavLinksAnimation = () => {
  const MIDDLE_OF_WINDOW_COEF = 0.3;
  $('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - $(window).height() * MIDDLE_OF_WINDOW_COEF
    }, 500);
    return false;
});
};

$(document).ready(function() {
  addScrollButton();
  addNavLinksAnimation();
});
