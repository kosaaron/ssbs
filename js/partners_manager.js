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

/** Loacal functions */
/**
 * Partners manager card template
 */
function getPartnersMCard() {
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
function getPartnersMDetail() {
    let container = "";

    container += '<h2>*</h2>';
    container += '!<p><label class="title-text">Feladat típusa:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Megrendelő:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Létrehozás:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Határidő:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Cím:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Leírás:</label><br><label>*</label></p>';

    return container;
}

/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function partnerMCardClick(cardId) {
    let data = process_maintain_list;
    let structure = partner_m_structure_2;
    let card = getPartnersMDetail();
    let shellId = "partners_m_details";

    CardDetails.Create(cardId, data, structure, card, shellId);
}

/** Public functions */
var partnersManager = {
    loadPartnersManager: function () {        
        // Load framework
        let framework='<div id="partners_manager" class="d-flex display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="partners_m_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div id="card-container" class="col-8"> <div id="card_container_r" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="partners_m_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;
    
        // Load card container
        let data = process_maintain_list;
        let cardStructure = partner_m_structure;
        let cardDesign = getPartnersMCard();
        let cardContainer = "card_container_r";
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(partnerMCardClick);

        Filters.Create(activeTableFilters, "partners_m_filters", partnersMFileterChange);
    }
};

function partnersMFileterChange() {
    
}

export default partnersManager;

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

var activeTableFilters = [
    {
        Name:"Kategória",
        Type:"Select",
        Default:"Karalábé",
        Opportunities: ["Sajt","Karalábé","Csoki"]
    },
    {
        Name:"Raktár",
        Type:"Select",
        Default:"Raktár3",
        Opportunities: ["Raktár1","Raktár2","Raktár3"]
    },
    {
        Name:"Harmadik",
        Type:"Select",
        Default:"Karalábé",
        Opportunities: ["Sajt","Karalábé","Csoki"]
    },
    {
        Name:"Negyedik",
        Type:"Select",
        Default:"Sajt",
        Opportunities: ["Sajt","Karalábé","Csoki"]
    },
    {
        Name:"Ötödik",
        Type:"Write",
        Default:"",
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