/** employees.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Employees
 */
/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import FilterAndSort from './moduls/FilterAndSort.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';
import newEmployee from './new_employee.js';



/** Designed cards **/
let Cards = {
    getEmployeesCard: function () {
        let container = "";
        container += '<div class="col-lg-12"><div id="empl_card_*1*" class="card employeecard empl-show-details"><div class="card-body"><div class="display-flex justify-content-between">';
        container += '!<div class="employee-image-container display-flex align-items-center"><i class="far fa-user"></i></div>';
        container += '!<div class="employee-datas"><h3 class="card-title employee-name">*4* !*5*</h3>';
        container += '!<span class="employee-rate"><i class="far fa-star"></i> *6*</span>';
        container += '!<p class="employee-position">*2*</p>';
        container += '!<p class="employee-detail">Összes költség: <span>*3*</span> forint/hó</p>';
        container += '</div></div></div></div></div>';

        return container;
    }
}

/**
 * Partners manager details template
 */
function getEmployeeDetail(shellId) {
    let container = "";

    container += '<h2 class="name-grey">*1*! *2*</h2>';
    container += '!<p><label class="employee-position">*3*</label></p>';
    container += '!<div id="' + shellId + '_cc_g"> </div>';
    container += '!<div class="employee-button-container"><button id="edit_*" type="button" class="btn btn-primary  edit-employee-button"><i class="fas fa-edit tool-tag-icon"></i>Szerkeszt</button></div>';

    return container;

}

function employeeCardClick(cardId) {
    let splittedId = cardId.split('_');
    let employeeId = splittedId[splittedId.length - 1];
    //Data
    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let shellId = "employee_details";
    let card = getEmployeeDetail(shellId);

    CardDetails.Create(employeeId, data, structure, card, shellId, 'EmployeeId');
}


function employeeFileterChange(id) {
    alert(id);
}

function addEmployee() {
    newEmployee.loadNewEmployee();
    addOneListener("back_to_employee", "click", employees.loadEmployees);
}

/** General functions **/
let General = {
    reloadFullPage: function () {
        // Load framework
        let framework = '<div id="employees" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="employees_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="add_employee_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="employees_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="employee_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("resources_content").innerHTML = framework;

        General.reloadCardContainer();

        FilterAndSort.Create(Varibles.PageData.Filters, "employees_filters", Database.employeesFilterChange);

        addOneListener("add_employee_btn", "click", addEmployee);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function () {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = Cards.getEmployeesCard();
        let cardContainer = "employees_card_container";
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(employeeCardClick, 'empl');
        if (data[0].EmployeeId !== null && data[0] !== undefined) {
            employeeCardClick('empl_card_' + data[0].EmployeeId);
        }
    }
}

var employees = {
    loadEmployees: function () {
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
}
export default employees;

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
    employeesFilterChange: function (fullId) {
        //Change when copy
        let dataPlace = 'employees_filters';
        let filterPlace = 'emplfltr';

        FilterAndSort.FilteringOnDB(dataPlace, filterPlace, Callbacks.successFilterEvent);
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


