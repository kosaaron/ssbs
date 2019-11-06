/** tools.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Tools
 */
/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import Filters from './moduls/Filters.js';
import newTool from './new_tool.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';



/** Loacal functions */

/**
 * Tool card template
 */
let Cards = {
    getToolsCard : function() {
        let container = "";
        container += '<div class="col-lg-12"><div id="tool_card_*5*" class="card toolcard tool-show-details"><div class="card-body">';
        container += '!<div class="display-flex justify-content-between"><div class="tool-image-container"><img class="tool-image" src="https://images.obi.hu/product/HU/800x600/292962_1.jpg"></div>';
        container += '!<div class="tool-datas"><h3 class="card-title tool-name">*2*</h3>';
        container += '!<p class="tool-detail"><i class="fas fa-map-pin"></i> Helye: *3*</p>';
        container += '<div class="d-flex justify-content-between week-container"> <div class="week-day week-day-red"><p class="day-name">H</p></div><div class="week-day week-day-green"><p class="day-name">K</p></div><div class="week-day week-day-red"><p class="day-name">Sz</p></div><div class="week-day week-day-green"><p class="day-name">Cs</p></div><div class="week-day week-day-green"><p class="day-name">P</p></div></div>'
        container += '</div></div></div></div></div>';
    
        return container;
    }
}


/**
 * Partners manager details template
 */
function getToolDetail(shellId) {
    let container = "";

    container += '<h2 class="name-grey">*2*</h2>';
    container += '!<p><label>*3*</label></p>';
    container += '!<div id="' + shellId + '_cc_g"> </div>';
    container += '!<div class="tool-button-container justify-content-between"><button id="clnd_*1*" type="button" class="btn btn - primary tool - tag tool - button"><i class="fas fa - calendar tool - tag - icon"></i>Naptár</button>';
    container += '!<button id="edit_*1*" type="button" class="btn btn-primary tool-tag tool-button"><i class="fas fa-edit tool-tag-icon"></i>Szerkeszt</button></div>';
    return container;
}



/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function toolCardClick(cardId) {
    let splittedId = cardId.split('_');
    let toolId = splittedId[splittedId.length - 1];

    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let shellId = "tool_details";
    let card = getToolDetail(shellId);
    

    CardDetails.Create(toolId, data, structure, card, shellId, 'ToolId'); //ToolId Kérdéses
}


function toolFileterChange(id) {
    alert(id);
}

function addTool() {
    newTool.loadNewTool();
    addOneListener("back_to_tool", "click", tools.loadTools);
}

/** General functions **/
let General = {
    reloadFullPage: function () {
        // Load framework
        let framework = '<div id="tools" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="tool_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="add_tool_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="tools_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="tool_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("resources_content").innerHTML = framework;

        General.reloadCardContainer();

        Filters.Create(Varibles.PageData.Filters, "tool_filters", Database.toolsFilterChange);

        addOneListener("add_tool_btn", "click", addTool);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function () {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = Cards.getToolsCard();
        let cardContainer = "tools_card_container";
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(toolCardClick, 'tool'); // tool Kérdéses
        if (data[0].ToolId !== null && data[0] !== undefined) {
            toolCardClick('tool_card_' + data[0].ToolId);
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
    PageData: null,
    TaskWayData: null
}

let Database = {
    /**
     * 
     * @param {String} id 
     */
    toolsFilterChange: function (fullId) {
        //Change when copy
        let dataPlace = 'tool_filters';
        let filterPlace = 'toolfltr';

        Filters.FilteringOnDB(dataPlace, filterPlace, Callbacks.successFilterEvent);
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
    successFilterEvent: function (data) {
        Varibles.PageData.Data = data.Data;
        /* String to date
        Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
        */
        General.reloadCardContainer();
    }
}

var PageDataJSONExample={ 
    "Filters":[ 
       { 
          "FilterId":"6",
          "Name":"Eszk\u00f6z neve",
          "Type":"W",
          "DefaultValue":null,
          "ColumnName":"Name"
       },
       { 
          "FilterId":"5",
          "Name":"El\u00e9rhet\u0151s\u00e9g",
          "Type":"S",
          "DefaultValue":null,
          "ColumnName":"ToolAvailability.Name",
          "Opportunities":[ 
             { 
                "Id":"0",
                "Name":"-- Mindegy --"
             },
             { 
                "Id":"1",
                "Name":"El\u00e9rhet\u0151"
             },
             { 
                "Id":"2",
                "Name":"Foglalt"
             }
          ]
       }
    ],
    "DataStructure":{ 
       "1":"Icon",
       "2":"Name",
       "3":"Place",
       "4":"ToolAvailability.Name",
       "5":"ToolId"
    },
    "Data":[ 
       { 
          "AvailableTools":"2",
          "Icon":"fa fa-plus",
          "Name":"Samsung laptop",
          "Place":"Gy\u00e1r, 3-as rakt\u00e1r",
          "ToolAvailability.Name":"El\u00e9rhet\u0151",
          "ToolId":"1",
          "remarks":[ 
             { 
                "ToolRemarkId":"1",
                "RemarkText":"Ez egy ngyon extra text.",
                "EmployeeFK":"1",
                "FirstName":"\u00c1d\u00e1m",
                "LastName":"Werner"
             },
             { 
                "ToolRemarkId":"2",
                "RemarkText":"Ez a m\u00e1sodik.",
                "EmployeeFK":"1",
                "FirstName":"\u00c1d\u00e1m",
                "LastName":"Werner"
             }
          ]
       },
       { 
          "AvailableTools":"2",
          "Icon":"fa fa-plus",
          "Name":"Apple laptop",
          "Place":"Gy\u00e1r, 3-as rakt\u00e1r",
          "ToolAvailability.Name":"El\u00e9rhet\u0151",
          "ToolId":"2",
          "remarks":[ 
 
          ]
       }
    ],
    "DetailsStructure":{ 
       "Names":{ 
          "1":null,
          "2":null,
          "3":null,
          "g1":"Helye",
          "g2":"El\u00e9rhet\u0151 esz\u00f6k\u00f6k",
          "g3":"El\u00e9rhet\u0151 eszk\u00f6z\u00f6k",
          "g4":"Utols\u00f3 karbantart\u00e1s",
          "g5":"Karbantart\u00e1st ig\u00e9nyel",
          "g6":"Le\u00edr\u00e1s"
       },
       "Data":{ 
          "1":"ToolId",
          "2":"Name",
          "3":"Type",
          "g1":"Place",
          "g2":"ToolAvailability.Name",
          "g3":"AvailableTools",
          "g4":"LastMaintenance",
          "g5":"MaintenancePeriod",
          "g6":"Description"
       }
    }
 }