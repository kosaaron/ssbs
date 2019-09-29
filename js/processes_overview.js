/**
 * **processes_overview.js**
 * 1 Imports
 * 2 Public class
 * 2.1 Load framework
 * 2.2 Load framework
 * 3 Local
 * 3.1 Local varibles
 * 3.2 Local functions
 * 3.2.1 Reload varibles
 * 3.2.2 Get processes data
 * 3.2.3 Reload full page
 * 3.2.4 Project click event
 * 3.2.5 Add subproject
 * 3.2.6 Load default processes
 * 3.2.7 Add month to view (before)
 * 3.2.8 Add month to view (after)
 * 3.2.9 Processes overview scroll events
 */

/**
 * Imports
 */
import { addOneListener, mainFrame } from './common.js';
import DateFunctions from './moduls/DateFunctions.js';

/**
 * Public class
 */
let processesOverview = {
    /**
     * Load framework
     */
    loadProcessesOverview: function () {
        // Framework
        document.getElementById("back_to_menu_text").textContent = "Feladatok átlátása";
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);

        var framework = '<div id="process_modul_content" class="full-screen"><div id="processes_overview" class="full-screen display-flex"><div id="processes_overview_header" class="display-flex flex-column"><div id="processes_overview_header_title" class="display-flex"><div class="margin-auto">Feladatok</div></div><div id="process_names_box" class="flex-1"></div></div><div id="processes_overview_content"><div id="processes_table_shell" class="display-flex full-screen align-center"><table id="processes_table" border="1" style="border: 1px solid transparent; border-bottom: #ddd"><tbody><tr><td style="padding: 0;"><table id="processes_table_table1" border="1" style="border-color: #ddd;" class="full-screen processes-table-table"><thead id="processes_t_t_thead"></thead></table></td></tr><tr><td style="padding: 0;"><div id="processes_t_scroll_table"><table id="processes_table_table2" border="1" style="border-color: #ddd;" class="full-screen processes-table-table"><tbody id="processes_t_t_tbody"></tbody></table></div></td></tr></tbody></table></div></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;

        Local.getProcessesData();
    },
    /**
     * Processes overview resize event
     */
    resizeProcessesOverview: function () {
        // Y scroll on the table
        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        if (processesTScrollTable !== null) {
            let processesTableShell = document.getElementById('processes_table_shell');
            let processesTTable = document.getElementById('processes_table_table1');
            let processNamesBox = document.getElementById('process_names_box');
            processesTScrollTable.style = "";
            if (processesTableShell.clientHeight - processesTTable.clientHeight - 2 < processesTScrollTable.clientHeight) {
                processesTScrollTable.style = "height: " + (processesTableShell.clientHeight - processesTTable.clientHeight - 2) + "px";
                processNamesBox.style = "height: " + (processesTableShell.clientHeight - processesTTable.clientHeight + 9) + "px; flex: none;";
            }
        }
    }
}
export default processesOverview;

