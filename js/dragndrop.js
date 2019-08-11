
$(".slides").sortable({
    placeholder: 'slide-placeholder',
    axis: "y",
    revert: 150,
    start: function (e, ui) {
        
        placeholderHeight = 40;
        ui.placeholder.height(placeholderHeight + 15);
        $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
        var appBanners = document.getElementsByClassName('employee-button'), i;

        for (var i = 0; i < appBanners.length; i++) {
            appBanners[i].style.display = 'none';
        }
    },
    change: function (event, ui) {

        ui.placeholder.stop().height(0).animate({
            height: 60
        }, 300);

        placeholderAnimatorHeight = 40;

        $(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight + 15).animate({
            height: 0
        }, 300, function () {
            $(this).remove();
            placeholderHeight = ui.item.outerHeight();
            $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
        });

    },
    stop: function (e, ui) {

        $(".slide-placeholder-animator").remove();
        var appBanners = document.getElementsByClassName('employee-button'), i;

        for (var i = 0; i < appBanners.length; i++) {
            appBanners[i].style.display = 'inline-block';
        }

    },
});
