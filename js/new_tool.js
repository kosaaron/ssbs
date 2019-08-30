/** new_tool.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Tool
 * 3. Loacal functions
 */
/** Imports */
import CardContainerPlus from './moduls/CardContainerPlus.js';
import FormElements from './moduls/FormElements.js';
import { addListenerByAttr } from './common.js';

/** Public functions */
var newTool = {
    loadNewTool: function () {
        // Load framework
        let framework = '<div id="new_tool" class="display-flex flex-row full-screen"><div id="back_to_tool_header" class="modul-title display-flex"><div id="back_to_tool"><i class="fas fa-arrow-left align-middle"></i></div><div class="modul-title-text"><span id="back_to_tool_text" class="unselectable align-middle">Eszközök</span></div></div><div class="flex-fill col-1"></div><div class="flex-fill col-10"><div class="row page-content"> <div class="col-md-6 col-12 right-border-form"> <h2 class="task-subtitle">Adatok</h2> <div id="new_tool_data"></div> <div class="newtask-buttoncontainer d-flex justify-content-start"> <button type="submit" class="btn btn-primary addnewtask-button">Létrehoz</button> <button type="reset" class="btn btn-primary addnewtask-button grey-button">Mégse</button> </div></div><div class="col-md-6 col-12"><h2 class="task-subtitle">Kép hozzáadása</h2><div class="d-flex justify-content-between align-items-center"><div class="taskstep-saved"> <label for="saved_tasksteps" class="taskstep-saved-label">Feltöltött képek:</label> <select id="saved_toolimg" class="newtask-formcontrol"><option selected>Choose...</option><option>...</option></select> </div><button type="reset" id="delete_button" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button></div>  <div class="form-group"><label for="exampleFormControlFile1">Kép feltöltése</label><input type="file" class="form-control-file image-upload-button" id="exampleFormControlFile1"></div></div></div><div class="flex-fill col-1"> </div></div>';
        document.getElementById("resources_content").innerHTML = framework;

        //removeOneListener("processes_new_p_slides");

        // Load data entry form
        let shellId = "new_tool_data";
        let formData = Local.getFromData();
        let shellCard = Local.getShellCard();
        CardContainerPlus.Create(formData, shellId, shellCard, Local.getFromHTML);
        addListenerByAttr("new_" + shellId, "click", Local.openCollapse);
    }
};
export default newTool;

let Local = {
    getFromData: function () {
        return newPartnerData;
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

let newPartnerData = [
    {
        Id: "2234",
        Name: "Eszköz neve:",
        Type: "Write",
        Default: ""
    },
    {
        Id: "2235",
        Name: "Eszköz típusa:",
        Type: "SelectOrNew",
        Default: "Szervíz",
        Opportunities: ["Szervíz", "Szállítás", "Kereskedés"]
    },
    {
        Id: "2236",
        Name: "Használatbavétel kezdete:",
        Type: "DateTime",
        Default: ""
    },
    {
        Id: "2237",
        Name: "Karbantartást igényel (nap):",
        Type: "Write",
        Default: ""
    },
    {
        Id: "2238",
        Name: "Rövid leírás:",
        Type: "Write",
        Default: ""
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