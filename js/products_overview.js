/** products_overview.js */

/**Imports */
import TableCreator from './plug-ins/TableCreator.js';

/**
 * Products overview
 */
var ProductsOverview = {
    loadProductsOverview: function () {
        // Modul title
        document.getElementById('prod_modul_title').innerHTML = "Termékek áttekintése";
        // Loader
        document.getElementById('products_modul_content').innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';
        // Load page
        Database.getPageData();
    }
}
export default ProductsOverview;
let Varibles = {
    PageData: null
}

let Database = {
    getPageData: function () {
        $.ajax({
            type: "POST",
            url: "./php/GetProductsOverview.php",
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
    }
}

let Loaders = {
    reloadFullPage: function () {
        document.getElementById('products_modul_content').innerHTML = Framework.load;

        Loaders.reloadTableData();
    },
    reloadTableData: function () {
        let data = Varibles.PageData.Data;
        let dataStructure = Varibles.PageData.DataStructure;
        let tableStructure = Varibles.PageData.TableStructre;
        let shellId = "products_overview_table";
        let plainHtml = Cards.getTableCard(shellId);
        let checkbody = '<td class="d-inline-block col-1"> <div class="form-check text-center"> <input class="form-check-input" type="checkbox" value="" * id="defaultCheck1"> </div></td>';
        let widths = newTableWidth;
        TableCreator.Create(data, dataStructure, tableStructure, plainHtml, shellId, checkbody, widths);
    }
}

let Cards = {
    getTableCard: function (shellId) {
        let newTableHtml = "";
        newTableHtml += '<table class="table table-hover mb-0"><thead class="thead-design"><tr class="row m-0 ">';
        newTableHtml += '!<th class="d-inline-block col-*">*</th>!</tr></thead></table>';
        //newTableHtml += '!<th class="d-inline-block col-1"></th></tr></thead></table>'; --> th rész ide már nem kell, hiszen az előbb csináltad meg. a többi része felkerült egy sorral fejlebb.
        //newTableHtml += '!'; //start body rész mire kell? --> elkülönüljön a header a body résztől
        newTableHtml += '!<div class="full-screen overflow-a table-content"><table class="table table-hover margin-0"><tbody>';
        newTableHtml += '!<tr id="' + shellId + '_*1*" class="row m-0">'
        newTableHtml += '!<td class="d-inline-block col-*">?</td>';
        newTableHtml += '!</tr>!</tbody></table></div>';
        //newTableHtml += '<div class="collapse" id="collapseExample"> <div class="card card-body collapse-table-card"> <div class="card card-body collapse-table-card"> <div class="d-flex justify-content-between"> <div class="collapse-tabledata-container"> <h2>Parker golyóstoll</h2> <h3></h3> <h3>Még egy fontos szám</h3> <h3>Még egy fontos szám</h3> </div><div class="collapse-tablechart-container"> <img src="https://canvasjs.com/wp-content/uploads/images/gallery/javascript-charts/line/javascript-line-charts-graphs.png" alt="table chart"> </div></div></div></div></div>';
        // --> felső sor: ez még nincs lefejlesztve, lassan érkezik majd, ezért kommenteltem ki.
        return newTableHtml;
    }
}

let Framework = {
    load: `
    <div id="products_overview" class="display-flex flex-row full-screen">
        <div class="flex-fill col-2 filter-box">
            <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>
            <div id="prod_o_filters" class="task-filters"> </div>
            <div class="task-orders">
                <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5>
            </div>
        </div>
        <div class="table-container-xscroll">
            <div id="products_overview_table" class="table-container table-responsive table-fix-head overflow-h"></div>
        </div>
    </div>
    `
}

let newTableStructure = [
    "TermékID",
    "Termék_neve",
    "Termék_kategória",
    "Napi_forgalom",
    "Ár",
    "Teszt_forg",
    "Teszt_ár",
    "Teszt"
]
let newTableWidth = [
    "col-2",
    "col-2",
    "col-2",
    "col-2",
    "col-1",
    "col-1",
    "col-1",
    "col-1"
]

let newTableData = [
    {
        TermékID: "g12e442",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e443",
        Termék_neve: "radír",
        Termék_kategória: "írószer",
        Napi_forgalom: "17",
        Ár: "299",
        Teszt_forg: "16",
        Teszt_ár: "319",
        Teszt: "true"
    },
    {
        TermékID: "g12e444",
        Termék_neve: "filctoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "249",
        Teszt_forg: "",
        Teszt_ár: "",
        Teszt: "false"
    },
    {
        TermékID: "g12e445",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e446",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e447",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e448",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e449",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e450",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e451",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e452",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    }

];