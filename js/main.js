/**
 * Main frame
 */
var main_frame = document.createElement('script');
main_frame.src = "js/main_frame.js";
main_frame.type="module";
document.head.appendChild(main_frame);

/**
 * Processes overview
 */
var processes_overview = document.createElement('script');
processes_overview.src = "js/processes_overview.js";
document.head.appendChild(processes_overview);

/**
 * Common
 
var common = document.createElement('script');
common.src = "js/common.js";
document.head.appendChild(common);
*/
/**
 * Partners managers
 */
var partners_manager = document.createElement('script');
partners_manager.src = "js/partners_manager.js"
partners_manager.type="module";
document.head.appendChild(partners_manager);

/*
var tabel_manager = document.createElement('script');
tabel_manager.src = "js/table_manager.js";
document.head.appendChild(tabel_manager);
*/

/* Dávid ?cachebuster="+ new Date().getTime()*/