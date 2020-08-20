/** employees.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Employees
 */
/** Imports */
import { addOneListener, removeOneListener } from './common.js';
import ContainerDesigns from './designs/ContainerDesigns.js';
import FilterAndSort from './plug-ins/FilterAndSort.js';
import CardDesigns from './designs/CardDesigns.js';
import ElementFunctions from './plug-ins/ElementFunctions.js';
import CardContainer from './plug-ins/CardContainer.js';
import GlobalVaribles from './plug-ins/GlobalVaribles.js';
import DetailsDesigns from './designs/DetailsDesigns.js';
import CardDetails from './plug-ins/CardDetails.js';
import Limiting from './plug-ins/Limiting.js';

import newEmployee from './new_employee.js';
import DinamicFormPopup from './plug-ins/DinamicFormPopup.js';


/** Modul parameters */
let Varibles = {
    FrameId: 'empl',
    FrameName: 'Alkalmazottak',
    FilterPlace: 'emplfltr',
    MainTableIdName: 'EmployeeId',
    //element ids
    ShallId: null,
    //data
    PageData: []
}

var Employees = {
    loadModule: function (shellId) {
        Varibles.ShallId = shellId;

        // Data from server
        Database.getFullPageData();
    },
    resizeModule: function () {
        //code
    }
}
export default Employees;

/** Data from database */
let Database = {
    /**
     * Employees filter change
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
        //if (Varibles.PageData === null) {
        $.ajax({
            type: "POST",
            url: "./php/GetEmployees.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;
                Loadings.reloadFullPage();
            },
            dataType: 'json'
        });
    }
}

/** Framework */
let Framework = {
    Load: function (targetId, shellId) {
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
        Framework.Load(Varibles.ShallId, Varibles.FrameId);
        //Card container fenerating cards
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
        let cardDesign = new CardDesigns().getEmployeeCard(Varibles.FrameId);
        let cardContainer = Varibles.FrameId + '_cc';

        new ElementFunctions().removeChildren(cardContainer);
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(Events.cardClick, Varibles.FrameId);
        if (data[0] !== undefined) {
            Events.cardClick(Varibles.FrameId + '_card_' + data[0][Varibles.MainTableIdName]);
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
    loadAddNew: function () {
        let dinamicFormPopup = new DinamicFormPopup(
            Varibles.ModulFrameId,
            undefined,
            'Alkalmazott hozzáadása'
        );
        dinamicFormPopup.loadFormData(
            'n' + Varibles.FrameId, //n as new 
            Varibles.PageData.Data,
            Varibles.ModulFrameId,
            undefined,
            undefined,
            Callbacks.refreshPage
        );

        /*
        newEmployee.loadModule();
        removeOneListener(Varibles.TitleIconId);
        addOneListener(Varibles.TitleIconId, "click", Employees.loadModule);
        */
    }
}

/** Callbacks **/
let Callbacks = {
    refreshPage: function () {
        Varibles.PageData = [];
        Database.getFullPageData();
    },
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

let PageDataJSONExample = {
    "Filters": [
        {
            "FilterId": "7",
            "Name": "Munkav\u00e1llal\u00f3 neve",
            "Type": "W",
            "DefaultValue": null,
            "ColumnName": "Name"
        },
        {
            "FilterId": "8",
            "Name": "Munkav\u00e1llal\u00f3 neve",
            "Type": "W",
            "DefaultValue": null,
            "ColumnName": "EmployeePosition.Name"
        }
    ],
    "DataStructure": {
        "1": "EmployeeId",
        "2": "EmployeePosition.Name",
        "3": "TotalCost",
        "4": "FirstName",
        "5": "LastName",
        "6": "Rate"
    },
    "Data": [
        {
            "GrossSalary": "100000",
            "NetSalary": "80000",
            "OtherAllowances": "0",
            "EmployeeId": "1",
            "EmployeePosition.Name": "Fejleszt\u0151",
            "TotalCost": "130000",
            "FirstName": "\u00c1d\u00e1m",
            "LastName": "Werner",
            "Rate": "4.9"
        },
        {
            "GrossSalary": "200000",
            "NetSalary": "160000",
            "OtherAllowances": "0",
            "EmployeeId": "2",
            "EmployeePosition.Name": "Fejleszt\u0151",
            "TotalCost": "260000",
            "FirstName": "D\u00e1vid",
            "LastName": "S\u00e1gi",
            "Rate": "4.8"
        },
        {
            "GrossSalary": "300000",
            "NetSalary": "240000",
            "OtherAllowances": "0",
            "EmployeeId": "3",
            "EmployeePosition.Name": "Menedzser",
            "TotalCost": "390000",
            "FirstName": "\u00c1ron",
            "LastName": "K\u00f3sa",
            "Rate": null
        }
    ],
    "DetailsStructure": {
        "Names": {
            "1": null,
            "2": null,
            "3": null,
            "g1": "Brutt\u00f3 fizet\u00e9s",
            "g2": "Nett\u00f3 fizet\u00e9s",
            "g3": "Egy\u00e9b juttat\u00e1sok",
            "g4": "Teljes k\u00f6lts\u00e9g"
        },
        "Data": {
            "1": "FirstName",
            "2": "LastName",
            "3": "EmployeePosition.Name",
            "g1": "GrossSalary",
            "g2": "NetSalary",
            "g3": "OtherAllowances",
            "g4": "TotalCost"
        }
    }
}


