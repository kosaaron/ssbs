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
let FinancialCharts = {
    loadModule: function (shellId) {
        Varibles.ShellId = shellId;
        
        // Get data from database
        Database.getFullPageData();
    },
    resizeModule: function () {

    }
};
export default FinancialCharts;

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
            <div id="finanace_diagrams" class="full-screen">
                <div class="display-flex full-screen">
                    <div id="finance_menu" class="submenu">
                        <div class="submenu-title display-flex flex-column">
                            <a class="nonlink-design" data-toggle="collapse" href="#collapseOverview"
                                role="button" aria-expanded="false" aria-controls="collapseOverview">
                                <h7 class="unselectable">PROFIT</h7>
                            </a>
                        </div>
                        <div class="collapse submenu-collapse show" id="collapseOverview">
                            <div class="submenu-shell">
                                <div id="chart_profit_proj"
                                    class="chart-menu submenu-item display-flex flex-column submenu-item-active">
                                    <span>Projektek</span>
                                </div>
                            </div>
                            <div class="submenu-shell">
                                <div id="chart_profit_trade"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Kereskedés</span>
                                </div>
                            </div>
                            <div class="submenu-shell">
                                <div id="chart_profit_empl"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Dolgozók</span>
                                </div>
                            </div>
                        </div>
                        <div class="submenu-title display-flex flex-column">
                            <a class="nonlink-design" data-toggle="collapse" href="#collapseIncome"
                                role="button" aria-expanded="false" aria-controls="collapseIncome">
                                <h7 class="unselectable">BEVÉTELEK</h7>
                            </a>
                        </div>
                        <div class="collapse submenu-collapse show" id="collapseIncome">
                            <div class="submenu-shell">
                                <div id="chart_income_sales"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Eladások</span>
                                </div>
                            </div>
                            <div class="submenu-shell">
                                <div id="chart_income_empl"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Dolgozók</span>
                                </div>
                            </div>
                            <div class="submenu-shell">
                                <div id="chart_income_proj"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Projektek</span>
                                </div>
                            </div>
                        </div>
                        <div class="submenu-title display-flex flex-column">
                            <a class="nonlink-design" data-toggle="collapse" href="#collapseOutcome"
                                role="button" aria-expanded="false" aria-controls="collapseOutcome">
                                <h7 class="unselectable">KÖLTSÉGEK</h7>
                            </a>
                        </div>
                        <div class="collapse submenu-collapse show" id="collapseOutcome">
                            <div class="submenu-shell">
                                <div id="chart_outcome_purch"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Vásárlások</span>
                                </div>
                            </div>
                            <div class="submenu-shell">
                                <div id="chart_outcome_empl"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Dolgozók</span>
                                </div>
                            </div>
                            <div class="submenu-shell">
                                <div id="chart_outcome_tools"
                                    class="chart-menu submenu-item display-flex flex-column">
                                    <span>Eszközök</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="show_charts_content" class="flex-1">
                    </div>
                </div>
            </div>
        `;
        document.getElementById(Varibles.ShellId).innerHTML = frame;
    }
}