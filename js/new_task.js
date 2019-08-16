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
import { addListenerByAttr } from './common.js';
/** Public functions */
var newTask = {
    loadNewTask: function () {
        // Load framework
        let framework = '<div id="new_task" class="d-flex display-flex flex-row full-screen"> <div class="flex-fill col-1"></div><div class="flex-fill col-10"> <div class="row page-content"> <div class="col-md-6 col-12 right-border-form"> <h2 class="task-subtitle">Adatok</h2> <div id="processes_new_t_data"></div><div class="newtask-buttoncontainer d-flex justify-content-start"> <button type="submit" class="btn btn-primary addnewtask-button">Létrehoz</button> <button type="reset" class="btn btn-primary addnewtask-button grey-button">Mégse</button> </div></div><div class="col-md-6 col-12"> <h2 class="task-subtitle">Feladat lépései</h2> <div class="d-flex justify-content-between align-items-center"> <div class="taskstep-saved"> <label for="saved_tasksteps" class="taskstep-saved-label">Mentett lépésorozatok:</label> <select id="saved_tasksteps" class="newtask-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><button type="reset" id="delete_button" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button> </div><div class="taskstep-container"> <div id="processes_new_t_slides" class="slides"> <div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div><div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div><div class="slide"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div></div></div><div class="taskstep-tools d-flex align-items-center"> <input type="checkbox"> <span class="default-steps-label">Lépéssorozat mentése alapértelmezettként</span> </div></div></div></div><div class="flex-fill col-1"> </div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;
        document.getElementById("back_to_menu_text").textContent = "Új feladat felvétele";

        var processesNewTSlides = document.getElementById("processes_new_t_slides");
        new Sortable(processesNewTSlides, {
            animation: 150
        });
        //removeOneListener("processes_new_t_slides");

        // Load data entry form
        let shellId = "processes_new_t_data";
        let formData = Local.getFromData();
        let shellCard = Local.getShellCard();
        CardContainerPlus.Create(formData, shellId, shellCard, Local.getFromHTML);
        addListenerByAttr("new_" + shellId, "click", Local.openCollapse)
    }
};
export default newTask;
let Local = {
    getFromData: function () {
        return newTaskData;
    },
    getFromHTML: function (objectItem, shellId) {
        let ready = "";
        switch (objectItem.Type) {
            case "Write":
                ready = FormElements.B.Write(objectItem.Id, objectItem.Name, shellId);
                break;
            case "Select":
                ready = FormElements.B.Select(objectItem.Id, objectItem.Name, shellId, objectItem.Opportunities);
                break;
            case "SelectOrNew":
                ready = FormElements.B.SelectOrNew(objectItem.Id, objectItem.Name, shellId, objectItem.Opportunities);
                break;
            case "DateTime":
                ready = FormElements.B.DateTime(objectItem.Id, objectItem.Name, shellId);
                break;
            default:
                break;
        }
        return ready;
    },
    getShellCard: function () {
        //full card will be generated by getFilterHTML function
        let card = '?';
        return card;
    },
    openCollapse: function (id) {
        //full card will be generated by getFilterHTML function
        let defaultId = id.split('_')[1];
        let element = document.getElementById('collapse_' + defaultId);
        if (element.style.display === "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }
};
let newTaskData = [
    {
        Id: "2234",
        Name: "Feladat neve",
        Type: "Write",
        Default: ""
    },
    {
        Id: "2235",
        Name: "Feladat típusa",
        Type: "SelectOrNew",
        Default: "Szervíz",
        Opportunities: ["Szervíz", "Szállítás", "Kereskedés"]
    },
    {
        Id: "2236",
        Name: "Feladat határideje",
        Type: "DateTime",
        Default: ""
    },
    {
        Id: "2237",
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