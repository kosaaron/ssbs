/** new_partner.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Partners manager
 * 3. Loacal functions
 */
/** Imports */
import CardContainerPlus from './moduls/CardContainerPlus.js';
import FormElements from './moduls/FormElements.js';
import { addListenerByAttr } from './common.js';
/** Public functions */
var newPartner = {
    loadNewPartner: function () {
        // Load framework
        let framework = '<div id="new_partner" class="d-flex display-flex flex-row full-screen"> <div class="flex-fill col-1"></div><div class="flex-fill col-10"> <div class="row page-content"> <div class="col-md-6 col-12"> <h2 class="new-obj-subtitle">Adatok</h2> <div id="processes_new_p_data"></div><div class="newtask-buttoncontainer d-flex justify-content-start"> <button type="submit" class="btn btn-primary addnewtask-button">Létrehoz</button> <button type="reset" class="btn btn-primary addnewtask-button grey-button">Mégse</button> </div></div></div></div><div class="flex-fill col-1"> </div></div>';
        document.getElementById("process_modul_content").innerHTML = framework;
        document.getElementById("back_to_menu_text").textContent = "Új partner felvétele";

        // Load data entry form
        let shellId = "processes_new_p_data";
        let formData = Local.getFromData();
        CardContainerPlus.Create(formData, shellId, Local.getFromHTML);
        addListenerByAttr("new_" + shellId, "click", Local.openCollapse);
    }
};
export default newPartner;

let Local = {
    getFromData: function () {
        return newPartnerData;
    },
    getFromHTML: function (objectItem, shellId) {
        switch (objectItem.Type) {
            case "Write":
                FormElements.B.Write(objectItem.Id, objectItem.Name, shellId);
                break;
            case "Select":
                FormElements.B.Select(objectItem.Id, objectItem.Name, shellId, objectItem.Opportunities);
                break;
            case "SelectOrNew":
                FormElements.B.SelectOrNew(objectItem.Id, objectItem.Name, shellId, objectItem.Opportunities);
                break;
            case "DateTime":
                FormElements.B.DateTime(objectItem.Id, objectItem.Name, shellId);
                break;
            default:
                break;
        }
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

let newPartnerData = [
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