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
import newPartner from './new_partner.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';

/** Loacal functions */
/**
 * Partners manager card template
 */
function getPartnersMCard() {
    let container = "";
    container += '<div class="col-lg-12"><div class="card partnercard"><div class="card-body">';
    container += '!<div class="display-flex justify-content-between"><div class="partner-logo-container display-flex align-items-center"><img class="partner-logo"src="*1*"></div>';
    container += '!<div class="partner-datas"><h3 class="card-title partner-name">*2*</h3>';
    container += '!<p><i class="fas fa-phone partnercard-logo"></i>*3*</p>';
    container += '!<p><i class="far fa-envelope partnercard-logo"></i>*4*</p></div></div>';
    container += '!<div class="display-flex flex-wrap tag-container"><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>IT cég</button><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>Microsoft</button><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>Nemzetközi</button><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>Kiemelt</button><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>Nemzetközi</button><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>IT cég</button><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>Microsoft</button><button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>Nagyobb cimke</button></div><a href="#" class="btn btn-primary next-button partnerm-show-details" id="partners_card_*5*"><i class="fas fa-arrow-right"></i></a></div></div></div>';

    return container;
}

/**
 * Partners manager details template
 */
function getPartnersMDetail() {
    let container = '<h2 class="name-grey">*1*</h2>';
    container += '<div id="partner_details_tab" class="display-flex justify-content-center"><div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons"> <label id="prtnr_dtl_data_btn" class="btn btn-detail-menu btn-detail-menu-active"> <input type="radio" name="options" id="option1" autocomplete="off" onchange="showData()"> Adatok </label> <label id="prtnr_dtl_cnt_btn" class="btn btn-detail-menu"> <input type="radio" name="options" id="option2" autocomplete="off" onchange="showTimeline()"> Idővonal </label></div></div><div id="partner_details_content">';
    container += '!<div id="partner_data_container">';
    for (let i = 2; i < Object.keys(Varibles.PageData.DetailsStructure.Data).length + 1; i++) {
        container += '!<p><label class="title-text">**' + i + '**</label><br><label>*' + i + '*</label></p>';
    }
    container += '!</div><div id="partner_contacts_container" style="display: none" ></div></div>';

    return container;
}

function getPartnersMDStructure() {
    return partner_m_structure_2;
}

/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function partnerMCardClick(cardId) {
    let splittedId = cardId.split('_');
    let id = splittedId[splittedId.length - 1];

    let data = Varibles.PageData.Data;
    let structure = Varibles.PageData.DetailsStructure;
    let card = getPartnersMDetail();
    let shellId = "partners_m_details";

    CardDetails.Create(id, data, structure, card, shellId, 'PartnerId');
    let contactShell = 'partner_contacts_container';

    addOneListener('partner_data_container', 'click', Events.detailsDataTabClick);
    addOneListener('partner_contacts_container', 'click', Events.detailsContactsTabClick);

    //CardContainer.Create()
}

function partnersMFileterChange(id) {
    alert(id);
}

function addPartner() {
    newPartner.loadNewPartner();

    removeOneListener("processes_back_to_menu");
    addOneListener("processes_back_to_menu", "click", partnersManager.loadPartnersManager);
}

/** Public functions **/
var partnersManager = {
    loadPartnersManager: function () {
        // Load header
        document.getElementById("back_to_menu_text").textContent = "Partnerek";

        // Get data from database
        Database.getPageData();
    }
};
export default partnersManager;
/** Varibles */
let Varibles = {
    PageData: null
}

/** General functions **/
let General = {
    reloadFullPage(data) {
        // Load framework
        let framework = '<div id="partners_manager" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="partners_m_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="proceses_add_partner_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="partners_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="partners_m_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;

        // Load card container
        let listData = data.Data;
        let cardStructure = data.DataStructure;
        let cardDesign = getPartnersMCard();
        let cardContainer = "partners_card_container";
        CardContainer.Create(listData, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(partnerMCardClick, 'partnerm');
        if (listData[0].PartnerId !== null) {
            partnerMCardClick('partners_card_' + listData[0].PartnerId);
        }

        Filters.Create(activeTableFilters, "partners_m_filters", partnersMFileterChange);

        addOneListener("proceses_add_partner_btn", "click", addPartner);
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);
    }
}

/** Database **/
let Database = {
    /** Get card container data */
    getPageData() {
        $.ajax({
            type: "POST",
            url: "./php/PartnersManager.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;

                /*  Convert string data to date simple
                Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'StartDate');
                */
                General.reloadFullPage(Varibles.PageData);
            },
            dataType: 'json'
        });
    }
}

/** Events **/
let Events = {
    /** Details data tab click */
    detailsDataTabClick: function (fullId) {
        document.getElementById('partner_data_container').style.display = "none";
        document.getElementById('partner_contacts_container').style.display = "block";
        var element = document.getElementById("prtnr_dtl_data_btn");
        element.classList.remove("btn-detail-menu-active");
        var element2 = document.getElementById("prtnr_dtl_cnt_btn");
        element2.classList.add("btn-detail-menu-active");
    },
    /** Details contacts tab click */
    detailsContactsTabClick: function (fullId) {
        document.getElementById('partner_data_container').style.display = "none";
        document.getElementById('partner_contacts_container').style.display = "block";
        var element = document.getElementById("prtnr_dtl_data_btn");
        element.classList.remove("btn-detail-menu-active");
        var element2 = document.getElementById("prtnr_dtl_cnt_btn");
        element2.classList.add("btn-detail-menu-active");
    },
}

