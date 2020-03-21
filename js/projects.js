/** projects.js **/
/** Imports **/
import DateFunctions from './plug-ins/DateFunctions.js';
import DinamicFormPopup from './plug-ins/DinamicFormPopup.js'

/** Varibles **/
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
    gTimeLineLength: null,
    datesDisplayed: null,
    tableWidth: null
}

/** Public class **/
let Projects = {
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
export default Projects;

/** Loadings **/
let Loadings = {

}

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

        Varibles.tableWidth = 0;

        let startDate = new Date();
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        Varibles.datesDisplayed = [];
        for (let i = -3; i <= 2; i++) {
            let relativeDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
            Varibles.datesDisplayed.push(relativeDate);
        }
    },
    /**
     * Get processes data
     */
    getProcessesData: function () {
        /*
        if (Varibles.processesDataArray === null) {*/
        $.ajax({
            type: "POST",
            url: "./php/Projects.php",
            data: "",
            success: function (data) {
                Varibles.processesDataArray = data;
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
            //Local.addMonthBefor(Varibles.gTimeLineStart, processesData);
        } else {
            Varibles.gTimeLineStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
            Varibles.gTimeLineLength = 2;
        }

        Varibles.gTimeLineEnd = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 1);
        //Local.addMonthAfter(Varibles.gTimeLineEnd, processesData);

        Projects.resize();

        //Click events

        //Scroll events
        //content scroll
        var tasksTableTdToday = document.getElementById("tasks_table_td_today");
        var ProjectsContent = document.getElementById(Varibles.FrameId + '_content');
        ProjectsContent.scrollLeft = tasksTableTdToday.offsetLeft + 2;
        ProjectsContent.addEventListener("scroll", Events.scrollMonth);

        //name box scroll
        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');

        processesTScrollTable.addEventListener("wheel", processesTWheel);
        processNamesBox.addEventListener("wheel", processesTWheel);
        processesTScrollTable.addEventListener("scroll", Local.scrollContentProcessesO);
        processNamesBox.addEventListener("scroll", Local.scrollHeadProcessesO);

        function processesTWheel(e) {
            const delta = Math.sign(e.deltaY);
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
        Local.loadTimelineHeaderFame();

        for (let i = 0; i < Varibles.datesDisplayed.length; i++) {
            const dateDisplayed = Varibles.datesDisplayed[i];

            Local.loadTimelineHeaderContent(dateDisplayed, true);
            Varibles.tableWidth += DateFunctions.daysInMonth(
                dateDisplayed.getMonth() + 1,
                dateDisplayed.getFullYear()
            );
        }

        //Resize table
        Functions.resizeScrollTable();

        Local.addProcess(processesData, null, null);
        /*
        let dateNow = new Date();
        let isNow = dateNow.getFullYear() === startDate.getFullYear() &&
            dateNow.getMonth() === startDate.getMonth();

        //startDate = new Date("2019.8.01");
        let monthDays = DateFunctions.daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
        Varibles.tasksTableWidth = monthDays;

        //Tasks table header
        let processesTTable = document.getElementById('processes_table_table1');
        let processesTTTbody = document.getElementById('processes_t_t_tbody');
        let processesTTThead = document.getElementById('processes_t_t_thead');

        //Year and month labels
        processesTTThead.insertAdjacentHTML(
            'beforeend',
            `<tr style="height: ${Varibles.tasksTableTdWidth}px" class="tasksTableTr">
                <td colspan="${monthDays}">
                    ${startDate.getFullYear()}. ${DateFunctions.fullMonthDate(startDate)}
                </td>
            </tr>`
        );

        //Week labels
        let firstWeekDays = 7 - DateFunctions.mondayIsFirthDay(new Date(startDate).getDay());
        let startWeek = DateFunctions.getWeekNumber(startDate);
        let dayCounter = firstWeekDays;

        processesTTThead.insertAdjacentHTML(
            'beforeend',
            `<tr class="tasksTableTr"  
                 style="height: ${Varibles.tasksTableTdWidth}px">
                <td colspan="${firstWeekDays}">${getFirstWeekDayNum()}</td>
                ${getFullWeeksHTML()}
                ${getEndWeekOfMonth()}
            </tr>`
        );

        function getFirstWeekDayNum() {
            if (firstWeekDays >= 4) {
                return startWeek + '. hét';
            } else {
                return '';
            }
        }

        function getFullWeeksHTML() {
            let readyHTML = '';

            for (let i = 1; dayCounter <= monthDays - 7; i++) {
                readyHTML += `<td colspan="7">${(startWeek + i)}. hét</td>`;
                dayCounter += 7;
            }
            return readyHTML;
        }

        function getEndWeekOfMonth() {
            let lastWeekDays = monthDays - dayCounter;
            let readyHTML = '';

            if (lastWeekDays !== 0) {
                readyHTML +=
                    `<td colspan="${lastWeekDays}">${lastWeekText()}</td>`;
                function lastWeekText() {
                    if (lastWeekDays >= 4) {
                        return startWeek + '. hét';
                    } else {
                        return '';
                    }
                }
            }
            return readyHTML;
        }

        //Day labels
        processesTTThead.insertAdjacentHTML(
            'beforeend',
            `<tr class="tasksTableTr"  
                 style="height: ${Varibles.tasksTableTdWidth}px">
                ${getDaysTdHTML()}
            </tr>`
        );

        function getDaysTdHTML() {
            let readyHTML = '';
            for (let i = 1; i <= monthDays; i++) {
                let todayId = '';
                if (i === dateNow.getDate() && isNow) {
                    todayId = 'id="tasks_table_td_today"';
                }
                readyHTML += `<td ${todayId} class="processes-table-table-td" 
                    style="width: ${Varibles.tasksTableTdWidth}px">${i}</td>`;
            }

            return readyHTML;
        }

        //Resize table
        processesTTable.style = "width: " + Varibles.tasksTableTdWidth * monthDays + "px; border-color: #ddd;";

        //Load data items
        let processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');
        processesData.forEach(process => {
            // the empty parent element skipped
            if (process['projects.ParentFK'] !== null) {
                return;
            }

            let dropDownClass = '';
            if (process['Childs'].length !== 0) {
                dropDownClass = `<i class="far fa-plus-square margin-auto p-n-box-item-icon"></i>`;
            }

            processNamesBox.insertAdjacentHTML(
                'beforeend',
                `<div id="process_${process['projects.ProjectId']}" 
                      class="process-names-box-item display-flex
                      p-item-path="${process['projects.ProjectId']}">
                    ${dropDownClass}
                    <div class="full-width margin-auto text-o-ellipsis">
                        ${process['projects.Name']}
                    </div>
                </div>`
            );

            // date varibles
            let startDate = new Date(process['projects.StartDate']);
            let finishDate = new Date(process['projects.FinishDate']);
            let deadline = new Date(process['projects.Deadline']);
            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

            // Is it not this month
            let isNotThisMonth = finishDate < startDate || startDate > monthEnd;
            let isBeforMonth = startDate < startDate;
            let isAfterMonth = finishDate > monthEnd;
            let isOneMonth = !(isBeforMonth || isAfterMonth);
            //delayed date
            let isDelayed = startDate > deadline;
            let finishDays = deadline.getDate();
            let deadlineStartDate = new Date(
                deadline.getFullYear(),
                deadline.getMonth(),
                1
            );
            let deadlineEndDate = new Date(
                deadline.getFullYear(),
                deadline.getMonth() + 1,
                1
            );

            if (isDelayed && (startDate >= deadlineEndDate)) {
                finishDays = 0;
            } else if (isDelayed && (monthEnd < deadlineStartDate)) {
                finishDays = 31;
            }

            // Task timelines
            processesTTTbody.insertAdjacentHTML(
                'beforeend',
                `<tr id="process_row_${process['projects.ProjectId']}" 
                     class="tasksTableTr"
                     style="height: ${Varibles.tasksTableTdWidth}px"
                     entry-id: "${process['projects.ProjectId']}">
                    ${getProcessLine()}
                </tr>`
            );

            function getProcessLine() {
                let readyHTML = '';
                for (let j = 1; j <= monthDays; j++) {
                    let div4Background = '';
                    if (isDelayed && finishDays < j) {
                        div4Background = "processes-data-line-lred";
                    } else {
                        div4Background = "processes-data-line-green";
                    }

                    //not in this month
                    if (isNotThisMonth) {
                        readyHTML += `
                            <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                                class="processes-table-table-td">
                            </td>`;
                        continue;
                    }

                    //whole month
                    if (isBeforMonth && isAfterMonth) {
                        tasksTableTd4.className = "processes-table-table-td process-line-td";
                        readyHTML += `
                            <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                                class="processes-table-table-td process-line-td">
                                <div class="full-screen ${div4Background}">
                                </div>
                            </td>`;
                        continue;
                    }

                    if (startDate.getDate() < j &&
                        finishDate.getDate() > j ||
                        (isBeforMonth && finishDate.getDate() > j) ||
                        (isAfterMonth && startDate.getDate() < j)) {
                        //simple line
                        readyHTML += `
                            <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                                class="processes-table-table-td process-line-td">
                                <div class="full-screen ${div4Background}"></div>
                            </td>`;

                    } else if (isOneMonth && startDate.getDate() === j
                        && finishDate.getDate() === j) {
                        //one day process line
                        readyHTML += `
                            <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                                class="processes-table-table-td process-end-td">
                                <div class="full-screen  process-one-line ${div4Background}"></div>
                            </td>`;
                    } else if ((isOneMonth && startDate.getDate() === j) ||
                        (isAfterMonth && startDate.getDate() === j)) {
                        //"start of process" element
                        readyHTML += `
                            <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                                class="processes-table-table-td process-start-td">
                                <div class="full-screen process-start-line ${div4Background}"></div>
                            </td>`;
                    } else if ((isOneMonth && finishDate.getDate() === j) ||
                        (isBeforMonth && finishDate.getDate() === j)) {
                        //"end of process" element
                        readyHTML += `
                            <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                                class="processes-table-table-td process-end-td">
                                <div class="full-screen process-end-line ${div4Background}"></div>
                            </td>`;
                    } else {
                        //empty day                        
                        readyHTML += `
                            <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                                class="processes-table-table-td">
                            </td>`;
                    }
                }

                return readyHTML;
            }
        });

        /*
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
        ///////////////////////////////////
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
                }*/
    },
    /**
     * Load timeline header fame
     */
    loadTimelineHeaderFame: function () {
        let processesTTThead = document.getElementById('processes_t_t_thead');

        //Year and month labels
        processesTTThead.insertAdjacentHTML(
            'beforeend',
            `<tr id="${Varibles.FrameId}_tbl_hdr_month" 
                 style="height: ${Varibles.tasksTableTdWidth}px" 
                 class="tasksTableTr">
            </tr>`
        );

        //Week labels
        processesTTThead.insertAdjacentHTML(
            'beforeend',
            `<tr id="${Varibles.FrameId}_tbl_hdr_week" 
                 class="tasksTableTr" 
                 style="height: ${Varibles.tasksTableTdWidth}px">
            </tr>`
        );

        //Day labels
        processesTTThead.insertAdjacentHTML(
            'beforeend',
            `<tr id="${Varibles.FrameId}_tbl_hdr_day" 
                 class="tasksTableTr"  
                 style="height: ${Varibles.tasksTableTdWidth}px">
            </tr>`
        );
    },
    /**
     * Load content of timeline header
     * @param {Date} startDate 
     * @param {Boolean} isNextMonth 
     */
    loadTimelineHeaderContent: function (relativeDate, isNextMonth) {
        let dateNow = new Date();
        let isNow = dateNow.getFullYear() === relativeDate.getFullYear() &&
            dateNow.getMonth() === relativeDate.getMonth();
        let monthDays = DateFunctions.daysInMonth(relativeDate.getMonth() + 1, relativeDate.getFullYear());
        let afterBefore = 'afterbegin';
        if (isNextMonth) {
            afterBefore = 'beforeend';
        }

        //Year and month labels
        document.getElementById(`${Varibles.FrameId}_tbl_hdr_month`).insertAdjacentHTML(
            afterBefore,
            `<td colspan="${monthDays}">
                ${relativeDate.getFullYear()}. ${DateFunctions.fullMonthDate(relativeDate)}
            </td>`
        );

        //Week labels
        let firstWeekDays = 7 - DateFunctions.mondayIsFirthDay(new Date(relativeDate).getDay());
        let dayCounter = firstWeekDays;
        let weekCounter = DateFunctions.getWeekNumber(relativeDate);

        document.getElementById(`${Varibles.FrameId}_tbl_hdr_week`).insertAdjacentHTML(
            afterBefore,
            `<td colspan="${firstWeekDays}">${getFirstWeekDayNum()}</td>
            ${getFullWeeksHTML()}
            ${getEndWeekOfMonth()}`
        );

        function getFirstWeekDayNum() {
            let readyText = '';

            if (firstWeekDays >= 4) {
                readyText = weekCounter + '. hét';
            }

            weekCounter++;
            return readyText;
        }

        function getFullWeeksHTML() {
            let readyHTML = '';

            for (let i = 1; dayCounter <= monthDays - 7; i++) {
                readyHTML += `<td colspan="7">${(weekCounter)}. hét</td>`;
                dayCounter += 7;
                weekCounter++;
            }
            return readyHTML;
        }

        function getEndWeekOfMonth() {
            let lastWeekDays = monthDays - dayCounter;
            let readyHTML = '';

            if (lastWeekDays !== 0) {
                readyHTML +=
                    `<td colspan="${lastWeekDays}">${lastWeekText()}</td>`;
                function lastWeekText() {
                    if (lastWeekDays >= 4) {
                        return weekCounter + '. hét';
                    } else {
                        return '';
                    }
                }
            }
            return readyHTML;
        }

        //Day labels
        document.getElementById(`${Varibles.FrameId}_tbl_hdr_day`).insertAdjacentHTML(
            afterBefore,
            `${getDaysTdHTML()}`
        );

        function getDaysTdHTML() {
            let readyHTML = '';
            for (let i = 1; i <= monthDays; i++) {
                let todayId = '';
                if (i === dateNow.getDate() && isNow) {
                    todayId = 'id="tasks_table_td_today"';
                }
                readyHTML += `<td ${todayId} class="processes-table-table-td" 
                    style="width: ${Varibles.tasksTableTdWidth}px">${i}</td>`;
            }

            return readyHTML;
        }
    },
    /**
     * Get process name box HTML
     * @param {JSON} process 
     * @param {String} prcItemPath 
     * @param {String} prntPrcClssList 
     */
    getProcessNameBox: function (process, prcItemPath, prntPrcClssList) {
        return `<div id="process_${process[Varibles.EntryIdName]}" 
                      class="process-names-box-item display-flex ${prntPrcClssList}" 
                      p-item-path="${prcItemPath}"
                      entry-id="${process[Varibles.EntryIdName]}"
                      style="padding-left:${getLeftOffset()}px">
                      ${getDropDownClass()}
                    <div class="full-width margin-auto text-o-ellipsis">${process['projects.Name']}</div>
                </div>`

        function getLeftOffset() {
            return 8 + process['Level'] * 5;
        }

        function getDropDownClass() {
            if (process['Childs'].length === 0) {
                return ``;
            } else {
                return `<i class="far fa-plus-square margin-auto p-n-box-item-icon"></i>`;
            }
        }
    },
    /**
     * Add process
     * @param {JSON} processesArray 
     * @param {String} processId 
     * @param {String} prcItemPath 
     */
    addProcess: function (processesArray, processId, prcItemPath) {
        //Load data items
        let lastProcessId = processId;
        for (const key in processesArray) {
            if (!processesArray.hasOwnProperty(key)) {
                continue;
            }
            const process = processesArray[key];

            //create parent processes class list
            let prntPrcClssList = '';
            let nPrcItemPath = '';
            if (prcItemPath === null) {
                nPrcItemPath = process[Varibles.EntryIdName];
            } else {
                prcItemPath.split('.').forEach(processId => {
                    prntPrcClssList += ' process_' + processId;
                });

                nPrcItemPath = prcItemPath + '.' + process[Varibles.EntryIdName];
            }

            //Name box
            let processNamesBox = document.getElementById('process_' + lastProcessId);
            let processesTTTbody = document.getElementById('process_row_' + lastProcessId);
            let afterBefore = 'afterend';

            if (processId === null) {
                processNamesBox = document.getElementById(Varibles.FrameId + '_names_box');
                processesTTTbody = document.getElementById('processes_t_t_tbody');
                afterBefore = 'beforeend';
            }

            processNamesBox.insertAdjacentHTML(
                afterBefore,
                Local.getProcessNameBox(process, nPrcItemPath, prntPrcClssList)
            );

            // Task timelines frame
            processesTTTbody.insertAdjacentHTML(
                afterBefore,
                Local.getProcessLineFrame(process, prntPrcClssList)
            );

            let processLineFrame = document.getElementById(
                `process_row_${process[Varibles.EntryIdName]}`
            );

            Varibles.datesDisplayed.forEach(relativeDate => {
                // Task timelines content
                processLineFrame.insertAdjacentHTML(
                    'beforeend',
                    Local.getProcessLineContent(process, relativeDate)
                );
            });

            $('.process-names-box-item#process_' + process[Varibles.EntryIdName]).click(
                Events.NameBoxItemClick
            );
            $('.tasksTableTr#process_row_' + process[Varibles.EntryIdName]).click(
                Events.processTrClick
            );

            lastProcessId = process[Varibles.EntryIdName];
        }
    },
    /**
     * Get process line HTML
     * @param {JSON} process 
     * @param {String} prntPrcClssList 
     */
    getProcessLineFrame: function (process, prntPrcClssList) {
        // Task timelines
        return `<tr id="process_row_${process[Varibles.EntryIdName]}" 
                    class="tasksTableTr ${prntPrcClssList}"
                    style="height: ${Varibles.tasksTableTdWidth}px"
                    entry-id= "${process[Varibles.EntryIdName]}">
                </tr>`;
    },
    /**
     * 
     * @param {JSON} process 
     * @param {Date} relativeDate 
     */
    getProcessLineContent: function (process, relativeDate) {
        // date varibles
        let startDate = new Date(process['projects.StartDate']);
        let finishDate = new Date(process['projects.FinishDate']);
        let deadline = new Date(process['projects.Deadline']);
        let monthDays = DateFunctions.daysInMonth(relativeDate.getMonth() + 1, relativeDate.getFullYear());
        let monthEnd = new Date(relativeDate.getFullYear(), relativeDate.getMonth(), monthDays);

        // Is it not this month
        let isNotThisMonth = finishDate < relativeDate || startDate > monthEnd;
        let isBeforMonth = startDate < relativeDate;
        let isAfterMonth = finishDate > monthEnd;
        let isOneMonth = !(isBeforMonth || isAfterMonth);
        //delayed date
        let isDelayed = finishDate > deadline;
        let finishDays = deadline.getDate();
        let deadlineStartDate = new Date(
            deadline.getFullYear(),
            deadline.getMonth(),
            1
        );
        let deadlineEndDate = new Date(
            deadline.getFullYear(),
            deadline.getMonth() + 1,
            1
        );

        if (isDelayed && (startDate >= deadlineEndDate)) {
            finishDays = 0;
        } else if (isDelayed && (monthEnd < deadlineStartDate)) {
            finishDays = 31;
        }

        // Task timelines
        return getLineItems();

        function getLineItems() {
            let readyHTML = '';
            for (let j = 1; j <= monthDays; j++) {
                let div4Background = '';
                if (isDelayed && finishDays < j) {
                    div4Background = "processes-data-line-lred";
                } else {
                    div4Background = "processes-data-line-green";
                }

                //not in this month
                if (isNotThisMonth) {
                    readyHTML += `
                    <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                        class="processes-table-table-td">
                    </td>`;
                    continue;
                }

                //whole month
                if (isBeforMonth && isAfterMonth) {
                    tasksTableTd4.className = "processes-table-table-td process-line-td";
                    readyHTML += `
                    <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                        class="processes-table-table-td process-line-td">
                        <div class="full-screen ${div4Background}">
                        </div>
                    </td>`;
                    continue;
                }

                if (startDate.getDate() < j &&
                    finishDate.getDate() > j ||
                    (isBeforMonth && finishDate.getDate() > j) ||
                    (isAfterMonth && startDate.getDate() < j)) {
                    //simple line
                    readyHTML += `
                    <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                        class="processes-table-table-td process-line-td">
                        <div class="full-screen ${div4Background}"></div>
                    </td>`;

                } else if (isOneMonth && startDate.getDate() === j
                    && finishDate.getDate() === j) {
                    //one day process line
                    readyHTML += `
                    <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                        class="processes-table-table-td process-end-td">
                        <div class="full-screen  process-one-line ${div4Background}"></div>
                    </td>`;
                } else if ((isOneMonth && startDate.getDate() === j) ||
                    (isAfterMonth && startDate.getDate() === j)) {
                    //"start of process" element
                    readyHTML += `
                    <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                        class="processes-table-table-td process-start-td">
                        <div class="full-screen process-start-line ${div4Background}"></div>
                    </td>`;
                } else if ((isOneMonth && finishDate.getDate() === j) ||
                    (isBeforMonth && finishDate.getDate() === j)) {
                    //"end of process" element
                    readyHTML += `
                    <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                        class="processes-table-table-td process-end-td">
                        <div class="full-screen process-end-line ${div4Background}"></div>
                    </td>`;
                } else {
                    //empty day                        
                    readyHTML += `
                    <td style="width: ${Varibles.tasksTableTdWidth}px;" 
                        class="processes-table-table-td">
                    </td>`;
                }
            }

            return readyHTML;
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
    },
    /**
     * Object from JSON array
     * @param {JSON} array 
     * @param {String} path example: "1234.1235.1236"
     */
    objectFromJSON: function (array, path) {
        let currentArray = Functions.childsFromJSON(
            array,
            path
        );
        let entryIdArr = path.split('.')
        let lasEntryId = entryIdArr[entryIdArr.length - 1];
        let newProcess = {};
        for (const key in currentArray[lasEntryId]) {
            if (currentArray[lasEntryId].hasOwnProperty(key)) {
                const value = currentArray[lasEntryId][key];
                if (key !== 'Childs') {
                    newProcess[key] = value;
                }
            }
        }

        return newProcess;
    },
    /**
     * Object from JSON array
     * @param {JSON} array 
     * @param {String} path example: "1234.1235.1236"
     */
    objectFromJSONWCh: function (array, path) {
        let currentArray = Functions.childsFromJSON(
            array,
            path
        );
        let entryIdArr = path.split('.')
        let lasEntryId = entryIdArr[entryIdArr.length - 1];
        currentArray = currentArray[lasEntryId];

        return currentArray;
    },
    /**
     * Parent childs from JSON array by path
     * @param {JSON} array 
     * @param {String} path example: "1234.1235.1236"
     */
    childsFromJSON: function (array, path) {
        let ids = path.split('.');
        let currentArray = array;

        for (let i = 0; i < ids.length - 1; i++) {
            const entryId = ids[i];
            currentArray = currentArray[entryId]['Childs'];
        }

        return currentArray;
    },
    /**
     * 
     */
    resizeScrollTable: function () {
        let processesTTable = document.getElementById('processes_table_table1');
        processesTTable.style = "width: " + Varibles.tableWidth * Varibles.tasksTableTdWidth +
            "px; border-color: #ddd;";
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
    /** Click **/
    /**
     * Process tr click event
     */
    processTrClick(e) {
        let entryId = this.getAttribute('entry-id');
        Database.getAddNForm(entryId);
    },
    /**
     * addNew
     * @param {Event} e 
     */
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
    },
    /**
     * Name box item click
     * @param {Event} e 
     */
    NameBoxItemClick: function (e) {
        let elementId = this.id;
        let entryId = this.getAttribute('entry-id');
        let prcItemPath = this.getAttribute('p-item-path');
        let processMenuItemIcon = $('#' + elementId + ' i');

        if (processMenuItemIcon.hasClass('fa-plus-square')) {
            processMenuItemIcon.removeClass('fa-plus-square');
            processMenuItemIcon.addClass('fa-minus-square');

            Local.addProcess(
                Functions.objectFromJSONWCh(Varibles.processesDataArray, prcItemPath)['Childs'],
                entryId,
                prcItemPath
            );
        } else {
            $('.' + elementId).remove();

            processMenuItemIcon.addClass('fa-plus-square');
            processMenuItemIcon.removeClass('fa-minus-square');
        }
    },
    /**
     * Month scrolled
     * @param {Event} e 
     */
    scrollMonth: function (e) {
        let frameElement = document.getElementById(Varibles.FrameId + '_content');
        let tableElement = document.getElementById('processes_table');
        let scrollPosition = frameElement.scrollLeft;

        if (scrollPosition > tableElement.offsetWidth - 1000) {
            let lastDate = Varibles.datesDisplayed[Varibles.datesDisplayed.length - 1];
            loadMonth(lastDate, true);
        }

        if (scrollPosition < 100) {
            let firstDate = Varibles.datesDisplayed[0];
            loadMonth(firstDate, false);
        }

        function loadMonth(date, isNextMonth) {
            let afterBefore = 'afterbegin';
            let plusMinus = -1;
            if (isNextMonth) {
                afterBefore = 'beforeend';
                plusMinus = 1;
            }

            date = new Date(date.getFullYear(), date.getMonth() + plusMinus, 1);

            Local.loadTimelineHeaderContent(date, isNextMonth);

            let pNamesBox = document.getElementsByClassName('process-names-box-item');
            for (let i = 0; i < pNamesBox.length; i++) {
                const element = pNamesBox[i];

                document.getElementById(
                    'process_row_' + element.getAttribute('entry-id')
                ).insertAdjacentHTML(
                    afterBefore,
                    Local.getProcessLineContent(
                        Functions.objectFromJSON(
                            Varibles.processesDataArray,
                            element.getAttribute('p-item-path')
                        ),
                        date
                    )
                );
            }

            let monthDaysNum = DateFunctions.daysInMonth(
                date.getMonth() + plusMinus,
                date.getFullYear()
            );

            if (isNextMonth) {
                Varibles.datesDisplayed.push(date);

            } else {
                frameElement.scrollLeft += monthDaysNum * Varibles.tasksTableTdWidth;
                Varibles.datesDisplayed.unshift(date);
            }

            Varibles.tableWidth += monthDaysNum;

            Functions.resizeScrollTable();
        }
    }
}

/** Database **/
let Database = {
    getAddNForm: function (entryId) {
        let targetId = Varibles.FrameId;
        let entryIdJSON = {
            'Name': Varibles.EntryIdName,
            'Id': entryId
        }
        let nameBoxItem = document.getElementById('process_' + entryId);

        let dinamicFormPopup = new DinamicFormPopup(
            targetId,
            'beforebegin',
            'Szerkesztés'
        );
        dinamicFormPopup.loadFormData(
            Varibles.AddNFormId,
            [Functions.objectFromJSONWCh(
                Varibles.processesDataArray,
                nameBoxItem.getAttribute('p-item-path')
            )],
            targetId,
            entryIdJSON,
            null,
            Callbacks.refreshPage
        );
    }
}

/** Framework **/
let Framework = {
    /**
     * 
     * @param {String} targetId 
     */
    Load: function (targetId, frameId) {
        document.getElementById(targetId).innerHTML =
            `
    <div id="${frameId}" class="processes-modul-frame full-screen display-flex">
        <div class="projects_header display-flex flex-column">
            <div class="projects_header_title display-flex">
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
