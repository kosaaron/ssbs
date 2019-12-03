/**
 * Imports
 */
import ArrayFunctions from './ArrayFunctions.js.js';

/**
 * **Auto scroll**
 */
let AutoScroll = {
    Integration: function (elementId) {
        let element = $("#" + elementId);
        let sHeight = element.parent().outerHeight();

        element.parent().children().each(function () {
            if ($(this).attr('id') !== element.attr('id'))
                sHeight -= $(this).outerHeight(true);
        });

        element.height(sHeight);
        if (!ArrayFunctions.HasClass(elementId, "auto-scroll-default")) {
            element.addClass("auto-scroll-default");
        }
    }
}
export default AutoScroll;