const fillData = [
    {
        task_id: 'asdasd',
        start_year: 2019,
        start_month: 10,
        start_day: 5,
        length: 21,
        title: 'Novermber 5 - 26',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 1
    },
    {
        task_id: 'dfgdfg',
        start_year: 2019,
        start_month: 9,
        start_day: 1,
        length: 9,
        title: 'Október 1 - 9',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'sdfsdf',
        start_year: 2019,
        start_month: 9,
        start_day: 16,
        length: 40,
        title: 'Október 16 - November 24',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'cvdfg',
        start_year: 2019,
        start_month: 8,
        start_day: 30,
        length: 9,
        title: 'Szeptember 30 - Október 8',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'xcbnhfg',
        start_year: 2019,
        start_month: 9,
        start_day: 8,
        length: 2,
        title: 'Október 8 - 9',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    }
];

class Task{
    constructor(obj) {
        let task_id, start_year, start_month, start_day, length, title, description, state;
        ({task_id, start_year, start_month, start_day, length, title, description, state} = obj);
        this.id = task_id;
        this.start_year = Number(start_year);
        this.start_month = Number(start_month);
        this.start_day = Number(start_day);
        this.length = Number(length);
        this.title = title;
        this.description = description;
        this.state = state;
    }
}

class Month {
    constructor(year, monthId) {
        this.year = year;
        this.monthId = monthId;
    }

    get calendarEndPoints() {
        return this.getCalendarEndPoints();
    }

    get length() {
        return this.getMonthLength(this.monthId);
    }

    get firstDay() {
        return this.getFirstDayOfMonth(this.year, this.monthId);
    }

    get rowNum() {
        return this.defineRowNum(this.length, this.firstDay);
    }

    get prevLength() {
        return this.getMonthLength(this.monthId-1);
    }

    getCalendarEndPoints() {
        let calendarStart = {};
        let calendarEnd = {};

        if (this.firstDay != 1) {
            calendarStart.year = this.monthId == 0 ? this.year - 1 : this.year;
            calendarStart.month = this.monthId == 0 ? 11 : this.monthId - 1;
            calendarStart.day = this.prevLength - this.firstDay + 2;
        }
        else {
            calendarStart.year = this.year;
            calendarStart.month = this.monthId;
            calendarStart.day = 1;
        }

        if (this.length + this.firstDay - 1 != this.rowNum * 7) {
            calendarEnd.year = this.monthId == 11 ? this.year + 1 : this.year;
            calendarEnd.month = this.monthId == 11 ? 0 : this.monthId + 1;
            calendarEnd.day = this.rowNum * 7 - this.length - this.firstDay + 1;
        }
        else {
            calendarEnd.year = this.year;
            calendarEnd.month = this.monthId;
            calendarEnd.day = this.length;
        }

        return {
                "calendarStart" : calendarStart,
                "calendarEnd": calendarEnd
                };
    }

    getMonthLength(monthNum) {
        let monthLength = 0;
        if(monthNum>11) monthNum = 0;
        if (monthNum < 0) monthNum = 11;
        switch (monthNum) {
            case 0: case 2: case 4: case 6: case 7: case 9: case 11:
                monthLength = 31;
                break;
            case 3: case 5: case 8: case 10:
                monthLength = 30;
                break;
            case 1:
                if((this.year % 4 == 0) && (this.year % 100 != 0)) {
                    monthLength = 29;
                }
                else {monthLength = 28}
                break;
            //no default    
        }
        return monthLength;
    }

    getFirstDayOfMonth(year, month) {
        let firstDayNum = new Date(year, month, 1).getDay();
        if(firstDayNum == 0) firstDayNum = 7;
        return firstDayNum;
    }

    defineRowNum(monthLength, firstDay) {
        let rowNum = 5;
        if ((monthLength == 30 && firstDay > 5) || (monthLength == 31 && firstDay > 4)) {
            rowNum = 6;
        }
        return rowNum;
    }
}


let currentMonthId;
let prevMonthId;
let nextMonthId;
let prevMonthLength;
let currentFirstDay;
let prevCellsNum;
let nextCellsNum;
drawCalendar(2019, 9)


