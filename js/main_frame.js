/** main_frame.js */
/**
 * General functions
 * Events
 *  - Click events
 */

/** General functions */
/**
 * Remove all active items from menu
 */
function menuItemsClear() {    
    for (let index = 0; index < document.getElementsByClassName("menu-item").length; index++) {
        document.getElementsByClassName("menu-item")[index].classList.remove("menu-item-active");
    }
}
/** General functions end */
/** Events */
/** Click events */
/**
 * Item of menu clicked
 * @param {String} id item ID
 */
function menuItemClick(id) {
    menuItemsClear();
    document.getElementById(id).classList.add("menu-item-active");
}
/** Click events end */
/** Events end */