/** partners_manager.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Partners manager
 */
/** Imports */
import CardContainer from './plug-ins/CardContainer.js';
import Limiting from './plug-ins/Limiting.js';
import CardDetails from './plug-ins/CardDetails.js';
import ContainerDesigns from './designs/ContainerDesigns.js';
import DetailsDesigns from './designs/DetailsDesigns.js';
import CardDesigns from './designs/CardDesigns.js';
import CardContainerPlus from './plug-ins/CardContainerPlus.js';
import GlobalVaribles from './plug-ins/GlobalVaribles.js';
import ElementFunctions from './plug-ins/ElementFunctions.js';
import FilterAndSort from './plug-ins/FilterAndSort.js';
import AutoScroll from './plug-ins/AutoScroll.js';
import newTask from './new_task.js';
import { addOneListener, removeOneListener, mainFrame, addListener } from './common.js';

/** Modul parameters **/
let Varibles = {
    FrameId: 'tskm',
    FrameName: 'Feladatok',
    FilterPlace: 'tskfltr',
    MainTableIdName: 'TaskId',
    //element ids
    ShellId: null,

    //data
    PageData: [],
    TaskWayData: null
}

/** Public functions */
let TaskManager = {
    loadModule: function (shellId) {
        // Title
        //document.getElementById(Varibles.TitleTextId).textContent = Varibles.FrameName;
        Varibles.ShellId = shellId;

        //addOneListener(Varibles.TitleIconId, "click", Events.onDestroy);

        // Data from server
        Database.getFullPageData();
    },
    resizeModule() {
        AutoScroll.Integration(Varibles.FrameId + '_details_content');
    }
};
export default TaskManager;

/** Data from database **/
let Database = {
    /**
     * Filter change event
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
     * Get task way data
     * @param {String} taskId 
     */
    getTaskWayData: function (taskId) {
        $.ajax({
            type: "POST",
            url: "./php/TaskWay.php",
            data: { task_id: taskId },
            success: function (data) {
                if (jQuery.isEmptyObject(data.Data)) {
                    document.getElementById(Varibles.FrameId + '_details_vo_oTl').innerHTML
                        = "Nincsenek lépések."
                } else {
                    Varibles.TaskWayData = data;
                    Loadings.reloadTaskWay(Varibles.TaskWayData);
                }
            },
            dataType: 'json'
        });
    },
    /**
     * Get full page data
     */
    getFullPageData: function () {
        $.ajax({
            type: "POST",
            url: "./php/GetTaskManager.php",
            data: "",
            success: function (data) {
                console.log(data);
                Varibles.PageData = data;
                Loadings.reloadFullPage(Varibles.PageData);
            },
            dataType: 'json'
        });
    }
}

let Framework = {
    Load: function (targetId, shellId) {
        //main frame

        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen">
                         </div>`;
        document.getElementById(targetId).insertAdjacentHTML('beforeend', `<div id="${shellId}"></div>`);
        document.getElementById(targetId).innerHTML = framework;

        let containerDesigns = new ContainerDesigns();

        //filter frame
        containerDesigns.loadSimpleFilterFw(shellId, shellId, 'beforeend');
        //card container frame
        containerDesigns.loadSimpleCCFw(shellId, shellId, 'beforeend');
    }/*,
    Load: function (targetId, shellId) {
        //main frame
        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen"> </div>`;
        document.getElementById(targetId).innerHTML = framework;

        let containerDesigns = new ContainerDesigns();
        //filter frame
        containerDesigns.loadSimpleFilterFw(shellId, shellId, 'beforeend');
        //card container frame
        containerDesigns.loadSimpleCCFw(shellId, shellId, 'beforeend');

        return `
        <div id="tasks_manager" class="display-flex flex-row full-screen">
            <div class="flex-fill col-2 filter-box">
                <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>
                <div id="${Varibles.FrameId}_filters" class="task-filters"></div>
                <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5>
                <div id="tskm_sorts" class="task-orders">
                </div>
            </div>
            <div class="col-10 filtered-table display-flex flex-1">
                <button id="proceses_add_task_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button>
                <div class="card-container col-8">
                    <div id="${Varibles.FrameId}_cc" class="row"> </div>
                </div>
                <div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div>
                <div class="col-4" id="tasks_m_details"> </div>
                <div class="filtered-table-fade flex-1"></div>
            </div>
        </div>
        `;
    }*/
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
        FilterAndSort.CreateSort(
            Varibles.PageData.Sorts,
            Varibles.FrameId + '_sorts',
            Database.filterChange
        );

        //Events
        addOneListener(Varibles.FrameId + '_add_new_btn', "click", Loadings.loadAddNew);
    },
    /**
     * Load 'add new entry' modul
     */
    loadAddNew: function () {
        newTask.loadModule();
        //removeOneListener(Varibles.TitleIconId);
        //addOneListener(Varibles.TitleIconId, "click", TaskManager.loadModule(Varibles.ShellId));
    },
    /**
     * Reload card container
     * @param {Number} offset 
     */
    reloadCardContainer: function (offset = 0) {
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
        //Limiting
        if (Object.keys(data).length % GlobalVaribles.CCLimitSize === 0) {
            new Limiting(
                Varibles.FrameId,
                Varibles.FilterPlace,
                Callbacks.successFilterEvent,
                offset
            );
        }

        //Resize
        TaskManager.resizeModule();
    },
    /**
     * Reload task way
     * @param {JSON} data
     */
    reloadTaskWay: function (data) {
        let stepShellId = Varibles.FrameId + '_details_vo_oTl';
        document.getElementById(stepShellId).classList.add('task-timeline');

        let taskWayData = data.Data;
        let taskWayStructure = data.DataStructure;
        let stepCard = Cards.getTaskWayCard();
        let taskWayActiveCard = Cards.getTaskWayActiveCard();
        let stepActiveColumn = 'Active';
        CardContainerPlus.CreateWithActive(
            taskWayData,
            taskWayStructure,
            stepShellId,
            stepCard,
            taskWayActiveCard,
            stepActiveColumn,
            Callbacks.employeesToStep
        );

        addListener('tsk-way-empl-icon-check', 'click', Events.taskWayEmplStatusClick)
    },
    // Get employee status color
    getEmplStatusColor: function (ready) {
        if (ready === '1') {
            return 'fas fa-check empl-status-ready';
        } else {
            return 'fas fa-user empl-status-work'
        }
    }
}

