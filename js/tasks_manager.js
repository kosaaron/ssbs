/** partners_manager.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Partners manager
 */
/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import CardContainerPlus from './moduls/CardContainerPlus.js';
import GlobalVaribles from './moduls/GlobalVaribles.js';
import ElementFunctions from './moduls/ElementFunctions.js';
import Filters from './moduls/Filters.js';
import newTask from './new_task.js';
import { addOneListener, removeOneListener, mainFrame, addListener } from './common.js';


/** Local functions */


/**
 * Partners manager details template
 */
function getTasksMDetail(shellId) {
    let container = "";
    container += '!<h2 id="task_details_title" class="name-grey">*1*</h2>';
    container += '<div id="task_details_tab" class="display-flex justify-content-center"><div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons"> <label id="detail_data_btn" class="btn btn-detail-menu btn-detail-menu-active"> <input type="radio" name="options" id="option1" autocomplete="off" onchange="showData()"> Adatok </label> <label id="detail_timeline_btn" class="btn btn-detail-menu"> <input type="radio" name="options" id="option2" autocomplete="off" onchange="showTimeline()"> Idővonal </label></div></div><div id="task_details_content">';
    container += '!<div id="task_data_container">';
    container += '!<div id="' + shellId + '_cc_g"> </div>';
    container += '!</div><div id="task_timeline_container" style="display: none" ><ul id="task_timeline" class="task-timeline"></ul></div></div>';

    return container;
}

/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function taskMCardClick(cardId) {
    let splittedId = cardId.split('_');
    let taskId = splittedId[splittedId.length - 1];
    //Data
    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let shellId = "tasks_m_details";
    let card = getTasksMDetail(shellId);
    CardDetails.Create(taskId, data, structure, card, shellId, 'TaskId');

    //Steps
    Database.getTaskWayData(taskId);
    tasksManager.resizeTasksManager();
}

function addTask() {
    newTask.loadNewTask();

    removeOneListener("processes_back_to_menu");
    Events.onDestroy();
    addOneListener("processes_back_to_menu", "click", tasksManager.loadTasksManager);
}

/** Public functions */
var tasksManager = {
    loadTasksManager: function () {
        // Title
        document.getElementById("back_to_menu_text").textContent = "Feladatok";
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);
        addOneListener("processes_back_to_menu", "click", Events.onDestroy);

        // Loader
        document.getElementById('process_modul_content').innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        // Data from server
        Database.getContainerData();
    },
    resizeTasksManager() {
        //details
        let detailsContentH = document.getElementById('tasks_m_details').clientHeight;
        let taskDetailsTitle = document.getElementById('task_details_title');
        let taskDetailsTab = document.getElementById('task_details_tab');
        detailsContentH -= (taskDetailsTitle.offsetHeight + taskDetailsTab.offsetHeight + 12);
        document.getElementById('task_details_content').style = 'height: ' + detailsContentH + 'px';
        //details end
    }
};
export default tasksManager;
/** Local varibles **/
let Varibles = {
    PageData: null,
    TaskWayData: null
}