/** Local functions **/
let Local = {
    /** Varibles */
    //Processes data array
    processesDataArray: null,
    //Opened projects
    openedProjects: [],
    //Task table td width
    tasksTableTdWidth: 25,
    //Task table width
    tasksTableWidth: null,
    //Task levels
    taskLevels: [],
    //Timeline start date
    gTimeLineStart: null,
    //Timeline end date
    gTimeLineEnd: null,
    //Timeline length (day)
    gTimeLineLength: null,

    /** Functions */
    /**
     * Reload varibles
     */
    reloadVaribles: function () {
        Local.openedProjects = [];
        Local.tasksTableTdWidth = 25;
        Local.tasksTableWidth = null;
        Local.taskLevels = [];
        Local.gTimeLineStart = null;
        Local.gTimeLineEnd = null;
        Local.gTimeLineLength = null;
    },
    /**
     * Get processes data
     */
    getProcessesData: function () {
        if (Local.processesDataArray === null) {
            $.ajax({
                type: "POST",
                url: "../php/ProcessesOverview.php",
                data: "",
                success: function (data) {
                    Local.processesDataArray = JSON.parse(data);
                    Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'StartDate');
                    Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
                    Local.reloadFullPage(Local.processesDataArray);
                },
                dataType: 'html'
            });
        } else {
            Local.reloadFullPage(Local.processesDataArray);
        }
    },
    /**
     * Reload full page
     * @param {JSON array} processesData Processes data
     */
    reloadFullPage: function (processesData) {
        //reload varibles
        Local.reloadVaribles();

        // Content
        // now
        var dateNow = new Date();

        // default table 
        Local.loadProcessesTable(processesData);

        if (dateNow.getDate() < 10) {
            Local.gTimeLineStart = new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, 1);
            Local.gTimeLineLength = 3;
            Local.addMonthBefor(Local.gTimeLineStart, processesData);
        } else {
            Local.gTimeLineStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
            Local.gTimeLineLength = 2;
        }

        Local.gTimeLineEnd = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 1);
        Local.addMonthAfter(Local.gTimeLineEnd, processesData);

        processesOverview.resizeProcessesOverview();

        var tasksTableTdToday = document.getElementById("tasks_table_td_today");
        var processesOverviewContent = document.getElementById("processes_overview_content");
        processesOverviewContent.scrollLeft = tasksTableTdToday.offsetLeft + 2;

        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById('process_names_box');

        processesTScrollTable.addEventListener("wheel", processesTWheel);
        processNamesBox.addEventListener("wheel", processesTWheel);
        processesTScrollTable.addEventListener("scroll", Local.scrollContentProcessesO);
        processNamesBox.addEventListener("scroll", Local.scrollHeadProcessesO);

        function processesTWheel(event) {
            const delta = Math.sign(event.deltaY);
            if (delta === 1) {
                processNamesBox.scrollTop += 20;
            } else {
                processNamesBox.scrollTop -= 20;
            }
        }
    },
    /**
     * Project click event
     * @param {JSON array} processesData 
     * @param {String} fullId process id 
     * @param {String} path
     */
    projectClick(processesData, fullId) {
        let isOpened = false;
        let id = fullId.split('_')[1];

        Local.openedProjects.forEach(projectId => {
            if (projectId === fullId) {
                isOpened = true;
            }
        });

        let processMenuItemIcon = document.getElementById(fullId).firstChild;

        if (isOpened) {

            const openedItems = document.querySelectorAll('.' + fullId);
            openedItems.forEach(item => {
                var index = Local.openedProjects.indexOf(item.id);
                if (index > -1) {
                    Local.openedProjects.splice(index, 1);
                }
            });

            var index = Local.openedProjects.indexOf(fullId);
            if (index > -1) {
                Local.openedProjects.splice(index, 1);
            }

            $('.' + fullId).remove();

            processMenuItemIcon.classList.add('fa-plus-square');
            processMenuItemIcon.classList.remove('fa-minus-square');
        } else {
            processMenuItemIcon.classList.remove('fa-plus-square');
            processMenuItemIcon.classList.add('fa-minus-square');

            Local.addSubProject(id, processesData, Local.gTimeLineStart, Local.gTimeLineLength);
            Local.openedProjects.push(fullId);
        }
    },
    /**
     * Add subproject
     * @param {Integer} parentId Partner ID
     * @param {Array} processesData Processes data
     * @param {Date} firthMonth Generation start with this date
     * @param {Integer} numOfMonth Number of month that will be generated
     */
    addSubProject: function (parentId, processesData, firthMonth, numOfMonth) {
        let processesTTTbody = document.getElementById('processes_t_t_tbody');

        // processes box
        let processNamesBox = document.getElementById('process_names_box');
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            // the empty parent element skipped
            if (process.ParentFK !== parentId)
                continue;

            let level = 0;
            Local.taskLevels.forEach(element => {
                if (element.Id === parentId) {
                    level = element.Level + 1;
                    return;
                }
            });

            let object = { Id: process.ProjectId, Level: level };
            Local.taskLevels.push(object);

            let processNamesBoxItem = document.createElement("div");
            processNamesBoxItem.style = "margin-left: " + level * 8 + "px;";
            processNamesBoxItem.id = "process_" + process.ProjectId;
            let parentAttrs = document.getElementById('process_' + parentId).getAttribute('p-item-path');
            processNamesBoxItem.setAttribute('p-item-path', parentAttrs + '.' + process.ProjectId);
            let processClassList = '';
            parentAttrs.split('.').forEach(parantId => {
                processClassList += ' process_' + parantId;
            });
            processNamesBoxItem.className = 'process-names-box-item display-flex' + processClassList;

            let pNBoxItemText = document.createElement("div");
            pNBoxItemText.className = "full-width margin-auto text-o-ellipsis";
            pNBoxItemText.textContent = process.Name;

            let pNamesBoxRef = document.getElementById("process_" + parentId);


            if (process.IsChild === '1') {
                let pNBoxItemIcon = document.createElement("i");
                pNBoxItemIcon.className = "far fa-plus-square margin-auto p-n-box-item-icon";
                processNamesBoxItem.appendChild(pNBoxItemIcon);

                processNamesBoxItem.appendChild(pNBoxItemText);
                processNamesBox.insertBefore(processNamesBoxItem, pNamesBoxRef.nextSibling);

                processNamesBoxItem.addEventListener('click', function (event) {
                    Local.projectClick(processesData, this.id);
                });
            } else {
                processNamesBoxItem.appendChild(pNBoxItemText);
                processNamesBox.insertBefore(processNamesBoxItem, pNamesBoxRef.nextSibling);
            }
            // Task timelines
            let tasksTableTr4 = document.createElement("tr");
            tasksTableTr4.id = "process_row_" + process.ProjectId;
            tasksTableTr4.className = 'tasksTableTr' + processClassList;
            tasksTableTr4.style = "height: " + Local.tasksTableTdWidth + "px;";

            for (let index3 = 0; index3 < numOfMonth; index3++) {
                let startDate = new Date(firthMonth.getFullYear(), firthMonth.getMonth() + index3, 1);
                let monthDays = DateFunctions.daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
                Local.tasksTableWidth = monthDays;

                let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);
                // Is it this month
                let isThisMonth = process.FinishDate < startDate || process.StartDate > monthEnd;
                let isBeforMonth = process.StartDate < startDate;
                let isAfterMonth = process.FinishDate > monthEnd;

                for (let index2 = 1; index2 <= monthDays; index2++) {
                    let tasksTableTd4 = document.createElement("td");
                    tasksTableTd4.style = "width: " + Local.tasksTableTdWidth + "px;";

                    if (isThisMonth) {
                        tasksTableTd4.className = "processes-table-table-td";
                        tasksTableTr4.appendChild(tasksTableTd4);
                        continue;
                    } else if (isBeforMonth && isAfterMonth) {
                        tasksTableTd4.className = "processes-table-table-td process-line-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen  processes-data-line-green";
                        tasksTableTd4.appendChild(tasksTableDiv4);
                        tasksTableTr4.appendChild(tasksTableTd4);
                        continue;
                    }

                    // simple line
                    if (process.StartDate.getDate() < index2 && process.FinishDate.getDate() > index2 ||
                        (isBeforMonth && process.FinishDate.getDate() > index2) ||
                        (isAfterMonth && process.StartDate.getDate() < index2)) {
                        tasksTableTd4.className = "processes-table-table-td process-line-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen  processes-data-line-green";
                        tasksTableTd4.appendChild(tasksTableDiv4);
                    } else if (process.StartDate.getDate() === index2 && process.FinishDate.getDate() === index2) {
                        tasksTableTd4.className = "processes-table-table-td process-end-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen processes-data-line-green process-one-line";
                        tasksTableTd4.appendChild(tasksTableDiv4);
                    } else if (process.StartDate.getDate() === index2) {
                        tasksTableTd4.className = "processes-table-table-td process-start-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen processes-data-line-green process-start-line";
                        tasksTableTd4.appendChild(tasksTableDiv4);
                    } else if (process.FinishDate.getDate() === index2) {
                        tasksTableTd4.className = "processes-table-table-td process-end-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen processes-data-line-green process-end-line";
                        tasksTableTd4.appendChild(tasksTableDiv4);
                    } else {
                        tasksTableTd4.className = "processes-table-table-td";
                    }


                    tasksTableTr4.appendChild(tasksTableTd4);
                }
            }

            let Tr4reference = document.getElementById("process_row_" + parentId);
            processesTTTbody.insertBefore(tasksTableTr4, Tr4reference.nextSibling);
        }
    },
    /**
     * Load default processes
     * @param {Array} processesData 
     */
    loadProcessesTable: function (processesData) {
        let dateNow = new Date();
        let startDate = dateNow;
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        //startDate = new Date("2019.8.01");
        let monthDays = DateFunctions.daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
        Local.tasksTableWidth = monthDays;

        // Tasks table header
        let processesTTable = document.getElementById('processes_table_table1');
        let processesTTTbody = document.getElementById('processes_t_t_tbody');
        let processesTTThead = document.getElementById('processes_t_t_thead');

        // level 1
        // row
        let tasksTableTr = document.createElement("tr");
        tasksTableTr.className = "tasksTableTr";
        tasksTableTr.style = "height: " + Local.tasksTableTdWidth + "px;";

        // columns
        let tasksTableTd = document.createElement("td");
        tasksTableTd.colSpan = monthDays;
        tasksTableTd.textContent = startDate.getFullYear() + ". " + DateFunctions.fullMonthDate(startDate);

        tasksTableTr.appendChild(tasksTableTd);
        processesTTThead.appendChild(tasksTableTr);

        // level 2
        //row
        let tasksTableTr2 = document.createElement("tr");
        tasksTableTr2.className = "tasksTableTr";
        tasksTableTr2.style = "height: " + Local.tasksTableTdWidth + "px;";

        //columns
        let firstWeekDays = 7 - DateFunctions.mondayIsFirthDay(new Date(startDate).getDay());
        let startWeek = DateFunctions.getWeekNumber(startDate);
        let tasksTableTd2 = document.createElement("td");
        tasksTableTd2.colSpan = firstWeekDays;
        tasksTableTr2.appendChild(tasksTableTd2);
        if (firstWeekDays >= 4) {
            tasksTableTd2.textContent = startWeek + ". hét";
        }

        for (let index = 1; index <= 3; index++) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = 7;
            tasksTableTd2.textContent = (startWeek + index) + ". hét";

            tasksTableTr2.appendChild(tasksTableTd2);
        }

        let lastWeekDays = (monthDays % 7) + (7 - firstWeekDays);

        if (lastWeekDays !== 0) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = lastWeekDays;
            tasksTableTr2.appendChild(tasksTableTd2);
            if (lastWeekDays >= 4) {
                tasksTableTd2.textContent = startWeek + ". hét";
            }
        }

        processesTTThead.appendChild(tasksTableTr2);

        // level 3
        // row 
        let tasksTableTr3 = document.createElement("tr");
        tasksTableTr3.className = "tasksTableTr";
        tasksTableTr3.style = "height: " + Local.tasksTableTdWidth + "px;";

        for (let index = 1; index <= monthDays; index++) {
            let tasksTableTd3 = document.createElement("td");
            tasksTableTd3.className = "processes-table-table-td";
            tasksTableTd3.textContent = index;
            tasksTableTd3.style = "width: " + Local.tasksTableTdWidth + "px;";
            if (index === dateNow.getDate()) {
                tasksTableTd3.id = "tasks_table_td_today";
            }
            tasksTableTr3.appendChild(tasksTableTd3);
        }

        processesTTThead.appendChild(tasksTableTr3);
        processesTTable.style = "width: " + Local.tasksTableTdWidth * monthDays + "px; border-color: #ddd;";

        // processes box
        let processNamesBox = document.getElementById('process_names_box');
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

            // the empty parent element skipped
            if (process.ParentFK !== null)
                continue;

            // Levels of tasks
            let object = { Id: process.ProjectId, Level: 0 };
            Local.taskLevels.push(object);

            // Is it this month
            var isThisMonth = process.FinishDate < startDate || process.StartDate > monthEnd;
            var isBeforMonth = process.StartDate < startDate;
            var isAfterMonth = process.FinishDate > monthEnd;

            let processNamesBoxItem = document.createElement("div");
            processNamesBoxItem.className = "process-names-box-item display-flex";
            processNamesBoxItem.id = "process_" + process.ProjectId;
            processNamesBoxItem.setAttribute("p-item-path", process.ProjectId);

            let pNBoxItemText = document.createElement("div");
            pNBoxItemText.className = "full-width margin-auto text-o-ellipsis";
            pNBoxItemText.textContent = process.Name;

            processNamesBoxItem.appendChild(pNBoxItemText);
            processNamesBox.appendChild(processNamesBoxItem);

            if (process.IsChild === '1') {
                let pNBoxItemIcon = document.createElement("i");
                pNBoxItemIcon.className = "far fa-plus-square margin-auto p-n-box-item-icon";
                processNamesBoxItem.appendChild(pNBoxItemIcon);

                processNamesBoxItem.appendChild(pNBoxItemText);
                processNamesBox.appendChild(processNamesBoxItem);

                processNamesBoxItem.addEventListener('click', function (event) {
                    Local.projectClick(processesData, this.id);
                });
            } else {
                processNamesBoxItem.appendChild(pNBoxItemText);
                processNamesBox.appendChild(processNamesBoxItem);
            }

            // Task timelines
            let tasksTableTr4 = document.createElement("tr");
            tasksTableTr4.id = "process_row_" + process.ProjectId;
            tasksTableTr4.className = "tasksTableTr";
            tasksTableTr4.style = "height: " + Local.tasksTableTdWidth + "px;";

            for (let index2 = 1; index2 <= monthDays; index2++) {
                let tasksTableTd4 = document.createElement("td");
                tasksTableTd4.style = "width: " + Local.tasksTableTdWidth + "px;";

                if (isThisMonth) {
                    tasksTableTd4.className = "processes-table-table-td";
                    tasksTableTr4.appendChild(tasksTableTd4);
                    continue;
                } else if (isBeforMonth && isAfterMonth) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen  processes-data-line-green";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                    tasksTableTr4.appendChild(tasksTableTd4);
                    continue;
                }

                // simple line
                if (process.StartDate.getDate() < index2 && process.FinishDate.getDate() > index2 ||
                    (isBeforMonth && process.FinishDate.getDate() > index2) ||
                    (isAfterMonth && process.StartDate.getDate() < index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen  processes-data-line-green";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.StartDate.getDate() === index2 && process.FinishDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-one-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.StartDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-start-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-start-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.FinishDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-end-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else {
                    tasksTableTd4.className = "processes-table-table-td";
                }


                tasksTableTr4.appendChild(tasksTableTd4);
            }

            processesTTTbody.appendChild(tasksTableTr4);
        }
    },
    /**
     * Add month to view (before)
     * @param {Date} date Generate month date
     * @param {Array} processesData 
     */
    addMonthBefor: function (date, processesData) {
        let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        //startDate = new Date("2019.8.01");
        let monthDays = DateFunctions.daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
        Local.tasksTableWidth += monthDays;

        // Tasks table header
        let processesTTable = document.getElementById('processes_table_table1');

        processesTTable.style = "width: " + (processesTTable.clientWidth + Local.tasksTableTdWidth * monthDays) + "px; border-color: #ddd;";

        let tasksTableTr = document.getElementsByClassName("tasksTableTr");

        // level 1
        // columns
        let tasksTableTd = document.createElement("td");
        tasksTableTd.colSpan = monthDays;
        tasksTableTd.textContent = startDate.getFullYear() + ". " + DateFunctions.fullMonthDate(startDate);

        tasksTableTr[0].insertBefore(tasksTableTd, tasksTableTr[0].childNodes[0]);

        // level 2
        //columns
        let firstWeekDays = 7 - DateFunctions.mondayIsFirthDay(new Date(startDate).getDay());
        let startWeek = DateFunctions.getWeekNumber(startDate);
        let tasksTableTd2 = document.createElement("td");
        tasksTableTd2.colSpan = firstWeekDays;
        tasksTableTr[1].insertBefore(tasksTableTd2, tasksTableTr[1].childNodes[0]);
        if (firstWeekDays >= 4) {
            tasksTableTd2.textContent = startWeek + ". hét";
        }

        for (let index = 1; index <= 3; index++) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = 7;
            tasksTableTd2.textContent = (startWeek + index) + ". hét";

            tasksTableTr[1].insertBefore(tasksTableTd2, tasksTableTr[1].childNodes[index]);
        }

        let lastWeekDays = (monthDays % 7) + (7 - firstWeekDays);

        if (lastWeekDays !== 0) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = lastWeekDays;
            tasksTableTr[1].insertBefore(tasksTableTd2, tasksTableTr[1].childNodes[4]);
            if (lastWeekDays >= 4) {
                tasksTableTd2.textContent = (startWeek + 4) + ". hét";
            }
        }

        // Level 3
        for (let index = 0; index < monthDays; index++) {
            let tasksTableTd3 = document.createElement("td");
            tasksTableTd3.className = "processes-table-table-td";
            tasksTableTd3.textContent = index + 1
            tasksTableTd3.style = "width: " + Local.tasksTableTdWidth + "px;";
            tasksTableTr[2].insertBefore(tasksTableTd3, tasksTableTr[2].childNodes[index]);
        }

        // Processes box
        //tasksTableTr counter
        var counter = 2;
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            if (process.ParentFK !== null)
                continue;

            counter++;

            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

            // Is it this month
            var isThisMonth = process.FinishDate < startDate || process.StartDate > monthEnd;
            var isBeforMonth = process.StartDate < startDate;
            var isAfterMonth = process.FinishDate > monthEnd;

            // Task timelines
            for (let index2 = 1; index2 <= monthDays; index2++) {
                let tasksTableTd4 = document.createElement("td");
                tasksTableTd4.style = "width: " + Local.tasksTableTdWidth + "px;";

                if (isThisMonth) {
                    tasksTableTd4.className = "processes-table-table-td";
                    tasksTableTr[counter].insertBefore(tasksTableTd4, tasksTableTr[counter].childNodes[index2 - 1]);
                    continue;
                } else if (isBeforMonth && isAfterMonth) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen  processes-data-line-green";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                    tasksTableTr[counter].insertBefore(tasksTableTd4, tasksTableTr[counter].childNodes[index2 - 1]);
                    continue;
                }

                // simple line
                if (process.StartDate.getDate() < index2 && process.FinishDate.getDate() > index2 ||
                    (isBeforMonth && process.FinishDate.getDate() > index2) ||
                    (isAfterMonth && process.StartDate.getDate() < index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen  processes-data-line-green";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.StartDate.getDate() === index2 && process.FinishDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-one-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.StartDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-start-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-start-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.FinishDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-end-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else {
                    tasksTableTd4.className = "processes-table-table-td";
                }

                tasksTableTr[counter].insertBefore(tasksTableTd4, tasksTableTr[counter].childNodes[index2 - 1]);
            }
        }
    },
    /**
     * Add month to view (after)
     * @param {Date} date Generate month date
     * @param {Array} processesData 
     */
    addMonthAfter: function (date, processesData) {
        let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        //startDate = new Date("2019.8.01");
        let monthDays = DateFunctions.daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
        Local.tasksTableWidth += monthDays;

        // Tasks table header
        let processesTTable = document.getElementById('processes_table_table1');

        processesTTable.style = "width: " + (processesTTable.clientWidth + Local.tasksTableTdWidth * monthDays) + "px; border-color: #ddd;";

        let tasksTableTr = document.getElementsByClassName("tasksTableTr");

        // level 1
        // columns
        let tasksTableTd = document.createElement("td");
        tasksTableTd.colSpan = monthDays;
        tasksTableTd.textContent = startDate.getFullYear() + ". " + DateFunctions.fullMonthDate(startDate);

        tasksTableTr[0].appendChild(tasksTableTd);

        // level 2
        //columns
        let firstWeekDays = 7 - DateFunctions.mondayIsFirthDay(new Date(startDate).getDay());
        let startWeek = DateFunctions.getWeekNumber(startDate);
        let tasksTableTd2 = document.createElement("td");
        tasksTableTd2.colSpan = firstWeekDays;
        tasksTableTr[1].appendChild(tasksTableTd2);
        if (firstWeekDays >= 4) {
            tasksTableTd2.textContent = startWeek + ". hét";
        }

        for (let index = 1; index <= 3; index++) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = 7;
            tasksTableTd2.textContent = (startWeek + index) + ". hét";

            tasksTableTr[1].appendChild(tasksTableTd2);
        }

        let lastWeekDays = (monthDays % 7) + (7 - firstWeekDays);

        if (lastWeekDays !== 0) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = lastWeekDays;
            tasksTableTr[1].appendChild(tasksTableTd2);
            if (lastWeekDays >= 4) {
                tasksTableTd2.textContent = (startWeek + 4) + ". hét";
            }
        }

        // Level 3
        for (let index = 0; index < monthDays; index++) {
            let tasksTableTd3 = document.createElement("td");
            tasksTableTd3.className = "processes-table-table-td";
            tasksTableTd3.textContent = index + 1
            tasksTableTd3.style = "width: " + Local.tasksTableTdWidth + "px;";
            tasksTableTr[2].appendChild(tasksTableTd3);
        }

        // Processes box
        //tasksTableTr counter
        var counter = 2;
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            if (process.ParentFK !== null)
                continue;

            counter++;

            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

            // Is it this month
            var isThisMonth = process.FinishDate < startDate || process.StartDate > monthEnd;
            var isBeforMonth = process.StartDate < startDate;
            var isAfterMonth = process.FinishDate > monthEnd;

            // Task timelines
            for (let index2 = 1; index2 <= monthDays; index2++) {
                let tasksTableTd4 = document.createElement("td");
                tasksTableTd4.style = "width: " + Local.tasksTableTdWidth + "px;";

                if (isThisMonth) {
                    tasksTableTd4.className = "processes-table-table-td";
                    tasksTableTr[counter].appendChild(tasksTableTd4);
                    continue;
                } else if (isBeforMonth && isAfterMonth) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen  processes-data-line-green";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                    tasksTableTr[counter].appendChild(tasksTableTd4);
                    continue;
                }

                // simple line
                if (process.StartDate.getDate() < index2 && process.FinishDate.getDate() > index2 ||
                    (isBeforMonth && process.FinishDate.getDate() > index2) ||
                    (isAfterMonth && process.StartDate.getDate() < index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen  processes-data-line-green";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.StartDate.getDate() === index2 && process.FinishDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-one-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.StartDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-start-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-start-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else if (process.FinishDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen processes-data-line-green process-end-line";
                    tasksTableTd4.appendChild(tasksTableDiv4);
                } else {
                    tasksTableTd4.className = "processes-table-table-td";
                }

                tasksTableTr[counter].appendChild(tasksTableTd4);
            }
        }
    },
    /**
     * Processes overview scroll events
     */
    scrollHeadProcessesO: function () {
        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById('process_names_box');

        processesTScrollTable.scrollTop = processNamesBox.scrollTop;
    },
    scrollContentProcessesO: function () {
        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById('process_names_box');

        processesTScrollTable.scrollTop = processNamesBox.scrollTop;
    }
};

