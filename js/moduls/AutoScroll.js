/**
 * Imports
 */
import ArrayFunctions from './ArrayFunctions.js';

/**
 * **Auto scroll**
 */
let AutoScroll = {
    Integration: function (elementId) {
        let element = document.getElementById(elementId);
        let sHeight = element.parentNode.offsetHeight;

        for (let i = 0; i < element.parentNode.childNodes.length; i++) {
            const child = element.parentNode.childNodes[i];

            if (elementId !== child.id) {
                let childHeight = $("#" + child.id).outerHeight(true);
                if (!isNaN(childHeight)) {
                    sHeight -= childHeight;
                }
            }
        }

        element.style = "height: " + sHeight + "px";
        if (!ArrayFunctions.HasClass(element, "auto-scroll-default")) {
            element.classList.add("auto-scroll-default");
        }
    }
}
export default AutoScroll;