function drawCalendar(_year, _month) {
    const calBody = document.getElementById("grid");

    const currentMonth = new Month(_year, _month);

    currentMonthId = _month;
    prevMonthId = currentMonthId - 1 < 0 ? 12 : currentMonthId - 1;
    nextMonthId = currentMonthId + 1 > 12 ? 0 : currentMonthId + 1;
    prevMonthLength = currentMonth.prevLength;
    currentFirstDay = currentMonth.firstDay;

    let dateNum = 1;
    let cellNum = 1;
    let current = true;
    prevCellsNum = 0;
    nextCellsNum = 0;

    let cal = currentMonth.rowNum == 5 ? `<div class="calendar" id="calendar">` : `<div class="calendar row-6" id="calendar">`;
    for (let i = 0; i < currentMonth.rowNum; i++) {cal += `<div class="calendar__row">`;
        for (let j = 0; j < 7; j++) {
           
        if(cellNum < currentMonth.firstDay) {
            cal += `<div class="prev-month">
            <span class="calendar-days">${currentMonth.prevLength + cellNum - currentMonth.firstDay + 1}</span>
            </div>`;
            prevCellsNum++;
            if(cellNum == currentMonth.firstDay - 1) dateNum = 0;
        }
        else if(cellNum >= currentMonth.firstDay && dateNum <= currentMonth.length && current) {
            cal += `<div class="current-month">
            <span class="calendar-days">${dateNum}</span></span>
            </div>`;
            if(dateNum == currentMonth.length) {
                dateNum = 0; 
                current = false;
            }
        }
        else {
            cal += `<div class="next-month">
            <span class="calendar-days">${dateNum}</span>
            </div>`;
            nextCellsNum++;
        }
        cellNum++;
        dateNum++;
        }
        
        cal += `</div>`;
    }
    cal += `</div>`;

    calBody.innerHTML = cal;

    const currentDays = Array.from(document.getElementsByClassName('current-month'));

    if (new Date().getMonth() == _month) currentDays[new Date().getDate()-1].classList.add('today');
    
    
    const endPoints = currentMonth.calendarEndPoints;

    /*
    AJAX: 
        currentMonth.calendarEndPoints => a látszó naptár 2 végpontja, a köztes dátumokkal rendelkező feladatokat kell lekérni számold hozzá a feladat hosszát is, ne csak a start időt nézd (struktúra a Month Class-ban)
        fillCalendar => az ajax ezt hívja meg a lekérés eredményével
    */
    fillCalendar(fillData);
    document.getElementById('time').innerHTML = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentMonth.monthId] + ' ' + _year;
    document.getElementById('prev').addEventListener('click', moveBack);
    document.getElementById('next').addEventListener('click', moveFwd);
}

const date = new Date();
let monthPos = date.getMonth();
let yearPos = date.getFullYear();

function moveBack() {
    moveCalendar(-1);
}

function moveFwd() {
    moveCalendar(1);
}

function moveCalendar(num) {
    monthPos += num;
    if (monthPos > 0 && (monthPos+1) == 13) {
        yearPos++;
        monthPos = 0;
    }
    else if (monthPos < 0) {
        yearPos--;
        monthPos = 11;
    }
    drawCalendar(yearPos, monthPos);
}

/**
 * 
 * @param {json} taskData 
 */
