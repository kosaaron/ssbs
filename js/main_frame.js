/** main_frame.js */
/**
 * General functions
 * Events
 *  - Click events
 *  - Resize window
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
/**
 * Display none to all subcontent
 */
function clearContent() {
    for (let index = 0; index < document.getElementsByClassName("menu-content").length; index++) {
        document.getElementsByClassName("menu-content")[index].style.display = "none";
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
 * Create iframe element
 */
function createIframe() {
    let iframe = document.createElement('iframe');
    iframe.className = "full-screen";
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

    const iframe = createIframe();

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
        default:
            break;
    }
}

function prodMenuChange(id) {
    document.getElementById("products_menu").style.display = "none";
    document.getElementById("products_content").style.display = "block";

    document.getElementById("products_modul_content").innerHTML = "";

    const iframe = createIframe();

    switch (id) {
        case "prod_placement_btn":
            iframe.src = "készletkövetés.html";
            document.getElementById("products_modul_content").appendChild(iframe);
            break;
        default:
            break;
    }
}
/**
 * 
 */
function backToProcessesMenu() {
    document.getElementById("processes_menu").style.display = "block";
    document.getElementById("processes_content").style.display = "none";
}
/** Click events end */
/** Events end */

/** Resize window */
window.onresize = function (event) {
    resizeProcessesOverview();
};

