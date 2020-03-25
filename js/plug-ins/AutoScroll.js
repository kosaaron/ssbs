/**
 * Imports
 */
import ArrayFunctions from './ArrayFunctions.js';

/**
 * **Auto scroll**
 */
class AutoScroll {
    /**
     * Integration
     * @param {String} elementId 
     */
    static Integration(elementId) {
        let element = $("#" + elementId);
        let parent = element.parent();
        let sHeight = parent.outerHeight() - parent.innerHeight() 
                        + parent.height();

        parent.children().each(function () {
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