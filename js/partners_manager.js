/** partners_manager.js */
/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import FilterAndSort from './moduls/FilterAndSort.js';
import newPartner from './new_partner.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';
import CardContainerPlus from './moduls/CardContainerPlus.js';
import ContainerDesigns from './moduls/designs/ContainerDesigns.js';
import DetailsDesigns from './moduls/designs/DetailsDesigns.js';

/** Public functions **/
var partnersManager = {
    loadPartnersManager: function () {
        // Title
        document.getElementById("back_to_menu_text").textContent = "Partnerek";
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);

        // Loader
        document.getElementById('process_modul_content').innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        // Get data from database
        Database.getPageData();
    }
};
export default partnersManager;

/** Varibles */
let Varibles = {
    FrameId: 'prtnrm',
    FilterPlace: 'prtnrfltr',
    PageData: null
}

/** Loaders functions **/
let Loaders = {
    reloadFullPage() {
        // Load framework
        Framework.Load('process_modul_content', Varibles.FrameId);

        // Load card container
        Loaders.reloadCardContainer();

        FilterAndSort.Create(Varibles.PageData.Filters, Varibles.FrameId + "_filters", Database.partnersMFileterChange);

        addOneListener(Varibles.FrameId + '_add_new_btn', 'click', Loaders.loadNewPartner);
    },
    reloadCardContainer: function () {
        // Load card container
        let listData = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = Cards.getPartnersMCard();
        let cardContainer = Varibles.FrameId + '_card_container';
        CardContainerPlus.CreateWithData(listData, cardStructure, cardContainer, cardDesign, Callbacks.tagsToPartner);
        CardContainer.ClickableCard(Events.partnerMCardClick, 'partnerm');
        if (listData[0] !== undefined) {
            Events.partnerMCardClick('partners_card_' + listData[0].PartnerId);
        }
    },
    loadNewPartner: function () {
        newPartner.loadNewPartner();

        //set navigation parent page
        removeOneListener("processes_back_to_menu");
        addOneListener("processes_back_to_menu", "click", partnersManager.loadPartnersManager);
    }
}

/** Database **/
let Database = {
    /** Get card container data */
    getPageData() {
        $.ajax({
            type: "POST",
            url: "./php/GetPartnerManager.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;

                /*  Convert string data to date simple
                Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'StartDate');
                */
                Loaders.reloadFullPage();
            },
            dataType: 'json'
        });
    },
    partnersMFileterChange: function (fullId) {
        FilterAndSort.FilteringOnDB(Varibles.FrameId, Varibles.FilterPlace, Callbacks.successFilterEvent);
    }
}

/** Cards **/
let Cards = {
    /**
     * Partner contacts html by Áron
     */
    getPartnersMContact: function () {
        let container = '<div class="row"><div class="card contactcard"><div class="card-body">';
        container += `!<a onclick='showContact("*1*")'><div class="display-flex justify-content-between">`;
        container += '<i class="fas fa-user-circle profile-logo"></i>';
        container += '<div class="partner-contact-main flex-1">';
        container += '!<h3 class="card-title contact-name">*2*</h3>';
        container += '!<p>*5*</p>';
        container += '!</div></div></a><div id="*1*" class="contact-container" style="display: none;">';
        container += '!<p class="contactdata"><i class="fas fa-home partnercard-logo"></i></i>*2*</p>';
        container += '!<p class="contactdata"><i class="fas fa-phone partnercard-logo"></i>*4*</p>';
        container += '!<p class="contactdata"><i class="far fa-envelope partnercard-logo"></i>*3*</p></div></div></div></div>';
        return container;
    },
    /**
     * Partners manager card template
     */
    getPartnersMCard: function () {
        let container = "";
        container += '<div class="col-lg-12"><div class="card partnercard partnerm-show-details" id="partners_card_*5*"><div class="card-body">';
        container += '<div class="display-flex justify-content-between">';
        container += '!<div class="partner-logo-container display-flex align-items-center"><img class="partner-logo" src="*1*"></div>';
        container += '!<div class="partner-datas"><h3 class="card-title partner-name">*2*</h3>';
        container += '!<p><i class="fas fa-phone partnercard-logo"></i>*3*</p>';
        container += '!<p><i class="far fa-envelope partnercard-logo"></i>*4*</p></div></div>';
        container += '!<div class="display-flex flex-wrap tag-container">?';
        //container += '!<button type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>Nagyobb cimke</button>';
        container += '</div></div></div></div>';

        return container;
    },
    /**
     * Partners manager details template
     * @param {String} shellId 
     */
    getPartnersMDetail: function (shellId) {
        let container = '<h2 id="' + shellId + '_title" class="name-grey">*1*</h2>';
        container += '<div id="partner_details_tab" class="display-flex justify-content-center"><div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons">';
        container += '<label id="prtnr_dtl_data_btn" class="btn btn-detail-menu btn-detail-menu-active">';
        container += '<input type="radio" name="options" id="prtnr_dtls_tab_data" autocomplete="off"> Adatok </label>';
        container += '<label id="prtnr_dtl_cnt_btn" class="btn btn-detail-menu">';
        container += '<input type="radio" name="options" id="prtnr_dtls_tab_contacts" autocomplete="off"> Kapcsolatok </label></div></div><div id="partner_details_content">';
        container += '!<div id="partner_data_container">';
        container += '!<div id="' + shellId + '_cc_g"> </div>';
        container += '!</div><div id="partner_contacts_container" style="display: none" ></div></div>';
        return container;
    }
}

