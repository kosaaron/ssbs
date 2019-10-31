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
import Filters from './moduls/Filters.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';
import newEmployee from './new_employee.js';



/** Designed cards **/
let Cards = {
    getEmployeesCard: function () {
        let container = "";
        container += '<div class="col-lg-12"><div id="empl_card_*1*" class="card employeecard employee-show-details"><div class="card-body"><div class="display-flex justify-content-between">';
        container += '!<div class="employee-image-container display-flex align-items-center"><img class="employee-image"src="*1*"></div>';
        container += '!<div class="employee-datas"><h3 class="card-title employee-name">*2*</h3>';
        container += '!<span class="employee-rate"><i class="far fa-star"></i> *1*</span>';
        container += '!<p class="employee-position">*2*</p>';
        container += '!<p class="employee-detail">Összes költség: <span>*1*</span> forint/hó</p>';
        container += '</div></div></div></div></div>';

        return container;
    }
}

/**
 * Partners manager details template
 */
function getEmployeeDetail() {
    let container = "";

    container += '<h2 class="name-grey">*1*</h2>';
    container += '!<p><label class="employee-position">*2*</label></p>';
    container += '!<div class="card"><div class="card-header employee-card-header" id="headingOne"><h5 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><label class="title-text">Elérhetőségek</label></button></h5></div><div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body collapse-card-body">';
    container += '!<p class="employee-detail-par"><label><i class="fas fa-mobile-alt employee-contact-icon"></i> *3*</label></p>';
    container += '!<p class="employee-detail-par"><label><i class="far fa-envelope employee-contact-icon"></i> *4*</label></p>';
    container += '!<p class="employee-detail-par"><label><i class="fas fa-home employee-contact-icon"></i></i> *5*</label></p></div></div></div>';
    container += '!<div class="card"><div class="card-header employee-card-header" id="headingTwo"><h5 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><label class="title-text">Személyes adatok</label></button></h5></div><div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample"><div class="card-body collapse-card-body">';
    for (let i = 0; i < 7; i++) {
        container += '<p class="employee-detail-par"><label><span class="employee-datatype">**: </span>*</label></p>';
    }
    container += '</div></div></div><div class="card"><div class="card-header employee-card-header" id="headingThree"><h5 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><label class="title-text">Pénzügyek</label></button></h5></div><div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample"><div class="card-body collapse-card-body">';
    for (let i = 0; i < 5; i++) {
        container += '<p class="employee-detail-par"><label><span class="employee-datatype">**: </span>* Ft</label></p>';
    }
    container += '!<p class="employee-detail-par"><label class="employee-aggregated"><span class="employee-datatype">**: </span><span class="cost-red-style">* Ft</span></label></p>';
    container += '!<p class="employee-detail-par"><label><span class="employee-datatype">**: </span><span class="income-green-style">* Ft</span></label></p>';
    container += '!<p class="employee-detail-par"><label class="employee-aggregated"><span class="employee-datatype">**: </span><span class="income-green-style">* Ft</span></label></p></div></div></div></div>';
    container += '!<div class="employee-button-container"><button id="edit_*" type="button" class="btn btn-primary  edit-employee-button"><i class="fas fa-edit tool-tag-icon"></i>Szerkeszt</button></div>';

    return container;

}

function getEmployeesMDStructure() {
    return employee_structure_2;
}

function employeeCardClick(cardId) {
    let splittedId = cardId.split('_');
    let employeeId = splittedId[splittedId.length - 1];
    //Data
    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let card = getEmployeeDetail();
    let shellId = "employee_details";

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
        let framework = '<div id="employees" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="employee_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="add_employee_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="employees_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="employee_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("resources_content").innerHTML = framework;

        General.reloadCardContainer();

        Filters.Create(Varibles.PageData.Filters, "employee_filters", Database.employeesFilterChange);

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
        CardContainer.ClickableCard(employeeCardClick); // Ide biztos kéne egy id előtag (meg a null is lehet h undefined)
        if (data[0].Id !== null) {
            employeeCardClick(data[0].Id);
        }
        /*        
        CardContainer.ClickableCard(taskMCardClick, 'taskm');
        if (data[0] !== undefined) {
            taskMCardClick('task_card_' + data[0].TaskId);
        }*/
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
    },
    resizeEmployees() {
        //details
        let detailsContentH = document.getElementById('employee_details').clientHeight;
        let taskDetailsTitle = document.getElementById('task_details_title'); // Átalakítandó
        let taskDetailsTab = document.getElementById('task_details_tab');
        detailsContentH -= (taskDetailsTitle.offsetHeight + taskDetailsTab.offsetHeight + 12);
        document.getElementById('task_details_content').style = 'height: ' + detailsContentH + 'px';
        //details end
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
        let filterPlace = 'taskfltr';

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
    "Filters": 
    [
        { 
            "FilterId": "7", 
            "Name": "Munkav\u00e1llal\u00f3 neve", 
            "Type": "W", 
            "DefaultValue": null,
            "ColumnName": "Name" }, 
            { 
                "FilterId": "8", 
                "Name": "Munkav\u00e1llal\u00f3 neve", 
                "Type": "W", 
                "DefaultValue": null,
                "ColumnName": "EmployeePosition.Name"
            }
        ],
        "DataStructure":
        { 
            "1": "EmployeeId",
            "2": "EmployeePosition.Name" },
            "Data": 
            [
                { 
                    "EmployeeId": "1",
                    "EmployeePosition.Name": "Fejleszt\u0151"
                },
                { 
                    "EmployeeId": "2",
                    "EmployeePosition.Name": "Fejleszt\u0151"
                },
                {
                    "EmployeeId": "3",
                    "EmployeePosition.Name": "Menedzser"
                }
            ],
            "DetailsStructure":
            { 
                "Names":
                [
                    "Teljes k\u00f6lts\u00e9g",
                    null,
                    null,
                    null
                ],
                "Data": 
                [
                    "TotalCost",
                    "FirstName",
                    "LastName",
                    "EmployeePosition.Name"
                ] 
            } 
        }

var employee_structure = {
    '1': "ImgSrc",
    '2': "Name",
    '3': "Teljesítmény_pont",
    '4': "Beosztás",
    '5': "Összköltség",
    '6': "Id"
};

var employee_structure_2 = {
    Names: [
        null,
        null,
        null,
        null,
        null,
        "Születési név",
        "Neme",
        "Személyig. száma",
        "Adószám",
        "Születési év",
        "Születési hely",
        "Anyja neve",
        "Bruttó bér",
        "Céges autó költségei",
        "Telefonszámla",
        "Egészségügyi kezelés",
        "Biztosítás",
        "Összes költség",
        "Megtermelt bevétel",
        "Mérleg",
        null
    ],
    Data: [
        "Name",
        "Beosztás",
        "Mobilszám",
        "Email",
        "Cím",
        "Születési_név",
        "Neme",
        "Személyi_szám",
        "Adószám",
        "Születési_év",
        "Születési_hely",
        "Anyja_neve",
        "Bruttó_bér",
        "Céges_autó",
        "Telefonszámla",
        "Egészségügyi_kezelés",
        "Biztosítás",
        "Összes_költés",
        "Megtermelt_bevétel",
        "Mérleg",
        "Id"]
};


