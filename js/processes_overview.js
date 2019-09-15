/**
 * Imports
 */
import { addOneListener, mainFrame } from './common.js';

let processesDataArray = [
    {
        Id: 111,
        Name: "Első projekt",
        Parent: null,
        StartDate: new Date('2019.06.11 00:00:00'),
        FinishDate: new Date('2019.08.16 00:00:00')
    },
    {
        Id: 112,
        Name: "Második projekt",
        Parent: 111,
        StartDate: new Date('2019.07.13 00:00:00'),
        FinishDate: new Date('2019.07.14 00:00:00')
    },
    {
        Id: 113,
        Name: "Harmadik projekt",
        Parent: 111,
        StartDate: new Date('2019.07.14 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 114,
        Name: "Negyedik projekt",
        Parent: null,
        StartDate: new Date('2019.07.16 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 115,
        Name: "Öt projekt",
        Parent: null,
        StartDate: new Date('2019.07.03 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 116,
        Name: "Hat projekt",
        Parent: 111,
        StartDate: new Date('2019.07.13 00:00:00'),
        FinishDate: new Date('2019.07.14 00:00:00')
    },
    {
        Id: 117,
        Name: "Hét projekt",
        Parent: 111,
        StartDate: new Date('2019.07.14 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 118,
        Name: "Nyolc projekt",
        Parent: 113,
        StartDate: new Date('2019.07.16 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 119,
        Name: "Első projekt",
        Parent: null,
        StartDate: new Date('2019.06.11 00:00:00'),
        FinishDate: new Date('2019.08.16 00:00:00')
    },
    {
        Id: 120,
        Name: "Második projekt",
        Parent: 111,
        StartDate: new Date('2019.07.13 00:00:00'),
        FinishDate: new Date('2019.07.14 00:00:00')
    },
    {
        Id: 121,
        Name: "Harmadik projekt",
        Parent: 111,
        StartDate: new Date('2019.07.14 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 122,
        Name: "Negyedik projekt",
        Parent: null,
        StartDate: new Date('2019.07.16 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 123,
        Name: "Öt projekt",
        Parent: null,
        StartDate: new Date('2019.07.03 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 124,
        Name: "Hat projekt",
        Parent: 111,
        StartDate: new Date('2019.07.13 00:00:00'),
        FinishDate: new Date('2019.07.14 00:00:00')
    },
    {
        Id: 125,
        Name: "Hét projekt",
        Parent: 111,
        StartDate: new Date('2019.07.14 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 126,
        Name: "Nyolc projekt",
        Parent: 113,
        StartDate: new Date('2019.07.16 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 127,
        Name: "Hat projekt",
        Parent: 111,
        StartDate: new Date('2019.07.13 00:00:00'),
        FinishDate: new Date('2019.07.14 00:00:00')
    },
    {
        Id: 128,
        Name: "Hét projekt",
        Parent: 111,
        StartDate: new Date('2019.07.14 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 129,
        Name: "Nyolc projekt",
        Parent: 113,
        StartDate: new Date('2019.07.16 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    }
]


/**
 * 1. Global varibles
 * 2. Load default processes.
 * 3. Add month to view (after)
 * 4. Add month to view (befor)
 * 5. Date functions
 * 6. Load framework
 * 7. Processes overview resize event
 * 8. Processes overview scroll events
 */

/** 
 * Global varibles
*/
var tasksTableTdWidth = 25;
let tasksTableWidth;
var taskLevels = [];
var gTimeLineStart;
var gTimeLineEnd;
var gTimeLineLength;

/**
 * Load default processes
 * @param {Array} processesData 
 */
function loadProcessesTable(processesData) {
    let dateNow = new Date();
    let startDate = dateNow;
    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    //startDate = new Date("2019.8.01");
    let monthDays = daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
    tasksTableWidth = monthDays;

    // Tasks table header
    let processesTTable = document.getElementById('processes_table_table1');
    let processesTTTbody = document.getElementById('processes_t_t_tbody');
    let processesTTThead = document.getElementById('processes_t_t_thead');

    // level 1
    // row
    let tasksTableTr = document.createElement("tr");
    tasksTableTr.className = "tasksTableTr";
    tasksTableTr.style = "height: " + tasksTableTdWidth + "px;";

    // columns
    let tasksTableTd = document.createElement("td");
    tasksTableTd.colSpan = monthDays;
    tasksTableTd.textContent = startDate.getFullYear() + ". " + fullMonthDate(startDate);

    tasksTableTr.appendChild(tasksTableTd);
    processesTTThead.appendChild(tasksTableTr);

    // level 2
    //row
    let tasksTableTr2 = document.createElement("tr");
    tasksTableTr2.className = "tasksTableTr";
    tasksTableTr2.style = "height: " + tasksTableTdWidth + "px;";

    //columns
    let firstWeekDays = 7 - mondayIsFirthDay(new Date(startDate).getDay());
    let startWeek = getWeekNumber(startDate);
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
    tasksTableTr3.style = "height: " + tasksTableTdWidth + "px;";

    for (let index = 1; index <= monthDays; index++) {
        let tasksTableTd3 = document.createElement("td");
        tasksTableTd3.className = "processes-table-table-td";
        tasksTableTd3.textContent = index;
        tasksTableTd3.style = "width: " + tasksTableTdWidth + "px;";
        if (index === dateNow.getDate()) {
            tasksTableTd3.id = "tasks_table_td_today";
        }
        tasksTableTr3.appendChild(tasksTableTd3);
    }

    processesTTThead.appendChild(tasksTableTr3);
    processesTTable.style = "width: " + tasksTableTdWidth * monthDays + "px; border-color: #ddd;";

    // processes box
    let processNamesBox = document.getElementById('process_names_box');
    for (var index = 0; index < processesData.length; index++) {
        // Task names
        const process = processesData[index];

        let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);

        // the empty parent element skipped
        if (process.Parent !== null)
            continue;

        // Levels of tasks
        let object = { Id: process.Id, Level: 0 };
        taskLevels.push(object);

        // Is it this month
        var isThisMonth = process.FinishDate < startDate || process.StartDate > monthEnd;
        var isBeforMonth = process.StartDate < startDate;
        var isAfterMonth = process.FinishDate > monthEnd;

        let processNamesBoxItem = document.createElement("div");
        processNamesBoxItem.className = "process-names-box-item display-flex";
        processNamesBoxItem.id = process.Id;

        let pNBoxItemText = document.createElement("div");
        pNBoxItemText.className = "full-width margin-auto text-o-ellipsis";
        pNBoxItemText.textContent = process.Name;

        processNamesBoxItem.appendChild(pNBoxItemText);
        processNamesBox.appendChild(processNamesBoxItem);

        // Task timelines
        let tasksTableTr4 = document.createElement("tr");
        tasksTableTr4.id = "process_row_" + process.Id;
        tasksTableTr4.className = "tasksTableTr";
        tasksTableTr4.style = "height: " + tasksTableTdWidth + "px;";

        for (let index2 = 1; index2 <= monthDays; index2++) {
            let tasksTableTd4 = document.createElement("td");
            tasksTableTd4.style = "width: " + tasksTableTdWidth + "px;";

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
}

/**
 * Add month to view (after)
 * @param {Date} date Generate month date
 * @param {Array} processesData 
 */
function addMonthAfter(date, processesData) {
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    //startDate = new Date("2019.8.01");
    let monthDays = daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
    tasksTableWidth += monthDays;

    // Tasks table header
    let processesTTable = document.getElementById('processes_table_table1');

    processesTTable.style = "width: " + (processesTTable.clientWidth + tasksTableTdWidth * monthDays) + "px; border-color: #ddd;";

    let tasksTableTr = document.getElementsByClassName("tasksTableTr");

    // level 1
    // columns
    let tasksTableTd = document.createElement("td");
    tasksTableTd.colSpan = monthDays;
    tasksTableTd.textContent = startDate.getFullYear() + ". " + fullMonthDate(startDate);

    tasksTableTr[0].appendChild(tasksTableTd);

    // level 2
    //columns
    let firstWeekDays = 7 - mondayIsFirthDay(new Date(startDate).getDay());
    let startWeek = getWeekNumber(startDate);
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
        tasksTableTd3.style = "width: " + tasksTableTdWidth + "px;";
        tasksTableTr[2].appendChild(tasksTableTd3);
    }

    // Processes box
    //tasksTableTr counter
    var counter = 2;
    for (var index = 0; index < processesData.length; index++) {
        // Task names
        const process = processesData[index];

        if (process.Parent !== null)
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
            tasksTableTd4.style = "width: " + tasksTableTdWidth + "px;";

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
}

/**
 * Add month to view (before)
 * @param {Date} date Generate month date
 * @param {Array} processesData 
 */
function addMonthBefor(date, processesData) {
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    //startDate = new Date("2019.8.01");
    let monthDays = daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
    tasksTableWidth += monthDays;

    // Tasks table header
    let processesTTable = document.getElementById('processes_table_table1');

    processesTTable.style = "width: " + (processesTTable.clientWidth + tasksTableTdWidth * monthDays) + "px; border-color: #ddd;";

    let tasksTableTr = document.getElementsByClassName("tasksTableTr");

    // level 1
    // columns
    let tasksTableTd = document.createElement("td");
    tasksTableTd.colSpan = monthDays;
    tasksTableTd.textContent = startDate.getFullYear() + ". " + fullMonthDate(startDate);

    tasksTableTr[0].insertBefore(tasksTableTd, tasksTableTr[0].childNodes[0]);

    // level 2
    //columns
    let firstWeekDays = 7 - mondayIsFirthDay(new Date(startDate).getDay());
    let startWeek = getWeekNumber(startDate);
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
        tasksTableTd3.style = "width: " + tasksTableTdWidth + "px;";
        tasksTableTr[2].insertBefore(tasksTableTd3, tasksTableTr[2].childNodes[index]);
    }

    // Processes box
    //tasksTableTr counter
    var counter = 2;
    for (var index = 0; index < processesData.length; index++) {
        // Task names
        const process = processesData[index];

        if (process.Parent !== null)
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
            tasksTableTd4.style = "width: " + tasksTableTdWidth + "px;";

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
}

/**
 * Add subproject
 * @param {Integer} parentId Partner ID
 * @param {Array} processesData Processes data
 * @param {Date} firthMonth Generation start with this date
 * @param {Integer} numOfMonth Number of month that will be generated
 */
function addSubProject(parentId, processesData, firthMonth, numOfMonth) {
    let processesTTTbody = document.getElementById('processes_t_t_tbody');

    // processes box
    let processNamesBox = document.getElementById('process_names_box');
    for (var index = 0; index < processesData.length; index++) {
        // Task names
        const process = processesData[index];

        // the empty parent element skipped
        if (process.Parent !== parentId)
            continue;

        let level = 0;
        taskLevels.forEach(element => {
            if (element.Id === parentId) {
                level = element.Level + 1;
                return;
            }
        });

        let object = { Id: process.Id, Level: level };
        taskLevels.push(object);

        let processNamesBoxItem = document.createElement("div");
        processNamesBoxItem.className = "process-names-box-item display-flex";
        processNamesBoxItem.style = "margin-left: " + level * 8 + "px;";
        processNamesBoxItem.id = process.Id;

        let pNBoxItemText = document.createElement("div");
        pNBoxItemText.className = "full-width margin-auto text-o-ellipsis";
        pNBoxItemText.textContent = process.Name;

        let pNamesBoxRef = document.getElementById(parentId);
        processNamesBoxItem.appendChild(pNBoxItemText);
        processNamesBox.insertBefore(processNamesBoxItem, pNamesBoxRef.nextSibling);

        // Task timelines
        let tasksTableTr4 = document.createElement("tr");
        tasksTableTr4.id = "process_row_" + process.Id;
        tasksTableTr4.className = "tasksTableTr";
        tasksTableTr4.style = "height: " + tasksTableTdWidth + "px;";

        for (let index3 = 0; index3 < numOfMonth; index3++) {
            let startDate = new Date(firthMonth.getFullYear(), firthMonth.getMonth() + index3, 1);
            let monthDays = daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
            tasksTableWidth = monthDays;

            let monthEnd = new Date(startDate.getFullYear(), startDate.getMonth(), monthDays);
            // Is it this month
            let isThisMonth = process.FinishDate < startDate || process.StartDate > monthEnd;
            let isBeforMonth = process.StartDate < startDate;
            let isAfterMonth = process.FinishDate > monthEnd;

            for (let index2 = 1; index2 <= monthDays; index2++) {
                let tasksTableTd4 = document.createElement("td");
                tasksTableTd4.style = "width: " + tasksTableTdWidth + "px;";

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
}

/** Date functions */
/**
 * Simple date formatter
 * @param {Date} date 
 */
function formatDate(date) {
    var monthNames = [
        "január", "február", "március",
        "április", "május", "június", "július",
        "augusztus", "szeptember", "október",
        "november", "december"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return year + '. ' + monthNames[monthIndex] + ' ' + day + '.';
}

/**
 * Get full month name
 * @param {Date} date 
 */
function fullMonthDate(date) {
    var monthNames = [
        "január", "február", "március",
        "április", "május", "június", "július",
        "augusztus", "szeptember", "október",
        "november", "december"
    ];

    var monthIndex = date.getMonth();

    return monthNames[monthIndex];
}

/**
 * Get week number of year
 * @param {Date} d 
 */
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}

/**
 * Returns the correct amount of days
 * @param {Integer} month 
 * @param {Integer} year 
 */
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 * Get day of the week
 * @param {Date} date 
 */
function getWeekDay(date) {
    //Create an array containing each day, starting with Sunday.
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    //Use the getDay() method to get the day.
    var day = date.getDay();
    //Return the element that corresponds to that index.
    return weekdays[day];
}

function mondayIsFirthDay(day) {
    if (day == 0) {
        return 6;
    } else {
        return day - 1;
    }
}

/**
 * Load framework
 */
let processesOverview = {
    loadProcessesOverview: function () {
        // Framework
        document.getElementById("back_to_menu_text").textContent = "Feladatok átlátása";
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);

        var framework = '<div id="process_modul_content" class="full-screen"><div id="processes_overview" class="full-screen display-flex"><div id="processes_overview_header" class="display-flex flex-column"><div id="processes_overview_header_title" class="display-flex"><div class="margin-auto">Feladatok</div></div><div id="process_names_box" class="flex-1" onscroll="scrollHeadProcessesO()"></div></div><div id="processes_overview_content"><div id="processes_table_shell" class="display-flex full-screen align-center"><table id="processes_table" border="1" style="border: 1px solid transparent; border-bottom: #ddd"><tbody><tr><td style="padding: 0;"><table id="processes_table_table1" border="1" style="border-color: #ddd;" class="full-screen processes-table-table"><thead id="processes_t_t_thead"></thead></table></td></tr><tr><td style="padding: 0;"><div id="processes_t_scroll_table" onscroll="scrollContentProcessesO()"><table id="processes_table_table2" border="1" style="border-color: #ddd;" class="full-screen processes-table-table"><tbody id="processes_t_t_tbody"></tbody></table></div></td></tr></tbody></table></div></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;

        // Content
        // now
        var dateNow = new Date();

        // default table 
        loadProcessesTable(processesDataArray);

        if (dateNow.getDate() < 10) {
            gTimeLineStart = new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, 1);
            gTimeLineLength = 3;
            addMonthBefor(gTimeLineStart, processesDataArray);
        } else {
            gTimeLineStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
            gTimeLineLength = 2;
        }

        gTimeLineEnd = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 1);
        addMonthAfter(gTimeLineEnd, processesDataArray);
        addSubProject(111, processesDataArray, gTimeLineStart, gTimeLineLength);
        addSubProject(113, processesDataArray, gTimeLineStart, gTimeLineLength);

        resizeProcessesOverview();

        var tasksTableTdToday = document.getElementById("tasks_table_td_today");
        var processesOverviewContent = document.getElementById("processes_overview_content");
        processesOverviewContent.scrollLeft = tasksTableTdToday.offsetLeft + 2;

        let processesTScrollTable = document.getElementById('processes_t_scroll_table');
        let processNamesBox = document.getElementById('process_names_box');

        processesTScrollTable.addEventListener("wheel", processesTWheel);
        processNamesBox.addEventListener("wheel", processesTWheel);

        function processesTWheel(event) {
            const delta = Math.sign(event.deltaY);
            if (delta === 1) {
                processNamesBox.scrollTop += 20;
            } else {
                processNamesBox.scrollTop -= 20;
            }
        }
    }
}
export default processesOverview;

/**
 * Processes overview resize event
 */
function resizeProcessesOverview() {
    // Y scroll on the table
    let processesTScrollTable = document.getElementById('processes_t_scroll_table');
    let processesTableShell = document.getElementById('processes_table_shell');
    let processesTTable = document.getElementById('processes_table_table1');
    processesTScrollTable.style = "";
    if (processesTableShell.clientHeight - processesTTable.clientHeight - 2 < processesTScrollTable.clientHeight) {
        processesTScrollTable.style = "height: " + (processesTableShell.clientHeight - processesTTable.clientHeight - 2) + "px";
    }
}

/**
 * Processes overview scroll events
 */
function scrollHeadProcessesO() {
    let processesTScrollTable = document.getElementById('processes_t_scroll_table');
    let processNamesBox = document.getElementById('process_names_box');

    processesTScrollTable.scrollTop = processNamesBox.scrollTop;
}

function scrollContentProcessesO() {
    let processesTScrollTable = document.getElementById('processes_t_scroll_table');
    let processNamesBox = document.getElementById('process_names_box');

    processesTScrollTable.scrollTop = processNamesBox.scrollTop;
}

