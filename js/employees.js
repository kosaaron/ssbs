/** employees.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Employees
 */
/** Imports */
import CardContainer from './plug-ins/CardContainer.js';
import CardDetails from './plug-ins/CardDetails.js';
import FilterAndSort from './plug-ins/FilterAndSort.js';
import { addOneListener } from './common.js';
import newEmployee from './new_employee.js';
import ContainerDesigns from './designs/ContainerDesigns.js';
import DetailsDesigns from './designs/DetailsDesigns.js';
import CardDesigns from './designs/CardDesigns.js';
import ElementFunctions from './plug-ins/ElementFunctions.js';
import Limiting from './moduls/Limiting.js';


/** Local functions */

function employeeCardClick(cardId) {
    let splittedId = cardId.split('_');
    let employeeId = splittedId[splittedId.length - 1];
    //Data
    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let shellId = Varibles.FrameId + "_details";
    let details = new DetailsDesigns().getSimpleDetails(shellId);
    

    CardDetails.Create(employeeId, data, structure, details, shellId, 'EmployeeId');
}

function addEmployee() {
    newEmployee.loadNewEmployee();
    addOneListener("back_to_employee", "click", employees.loadEmployees);
}



var employees = {
    loadEmployees: function () {
        // Loader
        document.getElementById('resources_content').innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        // Data from server
        Database.getContainerData();
    }
}
export default employees;

/** Loadings functions **/
let Loadings = {
    reloadFullPage: function () {
        // Load framework
        Framework.Load('resources_content', Varibles.FrameId);

        Loadings.reloadCardContainer();

        FilterAndSort.Create(Varibles.PageData.Filters, Varibles.FrameId + '_filters',
            Database.employeesFilterChange);

        addOneListener("add_employee_btn", "click", addEmployee);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function (offset = 0) {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = new CardDesigns().getEmployeeCard(Varibles.FrameId);
        let cardContainer = Varibles.FrameId + '_card_container';

        new ElementFunctions().removeChilds(cardContainer);
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(employeeCardClick, Varibles.FrameId);
        if (data[0].EmployeeId !== null && data[0] !== undefined) {
            employeeCardClick(Varibles.FrameId + '_card_' + data[0].EmployeeId);
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
    }
}

/** Local varibles **/
let Varibles = {
    FrameId: 'empl',
    FilterPlace: 'emplfltr',
    PageData: null,
    TaskWayData: null
}

let Database = {
    /**
     * Employees filter change event
     * @param {String} id 
     */
    employeesFilterChange: function (fullId) {
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
            url: "./php/GetEmployees.php",
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
        /**
     * Success filter event
     * @param {JSON} data 
     * @param {Boolean} isClear 
     * @param {Number} offset 
     */
    successFilterEvent: function (data, isClear = true, offset = 0) {
        if (isClear) {
            Varibles.PageData.Data = [];
        }
        data.Data.forEach(entry => {
            Varibles.PageData.Data.push(entry);
        });

        /* String to date
        Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
        */
        Loadings.reloadCardContainer(offset);
    }
}

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


