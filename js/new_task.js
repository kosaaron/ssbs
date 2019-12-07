/** new_task.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Tasks manager
 * 3. Local functions
 */
/** Imports */
import CardContainerPlus from './plug-ins/CardContainerPlus.js';
import CardContainer from './plug-ins/CardContainer.js';
import FormElements from './plug-ins/FormElements.js';
import AutoScroll from './plug-ins/AutoScroll.js';
import { addListenerByAttr, addListener, addOneListener } from './common.js';
/** Public functions */
var newTask = {
    loadModule: function () {
        //Title
        document.getElementById("back_to_menu_text").textContent = "Új feladat felvétele";

        //Load data
        Database.getDataFromDB();
    }
};
export default newTask;
let Varibles = {
    PageData: null,
    TaskSteps: null
}

let Events = {
    /**
     * Add employee click event
     * @param {String} fullId element id
     */
    addEmployeeClick: function (fullId) {
        let stepId = fullId.split('_')[1];
        alert(stepId);
    },
    /**
     * Select element open collapse event
     * @param {String} fullId 
     */
    openSNCollapse: function (fullId) {
        //full card will be generated by getFilterHTML function
        let splitedId = fullId.split('_');
        let defaultId = splitedId[splitedId.length - 1];
        let element = document.getElementById('collapse_processes_new_t_form_' + defaultId);
        if (element.style.display === "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    },
    /**
     * Add step to task way
     * @param {Element} e clicked element
     */
    addStepToWay: function (e) {
        if (document.getElementById("ntsk_add_taskstep_collapse").style.display === "none") {
            document.getElementById("ntsk_add_taskstep_collapse").style.display = "block";
        }
        else {
            document.getElementById("ntsk_add_taskstep_collapse").style.display = "none";
        }
        AutoScroll.Integration('ntsk_steps_cont');
    },
    /**
     * Show 'new task step' tab
     * @param {Element} e 
     */
    showNewTaskStep: function (e) {
        document.getElementById('saved_taskstep_container').style.display = "none";
        document.getElementById('new_taskstep_container').style.display = "block";
        let element = document.getElementById("ntsk_saved_tasksteps_tab");
        element.classList.remove("collapsable-form-tabs-active");
        let element2 = document.getElementById("ntsk_new_taskstep_tab");
        element2.classList.add("collapsable-form-tabs-active");
    },
    /**
     * Show 'saved task steps' tab
     * @param {Element} e 
     */
    showSavedTaskSteps: function () {
        document.getElementById('new_taskstep_container').style.display = "none";
        document.getElementById('saved_taskstep_container').style.display = "block";
        let element = document.getElementById("ntsk_new_taskstep_tab");
        element.classList.remove("collapsable-form-tabs-active");
        let element2 = document.getElementById("ntsk_saved_tasksteps_tab");
        element2.classList.add("collapsable-form-tabs-active");
    },
    addNewStepClick: function (fullId) {
        let stepName = document.getElementById('ntsk_new_taskstep_name').value;
        General.addNewStep(stepName);
    },
    /**
     * Create and add new step ot task
     * @param {String} fullId 
     */
    addCreateNewStepClick: function (fullId) {
        let place = 'ntskstpsew';
        let data = [];
        let taskStep = {};

        let stepName = document.getElementById('ntsk_new_taskstep_name').value;
        taskStep['StepName'] = stepName;
        data.push(taskStep);

        $.ajax({
            type: "POST",
            url: "./php/UploadData.php",
            data: { 'data': data, 'place': place },
            success: function (data) {
                alert(JSON.stringify(data));
                document.getElementById('ntsk_new_taskstep_name').value = "";
                General.addNewStep(data[0].InsertedId, stepName);
            },
            dataType: 'json'
        });
    },
    /**
     * Add saved step click
     * @param {String} fullId 
     */
    addSavedStepClick: function (fullId) {
        let selector = document.getElementById('ntsk_saved_step_selector');
        let stepFk = selector.value;
        let stepName = selector.options[selector.selectedIndex].text;
        General.addNewStep(stepFk, stepName);
    },
    /**
     * Save employee to step
     * @param {String} fullId element id
     */
    saveEmployee: function (fullId) {
        let splittedId = fullId.split('_');
        let number = splittedId[splittedId.length - 1];
        let container = "";
        let selector = document.getElementById('ntskstps_add_empl_slct_' + number);

        let eName = selector.options[selector.selectedIndex].text;
        let emplFK = selector.value;

        container += '<div class="row add-employee-card">';
        container += '<div employee-id="' + emplFK + '" class="ntskstps_slide_' + number + ' btn btn-sm employee-box ntsk-empl-box">';
        container += '<i class="fas fa-user addemployee-icon "></i>';
        container += eName;
        container += '<span onClick="deleteEmployee(this)" class="closebtn">&times;</span> </div></div>';
        let saveBtn = document.getElementById(fullId);
        saveBtn.parentNode.parentNode.insertAdjacentHTML('beforebegin', container);
    },
    /**
     * OnUpdate event of Sortable
     * @param {Event} evt 
     */
    sortableOnUpdate: function (evt) {
        let stepNumbers = document.getElementsByClassName('stepNo');
        for (let i = 1; i <= stepNumbers.length; i++) {
            const stepNumber = stepNumbers[i - 1];
            stepNumber.innerHTML = i;
            stepNumber.nextElementSibling.setAttribute('number', i);
        }
    }
}

let General = {
    /**
     * 
     * @param {JSON} data 
     */
    reloadFullPage: function (data) {
        /** Load elements */
        //load framework
        let framework = NewTaskFramework.load();
        document.getElementById("process_modul_content").innerHTML = framework;

        var processesNewTSlides = document.getElementById("ntskstps_slides");
        new Sortable(processesNewTSlides, {
            animation: 150,
            scroll: true,
            dragClass: "ntsk-step-drag",
            chosenClass: "ntsk-step-sortable-chosen",
            onUpdate: Events.sortableOnUpdate
        });
        //removeOneListener("ntskstps_slides");

        //load data entry form
        let dataFormShell = "processes_new_t_form";
        let formData = data.FormStructure.Data;
        CardContainerPlus.Create(formData, dataFormShell, Callbacks.getFormHTML);

        //add step select
        let addStepSelectId = 'ntsk_saved_step_selector';
        let addStepSelectShellId = 'ntsk_saved_step_slct_shell';
        let addStepSelectOpp = Varibles.PageData.AddStepSelect.Data[0].Opportunities;
        let addStepSelectPos = 'afterbegin';
        FormElements.S.Select(addStepSelectId, addStepSelectShellId, addStepSelectOpp, addStepSelectPos);

        /** Definition of task type change events */
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

        /** Autoscroll integration for simple form and steps *///test
        AutoScroll.Integration('ntsk_steps_cont');
        AutoScroll.Integration('processes_new_t_form');

        //refresh bootstrap events
        $('.selectpicker').selectpicker('refresh');

        /** Definition of click events */
        addListenerByAttr("new_" + dataFormShell, "click", Events.openSNCollapse);

        addOneListener('ntsk_add_saved_step_btn', 'click', Events.addSavedStepClick);
        addOneListener('ntsk_new_saved_n_step_btn', 'click', Events.addCreateNewStepClick);

        addOneListener('ntsk_new_taskstep_tab', 'click', Events.showNewTaskStep);
        addOneListener('ntsk_saved_tasksteps_tab', 'click', Events.showSavedTaskSteps);

        addOneListener('ntsk_add_taskstep_cllps_btn', 'click', Events.addStepToWay);
        addOneListener('add_new_task_btn', 'click', Database.uploadTaskData);
    },
    /**
     * Load task steps
     * @param {JSON} data 
     */
    loadTaskSteps: function (data) {
        // Load task steps
        let taskStepsShell = "ntskstps_slides";
        let taskStepsData = data.Data;
        let taskStepsCard = Cards.getTaskStepsCard();
        let tStepsStructure = data.DataStructure;
        CardContainerPlus.CreateWithData(taskStepsData, tStepsStructure, taskStepsShell, taskStepsCard, Callbacks.getEmployeesToTask);

        let stepNumbers = document.querySelectorAll('.stepNo');
        let emplOpp = Varibles.PageData.AddEmplSelect.Data[0].Opportunities;
        for (let i = 1; i <= stepNumbers.length; i++) {
            FormElements.S.Select('ntskstps_add_empl_slct_' + i, 'ntskstps_add_empl_' + i, emplOpp, 'beforebegin');
        }

        addListener('n-task-add-employee-btn', 'click', Events.addEmployeeClick);
        addListener('ntskstps-save-empl', 'click', Events.saveEmployee);
        $('.selectpicker').selectpicker('refresh');
    },
    /**
     * Add new step
     * @param {String} stepFK 
     * @param {String} stepName 
     */
    addNewStep: function (stepFK, stepName) {
        if (Varibles.TaskSteps === null) {
            return;
        }

        let stepNumber = document.querySelectorAll('.stepNo').length;
        const currentStepNumber = stepNumber + 1;
        let data = {};
        data['Number'] = stepNumber + 1;
        data['TaskStepFK'] = stepFK;
        data['TaskStep.Name'] = stepName;
        let shellId = 'ntskstps_slides';
        let structure = Varibles.TaskSteps.DataStructure;
        let card = Cards.getTaskStepsCard();
        CardContainer.Create([data], structure, card, shellId);

        let emplOpp = Varibles.PageData.AddEmplSelect.Data[0].Opportunities;
        FormElements.S.Select('ntskstps_add_empl_slct_' + currentStepNumber,
            'ntskstps_add_empl_' + currentStepNumber, emplOpp, 'beforebegin');

        document.getElementById('ntsk_add_taskstep_cllps_btn').click();
        $('.selectpicker').selectpicker('refresh');

        let ntskStepsCont = document.getElementById("ntsk_steps_cont");
        ntskStepsCont.scrollTop = ntskStepsCont.scrollHeight;

        addOneListener('ntskstps_add_empl_' + currentStepNumber, 'click', Events.saveEmployee);
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
                Varibles.TaskSteps = data;
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
                steps.forEach(step => {
                    uploadSteps[step.getAttribute('upload-name')] = step.value;
                    let employees = document.getElementsByClassName(step.id);
                    let stepId = step.getAttribute('task-step-id');

                    let emplsLength = employees.length;
                    if (emplsLength === 0) {
                        let array = {};
                        array['Number'] = parseInt(number);
                        array['TaskFK'] = 'id_to_fk(tasks,TaskId)';
                        array['TaskStepFK'] = stepId;
                        array['EmployeeFK'] = null;
                        if (number === 1) {
                            array['Active'] = 1;
                        } else {
                            array['Active'] = 0;
                        }
                        array['Ready'] = 0;
                        uploadSteps.push(array);
                    }

                    for (let i = 0; i < emplsLength; i++) {
                        const employee = employees[i];
                        let employeeId = employee.getAttribute('employee-id');

                        let array = {};
                        array['Number'] = parseInt(number);
                        array['TaskFK'] = 'id_to_fk(tasks,TaskId)';
                        array['TaskStepFK'] = stepId;
                        array['EmployeeFK'] = employeeId;
                        if (number === 1) {
                            array['Active'] = 1;
                        } else {
                            array['Active'] = 0;
                        }
                        array['Ready'] = 0;
                        uploadSteps.push(array);
                    }

                    ++number;
                });
                if (number !== 1) {
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
     * @param {JSON} data data
     * @param {String} shellId 
     */
    getEmployeesToTask: function (data, shellId) {
        let card = "";
        for (let i = 0; i < data.Employees.length; i++) {
            const element = data.Employees[i];

            card += '<div class="row add-employee-card">';
            card += '<div employee-id="' + element.EmployeeId + '" class="ntskstps_slide_' + data.Number + ' btn btn-sm employee-box ntsk-empl-box">';
            card += '<i class="fas fa-user addemployee-icon"></i>';
            card += element.EmployeeName;
            card += '<span onclick="deleteEmployee(this)" class="closebtn">&times;</span>';
            card += '</div>';
            card += '</div>';
        }

        return card;
    },
    /**
     * getForm HTML
     * @param {Object} objectItem 
     * @param {String} shellId 
     */
    getFormHTML: function (objectItem, shellId) {
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
    }
}

let Cards = {
    /**
     * Get task steps card
     */
    getTaskStepsCard: function () {
        let card = '';

        card += '<div class="slide">';
        card += '<div class="row taskstep-card d-flex align-items-center">';
        card += '!<div class="stepNo">*2*</div>';
        card += '!<h4 id="ntskstps_slide_*2*"! task-step-id="*1*" !number="*2*" class=taskstep-title data-place="processes_new_t_steps">';
        card += '!*3*</h4>';
        card += '</div>?';
        card += '<div class="row add-employee-card">';
        card += '<div class="display-flex btn btn-sm added-employee-input">';
        card += '<i class="fas fa-user-plus addemployee-icon "></i>';
        card += '!<i id="ntskstps_add_empl_*2*" class="ntskstps-save-empl fas fa-check-circle save-employee-icon"></i>';
        card += '</div></div></div>';

        return card;
    }
}

/**
 * Framework
 */
let NewTaskFramework = {
    load: function () {
        let shellId = 'ntsk';

        return `
        <div id="new_task" class="d-flex display-flex flex-row full-screen">
            <div class="flex-fill col-12">
                <div class="row page-content">
                    <div class="full-height new-obj-shell col-md-6 col-12">
                        <h2 id="${shellId}_form_title" class="new-obj-subtitle">Adatok</h2>
                        <div id="processes_new_t_form"></div>
                        <div id="${shellId}_form_footer" class="newtask-buttoncontainer d-flex justify-content-start">
                            <button id="add_new_task_btn" type="submit" class="btn btn-primary addnewtask-button">Létrehoz</button>
                            <button type="reset" class="btn btn-primary addnewtask-button grey-button">Mégse</button>
                        </div>
                    </div>
                    <div class="full-height new-obj-shell col-md-6 col-12">
                        <h2 id="${shellId}_steps_title" class="new-obj-subtitle">Feladat lépései</h2>
                        <div id="${shellId}_steps_new_box" class="d-flex justify-content-between align-items-center">
                            <div class="add-taskstep-container">
                                <div id="${shellId}_add_taskstep_cllps_btn" class="cursor-pointer">
                                    <h7 class="collapsable-form-title">Lépés hozzáadása</h7>
                                    <span class="btn-show-forms">
                                        <i class="fas fa-chevron-down"></i>
                                    </span>
                                </div>
                                <div id="${shellId}_add_taskstep_collapse" style="display:none;">
                                    <div class="add-taskstep-btn-container">
                                        <div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons">
                                            <label id="${shellId}_new_taskstep_tab" class="btn collapsable-form-tabs collapsable-form-tabs-active">+ Új lépés</label>
                                            <label id="${shellId}_saved_tasksteps_tab" class="btn collapsable-form-tabs">Mentett lépések</label>
                                        </div>
                                    </div>
                                    <div id="new_taskstep_container" class="add-taskstep-form-container">
                                        <div class="form-group">
                                            <label class="newtaskstep-label">Lépés neve:</label>
                                            <div class="tasktype-group">
                                                <div class="input-group mb-3">
                                                    <input type="text" id="${shellId}_new_taskstep_name" class="flex-1 newtask-formcontrol">
                                                    <div class="input-group-append">
                                                        <button id="${shellId}_new_saved_n_step_btn" class="btn btn-outline-secondary" type="button"><i class="fas fa-plus"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="saved_taskstep_container" class="add-taskstep-form-container">
                                        <div class="form-group">
                                            <label class="newtaskstep-label">Lépés neve:</label>
                                            <div class="tasktype-group">
                                                <div id="${shellId}_saved_step_slct_shell" class="input-group mb-3">
                                                    <div class="input-group-append">
                                                        <button id="${shellId}_add_saved_step_btn" class="btn btn-outline-secondary" type="button"><i class="fas fa-plus"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="${shellId}_steps_cont" class="taskstep-container">
                            <div id="ntskstps_slides" class="slides">
                            </div>
                        </div>
                        <div id="${shellId}_steps_footer">
                            <button type="reset" id="${shellId}_steps_trash_btn" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

/** ----- JSON Examples - Never used ----- **/
/**
 * New task form structure JSON example 
 */
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

/**
 * New task predefined steps JSON example 
 */
let NewTaskStepsJSONExample = {
    "DataStructure": {
        "1": "TaskStepFK",
        "2": "Number",
        "3": "TaskStep.Name",
    },
    "Data": [
        {
            "Number": "1",
            "TaskStepFK": "1",
            "TaskStep.Name": "\u00d6tlet felvet\u00e9se",
            "Employees": [
                {
                    "EmployeeId": "1",
                    "EmployeeName": "Werner \u00c1d\u00e1m"
                }
            ]
        },
        {
            "Number": "2",
            "TaskStepFK": "2",
            "TaskStep.Name": "Frontend kialak\u00edt\u00e1sa",
            "Employees": [
                {
                    "EmployeeId": "3",
                    "EmployeeName": "K\u00f3sa \u00c1ron"
                }
            ]
        },
        {
            "Number": "3",
            "TaskStepFK": "3",
            "TaskStep.Name": "Backend kialak\u00edt\u00e1sa",
            "Employees": [
                {
                    "EmployeeId": "1",
                    "EmployeeName": "Werner \u00c1d\u00e1m"
                }
            ]
        },
        {
            "Number": "4",
            "TaskStepFK": "4",
            "TaskStep.Name": "Tesztel\u00e9s",
            "Employees": [
                {
                    "EmployeeId": "2",
                    "EmployeeName": "S\u00e1gi D\u00e1vid"
                },
                {
                    "EmployeeId": "1",
                    "EmployeeName": "Werner \u00c1d\u00e1m"
                }
            ]
        }
    ]
}