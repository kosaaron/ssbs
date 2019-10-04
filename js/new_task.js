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
        let framework = '<div id="new_task" class="d-flex display-flex flex-row full-screen"> <div class="flex-fill col-12"> <div class="row page-content"> <div class="new-obj-shell col-md-6 col-12"> <h2 class="new-obj-subtitle">Adatok</h2> <div id="processes_new_t_form"></div><div class="newtask-buttoncontainer d-flex justify-content-start"> <button id="add_new_task_btn" type="submit" class="btn btn-primary addnewtask-button">Létrehoz</button> <button type="reset" class="btn btn-primary addnewtask-button grey-button">Mégse</button> </div></div><div class="new-obj-shell col-md-6 col-12"> <h2 class="new-obj-subtitle">Feladat lépései</h2> <div class="d-flex justify-content-between align-items-center"> <div class="taskstep-saved"> <label for="saved_tasksteps" class="taskstep-saved-label">Mentett lépésorozatok:</label> <select id="saved_tasksteps" class="newtask-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><button type="reset" id="delete_button" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button> </div><div class="taskstep-container"> <div id="processes_new_t_slides" class="slides"> <div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div><div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div><div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div></div></div><div class="taskstep-tools d-flex align-items-center"> <input type="checkbox"> <span class="default-steps-label">Lépéssorozat mentése alapértelmezettként</span> </div></div></div></div></div>';
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
        let shellCard = Local.getShellCard();
        CardContainerPlus.Create(formData, dataFormShell, shellCard, Local.getFromHTML);
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
            card += '<button id="' + shellId + '_' + element.EmployeeId + '" type="button" class="ntsknempl_' + data.TaskStepFK + ' btn btn-sm added-employee-button employee-button">';
            card += '<i class="fas fa-user addemployee-icon"></i>';
            card += element.EmployeeName;
            card += '</button>';
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
        let ready = "";
        switch (objectItem.Type) {
            case "W":
                ready = FormElements.B.Write(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.UploadName);
                break;
            case "S":
                ready = FormElements.B.Select(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.Opportunities, objectItem.UploadName);
                break;
            case "SN":
                ready = FormElements.B.SelectOrNew(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.Opportunities, objectItem.UploadName);
                break;
            case "DT":
                ready = FormElements.B.DateTime(objectItem.FormStructureId, objectItem.Name, shellId, objectItem.UploadName);
                break;
            default:
                break;
        }
        return ready;
    },
    getTaskStepsCard: function () {
        let card = '';

        card += '<div class="slide">';
        card += '<div class="row taskstep-card d-flex align-items-center">';
        card += '!<i class="fas fa-stream taskstep-icon"></i>';
        card += '!<select id="ntsknempl_*1*" class="taskstep-formcontrol" data-place="processes_new_t_steps">';
        card += '!<option selected="">*3*</option>';
        card += '</select>';
        card += '</div>?';
        card += '<div class="row add-employee-card">';
        card += '!<button id="stepaddempl_*4*" type="button" class="btn btn-sm n-task-add-employee-btn employee-button">';
        card += '<i class="fas fa-user-plus addemployee-icon "></i>';
        card += 'Munkatárs hozzáadása';
        card += '</button>';
        card += '</div></div>';

        return card;
    },
    getShellCard: function () {
        //full card will be generated by getFilterHTML function
        let card = '?';
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