/** testproducttable.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Employee
 * 3. Loacal functions
 */


/**Imports */
import TableCreator from './moduls/TableCreator.js';

var newTable = {
    loadnewTable: function() {
        // Load framework
        let framework = '<div id="partners_manager" class="display-flex flex-row full-screen"><div class="table-container-xscroll"><div id="producttable_container" class="table-container table-responsive tableFixHead"></div></div></div>';
        document.getElementById('tablegenerator_container').innerHTML=framework;

        let data = newTableData;
        let structure = newTableStructure;
        let newTableHtml="";
        newTableHtml += '<table class="table table-hover mb-0"><thead class="thead-design"><tr class="row m-0 ">';
        newTableHtml += '!<th class="d-inline-block col-2">*</th>';
        newTableHtml += '!</tr></thead></table>';
        newTableHtml += '!'; //start body rész mire kell?
        newTableHtml += '!<table class="table table-hover table-no-margin"><tbody><tr class="row m-0">';
        newTableHtml += '!<td class="d-inline-block col-2">*</td>';
        let plainHtml = newTableHtml;
        let shellId = "producttable_container";
        let checkbody = "";
        let widths = newTableWidth;
        TableCreator.Create(data, structure, plainHtml, shellId, checkbody, widths);
    }
}
export default newTable;

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
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
    },
    {
        TermékID: "g12e444",
        Termék_neve: "golyóstoll",
        Termék_kategória: "írószer",
        Napi_forgalom: "10",
        Ár: "319",
        Teszt_forg: "14",
        Teszt_ár: "314",
        Teszt: "true"
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
    }

];