function fillCalendar(taskData) {
    let tasks = {}
    let tasksByDate = {};

    for (let i = 0; i < taskData.length; i++) {
        const taskDate = 'M'+taskData[i].start_month+'-D'+taskData[i].start_day;
        if (!tasksByDate[taskDate]) {
            tasksByDate[taskDate] = [];
            tasksByDate[taskDate].push(taskData[i].task_id);
        }
        else {
            tasksByDate[taskDate].push(taskData[i].task_id);
        }
        tasks[taskData[i].task_id] = new Task(taskData[i]);
    }

    for (let key in tasks) {
        if (tasks.hasOwnProperty(key)) {
            const rows = document.getElementsByClassName('calendar__row');
            // && utáni rész élesben nem kell már, azt a szűrést php végezze
            if (tasks[key]['start_month'] == prevMonthId && tasks[key]['start_day'] + tasks[key]['length'] >= prevMonthLength) {
                if (tasks[key]['start_day'] <= prevMonthLength - prevCellsNum) {
                    //nem látszódik a start -> 0.tól length-ig
                    let visibleDaysNum = tasks[key]['length'] - (prevMonthLength-prevCellsNum - tasks[key]['start_day']) - 1 <= rows.length * 7 ? tasks[key]['length'] - (prevMonthLength-prevCellsNum - tasks[key]['start_day']) - 1 : rows.length * 7;
                    const rowsItTakes = Math.ceil(visibleDaysNum / 7);
                    let i = 0;
                    do {
                        if (rows[i]) {
                            if (i + 1 >= rowsItTakes) {
                            rows[i].innerHTML += createTaskContainer(1, 'span ' + visibleDaysNum, tasks[key]['title']);
                            }
                            else {
                                rows[i].innerHTML += createTaskContainer(1, 8, tasks[key]['title']);
                            }
                        }
                        i++;
                        visibleDaysNum -= 7;
                    } while (i < rowsItTakes);
                }
                else {
                    //előző hónap, de látszódik a kezdés
                    const taskStart = prevCellsNum - prevMonthLength + tasks[key]['start_day'];
                    let visibleDaysNum = tasks[key]['length'] >= rows.length * 7 ? rows.length * 7 - taskStart + 1 : tasks[key]['length'];
                    const rowsItTakes = Math.ceil(visibleDaysNum / 7);
                    const gridColSpan = visibleDaysNum > 7 ? 8 : visibleDaysNum;
                    let i = 0;
                    do {
                        if (i == 0) {
                            rows[i].innerHTML += createTaskContainer(taskStart, 'span ' + gridColSpan, tasks[key]['title']);
                            visibleDaysNum -= (7 - taskStart + 1);
                        }
                        else if (rows[i] && visibleDaysNum > 0) {
                            if (i + 1 >= rowsItTakes) {
                                rows[i].innerHTML += createTaskContainer(1, 'span ' + visibleDaysNum, tasks[key]['title']);
                            }
                            else {
                                rows[i].innerHTML += createTaskContainer(1, 8, tasks[key]['title']);
                            }
                            visibleDaysNum -= 7;
                        }
                        i++;
                    } while (visibleDaysNum > 0);
                }
            }
            else if (tasks[key]['start_month'] == currentMonthId) {
                const taskStart = prevCellsNum + tasks[key]['start_day'];
                let visibleDaysNum = tasks[key]['length'] >= rows.length * 7 ? rows.length * 7 - taskStart + 1 : tasks[key]['length'];
                const startingRow = Math.floor(taskStart / 7);
                const rowsItTakes = Math.ceil(visibleDaysNum / 7);
                const gridColSpan = 8 - taskStart % 7;
                let startOfCol = taskStart < 8 ? 1 : (taskStart % 7 == 0 ? 1 : taskStart % 7);
                let i = startingRow;
                do {
                    if (i != startingRow) startOfCol = 1;
                    if (i == 0) {
                        rows[i].innerHTML += createTaskContainer(taskStart, 'span ' + gridColSpan, tasks[key]['title']);
                    }
                    else if (rows[i] && visibleDaysNum > 0) {
                        if (i + 1 >= rowsItTakes) {
                            rows[i].innerHTML += createTaskContainer(startOfCol, 'span ' + visibleDaysNum, tasks[key]['title']);
                        }
                        else {
                            rows[i].innerHTML += createTaskContainer(startOfCol, 8, tasks[key]['title']);
                        }
                    }
                     visibleDaysNum -= i == startingRow ? (8 - taskStart) : 7;
                    i++;
                } while (visibleDaysNum > 0);
            }
            // && utáni csak azért van benne mert most nyilván nem adatb szűri a taskokat, ez élesben nem fog kelleni --> else if --> else
            else if (tasks[key]['start_month'] == nextMonthId && tasks[key]['start_day'] <= nextCellsNum) {
                const taskStart = (rows.length * 7 - nextCellsNum + tasks[key]['start_day']) % 7 == 0 ? 7 : (rows.length * 7 - nextCellsNum + tasks[key]['start_day']) % 7;
                let visibleDaysNum = tasks[key]['length'] > nextCellsNum ? nextCellsNum : tasks[key]['length'];
                rows[rows.length - 1].innerHTML += createTaskContainer(taskStart, 'span ' + visibleDaysNum, tasks[key]['title']);
            }
        }
    }
}

function createTaskContainer(colStart, colEnd, title) {
    return `<div class="task" style="grid-column: ${colStart} / ${colEnd}"><div class="task__inner">${title}</div></div>`;
}