/** Callbacks **/
let Callbacks = {
    /** Employees to step */
    employeesToStep: function (data) {
        let employees = data['Employees'];
        if (data['Employees'] === undefined) {
            return '';
        }

        let finalHTML = '';
        for (let i = 0; i < employees.length; i++) {
            const employee = employees[i];
            let statusClass = Loadings.getEmplStatusColor(employee.Ready);

            finalHTML += '<div class="row add-employee-card">';
            finalHTML += '<div employee="' + employee.EmployeeId + '" class="btn btn-sm employee-box employee-button">';
            finalHTML += '<i class="addemployee-icon ' + statusClass + '"></i>' + employee.EmployeeName;
            if (employee.Ready === '0' && data['Active'] === '1') {
                finalHTML += '<i id="tsk_way_empl_stat_' + data.TaskFK + '_' + employee.EmployeeId + '" class="tsk-way-empl-icon-check fas fa-check"></i>';
            }

            finalHTML += '</div></div>';
        }
        return finalHTML;
    },
    /**
     * Success filter event
     * @param {JSON} data
     * @param {Boolean} isClear
     * @param {Number} offset
            */
    successFilterEvent: function (data, isClear = true, offset = 0) {
        if (isClear) {
            Varibles.PageData.Data = [];
        }

        data.Data.forEach(entry => {
            Varibles.PageData.Data.push(entry);
        });

        Loadings.reloadCardContainer(offset);
    }
}
/** Designed cards **/
let Cards = {
    getTaskWayCard: function () {
        let container = '<li><div class="task-timeline-item">';
        container += '!<span>*1*</span>';
        container += '!<div class="task-timeline-item-content"> <a data-toggle="collapse" href="#task_timel_*3*_!*4*" role="button" aria-expanded="false" aria-controls="task_timel" class="collapsed">';
        container += '!<h3>*2*</h3>';
        container += '!</a><div class="collapse" id="task_timel_*5*_!*6*">?';
        container += '!</div></div></div ></li >';
        return container;
    },
    getTaskWayActiveCard: function () {
        let container = '<li><div class="task-timeline-item">';
        container += '!<span class="actual-step">*1*</span>';
        container += '!<div class="task-timeline-item-content"> <a data-toggle="collapse" href="#task_timel_*3*_!*4*" role="button" aria-expanded="true" aria-controls="task_timel">';
        container += '!<h3>*2*</h3>';
        container += '!</a><div class="show" id="task_timel_*5*_!*6*">?';
        container += '!</div></div></div ></li >';
        return container;
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

        //Steps
        Database.getTaskWayData(id);
    },
    /**
     * Is called when this modul closes
     */
    onDestroy: function () {
        GlobalVaribles.setActiveModule("");
    },
    /**
     * Task way employee status click event
     * @param {String} fullId 
     */
    taskWayEmplStatusClick: function (fullId) {
        let splittedId = fullId.split('_');
        let taskFK = splittedId[splittedId.length - 2];
        let emplId = splittedId[splittedId.length - 1];
        $.ajax({
            type: "POST",
            url: "./php/TaskMWayStatus.php",
            data: { 'task_fk': taskFK, 'empl_id': emplId },
            success: function (data) {
                Database.getTaskWayData(taskFK);
            },
            dataType: 'html'
        });
    }
}