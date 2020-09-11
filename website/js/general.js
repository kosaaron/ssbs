scrollAnimation();

$(document).on("scroll", scrollAnimation);

function scrollAnimation() {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height() / 1.8;
    var tags = $(".fade-in-scroll");
  
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
  
      if ($(tag).position().top < pageBottom) {
        $(tag).addClass("visible");
      } else {
        $(tag).removeClass("visible");
      }
    }
}