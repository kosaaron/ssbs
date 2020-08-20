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
    AddNTaskFormId: 'newtsk',
    //Entry
    EntryIdName: '0',
    ParentFKName: '1',
    ProjectNameName: '2',
    StartDateName: '3',
    FinishDateName: '4',
    DeadlineName: '5',
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

        let processTableHeaight = $('#processes_table_table2').outerHeight();
        let nameBoxItems = $('.process-names-box-item');
        let processMargin = nameBoxItems.outerHeight(true) - nameBoxItems.height();

        nameBoxItems.height(processTableHeaight / nameBoxItems.length - processMargin / 2);
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
        ProjectsContent.scrollLeft = tasksTableTdToday.offsetLeft -
            $(`#${Varibles.FrameId}_table_shell`).width() / 3;
        //ProjectsContent.addEventListener("scroll", Events.scrollMonth);

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
                    <div class="full-width margin-auto text-o-ellipsis">${process[Varibles.ProjectNameName]}</div>
                </div>`

        function getLeftOffset() {
            return 8 + process['Level'] * 5;
        }

        function getDropDownClass() {
            if (!process.hasOwnProperty('Children')) {
                return `<i class="fas fa-tasks margin-auto p-n-box-item-icon"></i>`;
            } else if (process['Children'].length === 0) {
                return `<i class="fas fa-project-diagram margin-auto p-n-box-item-icon"></i>`;
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

        Projects.resize();
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
        let startDate = new Date(process[Varibles.StartDateName]);
        let finishDate = new Date(process[Varibles.FinishDateName]);
        let deadline = new Date(process[Varibles.DeadlineName]);
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
            if (process[Varbiles.ParentFKName] === projectId) {
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
        let currentArray = Functions.childrenFromJSON(
            array,
            path
        );
        let entryIdArr = path.split('.')
        let lasEntryId = entryIdArr[entryIdArr.length - 1];
        let newProcess = {};
        for (const key in currentArray[lasEntryId]) {
            if (currentArray[lasEntryId].hasOwnProperty(key)) {
                const value = currentArray[lasEntryId][key];
                if (key !== 'Children') {
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
        let currentArray = Functions.childrenFromJSON(
            array,
            path
        );
        let entryIdArr = path.split('.')
        let lasEntryId = entryIdArr[entryIdArr.length - 1];
        currentArray = currentArray[lasEntryId];

        return currentArray;
    },
    /**
     * Parent children from JSON array by path
     * @param {JSON} array 
     * @param {String} path example: "1234.1235.1236"
     */
    childrenFromJSON: function (array, path) {
        let ids = path.split('.');
        let currentArray = array;

        for (let i = 0; i < ids.length - 1; i++) {
            const entryId = ids[i];
            currentArray = currentArray[entryId]['Children'];
        }

        return currentArray;
    },
    /**
     * resizeScrollTable
     */
    resizeScrollTable: function () {
        let processesTTable = document.getElementById('processes_table_table1');
        processesTTable.style = "width: " + Varibles.tableWidth * Varibles.tasksTableTdWidth +
            "px; border-color: #ddd;";
    },
    /**
     * 
     * @param {String} columnId 
     */
    getPrtnrOrgnColumns: function (columnId) {
        switch (columnId) {
            case '0':
                return 'projects.ProjectId';
            case '1':
                return 'projects.ParentFK';
            case '2':
                return 'projects.Name';
            case '3':
                return 'projects.StartDate';
            case '4':
                return 'projects.FinishDate';
            case '5':
                return 'projects.Deadline';
            default:
                return columnId;
        }
    },
    /**
     * 
     * @param {String} columnId 
     */
    getTskOrgnColumns: function (columnId) {
        switch (columnId) {
            case '0':
                return 'tasks.TaskId';
            case '1':
                return 'projects.Name';
            case '2':
                return 'tasks.Name';
            case '3':
                return 'tasks.StartDate';
            case '4':
                return 'tasks.FinishDate';
            case '5':
                return 'tasks.Deadline';
            default:
                return columnId;
        }
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
                Functions.objectFromJSONWCh(Varibles.processesDataArray, prcItemPath)['Children'],
                entryId,
                prcItemPath
            );
        } else {
            $('.' + elementId).remove();

            processMenuItemIcon.addClass('fa-plus-square');
            processMenuItemIcon.removeClass('fa-minus-square');
        }

        Projects.resize();
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
        let splittedId = entryId.split('_');
        let nameBoxItem = document.getElementById('process_' + entryId);
        let entryIdJSON = {
            'Name': Functions.getPrtnrOrgnColumns(Varibles.EntryIdName),
            'Id': entryId
        }

        let formPlace = Varibles.AddNFormId;
        let isProject = true;
        if (splittedId.length === 2) {
            formPlace = Varibles.AddNTaskFormId;
            isProject = false;
            entryIdJSON = {
                'Name': Functions.getTskOrgnColumns(Varibles.EntryIdName),
                'Id': splittedId[1]
            }
        }
        let dinamicFormPopup = new DinamicFormPopup(
            targetId,
            'beforebegin',
            'Szerkesztés'
        );
        dinamicFormPopup.loadFormData(
            formPlace,
            [getEntry()],
            targetId,
            entryIdJSON,
            null,
            Callbacks.refreshPage
        );

        function getEntry() {
            let entry = Functions.objectFromJSONWCh(
                Varibles.processesDataArray,
                nameBoxItem.getAttribute('p-item-path')
            );
            let newEntry = {};

            for (const column in entry) {
                if (entry.hasOwnProperty(column)) {
                    const value = entry[column];

                    if (isProject) {
                        newEntry[Functions.getPrtnrOrgnColumns(column)] = value;
                    } else {
                        if (column === '0') {
                            newEntry[Functions.getTskOrgnColumns(column)] = splittedId[1];
                        } else {
                            newEntry[Functions.getTskOrgnColumns(column)] = value;
                        }
                    }
                }
            }
            return newEntry;
        }
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
