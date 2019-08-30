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
import newTool from './new_tool.js';
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
    container += '!<p class="tool-detail"><i class="fas fa-map-pin"></i> Helye: *</p>';
    container += '!<button type="button" class="btn btn-primary tool-tag *"><i class="fas fa-check tool-tag-icon"></i>Elérhető</button>';
    container += '!<a href="#" class="btn btn-primary next-button show-details" id="*"><i class="fas fa-arrow-right"></i></a></div></div></div></div></div>';

    return container;


}

/**
 * Partners manager details template
 */
function getToolDetail() {
    let container = "";

    container += '<h2>*</h2>';
    container += '!<p><label>*</label></p>';
    for (let i = 0; i < getToolsMDStructure().Data.length - 4; i++) {
        container += '!<p><label class="title-text">**</label><br><label>*</label></p>';
    }

    container += '!<div class="tool-button-container justify-content-between"><button id="clnd_*" type="button" class="btn btn-primary tool-tag tool-button"><i class="fas fa-calendar tool-tag-icon"></i>Naptár</button>';
    container += '!<button id="edit_*" type="button" class="btn btn-primary tool-tag tool-button"><i class="fas fa-edit tool-tag-icon"></i>Szerkeszt</button></div>';
    return container;
}

function getToolsMDStructure() {
    return tool_structure_2;
}

/**
 * Card click event
 * @param {Integer} cardId Card id
 */
function toolCardClick(cardId) {
    let data = tools_list;
    let structure = getToolsMDStructure();
    let card = getToolDetail();
    let shellId = "tool_details";

    CardDetails.Create(cardId, data, structure, card, shellId);
}

function toolFileterChange(id) {
    alert(id);
}

function addTool() {
    newTool.loadNewTool();
    /*Ezt még rendesen át kell alakítani*/
    addOneListener("back_to_tool", "click", tools.loadTools);
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
    }
};
export default tools;


var tool_structure = [
    "ImgSrc",
    "Name",
    "Helye",
    "Állapot",
    "Id"
];

var tool_structure_2 = {
    Names: [
        null,
        null,
        "Helye",
        "Használatbavétel kezdete",
        "Karbantartást igényel",
        "Leírás",
        "Megjegyzés",
        null,
        null
    ],
    Data: [
        "Name",
        "Type",
        "Helye",
        "Kezdés_dátum",
        "Karbantartást_igényel",
        "Leírás",
        "Megjegyzés",
        "Id",
        "Id"]
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

var tools_list = [
    {
        Id: 'fjh7zd3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fjh7zd3',
        Name: 'Varázspálca',
        Type: 'fegyver',
        Helye: 'Harry Potter',
        Leírás: 'sárkányszívizomhúr, 12.5 hüvely, fűzfa',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '180 naponta',
        Állapot: 'tool-tag-reserved',
        Megjegyzés: 'H.P.: ne használja már más pls (5 napja)',
        ImgSrc: 'https://cdn.shopify.com/s/files/1/2597/5112/products/hpnbwandlurc_2_3e19f8c7-9d53-4a9b-94e6-53d5d675125e_1200x1200.jpg?v=1529653289'
    },
    {
        Id: 'fjh7zd',
        Name: 'Bagoly',
        Type: 'állatka',
        Helye: '2-es raktár',
        Leírás: 'Hedvignek hívják és hóbagoly',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '1 naponta',
        Állapot: 'tool-tag-service',
        Megjegyzés: 'K.Á.: nagyon hullik a tolla (3 órája)',
        ImgSrc: 'https://vignette.wikia.nocookie.net/harrypotter/images/1/1e/Hedwig_Snowy_Owl_PM.png/revision/latest?cb=20161123234010'
    },
    {
        Id: 'fjh7z',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Name: 'Microsoft Corporation',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'h7zd3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fjh7z3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fjh7d3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fjhzd3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fj7zd3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fh7zd3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fjh7zw',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fjh73w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    },
    {
        Id: 'fjh3w',
        Name: 'Bölcsek Köve',
        Type: 'legendás tárgyi emlék',
        Helye: '2-es raktár',
        Leírás: 'Lehet vele örök életed, meg ilyenek',
        Kezdés_dátum: '2019.01.31.',
        Karbantartást_igényel: '365 naponta',
        Állapot: 'tool-tag-available',
        Megjegyzés: 'K.Á.: kezd nagyon poros lenni (3 napja)',
        ImgSrc: 'https://i0.wp.com/www.yral.net/wp-content/uploads/2018/11/What-is-the-philosophers-stone.png?fit=670%2C508&ssl=1'
    }
]