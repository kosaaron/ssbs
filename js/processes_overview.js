processesDataArray = [
    {
        Id: 111,
        Name: "Első projekt",
        StartDate: new Date('2019.07.13 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    },
    {
        Id: 112,
        Name: "Második projekt",
        StartDate: new Date('2019.07.13 00:00:00'),
        FinishDate: new Date('2019.07.14 00:00:00')
    },
    {
        Id: 113,
        Name: "Harmadik projekt",
        StartDate: new Date('2019.07.14 00:00:00'),
        FinishDate: new Date('2019.07.16 00:00:00')
    }
]
loadProcessesTable(processesDataArray);

/**
 * Load default processes
 * @param {Array} processesData 
 */
function loadProcessesTable(processesData) {
    let dateNow = new Date();
    let startDate = dateNow;
    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    startDate = new Date("2019.8.01");
    let monthDays = daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
    //alert(startDate.getFullYear());

    // Tasks table header
    let processesTTable = document.getElementById('processes_table_table');
    let processesTTTbody = document.getElementById('processes_t_t_tbody');

    // level 1
    // row
    let tasksTableTr = document.createElement("tr");
    tasksTableTr.className = "full-width";
    tasksTableTr.style = "height: 25px;";

    // columns
    let tasksTableTd = document.createElement("td");
    tasksTableTd.className = "full-width";
    tasksTableTd.colSpan = monthDays;
    tasksTableTd.textContent = startDate.getFullYear() + ". " + fullMonthDate(startDate);

    tasksTableTr.appendChild(tasksTableTd);
    processesTTTbody.appendChild(tasksTableTr);

    // level 2
    //row
    let tasksTableTr2 = document.createElement("tr");
    tasksTableTr2.className = "full-width";
    tasksTableTr2.style = "height: 25px;";

    //columns
    let firstWeekDays = 7 - mondayIsFirthDay(new Date(startDate).getDay());
    let startWeek = getWeekNumber(startDate);
    let tasksTableTd2 = document.createElement("td");
    tasksTableTd2.className = "full-width";
    tasksTableTd2.colSpan = firstWeekDays;
    tasksTableTr2.appendChild(tasksTableTd2);
    if (firstWeekDays >= 4) {
        tasksTableTd2.textContent = startWeek + ". hét";
    }

    for (let index = 1; index <= 3; index++) {
        tasksTableTd2 = document.createElement("td");
        tasksTableTd2.className = "full-width";
        tasksTableTd2.colSpan = 7;
        tasksTableTd2.textContent = (startWeek + index) + ". hét";

        tasksTableTr2.appendChild(tasksTableTd2);
    }

    let lastWeekDays = (monthDays % 7) + (7 - firstWeekDays);

    if (lastWeekDays !== 0) {
        tasksTableTd2 = document.createElement("td");
        tasksTableTd2.className = "full-width";
        tasksTableTd2.colSpan = lastWeekDays;
        tasksTableTr2.appendChild(tasksTableTd2);
        if (lastWeekDays >= 4) {
            tasksTableTd2.textContent = startWeek + ". hét";
        }
    }

    processesTTTbody.appendChild(tasksTableTr2);

    // level 3
    // row 
    let tasksTableTr3 = document.createElement("tr");
    tasksTableTr3.className = "full-width";
    tasksTableTr3.style = "height: 25px;";

    for (let index = 0; index < monthDays; index++) {
        let tasksTableTd3 = document.createElement("td");
        tasksTableTd3.className = "processes-table-table-td";
        tasksTableTd3.textContent = index+1
        tasksTableTd3.style="width: "+100/monthDays+"%;";
        tasksTableTr3.appendChild(tasksTableTd3);
    }

    processesTTTbody.appendChild(tasksTableTr3);
    processesTTable.style="width: "+25*monthDays+"px; border-color: #ddd;";

    // process names box
    let processNamesBox = document.getElementById('process_names_box');
    for (var index = 0; index < processesData.length; index++) {
        // Task names
        const process = processesData[index];

        let processNamesBoxItem = document.createElement("div");
        processNamesBoxItem.className = "process-names-box-item display-flex";

        let pNBoxItemText = document.createElement("div");
        pNBoxItemText.className = "full-width margin-auto";
        pNBoxItemText.textContent = process.Name;

        processNamesBoxItem.appendChild(pNBoxItemText);
        processNamesBox.appendChild(processNamesBoxItem);
    }
}

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