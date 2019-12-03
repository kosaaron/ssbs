import Month from './plug-ins/MonthClass.js';
import showContent from './plug-ins/DropdownAnimation.js';
let endPoints;

drawCalendar(new Date().getFullYear(), new Date().getMonth());

function drawCalendar(_year, _month) {
    const calBody = document.getElementById("cal-body");

    const currentMonth = new Month(_year, _month);
    const prevId = currentMonth.monthId -1 < 0 ? 11 : currentMonth.monthId-1;
    const nextId = currentMonth.monthId +1 > 10 ? 0 : currentMonth.monthId+1;

    let dateNum = 1;
    let cellNum = 1;
    let current = true;

    let table = `<table class="calendar-table" id="calendar">`;
    for (let i = 0; i < currentMonth.rowNum; i++) {
        table += `<tr class="calendar-row">`;
        for (let j = 0; j < 7; j++) {
            if(cellNum < currentMonth.firstDay) {
                table += `<td id="M${prevId}-D${currentMonth.prevLength + cellNum - currentMonth.firstDay + 1}" class="prev-month y-${_year}">
                <span class="calendar-days">${currentMonth.prevLength + cellNum - currentMonth.firstDay + 1}</span>
                </td>`;
                if(cellNum == currentMonth.firstDay - 1) dateNum = 0;
            }
            else if(cellNum >= currentMonth.firstDay && dateNum <= currentMonth.length && current) {
                table += `<td id="M${currentMonth.monthId}-D${dateNum}" class="current-month y-${_year}">
                <span class="calendar-days">${dateNum}</span></span>
                </td>`;
                if(dateNum == currentMonth.length) {
                    dateNum = 0; 
                    current = false;
                }
            }
            else {
                table += `<td id="M${nextId}-D${dateNum}" class="next-month y-${_year}">
                <span class="calendar-days">${dateNum}</span>
                </td>`;
            }
            cellNum++;
            dateNum++;
        }
        table += `</tr>`;
    }
    table += `</table>`;

    calBody.innerHTML = table;
    
    for (let i = 0; i < document.getElementsByClassName('calendar-row').length; i++) {
        document.getElementsByClassName('calendar-row')[i].style.height = (100 / document.getElementsByClassName('calendar-row').length)+'%';
    }

    if (document.getElementById('M'+new Date().getMonth()+'-D'+new Date().getDate())) document.getElementById('M'+_month+'-D'+new Date().getDate()).classList.add('today');
    
    

    //getTaskData(_month);
    
    endPoints = currentMonth.calendarEndPoints;
    //callAjax(currentMonth.calendarEndPoints, './php/get-task.php', fillCalendar);
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

let tasks = {};

let currentDay;

let firstRequest = true;

function fillCalendar(taskData) {
    tasks = {}
    
    let currentTasks = [];
    let currentYears = [];
    for (let i = 0; i < taskData.length; i++) {
        const taskDate = 'Y'+taskData[i].start_year+'-M'+taskData[i].start_month+'-D'+taskData[i].start_day;
        if (!tasks[taskDate]) tasks[taskDate] = {};
        tasks[taskDate][taskData[i].task_id] = new Task(taskData[i]);

        if (currentTasks.indexOf('M'+taskData[i].start_month+'-D'+taskData[i].start_day) < 0) currentTasks.push('M'+taskData[i].start_month+'-D'+taskData[i].start_day);
        if (currentYears.indexOf(taskData[i].start_year) < 0) currentYears.push(taskData[i].start_year);

    }
    if (refresh) document.getElementById(currentDay).click();
    refresh = false;

    for (let i = 0; i < currentTasks.length; i++) {
        document.getElementById(currentTasks[i]).innerHTML += '<span class="line-holder">';
    }
    for (let i = 0; i < 12; i++) {
        for (let j = 1; j < 32; j++) {
            if (document.getElementById('M'+i+'-D'+j)) {
                document.getElementById('M'+i+'-D'+j).addEventListener('click', function() {
                    listOutDay(tasks['Y'+currentYears+'-'+this.id], this.id);
                    currentDay = this.id;
                });
            }
            
        }
    }

    if (firstRequest) {
        let d = new Date();
        document.getElementById('M'+d.getMonth()+'-D'+(d.getDay()+1)).click();
        currentDay = 'M'+d.getMonth()+'-D'+(d.getDay()+1);
        firstRequest = false;
    }


}
    document.getElementById('create').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('done').addEventListener('click', function() {
            let list = document.getElementById(currentDay).classList;
            let year;
            for (let i = 0; i<list.length; i++) {
                if (list[i].indexOf('y-') == 0) year = list[i].split('-')[1];
            }

            //callAjax({'title': document.getElementById('title').value, 'desc': document.getElementById('desc').value, 'year': year, 'month': currentDay.split('-')[0].substring(1), 'day': currentDay.split('-')[1].substring(1), 'endPoints': endPoints}, './php/create-task', fillCalendar);
            document.getElementById('title').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('modal').style.display = 'none';
        })
    });
