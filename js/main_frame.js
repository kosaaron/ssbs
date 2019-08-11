/** main_frame.js */
/**
 * Improts
 * General functions
 * Events
 *  - Click events
 *  - Resize window
 *  - Ready document
 */

/** Imports */
import partnersManager from './partners_manager.js';
import { addOneListener } from './common.js';

/** General functions */
/**
 * Remove all active items from menu
 */
function menuItemsClear() {
    for (let index = 0; index < document.getElementsByClassName("menu-item").length; index++) {
        document.getElementsByClassName("menu-item")[index].classList.remove("menu-item-active");
    }
}
/**
 * Display none to all subcontent
 */
function clearContent() {
    for (let index = 0; index < document.getElementsByClassName("menu-content").length; index++) {
        document.getElementsByClassName("menu-content")[index].style.display = "none";
    }
}
/**
 * Add click event to elements
 * Call the specified function with id parameter (it can be null)
 * @param {Function} eventFunction Event function
 * @param {String} className Class name of elements
 */
function addClickEvents(eventFunction, className) {
    let clickedElements = document.getElementsByClassName(className);
    for (let i = 0; i < clickedElements.length; i++) {
        clickedElements[i].addEventListener('click', function () {
            eventFunction(clickedElements[i].id);
        });
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

    clearContent();

    switch (id) {
        case "tab_finance":
            document.getElementById("finance").style.display = "block";
            break;
        case "tab_processes":
            document.getElementById("processes").style.display = "block";
            break;
        case "tab_products":
            document.getElementById("products").style.display = "block";
            break;
        case "tab_resources":
            document.getElementById("resources").style.display = "block";
            break;
        case "tab_settings":
            document.getElementById("settings").style.display = "block";
            break;
        default:
            break;
    }
}
/**
 * @param {String} className
 */
function createIframe(className) {
    let iframe = document.createElement('iframe');
    iframe.className = className;
    iframe.frameBorder = "0";
    return iframe;
}

/**
 * Modul click in Processes
 * @param {Integer} id Modul id
 */
function processesModulClick(id) {
    document.getElementById("processes_menu").style.display = "none";
    document.getElementById("processes_content").style.display = "block";

    document.getElementById("process_modul_content").innerHTML = "";

    const iframe = createIframe('full-screen');

    switch (id) {
        case "processes_overview_btn":
            iframe.src = "folyamatok_attekintese.html";
            //document.getElementById("process_modul_content").appendChild(iframe);

            loadProcessesOverview();
            break;
        case "tasks_manager_btn":
            iframe.src = "feladatkezeles.html";
            document.getElementById("process_modul_content").appendChild(iframe);
            break;
        case "partners_manager_btn":
            iframe.src = "folyamatok_attekintese.html";
            //document.getElementById("process_modul_content").appendChild(iframe);
            partnersManager.loadPartnersManager();
            break;
        default:
            break;
    }
}

function prodMenuChange(id) {
    document.getElementById("products_content").style.display = "block";

    document.getElementById("products_modul_content").innerHTML = "";

    const iframe = createIframe('full-screen not-full-width');

    switch (id) {
        case "prod_placement_btn":
            iframe.src = "készletkövetés.html";
            document.getElementById("products_modul_content").appendChild(iframe);
            break;
        default:
            break;
    }
}
/** Click events end */


/** Resize window */
window.onresize = function (event) {
    resizeProcessesOverview();
};

/** Ready document */
$(document).ready(function () {
    addClickEvents(menuItemClick, "menu-item");
    addClickEvents(processesModulClick, "processes-mo-click");
    addClickEvents(prodMenuChange, "prod-subm-i");
});
/** Events end */