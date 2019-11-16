/** order_manager.js */

/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import ElementFunctions from './moduls/ElementFunctions.js';
import AutoScroll from './moduls/AutoScroll.js';
import FilterAndSort from './moduls/FilterAndSort.js';
import newTask from './new_task.js';
import { addOneListener, removeOneListener, mainFrame, addListener } from './common.js';

/**
 * Partners manager details template
 */
function getOrderMDetail(shellId) {
    let container = "";
    container += '!<h2 id="' + shellId + '_title" class="name-grey">*1*</h2>';
    //container += '<div id="' + shellId + '_tab" class="display-flex justify-content-center"><div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons"> <label id="detail_data_btn" class="btn btn-detail-menu btn-detail-menu-active"> <input type="radio" name="options" id="option1" autocomplete="off" onchange="showData()"> Adatok </label> <label id="detail_timeline_btn" class="btn btn-detail-menu"> <input type="radio" name="options" id="option2" autocomplete="off" onchange="showTimeline()"> Idővonal </label></div></div>';
    //container += '<div id="' + shellId + '_content">';
    //container += '!<div id="' + shellId + '_cc_g"> </div>';
    //container += '!</div>';

    return container;
}

/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function orderMCardClick(cardId) {
    let splittedId = cardId.split('_');
    let orderId = splittedId[splittedId.length - 1];
    //Data
    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let shellId = "order_m_details";
    let card = getOrderMDetail(shellId);
    CardDetails.Create(orderId, data, structure, card, shellId, 'OrderId');
}

function addTask() {
    newTask.loadNewTask();

    removeOneListener("processes_back_to_menu");
    addOneListener("processes_back_to_menu", "click", orderManager.loadOrderManager);
}

/** Public functions */
var OrderManager = {
    loadOrderManager: function () {
        // Title
        document.getElementById("back_to_menu_text").textContent = "Rendelések";
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);

        // Loader
        document.getElementById('process_modul_content').innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        // Data from server
        Database.getContainerData();
    },
    resizeOrderManager() {
        AutoScroll.Integration("order_m_details_content");
    }
};
export default OrderManager;
/** Local varibles **/
let Varibles = {
    PageData: null
}

/** General functions **/
let General = {
    reloadFullPage: function () {
        // Load framework
        let framework = '<div id="order_manager" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="orderfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="order_m_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="proceses_add_order_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="order_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div id="order_m_details" class="col-4 cc-details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;

        General.reloadCardContainer();

        FilterAndSort.Create(Varibles.PageData.Filters, "order_m_filters", Database.orderMFilterChange);

        addOneListener("proceses_add_order_btn", "click", addTask);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function () {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = Cards.getOrderMCard();
        let cardContainer = "order_card_container";

        new ElementFunctions().removeChilds(cardContainer);
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(orderMCardClick, 'orderm');
        if (data[0] !== undefined) {
            orderMCardClick('order_card_' + data[0].OrderId);
        }
    }
}

/** Data from database **/
let Database = {
    /**
     * 
     * @param {String} id 
     */
    orderMFilterChange: function (fullId) {
        //Change when copy
        let dataPlace = 'order_m_filters';
        let filterPlace = 'ordrfltr';

        FilterAndSort.FilteringOnDB(dataPlace, filterPlace, Callbacks.successFilterEvent);
    },
    getContainerData: function () {
        //if (Varibles.PageData === null) {
        $.ajax({
            type: "POST",
            url: "./php/GetOrderManager.php",
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
    /** Order manager card template */
    getOrderMCard: function () {
        let container = "";
        container += '<div class="col-lg-6"><div id="order_card_*1*" class="card taskcard orderm-show-details"><div class="card-body">';
        container += '!<h5 class="text-o-ellipsis card-title">*2*</h5>';
        container += '!<p class="card-text">*3*</p>';
        container += '</div></div></div>';

        return container;
    }
}

/** Callbacks **/
let Callbacks = {
    /**
     * 
     * @param {JSON} data 
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
