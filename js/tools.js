/** tools.js */
/*
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Tools
 */
/** Imports */
import { addOneListener, removeOneListener, mainFrame } from './common.js';
import ContainerDesigns from './designs/ContainerDesigns.js';
import FilterAndSort from './plug-ins/FilterAndSort.js';
import CardDesigns from './designs/CardDesigns.js';
import ElementFunctions from './plug-ins/ElementFunctions.js';
import CardContainer from './plug-ins/CardContainer.js';
import DetailsDesigns from './designs/DetailsDesigns.js';
import CardDetails from './plug-ins/CardDetails.js';
import GlobalVaribles from './plug-ins/GlobalVaribles.js';

import newTool from './new_tool.js';


/** Modul parameters **/
let Varibles = {
    FrameId: 'tls',
    FrameName: 'Eszközök',
    FilterPlace: 'toolfltr', //Kérdéses
    MainTableIdName: 'ToolId',
    //element ids
    ModuleFrameId: 'resources_modul_content',
    TitleTextId: 'resource_modul_title',
    TitleIconId:'resources_reload_modul_btn',
    //data
    PageData: []
}

/**Public object */
let Tools = {
    loadModule: function () {
        //Title
        document.getElementById(Varibles.TitleTextId).textContent = Varibles.FrameName;
        addOneListener(
            Varibles.TitleIconId,
            "click",
            //<IconEvent> ez is kérdéses
        );
        //Loader
        document.getElementById(Varibles.ModuleFrameId).innerHTML = `<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>`;
        
        //Data from server
        Database.getFullPageData();
    },
    resizeModule: function (){

    }
};
export default Tools;

/**Data from database */
let Database = {
    /**
     * Tools filter change
     * @param {String} id 
     */
    filterChange: function (fullId) {
        FilterAndSort.FilteringOnDB(
            Varibles.FrameId,
            Varibles.FilterPlace,
            Callbacks.successFilterEvent
        );
    },
    /**
     * Get full page data
     */
    getFullPageData: function () {
        $.ajax({
            type: "POST",
            url: "./php/ToolManager.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;
                Loadings.reloadFullPage();
            },
            dataType: 'json'
        });
    }
}

/**Framework */
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

/** Loadings functions **/
let Loadings = {
    reloadFullPage: function () {
        // Load framework
        Framework.Load(Varibles.ModuleFrameId, Varibles.FrameId);
        //Card container generating cards
        Loadings.reloadCardContainer();
        //Filter and sort creater
        FilterAndSort.Create(
            Varibles.PageData.Filters,
            Varibles.FrameId + '_filters',
            Database.filterChange
        );
        FilterAndSort.CreateSort(
            Varibles.PageData.Sorts,
            Varibles.FrameId + '_sorts',
            Database.filterChange
        );
        
        //Events
        addOneListener(Varibles.FrameId + '_add_new_btn', "click", Loadings.loadAddNew);
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

        document.getElementById(cardContainer).innerHTML='';
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);

        CardContainer.ClickableCard(Events.cardClick, Varibles.FrameId);
        if (data[0] !== undefined) {
            Events.cardClick(Varibles.FrameId + '_card_'
            + data[0][Varibles.MainTableIdName]);
        }

        //Limiting
        if (Object.keys(data).length % GlobalVaribles.CCLimitSize === 0) {
            new Limiting(
                Varibles.FrameId,
                Varibles.FilterPlace,
                Callbacks.successFilterEvent,
                offset
            );
        }
    },
    /**
     * Load 'add new entry' modul
     */
    loadAddNew: function () {
        newTool.loadModule();
        removeOneListener(Varibles.TitleIconId);
        addOneListener(Varibles.TitleIconId, "click", Tools.loadModule);
    }
}

/** Callbacks **/
let Callbacks = {
        /**
     * Success filter event
     * @param {JSON} data 
     * @param {Boolean} isClear 
     * @param {Number} offset 
     */
    successFilterEvent: function (data, isClear = true, offset = 0) {
        if (isClear) {
            Varibles.PageData.Data = [];
        }
        data.Data.forEach(entry => {
            Varibles.PageData.Data.push(entry);
        });
        Loadings.reloadCardContainer(offset);
    }
}

/** Events **/
let Events = {
        /**
         * Card click event
         * @param {Integer} cardId Card id
         */
        cardClick: function (cardId) {
            let splittedId = cardId.split('_');
            let id = splittedId[splittedId.length - 1];
            //Data
            let data = Varibles.PageData.Data;
            let structure = Varibles.PageData.DetailsStructure;
            let shellId = Varibles.FrameId + '_details';
            let details = new DetailsDesigns().getSimpleDetails(shellId);
            CardDetails.Create(
                id, 
                data, 
                structure, 
                details, 
                shellId, 
                Varibles.MainTableIdName
            );
        },
        /**
         * Is called when this modul closes
         */
        onDestroy: function () {
            GlobalVaribles.setActiveModul("");
        }
    }
 
/**
 * Card click event
 * @param {Integer} cardId Card id
 */
/*
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
*/
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