/** General functions **/
let General = {
    reloadFullPage: function () {
        // Load framework
        let framework = '<div id="tasks_manager" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="tasks_m_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="proceses_add_task_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="tasks_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="tasks_m_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;

        General.reloadCardContainer();

        Filters.Create(Varibles.PageData.Filters, "tasks_m_filters", Database.tasksMFilterChange);

        addOneListener("proceses_add_task_btn", "click", addTask);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function () {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = Cards.getTasksMCard();
        let cardContainer = "tasks_card_container";
        
        new ElementFunctions().removeChilds('tasks_card_container');
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(taskMCardClick, 'taskm');
        if (data[0] !== undefined) {
            taskMCardClick('task_card_' + data[0].TaskId);
        }
    },
    /**
     * Reload task way
     * @param {JSON array} data 
     */
    reloadTaskWay: function (data) {
        let container = '<li><div class="task-timeline-item"> <span>1</span><div class="task-timeline-item-content"> <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><h3>Előkészítés</h3> </a><div class="collapse" id="collapseExample"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button></div></div></div></div></li><li><div class="task-timeline-item"> <span>2</span><div class="task-timeline-item-content"> <a data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample"><h3>Megbeszélés</h3> </a><div class="collapse" id="collapseExample2"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button></div></div></div></div></li><li><div class="task-timeline-item"> <span id="actual-step">3</span><div class="task-timeline-item-content"> <a data-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="true" aria-controls="collapseExample"><h3>Beszerzés</h3> </a><div class="show" id="collapseExample3"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i> </button></div></div></div></div></li><li><div class="task-timeline-item"> <span>4</span><div class="task-timeline-item-content"> <a data-toggle="collapse" href="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample"><h3>Alkatrész cseréje</h3> </a><div class="collapse" id="collapseExample4"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i> </button></div></div></div></div></li><li><div class="task-timeline-item"> <span>5</span><div class="task-timeline-item-content"> <a data-toggle="collapse" href="#collapseExample5" role="button" aria-expanded="false" aria-controls="collapseExample5"><h3>Tesztüzem</h3> </a><div class="collapse" id="collapseExample5"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Luke Skywalker</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Jabba</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i></button></div></div></div></div></li>';
        document.getElementById('task_timeline').innerHTML += container;

        let taskWayData = data.Data;
        let taskWayStructure = data.DataStructure;
        let stepCard = Cards.getTaskWayCard();
        let stepShellId = "task_timeline";
        let taskWayActiveCard = Cards.getTaskWayActiveCard();
        let stepActiveColumn = 'Active';
        CardContainerPlus.CreateWithActive(taskWayData, taskWayStructure, stepShellId, stepCard, taskWayActiveCard, stepActiveColumn, Callbacks.employeesToStep);

        addListener('tsk-way-empl-icon-check', 'click', Events.taskWayEmplStatusClick)
    },
    // Get employee status color
    getEmplStatusColor: function (ready) {
        if (ready === '1') {
            return 'fas fa-check empl-status-ready';
        } else {
            return 'fas fa-user empl-status-work'
        }
    }
}
/*
function test(dataPlace, filterPlace, reloadFunction) {
    //Create filter array [{FilterId: "FilterId1", Value: "Value1"},{...}]
    let filterArray = [];
    let filterElements = document.querySelectorAll('[data-place="' + dataPlace + '"]');
    filterElements.forEach(filterElement => {
        let array = {};
        let filterId = ArrayFunctions.Last((filterElement.id).split('_'));
        let value = filterElement.value;
        array['FilterId'] = filterId;
        array['Value'] = value;
        filterArray.push(array);
    });

    //Connect to Filter.php
    $.ajax({
        type: "POST",
        url: "./php/Filter.php",
        data: { 'FilterPlace': filterPlace, 'Filters': filterArray },
        success: function (data) {
            Varibles.PageData.Data = data.Data;
            /* String to date
            Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
            *
            reloadFunction();
        },
        dataType: 'json'
    });
}*/
/** Data from database **/
let Database = {
    /**
     * 
     * @param {String} id 
     */
    tasksMFilterChange: function (fullId) {
        //Change when copy
        let dataPlace = 'tasks_m_filters';
        let filterPlace = 'taskfltr';

        Filters.FilteringOnDB(dataPlace, filterPlace, Callbacks.successFilterEvent);
    },
    /**
     * Get task way data
     * @param {String} taskId 
     */
    getTaskWayData: function (taskId) {
        $.ajax({
            type: "POST",
            url: "./php/TaskWay.php",
            data: { task_id: taskId },
            success: function (data) {
                if (jQuery.isEmptyObject(data.Data)) {
                    document.getElementById('task_timeline').innerHTML = "Nincsenek lépések."
                } else {
                    Varibles.TaskWayData = data;
                    General.reloadTaskWay(Varibles.TaskWayData);
                }
            },
            dataType: 'json'
        });
    },
    getContainerData: function () {
        //if (Varibles.PageData === null) {
        $.ajax({
            type: "POST",
            url: "./php/GetTaskManager.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;/*
                    Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'StartDate');
                    Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
                    */
                General.reloadFullPage(Varibles.PageData);
            },
            dataType: 'json'
        });/*
        } else {
            General.reloadFullPage(Varibles.PageData);
        }*/
    }
}

/** Designed cards **/
let Cards = {
    getTaskWayCard: function () {
        let container = '<li><div class="task-timeline-item">';
        container += '!<span>*1*</span>';
        container += '!<div class="task-timeline-item-content"> <a data-toggle="collapse" href="#task_timel_*3*_!*4*" role="button" aria-expanded="false" aria-controls="task_timel" class="collapsed">';
        container += '!<h3>*2*</h3>';
        container += '!</a><div class="collapse" id="task_timel_*5*_!*6*">?';
        container += '!</div></div></div ></li >';
        return container;
    },
    getTaskWayActiveCard: function () {
        let container = '<li><div class="task-timeline-item">';
        container += '!<span class="actual-step">*1*</span>';
        container += '!<div class="task-timeline-item-content"> <a data-toggle="collapse" href="#task_timel_*3*_!*4*" role="button" aria-expanded="true" aria-controls="task_timel">';
        container += '!<h3>*2*</h3>';
        container += '!</a><div class="show" id="task_timel_*5*_!*6*">?';
        container += '!</div></div></div ></li >';
        return container;
    },
    /** Tasks manager card template */
    getTasksMCard: function () {
        let container = "";
        container += '<div class="col-lg-6"><div id="task_card_*1*" class="card taskcard taskm-show-details"><div class="card-body">';
        container += '!<h5 class="text-o-ellipsis card-title">*2*</h5>';
        container += '!<p class="card-text">*3*</p>';
        //container += '!<a href="#" class="btn btn-primary next-button"><i class="fas fa-arrow-right"></i></a>';
        container += '</div></div></div>';

        return container;
    }
}

