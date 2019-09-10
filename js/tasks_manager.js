/** partners_manager.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Partners manager
 */
/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import Filters from './moduls/Filters.js';
import newTask from './new_task.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';


/** Local functions */
/**
 * Partners manager card template
 */
function getTasksMCard() {
    let container = "";
    container += '<div class="col-lg-6"><div class="card taskcard"><div class="card-body">';
    container += '!<h5 class="card-title">*</h5>';
    container += '!<p class="card-text">*</p>';
    container += `!<a href="#" class="btn btn-primary next-button show-details" id="*"><i class="fas fa-arrow-right"></i></a></div></div></div>`;

    return container;
}

/**
 * Partners manager details template
 */
function getTasksMDetail() {
    let container = "";
    container += '!<h2 class="name-grey">*</h2>';
    container += '<div class="d-flex justify-content-center"><div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons"> <label id="detail_data_btn" class="btn btn-detail-menu btn-detail-menu-active"> <input type="radio" name="options" id="option1" autocomplete="off" onchange="showData()"> Adatok </label> <label id="detail_timeline_btn" class="btn btn-detail-menu"> <input type="radio" name="options" id="option2" autocomplete="off" onchange="showTimeline()"> Idővonal </label></div></div>';
    container += '!<div id="data-container">';
    for (let i = 0; i < getTasksMDStructure().Data.length-1; i++) {
        container += '!<p><label class="title-text">**</label><br><label>*</label></p>';
    }
    container += '</div><div id="timeline-container" style="display: none" >';
    container += '<ul class="timeline"><li><div class="timeline-item"> <span>1</span><div class="timeline-item-content"> <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><h3>Előkészítés</h3> </a><div class="collapse" id="collapseExample"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button></div></div></div></div></li><li><div class="timeline-item"> <span>2</span><div class="timeline-item-content"> <a data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample"><h3>Megbeszélés</h3> </a><div class="collapse" id="collapseExample2"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button></div></div></div></div></li><li><div class="timeline-item"> <span id="actual-step">3</span><div class="timeline-item-content"> <a data-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="true" aria-controls="collapseExample"><h3>Beszerzés</h3> </a><div class="show" id="collapseExample3"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Sági Dávid</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i> </button></div></div></div></div></li><li><div class="timeline-item"> <span>4</span><div class="timeline-item-content"> <a data-toggle="collapse" href="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample"><h3>Alkatrész cseréje</h3> </a><div class="collapse" id="collapseExample4"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Werner Ádám</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Kósa Áron Balázs</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i> </button></div></div></div></div></li><li><div class="timeline-item"> <span>5</span><div class="timeline-item-content"> <a data-toggle="collapse" href="#collapseExample5" role="button" aria-expanded="false" aria-controls="collapseExample5"><h3>Tesztüzem</h3> </a><div class="collapse" id="collapseExample5"><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Luke Skywalker</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm added-employee-button employee-button"><i class="fas fa-user addemployee-icon "></i>Jabba</button></div><div class="row add-employee-card"> <button type="button" class="btn btn-sm add-employee-button employee-button"><i class="fas fa-user-plus addemployee-icon "></i></button></div></div></div></div></li></ul></div>';
    return container;
}

function getTasksMDStructure() {
    return tasks_m_structure_2;
}

/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function taskMCardClick(cardId) {
    let data = process_maintain_list;
    let structure = tasks_m_structure_2;
    let card = getTasksMDetail();
    let shellId = "tasks_m_details";

    CardDetails.Create(cardId, data, structure, card, shellId);
}
function tasksMFilterChange(id) {
    alert(id);
}

function addTask() {
    newTask.loadNewTask();

    removeOneListener("processes_back_to_menu");
    addOneListener("processes_back_to_menu", "click", tasksManager.loadTasksManager);
}

/** Public functions */
var tasksManager = {
    loadTasksManager: function () {
        // Load framework
        document.getElementById("back_to_menu_text").textContent = "Feladatok";
        let framework = '<div id="tasks_manager" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="tasks_m_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="proceses_add_task_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="tasks_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="tasks_m_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;

        // Load card container
        let data = process_maintain_list;
        let cardStructure = tasks_m_structure;
        let cardDesign = getTasksMCard();
        let cardContainer = "tasks_card_container";
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(taskMCardClick);
        if (data[0].Id !== null) {
            taskMCardClick(data[0].Id);
        }

        Filters.Create(activeTableFilters, "tasks_m_filters", tasksMFilterChange);

        addOneListener("proceses_add_task_btn", "click", addTask);
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);
    }
};
export default tasksManager;

var tasks_m_structure = [
    "Name",
    "Megrendelő",
    "Id"
];

var tasks_m_structure_2 = {
    Names: [
        null,
        "Feladat típusa",
        "Megrendelő",
        "Létrehozás dátuma",
        "Határidő",
        "Cím:",
        "Leírás"
    ],
    Data: [
        "Name",
        "Type",
        "Megrendelő",
        "Létrehozás", //"Létrehozás",
        "Határidő",
        "Cím",
        "Leírás"]
};

var activeTableFilters = [
    {
        Id: "11234",
        Name: "Kategória",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "11235",
        Name: "Raktár",
        Type: "Select",
        Default: "Raktár3",
        Opportunities: ["Raktár1", "Raktár2", "Raktár3"]
    },
    {
        Id: "11236",
        Name: "Harmadik",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "11237",
        Name: "Negyedik",
        Type: "Select",
        Default: "Sajt",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "11238",
        Name: "Ötödik",
        Type: "Write",
        Default: "",
    },
];


var process_maintain_list = [
    {
        Id: 'fjh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7zd3',
        Name: 'Nyomtató szervíz2',
        Type: 'Szervíz2',
        Megrendelő: 'Lajos Kft.2',
        Létrehozás: '2019.06.24 2',
        Határidő: '2019.06.30 2',
        Cím: 'Érd, Tóth Ilona utca 14., 2340 2',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje 2'
    },
    {
        Id: 'fjh7zd',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7z',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'jh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'h7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7z3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7d3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjhzd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fj7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7zw',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh73w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    }
]