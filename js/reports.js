/** diagramms.js */
/** Imports */

/** Varibles */
let Varibles = {
    FrameId: 'fncdgrm',
    //
    ShellId: null,
    //data
    PageData: []
}

/** Public functions **/
let Reports = {
    loadModule: function (shellId) {
        Varibles.ShellId = shellId;
        // Loader
        document.getElementById(shellId).innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        // Get data from database
        Database.getFullPageData();
    },
    resizeModule: function () {

    }
};
export default Reports;

let Loadings = {
    reloadFullPage: function () {
        Framework.load()
    }
}

let Database = {
    getFullPageData: function () {
        $.ajax({
            type: "POST",
            url: "./php/GetOrderManager.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;
                Loadings.reloadFullPage();
            },
            dataType: 'json'
        });
    }
}

let Framework = {
    load: function () {
        let frame = `
            <div class="display-flex full-screen">
                <div class="f-accounting-header">
                    <div class="display-flex">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="text" name="fname">
                    </div>
                    <div>
                        Items List
                    </div>
                </div>
                <div class="flex-1">
                    Table
                </div>
            </div>
        `;
        document.getElementById(Varibles.ShellId).innerHTML = frame;
    }
}