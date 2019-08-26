/** tools.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Tools
 */
/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import Filters from './moduls/Filters.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';



/** Loacal functions */

/**
 * Tool card template
 */
function getToolsCard() {
    let container = "";
    container += '<div class="col-lg-12"><div class="card toolcard"><div class="card-body">';
    container += '!<div class="display-flex justify-content-between"><div class="tool-image-container display-flex align-items-center"><img class="tool-image"src="*"></div>';
    container += '!<div class="tool-datas"><h3 class="card-title tool-name">*</h3>';
    container += '!<p class="tool-detail"><i class="fas fa-map-pin"></i> *</p>';
    container += '!<button type="button" class="btn btn-primary tool-tag *"><i class="fas fa-check tool-tag-icon"></i>Elérhető</button>';
    container += '!<a href="#" class="btn btn-primary next-button show-details" id="*"><i class="fas fa-arrow-right"></i></a></div></div></div></div>';

    return container;                            
                                        
                                        
}

/**
 * Partners manager details template
 */
function getToolDetail() {
    let container = "";

    container += '<h2>*</h2>';
    container += '!<p><label class="title-text">Partner típusa:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Kapcsolattartó:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Létrehozás:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Telefon:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Email:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Cím:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Leírás:</label><br><label>*</label></p>';

    return container;

}

/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function toolCardClick(cardId) {
    let data = tools_list;
    let structure = tool_structure_2;
    let card = getToolDetail();
    let shellId = "tool_details";

    CardDetails.Create(cardId, data, structure, card, shellId);
}

function toolFileterChange(id) {
    alert(id);
}

function addTool() {
    newPartner.loadNewPartner();
    /*Ezt még rendesen át kell alakítani*/
    removeOneListener("processes_back_to_menu");
    addOneListener("processes_back_to_menu", "click", partnersManager.loadPartnersManager);
}



/** Public functions */
var tools = {
    loadTools: function () {
        // Load framework
        let framework = '<div id="tools" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="tool_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="add_tool_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="tools_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="tool_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("resources_content").innerHTML = framework;

        // Load card container
        let data = tools_list;
        let cardStructure = tool_structure;
        let cardDesign = getToolsCard();
        let cardContainer = "tools_card_container";
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(toolCardClick);
        if (data[0].Id !== null) {
            toolCardClick(data[0].Id);
        }

        Filters.Create(activeTableFilters, "tool_filters", toolFileterChange);

        addOneListener("add_tool_btn", "click", addTool);
        addOneListener("processes_back_to_menu", "click", mainFrame.backToProcessesMenu);
    }
};
export default tools;


var tool_structure = [
    "LogoSrc",
    "Name",
    "Telefon",
    "Email",
    "Id"
];

var tool_structure_2 = [
    "Name",
    "Type",
    "Kapcsolattartó",
    null, //"Létrehozás",
    "Telefon",
    "Email",
    "Cím",
    "Leírás"
];

var tools_list = [
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