/** Example for page data [JSON] */
let PageDataJSONExample = {
    "Filters": [
        {
            "FilterId": "3",
            "Name": "Partner n\u00e9v",
            "Type": "W",
            "DefaultValue": null,
            "ColumnName": "Name"
        },
        {
            "FilterId": "4",
            "Name": "Cimke",
            "Type": "S",
            "DefaultValue": null,
            "ColumnName": "PartnerTags.Name",
            "Opportunities": [
                {
                    "Id": "0",
                    "Name": "-- V\u00e1lassz --"
                },
                {
                    "Id": "4",
                    "Name": "Fontos"
                },
                {
                    "Id": "4",
                    "Name": "Alkatr\u00e9szek"
                }
            ]
        }
    ],
    "DataStructure": {
        "1": "LogoSrc",
        "2": "Name",
        "3": "Phone",
        "4": "Address",
        "5": "PartnerId"
    },
    "Data": [
        {
            "PartnerType.Name": "Besz\u00e1ll\u00edt\u00f3",
            "Email": "elso.vallalat@gmail.com",
            "LogoSrc": "https:\/\/www.allenrec.com\/wp-content\/uploads\/2017\/04\/new-microsoft-logo-SIZED-SQUARE.jpg",
            "Name": "Teszt partner 1",
            "Phone": "+36908761239",
            "Address": "Valahol, El\u0151 utca 1.",
            "PartnerId": "1",
            "Tags": [
                {
                    "PartnerTagId": "1",
                    "Name": "Fontos"
                },
                {
                    "PartnerTagId": "2",
                    "Name": "Alkatr\u00e9szek"
                }
            ],
            "Contacts": {
                "DataStructure": {
                    "1": "PartnerContactId",
                    "2": "Name",
                    "3": "Email",
                    "4": "Phone",
                    "5": "Address"
                },
                "Data": [
                    {
                        "PartnerContactId": "1",
                        "Name": "K\u00f3sa \u00c1ron",
                        "Email": "11",
                        "Phone": "+36702395837",
                        "Address": "Valahol, El\u0151 utca 1."
                    }
                ]
            }
        }
    ],
    "DetailsStructure": {
        "Names": {
            "1": null,
            "2": "Felefonsz\u00e1m",
            "3": "Email",
            "4": "C\u00edm"
        },
        "Data": {
            "1": "Name",
            "2": "Phone",
            "3": "Email",
            "4": "Address"
        }
    }

}


var partner_m_structure = {
    '1': "LogoSrc",
    '2': "Name",
    '3': "Telefon",
    '4': "Email",
    '5': "Id"
};

var partner_m_structure_2 = {
    Names: {
        '1': null,
        '2': "Partner típusa",
        '3': "Kapcsolattartó",
        '4': "Telefon",
        '5': "Email",
        '6': "Cím",
        '7': "Leírás"
    },
    Data: {
        '1': "Name",
        '2': "Type",
        '3': "Kapcsolattartó",
        '4': "Telefon",
        '5': "Email",
        '6': "Cím",
        '7': "Leírás"
    }
};

var activeTableFilters = [
    {
        Id: "1234",
        Name: "Kategória",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "1235",
        Name: "Raktár",
        Type: "Select",
        Default: "Raktár3",
        Opportunities: ["Raktár1", "Raktár2", "Raktár3"]
    },
    {
        Id: "1236",
        Name: "Harmadik",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "1237",
        Name: "Negyedik",
        Type: "Select",
        Default: "Sajt",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "1238",
        Name: "Ötödik",
        Type: "Write",
        Default: "",
    },
];

var partners_list = [
    {
        Id: 'fjh7zd3w',
        Name: 'Microsoft Corporation',
        Type: 'IT',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjh7zd3',
        Name: 'Audi Hungária',
        Type: 'Személygépjármű',
        Email: 'hungaria@audi.com',
        Telefon: '061 432 2222',
        Kapcsolattartó: 'Rob Stark',
        Cím: 'Győr, Audi utca 14., 3300',
        Leírás: 'A magyar GDP-t itt gyártják',
        LogoSrc: 'https://www.cascadezrt.hu/wp-content/uploads/2016/03/audi2.jpg'
    },
    {
        Id: 'fjh7zd',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjh7z',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'h7zd3w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjh7z3w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjh7d3w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjhzd3w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fj7zd3w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fh7zd3w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjh7zw',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjh73w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    },
    {
        Id: 'fjh3w',
        Name: 'Microsoft Corporation',
        Type: 'Szervíz',
        Email: 'microsoft@microsoft.com',
        Telefon: '061 321 3232',
        Kapcsolattartó: 'Tyrion Lannister',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Ilyen nagy IT cég, sokan ismerik',
        LogoSrc: 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'
    }
]