/** Callbacks **/
let Callbacks = {
    tagsToPartner: function (item, shellId) {
        let result = '';

        if (item.Tags !== undefined) {
            item.Tags.forEach(tag => {
                result += '<button id="' + shellId + '_tag_' + tag.PartnerTagId + '" type="button" class="btn btn-sm partner-tag"><i class="fas fa-tag partner-tag-icon "></i>' + tag.Name + '</button>';
            });
        }

        return result;
    },
    /**
     * Success filter event
     * @param {JSON} data 
     */
    successFilterEvent: function (data) {
        Varibles.PageData.Data = data.Data;
        /* String to date
        Local.processesDataArray = DateFunctions.dataColumnToDate(Local.processesDataArray, 'FinishDate');
        */
        Loaders.reloadCardContainer();
    },
    /**
     * Get contact data
     * @param {JSON} data 
     */
    getContactData: function (data) {
        return data["Contacts"];
    }
}

/** Events **/
let Events = {
    /**
     * Details data tab click
     * @param {String} fullId 
     */
    detailsDataTabClick: function (fullId) {
        document.getElementById('partner_data_container').style.display = "block";
        document.getElementById('partner_contacts_container').style.display = "none";
        let element = document.getElementById("prtnr_dtl_cnt_btn");
        element.classList.remove("btn-detail-menu-active");
        let element2 = document.getElementById("prtnr_dtl_data_btn");
        element2.classList.add("btn-detail-menu-active");
    },
    /**
     * Details contacts tab click
     * @param {String} fullId 
     */
    detailsContactsTabClick: function (fullId) {
        document.getElementById('partner_data_container').style.display = "none";
        document.getElementById('partner_contacts_container').style.display = "block";
        let element = document.getElementById("prtnr_dtl_data_btn");
        element.classList.remove("btn-detail-menu-active");
        let element2 = document.getElementById("prtnr_dtl_cnt_btn");
        element2.classList.add("btn-detail-menu-active");
    },
    /**
     * Card click event
     * @param {Integer} cardId Card id
     */
    partnerMCardClick: function (cardId) {
        /*let splittedId = cardId.split('_');
        let id = splittedId[splittedId.length - 1];

        let data = Varibles.PageData.Data;
        let structure = Varibles.PageData.DetailsStructure;
        let shellId = Varibles.FrameId + '_details';
        let card = Cards.getPartnersMDetail(shellId);

        CardDetails.Create(id, data, structure, card, shellId, 'PartnerId');

        let contactShell = 'partner_contacts_container';
        let card2 = Cards.getPartnersMContact();
        CardDetails.CreatePlus(id, data, card2, contactShell, 'PartnerId', Callbacks.getContactData);

        addOneListener('prtnr_dtl_data_btn', 'click', Events.detailsDataTabClick);
        addOneListener('prtnr_dtl_cnt_btn', 'click', Events.detailsContactsTabClick);*/

        let splittedId = cardId.split('_');
        let id = splittedId[splittedId.length - 1];
        //Data
        let data = Varibles.PageData.Data;
        let structure = Varibles.PageData.DetailsStructure;
        let shellId = Varibles.FrameId + '_details';
        let details = new DetailsDesigns().getSimpleDetails(shellId);
        CardDetails.Create(id, data, structure, details, shellId, 'PartnerId');
    }
}

/** Framework **/
let Framework = {
    Load: function (targetId, shellId) {
        //partner manager frame
        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen"> </div>`;
        document.getElementById(targetId).innerHTML = framework;

        let containerDesigns = new ContainerDesigns();
        //filter frame
        containerDesigns.loadSimpleFilterFw(shellId, shellId, 'beforeend');
        //card container frame
        containerDesigns.loadSimpleCCFw(shellId, shellId, 'beforeend');
    }
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