function listOutDay(dayTasks, date) {
    //console.log(dayTasks, date);
    let suffix = ['st', 'nd', 'rd'][date.charAt(date.length-1)-1] || 'th';
    let shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.split('-')[0].substring(1)];
    let titleDate = `${date.split('-')[1].substring(1)}<sup>${suffix}</sup> ${shortMonth}`;
    if (!dayTasks) {
        document.getElementById('taskList').innerHTML = `<h1 class="details__date">No tasks for ${titleDate}</h1>`;
    }
    else {
        let title = Object.keys(dayTasks).length > 1 ? 's' : '';
        
        let activeListeners = [];
        document.getElementById('taskList').innerHTML = `<h1 class="details__date">Task${title} for ${titleDate}</h1>`;
        for (let key in dayTasks) {
            if (dayTasks.hasOwnProperty(key)) {
                let doneTask = dayTasks[key].state == 1 ? 'details__mini__title--edit--done' : '';
                document.getElementById('taskList').innerHTML += `
                <div class="details__mini">
                    <div class="details__mini__header">
                        <h2 class="details__mini__title"><span  class="details__mini__title__icon"><a class="fas" id="open-${dayTasks[key].id}" onclick="this.classList.toggle('fas--active')">&#xf107;</a></span>
                            <span class="details__mini__title--edit ${doneTask}" id="title-${dayTasks[key].id}">${dayTasks[key].title}</span>
                            <div class="dropdown" style="float:right;">
                                <a class="dropdown__button">&#x205D;</a>
                                <div class="dropdown__content">
                                    <a id="edit-${dayTasks[key].id}" href="#">Edit</a>
                                    <a id="done-${dayTasks[key].id}" href="#">Done</a>
                                    <a id="delete-${dayTasks[key].id}" href="#">Delete</a>
                                </div>
                          </div></h2>
                    </div>
                    <div class="details__mini__content" id="${dayTasks[key].id}">
                    <p>${dayTasks[key].description}</p> 
                    </div>
                </div>`;
                activeListeners.push(dayTasks[key].id);
            }
        }
        //console.log(activeListeners);
        showContent(activeListeners);
        editContent(activeListeners);
        markAsDone(activeListeners);
        deleteTask(activeListeners);
    }
}
let refresh;
function deleteTask(plainIds) {
    const readyToDelete = plainIds.map(val => 'delete-'+val);
    for (let i = 0; i < readyToDelete.length; i++) {
        document.getElementById(readyToDelete[i]).addEventListener('click', function() {
            let deleteIt = plainIds[i];
            refresh = true;
            //callAjax({'id': deleteIt, 'endPoints': endPoints}, './php/delete-task.php', fillCalendar);
            let lineHolder = document.getElementById(currentDay).getElementsByClassName('line-holder')[0];
            lineHolder.parentElement.removeChild(lineHolder);
        });
    }
}

function markAsDone(plainIds) {
    const readyToMark = plainIds.map(val => 'done-'+val);
    for (let i = 0; i < readyToMark.length; i++) {
        document.getElementById(readyToMark[i]).addEventListener('click', function() {
            document.getElementById('title-'+plainIds[i]).classList.toggle('details__mini__title--edit--done');
            let state = document.getElementById('title-'+plainIds[i]).classList.contains('details__mini__title--edit--done') ? 1 : 0;
            //callAjax({'id': plainIds[i], 'state': state, 'endPoints': endPoints}, './php/mark-done', fillCalendar);
        });
    }
}
/**
 * Makes textblocks with given Ids editable, locks editing if user clicks outside of block 
 * @param {Array} plainIds 
 */
function editContent(plainIds) {
    const editable = plainIds.map(val => 'edit-'+val);
    let title;
    let description;
    let prevTitle;
    let prevDesc;

    for (let i = 0; i < editable.length; i++) {
        document.getElementById(editable[i]).addEventListener('click', function() {
            title = document.getElementById('title-'+editable[i].split('-')[1]);
            description = document.getElementById(plainIds[i]).getElementsByTagName('p')[0];
            prevTitle = title.innerHTML;
            prevDesc = description.innerHTML;
            [title, description].forEach((item) => item.setAttribute('contenteditable', 'true'));
            [title, description].forEach((item) => item.style.borderColor = 'white');
            if (!document.getElementById(plainIds[i]).classList.contains('active')) document.getElementById('open-'+plainIds[i]).click();//custom dropdown animation to show all content user can edit
        });
    }
    document.addEventListener('click', function(e) {
        //console.log(title, description, e.target);
        if (title && description) {
            if (e.target != title && e.target != description && !e.target.id.substring('edit')) {
                [title, description].forEach((item) => item.setAttribute('contenteditable', 'false'));
                [title, description].forEach((item) => item.style.borderColor = 'transparent');
                if(title.innerHTML != prevTitle || description.innerHTML != prevDesc) {
                    //console.log({'id': description.parentElement.id, 'title': title.innerHTML, 'description': description.innerHTML});
                    //callAjax({'id': description.parentElement.id, 'title': title.innerHTML, 'description': description.innerHTML, 'endPoints': endPoints}, './php/update-task.php', fillCalendar);
                    prevTitle = title.innerHTML;
                    prevDesc = description.innerHTML;
                }
            }
        }
        
    })
}


class Task{
    constructor(obj) {
        let task_id, start_year, start_month, start_day, length, title, description, state;
        ({task_id, start_year, start_month, start_day, length, title, description, state} = obj);
        this.id = task_id;
        this.start_year = start_year;
        this.start_month = start_month;
        this.start_day = start_day;
        this.length = length;
        this.title = title;
        this.description = description;
        this.state = state;
    }
}