/** Data */
/*
let processesDataArray = [
    {
        ProjectId: "111",
        Name: "Első projekt",
        ParentFK: null,
        StartDate: new Date('2019.08.11 00:00:00'),
        FinishDate: new Date('2019.10.16 00:00:00')
    },
    {
        ProjectId: "112",
        Name: "Második projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.13 00:00:00'),
        FinishDate: new Date('2019.09.14 00:00:00')
    },
    {
        ProjectId: "113",
        Name: "Harmadik projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.14 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "114",
        Name: "Negyedik projekt",
        ParentFK: null,
        StartDate: new Date('2019.09.16 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "115",
        Name: "Öt projekt",
        ParentFK: null,
        StartDate: new Date('2019.09.03 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "116",
        Name: "Hat projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.13 00:00:00'),
        FinishDate: new Date('2019.09.14 00:00:00')
    },
    {
        ProjectId: "117",
        Name: "Hét projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.14 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "118",
        Name: "Nyolc projekt",
        ParentFK: "113",
        StartDate: new Date('2019.09.16 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "119",
        Name: "Első projekt",
        ParentFK: null,
        StartDate: new Date('2019.08.11 00:00:00'),
        FinishDate: new Date('2019.10.16 00:00:00')
    },
    {
        ProjectId: "120",
        Name: "Második projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.13 00:00:00'),
        FinishDate: new Date('2019.09.14 00:00:00')
    },
    {
        ProjectId: "121",
        Name: "Harmadik projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.14 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "122",
        Name: "Negyedik projekt",
        ParentFK: null,
        StartDate: new Date('2019.09.16 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "123",
        Name: "Öt projekt",
        ParentFK: null,
        StartDate: new Date('2019.09.03 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "124",
        Name: "Hat projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.13 00:00:00'),
        FinishDate: new Date('2019.09.14 00:00:00')
    },
    {
        ProjectId: "125",
        Name: "Hét projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.14 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "126",
        Name: "Nyolc projekt",
        ParentFK: "113",
        StartDate: new Date('2019.09.16 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "127",
        Name: "Hat projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.13 00:00:00'),
        FinishDate: new Date('2019.09.14 00:00:00')
    },
    {
        ProjectId: "128",
        Name: "Hét projekt",
        ParentFK: "111",
        StartDate: new Date('2019.09.14 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    },
    {
        ProjectId: "129",
        Name: "Nyolc projekt",
        ParentFK: "113",
        StartDate: new Date('2019.09.16 00:00:00'),
        FinishDate: new Date('2019.09.16 00:00:00')
    }
];*/