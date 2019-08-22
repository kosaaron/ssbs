/** new_task.js */
/**
 * 1. Imports
 * 2. Public functions
 * 3. Local functions
 */
/** Imports */
import ChartDesign from './moduls/ChartDesign.js';
import { addListener } from './common.js';

/** Public functions */
var financeLayout = {
    loadFinance: function () {
        addListener('chart-menu', 'click', Local.load);
        Local.load("chart_profit_proj");
    }
};
export default financeLayout;

/** Loacal functions */
let Local = {
    load: function (id) {
        let chartMenu = document.getElementsByClassName("chart-menu");
        for (let i = 0; i < chartMenu.length; i++) {
            const element = chartMenu[i];
            element.classList.remove("submenu-item-active");
        }
        document.getElementById(id).classList.add("submenu-item-active");;

        let framework = '';
        let chartData = Local.getChartData(id);
        let arrayLength = chartData.arrayLength;

        //framework
        for (let i = 0; i < arrayLength; i++) {
            framework += '<div class="finance-digram-shell col-lg-6 display-flex flex-column justify-content-center"><canvas id="layanan_test_' + i + '"></canvas></div>';
        }
        document.getElementById("finance_content").innerHTML = framework;

        //charts
        for (let i = 0; i < arrayLength; i++) {
            Local.getChartDesign(chartData, i);
        }
    },
    /**
     * Get chart data from database
     */
    getChartData: function (id) {
        return chartDataDB;
    },
    /**
     * Get chart design
     * @param {Object} chartData 
     * @param {Integer} i 
     */
    getChartDesign: function (chartData, i) {
        let ctx = document.getElementById("layanan_test_" + i).getContext('2d');
        let structure;

        switch (chartData.design[i]) {
            case 'Line1':
                structure = ChartDesign.Line1(chartData.data[i], chartData.titles[i]);
                break;
            default:
                break;
        }
        return new Chart(ctx, structure);
    }
};

let chartDataDB = {
    arrayLength: 4,
    titles: ['Test1', 'Test2', 'Test3', 'Test4'],
    data: [
        {
            datasets: [{
                label: 'Első projekt',
                data: [20, 20, 30, 15, 20, 30, 22]
            }, {
                label: 'Második projekt',
                data: [15, 10, 12, 18, 15, 10, 15],
                type: 'line'
            }],
            labels: [
                'Január',
                'Február',
                'Március',
                'Április',
                'Május',
                'Június',
                'Július'
            ]
        },
        {
            datasets: [{
                data: [15, 20, 30]
            }],
            labels: [
                'Request',
                'Layanan',
                'Problem'
            ]
        },
        {
            datasets: [{
                data: [15, 20, 30]
            }],
            labels: [
                'Request',
                'Layanan',
                'Problem'
            ]
        },
        {
            datasets: [{
                data: [15, 20, 30]
            }],
            labels: [
                'Request',
                'Layanan',
                'Problem'
            ]
        }],
    design: ['Line1', 'Line1', 'Line1', 'Line1']
};