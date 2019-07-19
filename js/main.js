/**
 * Main frame
 */
var main_frame = document.createElement('script');
main_frame.src = "js/main_frame.js";
document.head.appendChild(main_frame);

/**
 * Processes overview
 */
var processes_overview = document.createElement('script');
processes_overview.src = "js/processes_overview.js";
document.head.appendChild(processes_overview);

/*
var tabel_manager = document.createElement('script');
tabel_manager.src = "js/table_manager.js";
document.head.appendChild(tabel_manager);
*/

/* Dávid ?cachebuster="+ new Date().getTime()*/