/** Callbacks **/
let Callbacks = {
    /** Employees to step */
    employeesToStep: function (data) {
        let employees = data['Employees'];
        if (data['Employees'] === undefined) {
            return '';
        }

        let finalHTML = '';
        for (let i = 0; i < employees.length; i++) {
            const employee = employees[i];
            let statusClass = General.getEmplStatusColor(employee.Ready);

            finalHTML += '<div class="row add-employee-card">';
            finalHTML += '<div employee="' + employee.EmployeeId + '" class="btn btn-sm added-employee-button employee-button">';
            finalHTML += '<i class="addemployee-icon ' + statusClass + '"></i>' + employee.EmployeeName;
            if (employee.Ready === '0' && data['Active'] === '1') {
                finalHTML += '<i id="tsk_way_empl_stat_' + data.TaskFK + '_' + employee.EmployeeId + '" class="tsk-way-empl-icon-check fas fa-check"></i>';
            }

            finalHTML += '</div></div>';
        }
        return finalHTML;
    },
    /**
     * 
     * @param {JSON array} data 
     */
    successFilterEvent: function (data) {
        Varibles.PageData.Data = data.Data;
        /* String to date
        Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
        */
        General.reloadCardContainer();
    }
}

/** Events **/
let Events = {
    onDestroy: function () {
        GlobalVaribles.setActiveModul("");
    },
    taskWayEmplStatusClick: function (fullId) {
        let splittedId = fullId.split('_');
        let taskFK = splittedId[splittedId.length - 2];
        let emplId = splittedId[splittedId.length - 1];
        $.ajax({
            type: "POST",
            url: "./php/TaskMWayStatus.php",
            data: { 'task_fk': taskFK, 'empl_id': emplId },
            success: function (data) {
                Database.getTaskWayData(taskFK);
            },
            dataType: 'html'
        });
    }
}

