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
import Filters from './moduls/Filters.js';
import newTask from './new_task.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';


/** Local functions */


/**
 * Partners manager details template
 */
function getTasksMDetail() {
    let container = "";
    container += '!<h2 id="task_details_title" class="name-grey">*1*</h2>';
    container += '<div id="task_details_tab" class="display-flex justify-content-center"><div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons"> <label id="detail_data_btn" class="btn btn-detail-menu btn-detail-menu-active"> <input type="radio" name="options" id="option1" autocomplete="off" onchange="showData()"> Adatok </label> <label id="detail_timeline_btn" class="btn btn-detail-menu"> <input type="radio" name="options" id="option2" autocomplete="off" onchange="showTimeline()"> Idővonal </label></div></div><div id="task_details_content">';
    container += '!<div id="task_data_container">';

    for (let i = 0; i < Object.keys(Varibles.PageData.DetailsStructure.Data).length - 1; i++) {
        container += '!<p><label class="title-text">**' + (i + 2) + '**</label><br><label>*' + (i + 2) + '*</label></p>';
    }
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
    let card = getTasksMDetail();
    let shellId = "tasks_m_details";
    CardDetails.Create(taskId, data, structure, card, shellId, 'TaskId');

    //Steps
    Database.getTaskWayData(taskId);
    tasksManager.resizeTasksManager();
}

function tasksMFilterChange(id) {
    alert(id);
}

function addTask() {
    newTask.loadNewTask();

    removeOneListener("processes_back_to_menu");
    addOneListener("processes_back_to_menu", "click", tasksManager.loadTasksManager);
}

/** Public functions */
var tasksManager = {
    loadTasksManager: function () {
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
        document.getElementById("back_to_menu_text").textContent = "Feladatok";
        let framework = '<div id="tasks_manager" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="tasks_m_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="proceses_add_task_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="tasks_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="tasks_m_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;

        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = Cards.getTasksMCard();
        let cardContainer = "tasks_card_container";
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(taskMCardClick, 'taskm');
        if (data[0].TaskId !== null) {
            taskMCardClick('task_card_' + data[0].TaskId);
        }

        Filters.Create(Varibles.PageData.Filters, "tasks_m_filters", tasksMFilterChange);

        addOneListener("proceses_add_task_btn", "click", addTask);
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);
    },
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

    }
}

/** Data from database **/
let Database = {
    /**
     * Get task way data
     * @param {String} taskId 
     */
    getTaskWayData: function (taskId) {
        $.ajax({
            type: "POST",
            url: "../php/TaskWay.php",
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

        document.getElementById('process_modul_content').innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';
        //if (Varibles.PageData === null) {
        $.ajax({
            type: "POST",
            url: "../php/TasksManager.php",
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
        container += '!</a><div class="collapse" id="task_timel_*5*_!*6*" style="">?';
        container += '!</div></div></div ></li >';
        return container;
    },
    getTaskWayActiveCard: function () {
        let container = '<li><div class="task-timeline-item">';
        container += '!<span class="actual-step">*1*</span>';
        container += '!<div class="task-timeline-item-content"> <a data-toggle="collapse" href="#task_timel_*3*_!*4*" role="button" aria-expanded="true" aria-controls="task_timel">';
        container += '!<h3>*2*</h3>';
        container += '!</a><div class="show" id="task_timel_*5*_!*6*" style="">?';
        container += '!</div></div></div ></li >';
        return container;
    },
    /** Tasks manager card template */
    getTasksMCard: function () {
        let container = "";
        container += '<div class="col-lg-6"><div class="card taskcard"><div class="card-body">';
        container += '!<h5 class="text-o-ellipsis card-title">*2*</h5>';
        container += '!<p class="card-text">*3*</p>';
        container += `!<a href="#" class="btn btn-primary next-button taskm-show-details" id="task_card_*1*"><i class="fas fa-arrow-right"></i></a></div></div></div>`;

        return container;
    }
}

/** Callbacks **/
let Callbacks = {
    /** Employees to step */
    employeesToStep: function (data) {
        let employees = data['Employees'];
        let finalHTML = '';

        for (let i = 0; i < employees.length; i++) {
            const employee = employees[i];

            finalHTML += '<div class="row add-employee-card">';
            finalHTML += '<button employee="' + employee.EmployeeId + '" type="button" class="btn btn-sm added-employee-button employee-button">';
            finalHTML += '<i class="fas fa-user addemployee-icon "></i>' + employee.EmployeeName;
            finalHTML += '</button></div>';
        }
        return finalHTML;
    }
}

var tasks_m_structure = [
    "Name",
    "Megrendelő",
    "Id"
];

var tasks_m_structure_2 = {
    Names: [
        null,
        "Feladat típusa",
        "Megrendelő",
        "Létrehozás dátuma",
        "Határidő",
        "Cím:",
        "Leírás"
    ],
    Data: [
        "Name",
        "Type",
        "Megrendelő",
        "Létrehozás", //"Létrehozás",
        "Határidő",
        "Cím",
        "Leírás"]
};

var activeTableFilters = [
    {
        Id: "11234",
        Name: "Kategória",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "11235",
        Name: "Raktár",
        Type: "Select",
        Default: "Raktár3",
        Opportunities: ["Raktár1", "Raktár2", "Raktár3"]
    },
    {
        Id: "11236",
        Name: "Harmadik",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "11237",
        Name: "Negyedik",
        Type: "Select",
        Default: "Sajt",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "11238",
        Name: "Ötödik",
        Type: "Write",
        Default: "",
    },
];

let task_way_structure = {
    "1": "Number",
    "2": "Name",
    "3": "Number",
    "4": "Id",
    "5": "Number",
    "6": "Id"
}

let task_way = [
    {
        Id: 'tw_1',
        Number: '1',
        Name: 'Előkészítés',
        Active: '0',
        Employees: [
            {
                Id: 'twe_1',
                Name: 'Sagi David'
            }
        ]
    },
    {
        Id: 'tw_2',
        Number: '2',
        Name: 'Kidolgozás',
        Active: '1',
        Employees: [
            {
                EmployeeId: 'empl_1',
                Name: 'Sagi David'
            },
            {
                EmployeeId: 'empl_2',
                Name: 'Werner Ádám'
            }
        ]
    }
];
var process_maintain_list = [
    {
        Id: 'fjh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7zd3',
        Name: 'Nyomtató szervíz2',
        Type: 'Szervíz2',
        Megrendelő: 'Lajos Kft.2',
        Létrehozás: '2019.06.24 2',
        Határidő: '2019.06.30 2',
        Cím: 'Érd, Tóth Ilona utca 14., 2340 2',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje 2'
    },
    {
        Id: 'fjh7zd',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7z',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'jh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'h7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7z3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7d3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjhzd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fj7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7zw',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh73w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    }
]