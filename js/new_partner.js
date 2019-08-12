/** new_partner.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Partners manager
 */
/** Imports */
import { removeOneListener } from './common.js';

/** Loacal functions */


/** Public functions */
var newPartner = {
    loadNewPartner: function () {
        // Load framework
        let framework = '<div id="new_partner" class="d-flex display-flex flex-row full-screen"> <div class="flex-fill col-1"></div><div class="flex-fill col-10"> <div class="row page-header d-flex align-items-center"> <div class="col-lg-9 col-sm-7 col-12"> <h1 class="addtaskpage-title">+ Új feladat létrehozása</h1> </div><div class="col-lg-3 col-sm-5 col-12"> <div class="newtask-buttoncontainer d-flex justify-content-between"> <button type="submit" class="btn btn-primary addnewtask-button">Létrehoz</button> <button type="reset" class="btn btn-primary addnewtask-button grey-button">Mégse</button> </div></div></div><div class="row page-content"> <div class="col-md-6 col-12 right-border-form"> <h2 class="task-subtitle">Adatok</h2> <div class="form-group"> <label for="taskName" class="newtask-label">Feladat neve:</label> <input type="text" id="taskName" class="newtask-formcontrol"> </div><div class="form-group"> <label for="taskCat" class="newtask-label">Feladat típusa:</label> <div id="tasktype-group"> <select id="taskCat" class="newtask-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> <button type="submit" class="btn btn-primary tasktype-button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"> <i class="fas fa-plus"></i> </button> </div></div><div class="collapse" id="collapseExample"> <div class="card card-body"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. </div></div><div class="form-group"> <label for="taskDate" class="newtask-label">Feladat határideje:</label> <input type="date" id="taskDate" class="newtask-formcontrol"> </div><div class="form-group"> <label for="taskProject" class="newtask-label">Projekthez rendelés:</label> <select id="taskProject" class="newtask-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div></div><div class="col-md-6 col-12"> <h2 class="task-subtitle">Feladat lépései</h2> <div class="taskstep-saved"> <div class="form-group"> <label for="saved_tasksteps" class="newtask-label">Mentett lépésorozatok:</label> <select id="saved_tasksteps" class="newtask-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div></div><div class="taskstep-container"> <div id="processes_new_p_slides" class="slides"> <div class="slide slide1"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div><div class="slide slide2"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div><div class="slide slide3"> <div class="row taskstep-card d-flex align-items-center"> <i class="fas fa-plus taskstep-icon"></i> <select id="taskProject" class="taskstep-formcontrol"> <option selected>Choose...</option> <option>...</option> </select> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button> </div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i>Munkatárs hozzáadása</button> </div></div></div></div><div class="taskstep-tools"> <label class="switch"> <input type="checkbox"> <span class="slider round"></span> </label> <span class="default-steps-label">Lépéssorozat mentése alapértelmezettként</span> <button type="reset" id="delete_button" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button> </div></div></div></div></div><div class="flex-fill col-1"> </div>';
        document.getElementById("process_modul_content").innerHTML = framework;
        document.getElementById("back_to_menu_text").textContent = "Új partner felvétele";

        var processesNewPSlides = document.getElementById("processes_new_p_slides");

        new Sortable(processesNewPSlides, {
            animation: 150
        });
        //removeOneListener("processes_new_p_slides");
        
        // Load data entry form

    }
};
export default newPartner;
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