/** new_task.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Tasks manager
 * 3. Local functions
 */
/** Imports */
import CardContainerPlus from './moduls/CardContainerPlus.js';
import FormElements from './moduls/FormElements.js';
import { addListenerByAttr, addListener, addOneListener } from './common.js';
/** Public functions */
var newTask = {
    loadNewTask: function () {
        Database.getDataFromDB();
    }
};
export default newTask;
let Varibles = {
    PageData: null
}

let Events = {
    AddEmployeeClick: function (fullId) {
        let stepId = fullId.split('_')[1];
        alert(stepId);
    }
}
let General = {
    reloadFullPage: function (data) {
        // Load framework
        let framework = `<div id="new_task" class="d-flex display-flex flex-row full-screen"> <div class="flex-fill col-12"> <div class="row page-content"> <div class="new-obj-shell col-md-6 col-12"> <h2 class="new-obj-subtitle">Adatok</h2> <div id="processes_new_t_form"></div><div class="newtask-buttoncontainer d-flex justify-content-start"> <button id="add_new_task_btn" type="submit" class="btn btn-primary addnewtask-button">Létrehoz</button> <button type="reset" class="btn btn-primary addnewtask-button grey-button">Mégse</button> </div></div><div class="new-obj-shell col-md-6 col-12"> <h2 class="new-obj-subtitle">Feladat lépései</h2> <div class="d-flex justify-content-between align-items-center"> <div class="add-taskstep-container"> <p id="addstep_title">Lépés hozzáadása...</p><span onclick="showForms(this)" class="btn-show-forms"><i class="fas fa-chevron-down"></i></span> <div id="add_taskstep_collapse" style="display:none;"> <div class="add-taskstep-btn-container"> <div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons"> <label id="new_taskstep_btn" class="btn btn-addtask-menu btn-addtask-menu-active"> <input type="radio" name="options" id="new_taskstep_option" autocomplete="off" onchange="showNewTaskStep()"> + Új lépés </label> <label id="saved_tasksteps_btn" class="btn btn-addtask-menu"> <input type="radio" name="options" id="saved_tasksteps_option" autocomplete="off" onchange="showSavedTaskSteps()"> Mentett lépések </label> </div></div><div id="new_taskstep_container" class="add-taskstep-form-container"> <div class="form-group"> <label for="taskName" class="newtaskstep-label">Lépés neve:</label> <input type="text" id="new_taskstep_name" class="newtask-formcontrol"> </div><button type="reset" onclick='getStepNamefromText("new_taskstep_name")' class="btn btn-primary add-step-button">+ Hozzáad</button> </div><div id="saved_taskstep_container" class="add-taskstep-form-container"> <div class="form-group"> <label for="taskCat" class="newtaskstep-label">Lépés neve:</label> <div class="tasktype-group"> <div class="input-group mb-3"> <select id="saved_step_selector" class="form-control newtask-formcontrol" aria-describedby="button-addon2"> <option selected>Mentett lépések...</option> <option>Meeting</option> <option>Beszerzés</option> <option>Tesztelés</option> </select> <div class="input-group-append"> <button class="btn btn-outline-secondary" type="button" id="new_saved_step_btn"><i class="fas fa-plus"></i></button> </div></div></div></div><button type="reset" onclick='getStepNamefromSelect("saved_step_selector")' class="btn btn-primary add-step-button">+ Hozzáad</button> </div></div></div><button type="reset" onclick="deleteAll()" id="delete_button" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button> </div><div class="taskstep-container"> <div id="processes_new_t_slides" class="slides"> <div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <span class="stepNo">1.</span> <h3 class=taskstep-title>lépés</h3> </div><div class="row add-employee-card"> <div class="btn btn-sm added-employee-button"> <i class="fas fa-user addemployee-icon "></i>Werner Ádám <span onclick="deleteEmployee(this)" class="closebtn">&times;</span> </div></div><div class="row add-employee-card"> <div class="btn btn-sm added-employee-input"> <i class="fas fa-user-plus addemployee-icon "></i> <select id="employeeSelect1" class="add-employee-selector"> <option selected>Új munkatárs...</option> <option>Kósa Áron Balázs</option> <option>Sági Dávid</option> <option>Werner Ádám</option> </select> <span onclick='saveEmployee(this, "employeeSelect1")'><i class="fas fa-check-circle save-employee-icon"></i></span></div></div></div><div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <span class="stepNo">2.</span> <h3 class=taskstep-title>lépés</h3> </div><div class="row add-employee-card"> <div class="btn btn-sm added-employee-button"> <i class="fas fa-user addemployee-icon "></i>Sági Dávid <span onclick="deleteEmployee(this)" class="closebtn">&times;</span> </div></div><div class="row add-employee-card"> <div class="btn btn-sm added-employee-button"> <i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs <span onclick="deleteEmployee(this)" class="closebtn">&times;</span> </div></div><div class="row add-employee-card"> <div class="btn btn-sm added-employee-input"> <i class="fas fa-user-plus addemployee-icon "></i> <select id="employeeSelect2" class="add-employee-selector"> <option selected>Új munkatárs...</option> <option>Kósa Áron Balázs</option> <option>Sági Dávid</option> <option>Werner Ádám</option> </select> <span onclick='saveEmployee(this, "employeeSelect2")'><i class="fas fa-check-circle save-employee-icon"></i></span></div></div></div><div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <div class="stepNo">3.</div><h3 class=taskstep-title>lépés</h3> </div><div class="row add-employee-card"> <div class="btn btn-sm added-employee-button"> <i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs <span onclick="deleteEmployee(this)" class="closebtn">&times;</span> </div></div><div class="row add-employee-card"> <div class="btn btn-sm added-employee-input"> <i class="fas fa-user-plus addemployee-icon "></i> <select id="employeeSelect3" class="add-employee-selector"> <option selected>Új munkatárs...</option> <option>Kósa Áron Balázs</option> <option>Sági Dávid</option> <option>Werner Ádám</option> </select> <span onclick='saveEmployee(this, "employeeSelect3")'><i class="fas fa-check-circle save-employee-icon"></i></span></div></div></div></div></div></div></div></div></div>`;
        document.getElementById("process_modul_content").innerHTML = framework;
        document.getElementById("back_to_menu_text").textContent = "Új feladat felvétele";

        var processesNewTSlides = document.getElementById("processes_new_t_slides");
        new Sortable(processesNewTSlides, {
            animation: 150
        });
        //removeOneListener("processes_new_t_slides");

        // Load data entry form
        let dataFormShell = "processes_new_t_form";
        let formData = data.FormStructure.Data;
        CardContainerPlus.Create(formData, dataFormShell, Local.getFromHTML);

        addListenerByAttr("new_" + dataFormShell, "click", Local.openCollapse);

        let firstTaskT = true;
        data.FormStructure.Functions.forEach(ElementFunction => {
            if (ElementFunction['Name'] === 'TaskTypeChange') {
                if (firstTaskT) {
                    BuiltIn.taskTypeChange('processes_new_t_form_' + ElementFunction.Id);
                    firstTaskT = false;
                }
                addOneListener('processes_new_t_form_' + ElementFunction.Id, 'change', BuiltIn.taskTypeChange)
            }
        });

        addOneListener('add_new_task_btn', 'click', Database.uploadTaskData)
    },
    loadTaskSteps: function (data) {
        // Load task steps
        let taskStepsShell = "processes_new_t_slides";
        let taskStepsData = data.Data;
        let taskStepsCard = Local.getTaskStepsCard();
        let tStepsStructure = data.DataStructure;
        CardContainerPlus.CreateWithData(taskStepsData, tStepsStructure, taskStepsShell, taskStepsCard, Callbacks.getEmployeesToTask);
        addListener('n-task-add-employee-btn', 'click', Events.AddEmployeeClick);
    }
}
let BuiltIn = {
    /**
     * Task type change
     * @param {String} fullId 
     */
    taskTypeChange: function (fullId) {
        $.ajax({
            type: "POST",
            url: "./php/NewTaskSteps.php",
            data: { 'TaskTypeId': document.getElementById(fullId).value },
            success: function (data) {
                General.loadTaskSteps(data);
            },
            dataType: 'json'
        });
    }
}
let Database = {
    getDataFromDB: function () {
        $.ajax({
            type: "POST",
            url: "./php/NewTask.php",
            data: {},
            success: function (data) {
                Varibles.PageData = data;
                General.reloadFullPage(Varibles.PageData);
            },
            dataType: 'json'
        });
    },
    uploadTaskData: function () {
        let uploadData = [];
        let formInputs = document.querySelectorAll('[data-place=processes_new_t_form]');
        let formElementArr = {};
        formInputs.forEach(input => {
            formElementArr[input.getAttribute('upload-name')] = input.value;
        });
        uploadData.push(formElementArr);

        $.ajax({
            type: "POST",
            url: "./php/UploadData.php",
            data: { 'place': 'newtsk', 'data': uploadData },
            success: function (data) {
                let uploadSteps = [];
                let steps = document.querySelectorAll('[data-place=processes_new_t_steps]');
                let number = 1;
                let firstStep = true;
                steps.forEach(step => {
                    uploadSteps[step.getAttribute('upload-name')] = step.value;
                    let employees = document.getElementsByClassName(step.id);
                    for (let i = 0; i < employees.length; i++) {
                        const employee = employees[i];

                        let array = {};
                        array['Number'] = parseInt(number);
                        array['TaskFK'] = 'id_to_fk(tasks,TaskId)';
                        let stepIdSplitted = step.id.split('_');
                        array['TaskStepFK'] = stepIdSplitted[stepIdSplitted.length - 1];
                        let employeeIdSplitted = employee.id.split('_');
                        array['EmployeeFK'] = employeeIdSplitted[employeeIdSplitted.length - 1];
                        if (firstStep) {
                            array['Active'] = 1;
                            firstStep = false;
                        } else {
                            array['Active'] = 0;
                        }
                        array['Ready'] = 0;
                        uploadSteps.push(array);
                    }

                    ++number;
                });
                if (!firstStep) {
                    $.ajax({
                        type: "POST",
                        url: "./php/UploadData.php",
                        data: { 'place': 'ntskwy', 'data': uploadSteps },
                        success: function (data) {
                            Swal.fire({
                                type: 'success',
                                title: 'Siker',
                                text: 'A feladat létrehozása sikeres volt!',
                                heightAuto: false
                            });
                            $('#processes_back_to_menu').click();
                        },
                        dataType: 'html'
                    });
                }

            },
            dataType: 'html'
        });
    }
}
let Callbacks = {
    /**
     * Get employees to task
     * @param {JSON array} data data
     * @param {String} shellId 
     */
    getEmployeesToTask: function (data, shellId) {
        let card = "";
        for (let i = 0; i < data.Employees.length; i++) {
            const element = data.Employees[i];

            card += '<div class="row add-employee-card">';
            card += '<div id="' + shellId + '_' + element.EmployeeId + '" class="ntsknempl_' + data.TaskStepFK + ' btn btn-sm added-employee-button">';
            card += '<i class="fas fa-user addemployee-icon"></i>';
            card += element.EmployeeName;
            card += '<span onclick="deleteEmployee(this)" class="closebtn">&times;</span>';
            card += '</div>';
            card += '</div>';
        }

        return card;
    }
}

