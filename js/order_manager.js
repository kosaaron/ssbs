/** order_manager.js */

/** Imports */
import CardContainer from './modules/CardContainer.js';
import CardDetails from './modules/CardDetails.js';
import ContainerDesigns from './modules/designs/ContainerDesigns.js';
import ElementFunctions from './modules/ElementFunctions.js';
import AutoScroll from './modules/AutoScroll.js';
import FilterAndSort from './modules/FilterAndSort.js';
import newTask from './new_task.js';
import { addOneListener, removeOneListener, mainFrame, addListener } from './common.js';
import CardDesigns from './modules/designs/CardDesigns.js';
import DetailsDesigns from './modules/designs/DetailsDesigns.js';

function addTask() {
    newTask.loadNewTask();

    removeOneListener("processes_back_to_menu");
    addOneListener("processes_back_to_menu", "click", orderManager.loadOrderManager);
}

/** Public functions */
var OrderManager = {
    loadOrderManager: function () {
        // Title
        document.getElementById("back_to_menu_text").textContent = Varibles.FrameName;
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
    FrameId: 'ordrm',
    FrameName: 'Rendelések',
    FilterPlace: 'ordrfltr',
    PageData: null
}

/** General functions **/
let General = {
    reloadFullPage: function () {
        //Load framework
        Framework.Load('process_modul_content', Varibles.FrameId);
        //Card container generating cards
        General.reloadCardContainer();
        //Filter creater
        FilterAndSort.Create(Varibles.PageData.Filters, Varibles.FrameId + "_filters", Database.orderMFilterChange);
        //Events
        addOneListener(Varibles.FrameId + '_add_new_btn', 'click', addTask);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function () {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = new CardDesigns().getSimpleCard(Varibles.FrameId);
        let cardContainer = Varibles.FrameId + '_card_container';

        new ElementFunctions().removeChilds(cardContainer);
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(Events.orderMCardClick, Varibles.FrameId);
        if (data[0] !== undefined) {
            Events.orderMCardClick(Varibles.FrameId + '_card_' + data[0].OrderId);
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
        FilterAndSort.FilteringOnDB(Varibles.FrameId, Varibles.FilterPlace, Callbacks.successFilterEvent);
    },
    getContainerData: function () {
        //if (Varibles.PageData === null) {
        $.ajax({
            type: "POST",
            url: "./php/GetOrderManager.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;
                /*
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
    /**
     * Card click event
     * @param {Integer} cardId Card id
     */
    orderMCardClick: function (cardId) {
        let splittedId = cardId.split('_');
        let id = splittedId[splittedId.length - 1];
        //Data
        let data = Varibles.PageData.Data;
        let structure = Varibles.PageData.DetailsStructure;
        let shellId = Varibles.FrameId + '_details';
        let details = new DetailsDesigns().getSimpleDetails(shellId);
        CardDetails.Create(id, data, structure, details, shellId, 'OrderId');
    }
}

/**  */
let Framework = {
    Load: function (targetId, shellId) {
        //main frame
        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen"> </div>`;
        document.getElementById(targetId).innerHTML = framework;

        let containerDesigns = new ContainerDesigns();
        //filter frame
        containerDesigns.loadSimpleFilterFw(shellId, shellId, 'beforeend');
        //card container frame
        containerDesigns.loadSimpleCCFw(shellId, shellId, 'beforeend');
    }
}

/** JSON Examples **/
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
