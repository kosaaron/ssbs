/** tools.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Tools
 */
/** Imports */
import CardContainer from './plug-ins/CardContainer.js';
import CardDetails from './plug-ins/CardDetails.js';
import FilterAndSort from './plug-ins/FilterAndSort.js';
import newTool from './new_tool.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';
import ElementFunctions from './plug-ins/ElementFunctions.js';
import DetailsDesigns from './designs/DetailsDesigns.js';
import CardDesigns from './designs/CardDesigns.js';
import ContainerDesigns from './designs/ContainerDesigns.js';



/** Loacal functions */
 
/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function toolCardClick(cardId) {
    let splittedId = cardId.split('_');
    let toolId = splittedId[splittedId.length - 1];
    //Data
    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let shellId = Varibles.FrameId + '_details';
    let details = new DetailsDesigns().getSimpleDetails(shellId);
    CardDetails.Create(toolId, data, structure, details, shellId, 'ToolId');
}

function toolFileterChange(id) {
    alert(id);
}

function addTool() {
    newTool.loadNewTool();
    addOneListener("back_to_tool", "click", tools.loadTools);
}

/** Loadings functions **/
let Loadings = {
    reloadFullPage: function () {
        // Load framework
        Framework.Load('resources_content', Varibles.FrameId);

        Loadings.reloadCardContainer();

        FilterAndSort.Create(Varibles.PageData.Filters, Varibles.FrameId + '_filters', Database.toolsFilterChange);

        addOneListener('add_' + Varibles.FrameId + '_btn', "click", addTool);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function () {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = new CardDesigns().getToolCard(Varibles.FrameId);
        let cardContainer = Varibles.FrameId + '_cc';

        new ElementFunctions().removeChilds(cardContainer);
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(toolCardClick, Varibles.FrameId);
        if (data[0].ToolId !== null && data[0] !== undefined) {
            toolCardClick(Varibles.FrameId + '_card_' + data[0].ToolId);
        }

    }
}

/** Public functions */
var tools = {
    loadTools: function () {
        /*
// Title
document.getElementById("back_to_menu_text").textContent = "Feladatok";
addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);
*/


        // Loader
        document.getElementById('resources_content').innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        // Data from server
        Database.getContainerData();
    }
};
export default tools;

/** Local varibles **/
let Varibles = {
    FrameId: 'tls',
    FilterPlace: 'toolfltr',
    PageData: null,
    TaskWayData: null
}

let Database = {
    /**
     * Tools filter change event
     * @param {String} id 
     */
    toolsFilterChange: function (fullId) {
        FilterAndSort.FilteringOnDB(Varibles.FrameId, Varibles.FilterPlace, Callbacks.successFilterEvent);
    },
    /**
     * Get task way data
     * @param {String} taskId 
     */
    getContainerData: function () {
        //if (Varibles.PageData === null) {
        $.ajax({
            type: "POST",
            url: "./php/ToolManager.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;/*
                    Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'StartDate');
                    Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
                    */
                Loadings.reloadFullPage(Varibles.PageData);
            },
            dataType: 'json'
        });/*
        } else {
            Loadings.reloadFullPage(Varibles.PageData);
        }*/
    }
}

/** Callbacks **/
let Callbacks = {
    successFilterEvent: function (data) {
        Varibles.PageData.Data = data.Data;
        /* String to date
        Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
        */
        Loadings.reloadCardContainer();
    }
}

let Framework = {
    Load: function (targetId, shellId) {
        //main frame
        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen"> </div>`;
        document.getElementById(targetId).innerHTML = framework;

        let containerDesigns = new ContainerDesigns();
        // filter frame
        containerDesigns.loadSimpleFilterFw(shellId, shellId, 'beforeend');
        //card container frame
        containerDesigns.loadSimpleCCFw(shellId, shellId, 'beforeend');
    }
}

var PageDataJSONExample = {
    "Filters": [
        {
            "FilterId": "6",
            "Name": "Eszk\u00f6z neve",
            "Type": "W",
            "DefaultValue": null,
            "ColumnName": "Name"
        },
        {
            "FilterId": "5",
            "Name": "El\u00e9rhet\u0151s\u00e9g",
            "Type": "S",
            "DefaultValue": null,
            "ColumnName": "ToolAvailability.Name",
            "Opportunities": [
                {
                    "Id": "0",
                    "Name": "-- Mindegy --"
                },
                {
                    "Id": "1",
                    "Name": "El\u00e9rhet\u0151"
                },
                {
                    "Id": "2",
                    "Name": "Foglalt"
                }
            ]
        }
    ],
    "DataStructure": {
        "1": "Icon",
        "2": "Name",
        "3": "Place",
        "4": "ToolAvailability.Name",
        "5": "ToolId"
    },
    "Data": [
        {
            "AvailableTools": "2",
            "Icon": "fa fa-plus",
            "Name": "Samsung laptop",
            "Place": "Gy\u00e1r, 3-as rakt\u00e1r",
            "ToolAvailability.Name": "El\u00e9rhet\u0151",
            "ToolId": "1",
            "remarks": [
                {
                    "ToolRemarkId": "1",
                    "RemarkText": "Ez egy ngyon extra text.",
                    "EmployeeFK": "1",
                    "FirstName": "\u00c1d\u00e1m",
                    "LastName": "Werner"
                },
                {
                    "ToolRemarkId": "2",
                    "RemarkText": "Ez a m\u00e1sodik.",
                    "EmployeeFK": "1",
                    "FirstName": "\u00c1d\u00e1m",
                    "LastName": "Werner"
                }
            ]
        },
        {
            "AvailableTools": "2",
            "Icon": "fa fa-plus",
            "Name": "Apple laptop",
            "Place": "Gy\u00e1r, 3-as rakt\u00e1r",
            "ToolAvailability.Name": "El\u00e9rhet\u0151",
            "ToolId": "2",
            "remarks": [

            ]
        }
    ],
    "DetailsStructure": {
        "Names": {
            "1": null,
            "2": null,
            "3": null,
            "g1": "Helye",
            "g2": "El\u00e9rhet\u0151 esz\u00f6k\u00f6k",
            "g3": "El\u00e9rhet\u0151 eszk\u00f6z\u00f6k",
            "g4": "Utols\u00f3 karbantart\u00e1s",
            "g5": "Karbantart\u00e1st ig\u00e9nyel",
            "g6": "Le\u00edr\u00e1s"
        },
        "Data": {
            "1": "ToolId",
            "2": "Name",
            "3": "Type",
            "g1": "Place",
            "g2": "ToolAvailability.Name",
            "g3": "AvailableTools",
            "g4": "LastMaintenance",
            "g5": "MaintenancePeriod",
            "g6": "Description"
        }
    }
}