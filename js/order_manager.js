/** order_manager.js */
/** Imports */
import CardContainer from './plug-ins/CardContainer.js';
import CardDetails from './plug-ins/CardDetails.js';
import ContainerDesigns from './designs/ContainerDesigns.js';
import ElementFunctions from './plug-ins/ElementFunctions.js';
import AutoScroll from './plug-ins/AutoScroll.js';
import FilterAndSort from './plug-ins/FilterAndSort.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';
import CardDesigns from './designs/CardDesigns.js';
import DetailsDesigns from './designs/DetailsDesigns.js';
import DinamicFormPopup from './plug-ins/DinamicFormPopup.js';

import newTask from './new_task.js';

/** Modul parameters **/
let Varibles = {
    FrameId: 'ordrm',
    FrameName: 'Rendelések',
    FilterPlace: 'ordrfltr',
    MainTableIdName: 'OrderId',
    //element ids
    ShellId: null,
    //data
    PageData: [],
    //Frame id of add new item
    AddNFormId: 'newtsk' // Not specified in database yet!!
}

/** Public object */
let OrderManager = {
    loadModule: function (shellId) {
        Varibles.ShellId = shellId;
        // Data from server
        Database.getFullPageData();
    },
    resizeModule() {
        AutoScroll.Integration(Varibles.FrameId + '_details_content');
    }
};
export default OrderManager;

/** Data from database **/
let Database = {
    /**
     * Order manager filter change
     * @param {String} id 
     */
    filterChange: function (fullId) {
        FilterAndSort.FilteringOnDB(
            Varibles.FrameId,
            Varibles.FilterPlace,
            Callbacks.successFilterEvent
        );
    },
    /**
     * Get full page data
     */
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

/** Framework */
let Framework = {
    Load: function (targetId, shellId) {
        //main frame
        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen">
                         </div>`;
        document.getElementById(targetId).innerHTML = framework;

        let containerDesigns = new ContainerDesigns();
        //filter frame
        containerDesigns.loadSimpleFilterFw(shellId, shellId, 'beforeend');
        //card container frame
        containerDesigns.loadSimpleCCFw(shellId, shellId, 'beforeend');
    }
}

/** Loadings functions **/
let Loadings = {
    reloadFullPage: function () {
        //Load framework
        Framework.Load(Varibles.ShellId, Varibles.FrameId);
        //Card container generating cards
        Loadings.reloadCardContainer();
        //Filter creater
        FilterAndSort.Create(
            Varibles.PageData.Filters,
            Varibles.FrameId + "_filters",
            Database.filterChange
        );
        //Events
        addOneListener(Varibles.FrameId + '_add_new_btn', 'click', Loadings.loadAddNew);
    },
    /**
     * Reload card container
     */
    reloadCardContainer: function () {
        // Load card container
        let data = Varibles.PageData.Data;
        let cardStructure = Varibles.PageData.DataStructure;
        let cardDesign = new CardDesigns().getSimpleCard(Varibles.FrameId);
        let cardContainer = Varibles.FrameId + '_cc';

        new ElementFunctions().removeChilds(cardContainer);
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(Events.cardClick, Varibles.FrameId);
        if (data[0] !== undefined) {
            Events.cardClick(Varibles.FrameId + '_card_'
                + data[0][Varibles.MainTableIdName]);
        }
    },
    /**
     * Load 'add new entry' modul
     */
    loadAddNew: function () {
        let targetId = Varibles.FrameId;
        let dinamicFormPopup = new DinamicFormPopup(
            targetId,
            'beforebegin',
            'Rendelés hozzáadása',
            true
        );
        dinamicFormPopup.loadFormData(
            Varibles.AddNFormId,
            Varibles.processesDataArray,
            targetId,
            null,
            null,
            Callbacks.refreshPage
        );
    }
}

/** Callbacks **/
let Callbacks = {
    /**
     * Success filtering event
     * @param {JSON} data 
     */
    successFilterEvent: function (data) {
        Varibles.PageData.Data = data.Data;
        Loadings.reloadCardContainer();
    }
}

/** Events **/
let Events = {
    /**
     * Card click event
     * @param {Integer} cardId Card id
     */
    cardClick: function (cardId) {
        let splittedId = cardId.split('_');
        let id = splittedId[splittedId.length - 1];
        //Data
        let data = Varibles.PageData.Data;
        let structure = Varibles.PageData.DetailsStructure;
        let shellId = Varibles.FrameId + '_details';
        let details = new DetailsDesigns().getSimpleDetails(shellId);
        CardDetails.Create(
            id,
            data,
            structure,
            details,
            shellId,
            Varibles.MainTableIdName
        );
    }
}
