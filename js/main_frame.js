/** main_frame.js */
/**
 * Improts
 * Varibles
 * General functions
 * Events
 *  - Click events
 *  - Resize window
 *  - Ready document
 */

/** Imports */
// import partnersManager from './partners_manager.js';
// import Projects from './projects.js';
// import TaskManager from './tasks_manager.js';
// import OrderManager from './order_manager.js';
// import { addListenerByAttr2, addListener } from './common.js';
// import showCharts from './show_charts.js';
// import Tools from './tools.js';
// import Employees from './employees.js';
// import ProductsOverview from './products_overview.js';
// import newTable from './testproducttable.js';
import GlobalVaribles from './plug-ins/GlobalVaribles.js';
// import Notifications from './notification.js';
// import notifications from './notification.js';
import LoadFrame from './plug-ins/LoadFrame.js';

/** Varibles */
let Varibles = {
    isOpenedProd: false,
    isOpenedRsrc: false,
    activeModul: 'finance_diagrams'
}

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
            $('.selectpicker').selectpicker('refresh');
            break;
        case "tab_processes":
            document.getElementById("processes").style.display = "block";
            break;
        case "tab_products":
            document.getElementById("products").style.display = "block";

            if (!Varibles.isOpenedProd) {
                addProductsEvents('overview');
                Varibles.isOpenedProd = true;
            }
            break;
        case "tab_resources":
            document.getElementById("resources").style.display = "block";

            if (!Varibles.isOpenedRsrc) {
                addResourcesEvents('employees');
                Varibles.isOpenedRsrc = true;
            }
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
        case "projects_btn":
            GlobalVaribles.setActiveModule('projects');
            iframe.src = "folyamatok_attekintese.html";
            //document.getElementById("process_modul_content").appendChild(iframe);
            Projects.loadModule();
            break;
        case "tasks_manager_btn":
            GlobalVaribles.setActiveModule('tasks_manager');
            iframe.src = "feladatkezeles.html";
            //document.getElementById("process_modul_content").appendChild(iframe);
            TaskManager.loadModule();
            break;
        case "partners_manager_btn":
            GlobalVaribles.setActiveModule('partners_manager');
            iframe.src = "folyamatok_attekintese.html";
            //document.getElementById("process_modul_content").appendChild(iframe);
            partnersManager.loadPartnersManager();
            break;
        case "operative_tasks_btn":
            GlobalVaribles.setActiveModule('operative_tasks');
            iframe.src = "periodikusnaptar.html";
            document.getElementById('process_modul_content').appendChild(iframe);
            break;
        case "weekly_schedule_btn":
            break;
        case "order_manager_btn":
            GlobalVaribles.setActiveModule('order_manager');
            OrderManager.loadModule();
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

function addProductsClick() {
    addListenerByAttr2("smproducts", "click", addProductsEvents);
}

function addProductsEvents(attr) {
    Varibles.isOpenedProd = true;

    switch (attr) {
        case "overview":
            ProductsOverview.loadProductsOverview();
            break;
        case "tracking":
            newTable.loadnewTable();
            break;
        case "optimization":
            alert();
            break;
        default:
            break;
    }
}

function addResourcesClick() {
    addListenerByAttr2("smresources", "click", addResourcesEvents);
}

function addResourcesEvents(attr) {
    Varibles.isOpenedRsrc = true;
    switch (attr) {
        case "employees":
            Employees.loadModule();
            break;
        case "tools":
            Tools.loadModule();
            break;
        case "allocation":
            alert();
            break;
        default:
            break;
    }
}
function FinanceSubtabClick(id) {
    switch (id) {
        case 'finance_tab_diagrams':
            document.getElementById('finanace_diagrams').style.display = 'block';
            document.getElementById('finance_accounting').style.display = 'none';
            document.getElementById('finance_tab_accounting').classList.remove('finance-subtab-active');
            document.getElementById('finance_tab_diagrams').classList.add('finance-subtab-active');
            break;
        case 'finance_tab_accounting':
            document.getElementById('finanace_diagrams').style.display = 'none';
            document.getElementById('finance_accounting').style.display = 'block';
            document.getElementById('finance_tab_diagrams').classList.remove('finance-subtab-active');
            document.getElementById('finance_tab_accounting').classList.add('finance-subtab-active');
            break;

        default:
            break;
    }
}
function settingsModulClick(id) {
    document.getElementById("settings_menu").style.display = "none";
    document.getElementById("settings_content").style.display = "block";

    document.getElementById("settings_modul_content").innerHTML = "";

    switch (id) {
        case "notifications_btn":
            //GlobalVaribles.setActiveModule('processes_overview');
            //iframe.src = "folyamatok_attekintese.html";
            //document.getElementById("process_modul_content").appendChild(iframe);
            notifications.loadModule();
            break;
        case "setting2_btn":
            break;
        case "setting3_btn":
            break;
        case "setting4_btn":
            break;
        default:
            break;
    }
}
/** Click events end */


/** Resize window */
window.onresize = function (event) {
    switch (GlobalVaribles.getActiveModule()) {
        case 'projects':
            Projects.resize();
            break;
        case 'tasks_manager':
            TaskManager.resizeModule();
            break;
        case 'order_manager':
            OrderManager.resizeModule();
            break;
    }
};

/** Ready document */
$(document).ready(function () {
    new LoadFrame();
});
/** Events end */