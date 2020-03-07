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
import DateFunctions from './plug-ins/DateFunctions.js';
import ArrayFunctions from './plug-ins/ArrayFunctions.js';
import DinamicFormPopup from './plug-ins/DinamicFormPopup.js'

let Varibles = {
    //Module parameters
    FrameId: 'prco',
    //Shell id
    ShellId: null,
    //Frame id of add new item 
    AddNFormId: 'nprc',
    //Entry i
    EntryIdName: 'projects.ProjectId',
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
    gTimeLineLength: null
}

/**
 * Public class
 */
let processesOverview = {
    /**
     * Load framework
     */
    loadModule: function (shellId) {
        // Framework
        //document.getElementById("back_to_menu_text").textContent = "Feladatok átlátása";
        //addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);
        Varibles.ShellId = shellId;

        Framework.Load(shellId, Varibles.FrameId);
        document.getElementById(Varibles.FrameId + '_add_new_btn').addEventListener('click', Events.addNew)

        Local.initializationParams();
        Local.getProcessesData();
    },
    /**
     * Processes overview resize event
     */
    resize: function () {
        // Y scroll on the table
        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        if (processesTScrollTable !== null) {
            let processesTableShell = document.getElementById(Varibles.FrameId + '_table_shell');
            let processesTTable = document.getElementById('processes_table_table1');
            let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');
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
    /**
     * Parameters initialization 
     */
    initializationParams() {
        //Processes data array
        Varibles.processesDataArray = null;
        //Opened projects
        Varibles.openedProjects = [];
        //Task table td width
        Varibles.tasksTableTdWidth = 25;
        //Task table width
        Varibles.tasksTableWidth = null;
        //Task levels
        Varibles.taskLevels = [];
        //Timeline start date
        Varibles.gTimeLineStart = null;
        //Timeline end date
        Varibles.gTimeLineEnd = null;
        //Timeline length (day)
        Varibles.gTimeLineLength = null;
    },
    /**
     * Get processes data
     */
    getProcessesData: function () {
        /*
        if (Varibles.processesDataArray === null) {*/
        $.ajax({
            type: "POST",
            url: "./php/ProcessesOverview.php",
            data: "",
            success: function (data) {
                Varibles.processesDataArray = data;
                Varibles.processesDataArray = DateFunctions.dataColumnToDate(Varibles.processesDataArray, 'projects.StartDate');
                Varibles.processesDataArray = DateFunctions.dataColumnToDate(Varibles.processesDataArray, 'projects.Deadline');
                Varibles.processesDataArray = DateFunctions.dataColumnToDate(Varibles.processesDataArray, 'projects.FinishDate');
                Local.reloadFullPage(Varibles.processesDataArray);
            },
            dataType: 'json'
        });/*
        } else {
            Local.reloadFullPage(Varibles.processesDataArray);
        }*/
    },
    /**
     * Reload full page
     * @param {JSON} processesData Processes data
     */
    reloadFullPage: function (processesData) {
        // Content
        // now
        var dateNow = new Date();

        // default table 
        Local.loadProcessesTable(processesData);

        if (dateNow.getDate() < 10) {
            Varibles.gTimeLineStart = new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, 1);
            Varibles.gTimeLineLength = 3;
            Local.addMonthBefor(Varibles.gTimeLineStart, processesData);
        } else {
            Varibles.gTimeLineStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
            Varibles.gTimeLineLength = 2;
        }

        Varibles.gTimeLineEnd = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 1);
        Local.addMonthAfter(Varibles.gTimeLineEnd, processesData);

        processesOverview.resize();

        var tasksTableTdToday = document.getElementById("tasks_table_td_today");
        var processesOverviewContent = document.getElementById(Varibles.FrameId + '_content');
        processesOverviewContent.scrollLeft = tasksTableTdToday.offsetLeft + 2;

        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');

        //Click events
        $('.tasksTableTr').click(Events.processTrClick);

        //Scroll event
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
     * @param {JSON} processesData 
     * @param {String} fullId process id 
     * @param {String} path
     */
    projectClick(processesData, fullId) {
        let isOpened = false;
        let id = fullId.split('_')[1];

        Varibles.openedProjects.forEach(projectId => {
            if (projectId === fullId) {
                isOpened = true;
            }
        });

        let processMenuItemIcon = document.getElementById(fullId).firstChild;

        if (isOpened) {

            const openedItems = document.querySelectorAll('.' + fullId);
            openedItems.forEach(item => {
                var index = Varibles.openedProjects.indexOf(item.id);
                if (index > -1) {
                    Varibles.openedProjects.splice(index, 1);
                }
            });

            var index = Varibles.openedProjects.indexOf(fullId);
            if (index > -1) {
                Varibles.openedProjects.splice(index, 1);
            }

            $('.' + fullId).remove();

            processMenuItemIcon.classList.add('fa-plus-square');
            processMenuItemIcon.classList.remove('fa-minus-square');
        } else {
            processMenuItemIcon.classList.remove('fa-plus-square');
            processMenuItemIcon.classList.add('fa-minus-square');

            Local.addSubProject(id, processesData, Varibles.gTimeLineStart, Varibles.gTimeLineLength);
            Varibles.openedProjects.push(fullId);
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
        let dateNow = new Date();

        // processes box
        let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            // the empty parent element skipped
            if (process['projects.ParentFK'] !== parentId)
                continue;

            let level = 0;
            Varibles.taskLevels.forEach(element => {
                if (element.Id === parentId) {
                    level = element.Level + 1;
                    return;
                }
            });

            let object = { Id: process['projects.ProjectId'], Level: level };
            Varibles.taskLevels.push(object);

            let processNamesBoxItem = document.createElement("div");
            processNamesBoxItem.style = "margin-left: " + level * 8 + "px;";
            processNamesBoxItem.id = "process_" + process['projects.ProjectId'];
            let parentAttrs = document.getElementById('process_' + parentId).getAttribute('p-item-path');
            processNamesBoxItem.setAttribute('p-item-path', parentAttrs + '.' + process['projects.ProjectId']);
            let processClassList = '';
            parentAttrs.split('.').forEach(parentId => {
                processClassList += ' process_' + parentId;
            });
            processNamesBoxItem.className = 'process-names-box-item display-flex' + processClassList;

            let pNBoxItemText = document.createElement("div");
            pNBoxItemText.className = "full-width margin-auto text-o-ellipsis";
            pNBoxItemText.textContent = process['projects.Name'];

            let pNamesBoxRef = document.getElementById("process_" + parentId);
            let pNamesBoxRefList = document.getElementsByClassName('process-names-box-item process_' + parentId);

            if (pNamesBoxRefList[0]) {
                pNamesBoxRef = pNamesBoxRefList[pNamesBoxRefList.length - 1];
            }

            if (Functions.isChild(process[Varibles.EntryIdName])) {
                let pNBoxItemIcon = document.createElement("i");
                pNBoxItemIcon.className = "far fa-plus-square margin-auto p-n-box-item-icon";
                processNamesBoxItem.insertAdjacentElement('beforeend', pNBoxItemIcon);

                processNamesBoxItem.insertAdjacentElement('beforeend', pNBoxItemText);
                pNamesBoxRef.insertAdjacentElement('afterend', processNamesBoxItem);

                processNamesBoxItem.addEventListener('click', function (event) {
                    Local.projectClick(processesData, this.id);
                });
            } else {
                processNamesBoxItem.insertAdjacentElement('beforeend', pNBoxItemText);
                pNamesBoxRef.insertAdjacentElement('afterend', processNamesBoxItem);
            }
            // Task timelines
            let tasksTableTr4 = document.createElement("tr");
            tasksTableTr4.id = "process_row_" + process['projects.ProjectId'];
            tasksTableTr4.className = 'tasksTableTr' + processClassList;
            tasksTableTr4.style = "height: " + Varibles.tasksTableTdWidth + "px;";
            tasksTableTr4.setAttribute('entry-id', process['projects.ProjectId']);

            for (let index3 = 0; index3 < numOfMonth; index3++) {
                let startDate = new Date(firthMonth.getFullYear(), firthMonth.getMonth() + index3, 1);
                let monthDays = DateFunctions.daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
                Varibles.tasksTableWidth = monthDays;

                let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);
                let relativeDate = process['projects.FinishDate'];
                // Is not it this month
                let isNotThisMonth = relativeDate < startDate || process['projects.StartDate'] > monthEnd;
                let isBeforMonth = process['projects.StartDate'] < startDate;
                let isAfterMonth = relativeDate > monthEnd;
                let isOneMonth = !(isBeforMonth || isAfterMonth);

                //delayed date
                let isDelayed = process['projects.FinishDate'] > relativeDate;
                let finishDays = process['projects.Deadline'].getDate();
                let deadlineStartDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth(), 1);
                let deadlineEndDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth() + 1, 1);

                if (isDelayed && (startDate >= deadlineEndDate)) {
                    finishDays = 0;
                } else if (isDelayed && (monthEnd < deadlineStartDate)) {
                    finishDays = 31;
                }

                for (let index2 = 1; index2 <= monthDays; index2++) {
                    let tasksTableTd4 = document.createElement("td");
                    tasksTableTd4.style = "width: " + Varibles.tasksTableTdWidth + "px;";

                    let div4Background = "";
                    if (isDelayed && finishDays < index2) {
                        div4Background = "processes-data-line-lred";
                    } else {
                        div4Background = "processes-data-line-green";
                    }

                    //
                    if (isNotThisMonth) {
                        tasksTableTd4.className = "processes-table-table-td";
                        tasksTableTr4.insertAdjacentElement('beforeend', tasksTableTd4);
                        continue;
                    } else if (isBeforMonth && isAfterMonth) {
                        tasksTableTd4.className = "processes-table-table-td process-line-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen " + div4Background;
                        tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                        tasksTableTr4.insertAdjacentElement('beforeend', tasksTableTd4);
                        continue;
                    }

                    // simple line
                    if (process['projects.StartDate'].getDate() < index2 && relativeDate.getDate() > index2 ||
                        (isBeforMonth && relativeDate.getDate() > index2) ||
                        (isAfterMonth && process['projects.StartDate'].getDate() < index2)) {

                        tasksTableTd4.className = "processes-table-table-td process-line-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen " + div4Background;
                        tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                    } else if (isOneMonth && process['projects.StartDate'].getDate() === index2 && relativeDate.getDate() === index2) {
                        tasksTableTd4.className = "processes-table-table-td process-end-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen " + div4Background + " process-one-line";
                        tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                    } else if ((isOneMonth && process['projects.StartDate'].getDate() === index2) ||
                        (isAfterMonth && process['projects.StartDate'].getDate() === index2)) {
                        tasksTableTd4.className = "processes-table-table-td process-start-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen " + div4Background + " process-start-line";
                        tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                    } else if ((isOneMonth && relativeDate.getDate() === index2) ||
                        (isBeforMonth && relativeDate.getDate() === index2)) {
                        tasksTableTd4.className = "processes-table-table-td process-end-td";

                        let tasksTableDiv4 = document.createElement("div");
                        tasksTableDiv4.className = "full-screen " + div4Background + " process-end-line";
                        tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                    } else {
                        tasksTableTd4.className = "processes-table-table-td";
                    }


                    tasksTableTr4.insertAdjacentElement('beforeend', tasksTableTd4);
                }
            }

            let Tr4reference = document.getElementById("process_row_" + parentId);
            let Tr4ReferList = document.getElementsByClassName('tasksTableTr process_' + parentId);

            if (Tr4ReferList[0]) {
                Tr4reference = Tr4ReferList[Tr4ReferList.length - 1];
            }
            Tr4reference.insertAdjacentElement('afterend', tasksTableTr4);
        }

        //Click events
        $('.tasksTableTr.process_' + parentId).click(Events.processTrClick);
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
        Varibles.tasksTableWidth = monthDays;

        // Tasks table header
        let processesTTable = document.getElementById('processes_table_table1');
        let processesTTTbody = document.getElementById('processes_t_t_tbody');
        let processesTTThead = document.getElementById('processes_t_t_thead');

        // level 1
        // row
        let tasksTableTr = document.createElement("tr");
        tasksTableTr.className = "tasksTableTr";
        tasksTableTr.style = "height: " + Varibles.tasksTableTdWidth + "px;";

        // columns
        let tasksTableTd = document.createElement("td");
        tasksTableTd.colSpan = monthDays;
        tasksTableTd.textContent = startDate.getFullYear() + ". " + DateFunctions.fullMonthDate(startDate);

        tasksTableTr.insertAdjacentElement('beforeend', tasksTableTd);
        processesTTThead.insertAdjacentElement('beforeend', tasksTableTr);

        // level 2
        //row
        let tasksTableTr2 = document.createElement("tr");
        tasksTableTr2.className = "tasksTableTr";
        tasksTableTr2.style = "height: " + Varibles.tasksTableTdWidth + "px;";

        //columns
        let firstWeekDays = 7 - DateFunctions.mondayIsFirthDay(new Date(startDate).getDay());
        let startWeek = DateFunctions.getWeekNumber(startDate);
        let tasksTableTd2 = document.createElement("td");
        tasksTableTd2.colSpan = firstWeekDays;
        tasksTableTr2.insertAdjacentElement('beforeend', tasksTableTd2);
        if (firstWeekDays >= 4) {
            tasksTableTd2.textContent = startWeek + ". hét";
        }

        for (let index = 1; index <= 3; index++) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = 7;
            tasksTableTd2.textContent = (startWeek + index) + ". hét";

            tasksTableTr2.insertAdjacentElement('beforeend', tasksTableTd2);
        }

        let lastWeekDays = (monthDays % 7) + (7 - firstWeekDays);

        if (lastWeekDays !== 0) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = lastWeekDays;
            tasksTableTr2.insertAdjacentElement('beforeend', tasksTableTd2);
            if (lastWeekDays >= 4) {
                tasksTableTd2.textContent = startWeek + ". hét";
            }
        }

        processesTTThead.insertAdjacentElement('beforeend', tasksTableTr2);

        // level 3
        // row 
        let tasksTableTr3 = document.createElement("tr");
        tasksTableTr3.className = "tasksTableTr";
        tasksTableTr3.style = "height: " + Varibles.tasksTableTdWidth + "px;";

        for (let index = 1; index <= monthDays; index++) {
            let tasksTableTd3 = document.createElement("td");
            tasksTableTd3.className = "processes-table-table-td";
            tasksTableTd3.textContent = index;
            tasksTableTd3.style = "width: " + Varibles.tasksTableTdWidth + "px;";
            if (index === dateNow.getDate()) {
                tasksTableTd3.id = "tasks_table_td_today";
            }
            tasksTableTr3.insertAdjacentElement('beforeend', tasksTableTd3);
        }

        processesTTThead.insertAdjacentElement('beforeend', tasksTableTr3);
        processesTTable.style = "width: " + Varibles.tasksTableTdWidth * monthDays + "px; border-color: #ddd;";

        // processes box
        let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

            // the empty parent element skipped
            if (process['projects.ParentFK'] !== null)
                continue;

            // Levels of tasks
            let object = { Id: process['projects.ProjectId'], Level: 0 };
            Varibles.taskLevels.push(object);

            let processNamesBoxItem = document.createElement("div");
            processNamesBoxItem.className = "process-names-box-item display-flex";
            processNamesBoxItem.id = "process_" + process['projects.ProjectId'];
            processNamesBoxItem.setAttribute("p-item-path", process['projects.ProjectId']);

            let pNBoxItemText = document.createElement("div");
            pNBoxItemText.className = "full-width margin-auto text-o-ellipsis";
            pNBoxItemText.textContent = process['projects.Name'];

            processNamesBoxItem.insertAdjacentElement('beforeend', pNBoxItemText);
            processNamesBox.insertAdjacentElement('beforeend', processNamesBoxItem);

            if (Functions.isChild(process[Varibles.EntryIdName])) {
                let pNBoxItemIcon = document.createElement("i");
                pNBoxItemIcon.className = "far fa-plus-square margin-auto p-n-box-item-icon";
                processNamesBoxItem.insertAdjacentElement('beforeend', pNBoxItemIcon);

                processNamesBoxItem.insertAdjacentElement('beforeend', pNBoxItemText);
                processNamesBox.insertAdjacentElement('beforeend', processNamesBoxItem);

                processNamesBoxItem.addEventListener('click', function (event) {
                    Local.projectClick(processesData, this.id);
                });
            } else {
                processNamesBoxItem.insertAdjacentElement('beforeend', pNBoxItemText);
                processNamesBox.insertAdjacentElement('beforeend', processNamesBoxItem);
            }

            // Task timelines
            let tasksTableTr4 = document.createElement("tr");
            tasksTableTr4.id = "process_row_" + process['projects.ProjectId'];
            tasksTableTr4.className = "tasksTableTr";
            tasksTableTr4.style = "height: " + Varibles.tasksTableTdWidth + "px;";
            tasksTableTr4.setAttribute('entry-id', process['projects.ProjectId']);

            // Relative date
            let relativeDate = process['projects.FinishDate'];
            // Is it not this month
            let isNotThisMonth = relativeDate < startDate || process['projects.StartDate'] > monthEnd;
            let isBeforMonth = process['projects.StartDate'] < startDate;
            let isAfterMonth = relativeDate > monthEnd;
            let isOneMonth = !(isBeforMonth || isAfterMonth);

            //delayed date
            let isDelayed = process['projects.FinishDate'] > process['projects.Deadline'];
            let finishDays = process['projects.Deadline'].getDate();
            let deadlineStartDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth(), 1);
            let deadlineEndDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth() + 1, 1);

            if (isDelayed && (startDate >= deadlineEndDate)) {
                finishDays = 0;
            } else if (isDelayed && (monthEnd < deadlineStartDate)) {
                finishDays = 31;
            }

            for (let index2 = 1; index2 <= monthDays; index2++) {
                let tasksTableTd4 = document.createElement("td");
                tasksTableTd4.style = "width: " + Varibles.tasksTableTdWidth + "px;";

                let div4Background = "";
                if (isDelayed && finishDays < index2) {
                    div4Background = "processes-data-line-lred";
                } else {
                    div4Background = "processes-data-line-green";
                }

                if (isNotThisMonth) {
                    tasksTableTd4.className = "processes-table-table-td";
                    tasksTableTr4.insertAdjacentElement('beforeend', tasksTableTd4);
                    continue;
                } else if (isBeforMonth && isAfterMonth) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background;
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                    tasksTableTr4.insertAdjacentElement('beforeend', tasksTableTd4);
                    continue;
                }

                // simple line
                if (process['projects.StartDate'].getDate() < index2 && relativeDate.getDate() > index2 ||
                    (isBeforMonth && relativeDate.getDate() > index2) ||
                    (isAfterMonth && process['projects.StartDate'].getDate() < index2)) {

                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background;
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if (isOneMonth && process['projects.StartDate'].getDate() === index2 && relativeDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-one-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if ((isOneMonth && process['projects.StartDate'].getDate() === index2) ||
                    (isAfterMonth && process['projects.StartDate'].getDate() === index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-start-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-start-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if ((isOneMonth && relativeDate.getDate() === index2) ||
                    (isBeforMonth && relativeDate.getDate() === index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-end-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else {
                    tasksTableTd4.className = "processes-table-table-td";
                }

                tasksTableTr4.insertAdjacentElement('beforeend', tasksTableTd4);
            }

            processesTTTbody.insertAdjacentElement('beforeend', tasksTableTr4);
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
        Varibles.tasksTableWidth += monthDays;

        // Tasks table header
        let processesTTable = document.getElementById('processes_table_table1');

        processesTTable.style = "width: " + (processesTTable.clientWidth + Varibles.tasksTableTdWidth * monthDays) + "px; border-color: #ddd;";

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
            tasksTableTd3.style = "width: " + Varibles.tasksTableTdWidth + "px;";
            tasksTableTr[2].insertBefore(tasksTableTd3, tasksTableTr[2].childNodes[index]);
        }

        // Processes box
        //tasksTableTr counter
        var counter = 2;
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            if (process['projects.ParentFK'] !== null)
                continue;

            counter++;

            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

            // Relative date
            let relativeDate = process['projects.FinishDate'];
            // Is it not this month
            let isNotThisMonth = relativeDate < startDate || process['projects.StartDate'] > monthEnd;
            let isBeforMonth = process['projects.StartDate'] < startDate;
            let isAfterMonth = relativeDate > monthEnd;
            let isOneMonth = !(isBeforMonth || isAfterMonth);

            //delayed date
            let isDelayed = process['projects.FinishDate'] > process['projects.Deadline'];
            let finishDays = process['projects.Deadline'].getDate();
            let deadlineStartDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth(), 1);
            let deadlineEndDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth() + 1, 1);

            if (isDelayed && (startDate >= deadlineEndDate)) {
                finishDays = 0;
            } else if (isDelayed && (monthEnd < deadlineStartDate)) {
                finishDays = 31;
            }

            // Task timelines
            for (let index2 = 1; index2 <= monthDays; index2++) {
                let tasksTableTd4 = document.createElement("td");
                tasksTableTd4.style = "width: " + Varibles.tasksTableTdWidth + "px;";

                let div4Background = "";
                if (isDelayed && finishDays < index2) {
                    div4Background = "processes-data-line-lred";
                } else {
                    div4Background = "processes-data-line-green";
                }

                if (isNotThisMonth) {
                    tasksTableTd4.className = "processes-table-table-td";
                    tasksTableTr[counter].insertBefore(tasksTableTd4, tasksTableTr[counter].childNodes[index2 - 1]);
                    continue;
                } else if (isBeforMonth && isAfterMonth) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background;
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                    tasksTableTr[counter].insertBefore(tasksTableTd4, tasksTableTr[counter].childNodes[index2 - 1]);
                    continue;
                }

                // simple line
                if (process['projects.StartDate'].getDate() < index2 && relativeDate.getDate() > index2 ||
                    (isBeforMonth && relativeDate.getDate() > index2) ||
                    (isAfterMonth && process['projects.StartDate'].getDate() < index2)) {

                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background;
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if (isOneMonth && process['projects.StartDate'].getDate() === index2 && relativeDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-one-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if ((isOneMonth && process['projects.StartDate'].getDate() === index2) ||
                    (isAfterMonth && process['projects.StartDate'].getDate() === index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-start-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-start-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if ((isOneMonth && relativeDate.getDate() === index2) ||
                    (isBeforMonth && relativeDate.getDate() === index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-end-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
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
        Varibles.tasksTableWidth += monthDays;

        // Tasks table header
        let processesTTable = document.getElementById('processes_table_table1');

        processesTTable.style = "width: " + (processesTTable.clientWidth + Varibles.tasksTableTdWidth * monthDays) + "px; border-color: #ddd;";

        let tasksTableTr = document.getElementsByClassName("tasksTableTr");

        // level 1
        // columns
        let tasksTableTd = document.createElement("td");
        tasksTableTd.colSpan = monthDays;
        tasksTableTd.textContent = startDate.getFullYear() + ". " + DateFunctions.fullMonthDate(startDate);

        tasksTableTr[0].insertAdjacentElement('beforeend', tasksTableTd);

        // level 2
        //columns
        let firstWeekDays = 7 - DateFunctions.mondayIsFirthDay(new Date(startDate).getDay());
        let startWeek = DateFunctions.getWeekNumber(startDate);
        let tasksTableTd2 = document.createElement("td");
        tasksTableTd2.colSpan = firstWeekDays;
        tasksTableTr[1].insertAdjacentElement('beforeend', tasksTableTd2);
        if (firstWeekDays >= 4) {
            tasksTableTd2.textContent = startWeek + ". hét";
        }

        for (let index = 1; index <= 3; index++) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = 7;
            tasksTableTd2.textContent = (startWeek + index) + ". hét";

            tasksTableTr[1].insertAdjacentElement('beforeend', tasksTableTd2);
        }

        let lastWeekDays = (monthDays % 7) + (7 - firstWeekDays);

        if (lastWeekDays !== 0) {
            tasksTableTd2 = document.createElement("td");
            tasksTableTd2.colSpan = lastWeekDays;
            tasksTableTr[1].insertAdjacentElement('beforeend', tasksTableTd2);
            if (lastWeekDays >= 4) {
                tasksTableTd2.textContent = (startWeek + 4) + ". hét";
            }
        }

        // Level 3
        for (let index = 0; index < monthDays; index++) {
            let tasksTableTd3 = document.createElement("td");
            tasksTableTd3.className = "processes-table-table-td";
            tasksTableTd3.textContent = index + 1
            tasksTableTd3.style = "width: " + Varibles.tasksTableTdWidth + "px;";
            tasksTableTr[2].insertAdjacentElement('beforeend', tasksTableTd3);
        }

        // Processes box
        //tasksTableTr counter
        var counter = 2;
        for (var index = 0; index < processesData.length; index++) {
            // Task names
            const process = processesData[index];

            if (process['projects.ParentFK'] !== null)
                continue;

            counter++;

            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

            // Relative date
            let relativeDate = process['projects.FinishDate'];
            // Is it not this month
            let isNotThisMonth = relativeDate < startDate || process['projects.StartDate'] > monthEnd;
            let isBeforMonth = process['projects.StartDate'] < startDate;
            let isAfterMonth = relativeDate > monthEnd;
            let isOneMonth = !(isBeforMonth || isAfterMonth);

            //delayed date
            let isDelayed = process['projects.FinishDate'] > process['projects.Deadline'];
            let finishDays = process['projects.Deadline'].getDate();
            let deadlineStartDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth(), 1);
            let deadlineEndDate = new Date(process['projects.Deadline'].getFullYear(), process['projects.Deadline'].getMonth() + 1, 1);

            if (isDelayed && (startDate >= deadlineEndDate)) {
                finishDays = 0;
            } else if (isDelayed && (monthEnd < deadlineStartDate)) {
                finishDays = 31;
            }

            // Task timelines
            for (let index2 = 1; index2 <= monthDays; index2++) {
                let tasksTableTd4 = document.createElement("td");
                tasksTableTd4.style = "width: " + Varibles.tasksTableTdWidth + "px;";

                let div4Background = "";
                if (isDelayed && finishDays < index2) {
                    div4Background = "processes-data-line-lred";
                } else {
                    div4Background = "processes-data-line-green";
                }

                if (isNotThisMonth) {
                    tasksTableTd4.className = "processes-table-table-td";
                    tasksTableTr[counter].insertAdjacentElement('beforeend', tasksTableTd4);
                    continue;
                } else if (isBeforMonth && isAfterMonth) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen" + div4Background;
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                    tasksTableTr[counter].insertAdjacentElement('beforeend', tasksTableTd4);
                    continue;
                }

                // simple line
                if (process['projects.StartDate'].getDate() < index2 && relativeDate.getDate() > index2 ||
                    (isBeforMonth && relativeDate.getDate() > index2) ||
                    (isAfterMonth && process['projects.StartDate'].getDate() < index2)) {

                    tasksTableTd4.className = "processes-table-table-td process-line-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background;
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if (isOneMonth && process['projects.StartDate'].getDate() === index2 && relativeDate.getDate() === index2) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-one-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if ((isOneMonth && process['projects.StartDate'].getDate() === index2) ||
                    (isAfterMonth && process['projects.StartDate'].getDate() === index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-start-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-start-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else if ((isOneMonth && relativeDate.getDate() === index2) ||
                    (isBeforMonth && relativeDate.getDate() === index2)) {
                    tasksTableTd4.className = "processes-table-table-td process-end-td";

                    let tasksTableDiv4 = document.createElement("div");
                    tasksTableDiv4.className = "full-screen " + div4Background + " process-end-line";
                    tasksTableTd4.insertAdjacentElement('beforeend', tasksTableDiv4);
                } else {
                    tasksTableTd4.className = "processes-table-table-td";
                }

                tasksTableTr[counter].insertAdjacentElement('beforeend', tasksTableTd4);
            }
        }
    },
    /**
     * Processes overview scroll events
     */
    scrollHeadProcessesO: function () {
        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');

        processesTScrollTable.scrollTop = processNamesBox.scrollTop;
    },
    scrollContentProcessesO: function () {
        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');

        processesTScrollTable.scrollTop = processNamesBox.scrollTop;
    }
};

/** Functions **/
let Functions = {
    isChild(projectId) {
        // looking for child
        for (const process of Varibles.processesDataArray) {
            if (process['projects.ParentFK'] === projectId) {
                return true;
            }
        }

        return false;
    }
}
/** Callbacks **/
let Callbacks = {
    /**
     * Refresh page
     * @param {JSON} result Update/insert result
     */
    refreshPage(result) {
        Framework.Load(Varibles.ShellId, Varibles.FrameId);
        document.getElementById(Varibles.FrameId + '_add_new_btn').addEventListener('click', Events.addNew)

        Local.initializationParams();
        Local.getProcessesData();
    }
}

/** Events **/
let Events = {
    /**
     * Process tr click event
     */
    processTrClick(e) {
        let id = this.getAttribute('entry-id');
        Database.getAddNForm(id);
    },
    addNew(e) {
        let targetId = Varibles.FrameId;
        let dinamicFormPopup = new DinamicFormPopup(
            targetId,
            'beforebegin',
            'Projekt hozzáadása'
        );
        dinamicFormPopup.loadFormData(
            Varibles.AddNFormId,
            Varibles.processesDataArray,
            targetId,
            null,
            null,
            Callbacks.refreshPage
        );
    }
}

let Database = {
    getAddNForm: function (id) {
        let targetId = Varibles.FrameId;
        let entryIdJSON = {
            'Name': Varibles.EntryIdName,
            'Id': id
        }

        let dinamicFormPopup = new DinamicFormPopup(
            targetId,
            'beforebegin',
            'Szerkesztés'
        );
        dinamicFormPopup.loadFormData(
            Varibles.AddNFormId,
            Varibles.processesDataArray,
            targetId,
            entryIdJSON,
            null,
            Callbacks.refreshPage
        );
    }
}

let Framework = {
    /**
     * 
     * @param {String} targetId 
     */
    Load: function (targetId, frameId) {
        document.getElementById(targetId).innerHTML =
            `
    <div id="${frameId}" class="processes-modul-frame full-screen display-flex">
        <div class="processes_overview_header display-flex flex-column">
            <div class="processes_overview_header_title display-flex">
                <div class="margin-auto">Feladatok</div>
            </div>
            <div id="${frameId}_names_box" class="process_names_box flex-1"></div>
        </div>
        <div id="${frameId}_content" class="processes_content">
            <button id="${frameId}_add_new_btn" class="btn btn-primary table-fxd-add-tbn"><i class="fas fa-plus"></i></button>
            <div id="${frameId}_table_shell" class="display-flex full-screen align-center">
                <table id="processes_table" border="1" style="border: 1px solid transparent; border-bottom: #ddd">
                    <tbody>
                        <tr>
                            <td style="padding: 0;">
                                <table id="processes_table_table1" border="1" style="border-color: #ddd;" class="full-screen processes-table-table">
                                    <thead id="processes_t_t_thead"></thead>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0;">
                                <div id="processes_t_scroll_table">
                                    <table id="processes_table_table2" border="1" style="border-color: #ddd;" class="full-screen processes-table-table">
                                        <tbody id="processes_t_t_tbody"></tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
        `
    }
}