let Local = {
    getFormData: function () {
        return newTaskDataDB;
    },
    getTaskSteps: function () {
        return taskStepsDB;
    },
    getTStepsStructure: function () {
        return tStepsStructure;
    },
    getFromHTML: function (objectItem, shellId) {
        switch (objectItem.Type) {
            case "W":
                FormElements.B.Write(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.UploadName);
                break;
            case "S":
                FormElements.B.Select(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.Opportunities, objectItem.UploadName);
                break;
            case "SN":
                FormElements.B.SelectOrNew(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.Opportunities, objectItem.UploadName, objectItem.TruncatedIdName);
                break;
            case "DT":
                FormElements.B.DateTime(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.UploadName);
                break;
            default:
                break;
        }
    },
    getTaskStepsCard: function () {
        let card = '';

        card += '<div class="slide">';
        card += '<div class="row taskstep-card d-flex align-items-center">';
        card += '!<div class="stepNo">*1*.</div>';
        card += '!<h3 id="ntsknempl_*1*" class=taskstep-title data-place="processes_new_t_steps">';
        card += '!*3*</h3>';
        card += '</div>?';
        card += '<div class="row add-employee-card">';
        card += '<div class="btn btn-sm added-employee-input">';
        card += '<i class="fas fa-user-plus addemployee-icon "></i>';
        card += '!<select id="employeeSelect_*4*" class="add-employee-selector"> <option selected>Új munkatárs...</option> <option>Kósa Áron Balázs</option> <option>Sági Dávid</option> <option>Werner Ádám</option> </select>';
        card += '!<span id="stepaddempl_*4*"';
        card += `!onclick='saveEmployee(this, "employeeSelect_*4*")'><i class="fas fa-check-circle save-employee-icon"></i></span>`;
        card += '</div></div></div>';

        return card;
    },
    openCollapse: function (id) {
        //full card will be generated by getFilterHTML function
        let splitedId = id.split('_');
        let defaultId = splitedId[splitedId.length - 1];
        let element = document.getElementById('collapse_processes_new_t_form_' + defaultId);
        if (element.style.display === "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }
};

let tStepsStructure = {
    '1': 'Id',
    '3': 'Name',
    '4': 'Id'
}

let taskStepsDB = {
    selectableTasks: [{
        Id: "ntst_t1234",
        Name: "Első feladat"
    }, {
        Id: "ntst_t1235",
        Name: "Második feladat"
    }, {
        Id: "ntst_t1236",
        Name: "Harmadik feladat"
    }, {
        Id: "ntst_t1237",
        Name: "Negyedik feladat"
    }],
    data: [
        {
            Id: "1234",
            Name: "Első lépés",
            Icon: "fas fa-plus",
            Employees: [{
                Id: "empl_1234",
                Name: "Werner Ádám"
            }, {
                Id: "empl_1235",
                Name: "Sagi David"
            }, {
                Id: "empl_1236",
                Name: "Kósa Áron"
            }]
        }, {
            Id: "1235",
            Name: "Második lépés",
            Icon: "fas fa-plus",
            Employees: [{
                Id: "empl_1234",
                Name: "Werner Ádám"
            }, {
                Id: "empl_1235",
                Name: "Sagi David"
            }, {
                Id: "empl_1236",
                Name: "Kósa Áron"
            }]
        }, {
            Id: "1236",
            Name: "Harmadik lépés",
            Icon: "fas fa-plus",
            Employees: [{
                Id: "empl_1235",
                Name: "Sagi David"
            }, {
                Id: "empl_1236",
                Name: "Kósa Áron"
            }]
        },
    ]
};

let newTaskDataDB = [
    {
        FormStructureId: "2234",
        Name: "Feladat neve",
        Type: "Write",
        Default: ""
    },
    {
        FormStructureId: "2235",
        Name: "Feladat típusa",
        Type: "SelectOrNew",
        Default: "Szervíz",
        Opportunities: ["Szervíz", "Szállítás", "Kereskedés"]
    },
    {
        FormStructureId: "2236",
        Name: "Feladat határideje",
        Type: "DateTime",
        Default: ""
    },
    {
        FormStructureId: "2237",
        Name: "Projekthez rendelés",
        Type: "Select",
        Default: "Projekt1",
        Opportunities: ["Projekt1", "Projekt2", "Projekt3"]
    }
];

let NewTaskJSONExample =
{
    "FormStructure": {
        "Data": [
            {
                "FormStructureId": "1",
                "Name": "Feladat neve",
                "Type": "W",
                "DefaultValue": null,
                "ColumnName": "TaskId,Name",
                "TruncatedIdName": "Task",
                "Required": "1",
                "UploadName": "tasks.Name"
            },
            {
                "FormStructureId": "2",
                "Name": "Feladat t\u00edpusa",
                "Type": "SN",
                "DefaultValue": null,
                "ColumnName": "TaskTypeId,Name",
                "TruncatedIdName": "TaskType",
                "Required": "1",
                "UploadName": "task_types.Name",
                "Opportunities": [
                    {
                        "Id": "1",
                        "Name": "Programoz\u00e1s"
                    },
                    {
                        "Id": "2",
                        "Name": "Integr\u00e1l\u00e1s"
                    },
                    {
                        "Id": "5",
                        "Name": "Teszt1"
                    }
                ]
            },
            {
                "FormStructureId": "3",
                "Name": "Feladat hat\u00e1rideje",
                "Type": "DT",
                "DefaultValue": null,
                "ColumnName": "TaskId,Deadline",
                "TruncatedIdName": "Task",
                "Required": "0",
                "UploadName": "tasks.Deadline"
            },
            {
                "FormStructureId": "4",
                "Name": "Projekthez rendel\u00e9s",
                "Type": "S",
                "DefaultValue": null,
                "ColumnName": "ProjectId,Name",
                "TruncatedIdName": "Project",
                "Required": "0",
                "UploadName": "projects.Name",
                "Opportunities": [
                    {
                        "Id": "1",
                        "Name": "SSBS elk\u00e9sz\u00edt\u00e9se1"
                    },
                    {
                        "Id": "2",
                        "Name": "SSBS elk\u00e9sz\u00edt\u00e9se2"
                    },
                    {
                        "Id": "3",
                        "Name": "SSBS elk\u00e9sz\u00edt\u00e9se3"
                    },
                    {
                        "Id": "4",
                        "Name": "SSBS elk\u00e9sz\u00edt\u00e9se4"
                    },
                    {
                        "Id": "5",
                        "Name": "SSBS elk\u00e9sz\u00edt\u00e9se5"
                    }
                ]
            }
        ],
        "Functions": [
            {
                "Id": "2",
                "Name": "TaskTypeChange"
            }
        ]
    }

}
/*
var partner_m_structure = [
    "Name",
    "Megrendelő",
    "Id"
];

var partner_m_structure_2 = [
    "Name",
    "Type",
    "Megrendelő",
    null, //"Létrehozás",
    "Határidő",
    "Cím",
    "Leírás"
];

*/