let PageDataJSONExample = {
    "Filters": [
        {
            "FilterId": "1",
            "Name": "Feladat t\u00edpus",
            "Type": "S",
            "DefaultValue": null,
            "ColumnName": "TaskType.Name",
            "Opportunities": [
                {
                    "Id": "0",
                    "Name": "-- V\u00e1lassz --"
                },
                {
                    "Id": "1",
                    "Name": "Programoz\u00e1s"
                },
                {
                    "Id": "1",
                    "Name": "Integr\u00e1l\u00e1s"
                }
            ]
        },
        {
            "FilterId": "2",
            "Name": "Feladat n\u00e9v",
            "Type": "W",
            "DefaultValue": null,
            "ColumnName": "Name"
        }
    ],
    "DataStructure": {
        "1": "TaskId",
        "2": "Name",
        "3": "TaskType.Name"
    },
    "Data": [
        {
            "CreatedDate": "2019-08-29 01:36:25",
            "DeadLine": "2019-09-26 00:00:00",
            "Description": "Ez al els\u0151",
            "TaskId": "1",
            "Name": "Feladatkezel\u00e9s megtervez\u00e9se",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-08-29 01:40:22",
            "DeadLine": null,
            "Description": null,
            "TaskId": "2",
            "Name": "PHP megtervez\u00e9se 2",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-08 22:19:20",
            "DeadLine": null,
            "Description": null,
            "TaskId": "9",
            "Name": "100. feladat",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-08 22:27:33",
            "DeadLine": null,
            "Description": null,
            "TaskId": "10",
            "Name": "100. feladat4",
            "TaskType.Name": "Integr\u00e1l\u00e1s"
        },
        {
            "CreatedDate": "2019-09-08 22:35:06",
            "DeadLine": null,
            "Description": null,
            "TaskId": "11",
            "Name": "100. feladat3",
            "TaskType.Name": "Integr\u00e1l\u00e1s"
        },
        {
            "CreatedDate": "2019-09-26 15:48:05",
            "DeadLine": "2019-01-01 00:00:00",
            "Description": null,
            "TaskId": "13",
            "Name": "Task",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-26 15:48:27",
            "DeadLine": "0000-00-00 00:00:00",
            "Description": null,
            "TaskId": "14",
            "Name": "Task2",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-26 15:50:02",
            "DeadLine": "0000-00-00 00:00:00",
            "Description": null,
            "TaskId": "15",
            "Name": "Task5",
            "TaskType.Name": "Integr\u00e1l\u00e1s"
        },
        {
            "CreatedDate": "2019-09-26 15:58:29",
            "DeadLine": null,
            "Description": null,
            "TaskId": "16",
            "Name": "Test10",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-26 15:59:34",
            "DeadLine": "0000-00-00 00:00:00",
            "Description": null,
            "TaskId": "17",
            "Name": "Test12",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-26 16:00:20",
            "DeadLine": null,
            "Description": null,
            "TaskId": "18",
            "Name": "14",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-26 16:01:42",
            "DeadLine": null,
            "Description": null,
            "TaskId": "19",
            "Name": "Task15",
            "TaskType.Name": "Integr\u00e1l\u00e1s"
        },
        {
            "CreatedDate": "2019-09-27 23:55:25",
            "DeadLine": "2019-01-01 00:00:00",
            "Description": null,
            "TaskId": "21",
            "Name": "Els\u0151 sikeres",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-27 23:58:43",
            "DeadLine": null,
            "Description": null,
            "TaskId": "22",
            "Name": "M\u00e1sodik sikeres",
            "TaskType.Name": "Integr\u00e1l\u00e1s"
        },
        {
            "CreatedDate": "2019-09-28 00:02:33",
            "DeadLine": null,
            "Description": null,
            "TaskId": "23",
            "Name": "Harmadik",
            "TaskType.Name": "Integr\u00e1l\u00e1s"
        },
        {
            "CreatedDate": "2019-09-28 00:03:31",
            "DeadLine": null,
            "Description": null,
            "TaskId": "24",
            "Name": "Negyedik",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-28 18:56:05",
            "DeadLine": "2019-01-01 00:00:00",
            "Description": null,
            "TaskId": "25",
            "Name": "Az \u00e9n kedvesem",
            "TaskType.Name": "Programoz\u00e1s"
        },
        {
            "CreatedDate": "2019-09-29 23:25:35",
            "DeadLine": null,
            "Description": null,
            "TaskId": "26",
            "Name": "V\u00e1ltozatos",
            "TaskType.Name": "Programoz\u00e1s"
        }
    ],
    "DetailsStructure": {
        "Names": {
            "1": null,
            "2": "Feladat t\u00edpus",
            "3": "L\u00e9trehoz\u00e1s d\u00e1tuma",
            "4": "Hat\u00e1rid\u0151",
            "5": "Le\u00edr\u00e1s"
        },
        "Data": {
            "1": "Name",
            "2": "TaskType.Name",
            "3": "CreatedDate",
            "4": "DeadLine",
            "5": "Description"
        }
    }
}

let TaskWayJSONExample = {
    "DataStructure": {
        "1": "Number",
        "2": "TaskStep.Name",
        "3": "Number",
        "4": "TaskStepFK",
        "5": "Number",
        "6": "TaskStepFK"
    },
    "Data": [
        {
            "Active": "0",
            "Number": "1",
            "TaskStep.Name": "\u00d6tlet felvet\u00e9se",
            "TaskStepFK": "1",
            "Employees": [
                {
                    "EmployeeId": "1",
                    "EmployeeName": "Werner \u00c1d\u00e1m",
                    "Ready": "1"
                }
            ]
        },
        {
            "Active": "0",
            "Number": "2",
            "TaskStep.Name": "Frontend kialak\u00edt\u00e1sa",
            "TaskStepFK": "2",
            "Employees": [
                {
                    "EmployeeId": "3",
                    "EmployeeName": "K\u00f3sa \u00c1ron",
                    "Ready": "0"
                }
            ]
        },
        {
            "Active": "1",
            "Number": "3",
            "TaskStep.Name": "Backend kialak\u00edt\u00e1sa",
            "TaskStepFK": "3",
            "Employees": [
                {
                    "EmployeeId": "1",
                    "EmployeeName": "Werner \u00c1d\u00e1m",
                    "Ready": "0"
                }
            ]
        },
        {
            "Active": "0",
            "Number": "4",
            "TaskStep.Name": "Tesztel\u00e9s",
            "TaskStepFK": "4",
            "Employees": [
                {
                    "EmployeeId": "1",
                    "EmployeeName": "Werner \u00c1d\u00e1m",
                    "Ready": "0"
                },
                {
                    "EmployeeId": "2",
                    "EmployeeName": "S\u00e1gi D\u00e1vid",
                    "Ready": "0"
                }
            ]
        }
    ]
}
