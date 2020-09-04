/** 
 * **Filters** 
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import FormInputs from '../designs/FormInputs.js';
import { addListenerByAttr } from '../common.js';
import GlobalVaribles from './GlobalVaribles.js';
import AddInput from './objects/AddInput.js';

export default class Filter {
    /**
     * Create filter
     * @param {String} placeId 
     * @param {String} parentFrameId 
     * @param {JSON} filters 
     */
    Create(plugin, frameId, parentFrameId) {
        let filterShellId = `${parentFrameId}_filters`;
        let sortShellId = `${parentFrameId}_sorts`;
        let filterHTML = "";
        let fPluginFormInputId1 = plugin.Data[1].FPluginFormInputId;
        let fPluginFormInputId2 = plugin.Data[2].FPluginFormInputId;

        //Clear shell
        document.getElementById(frameId).innerHTML = filterHTML;

        filterHTML = '<h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>';
        filterHTML += `<div id="${filterShellId}" class="task-filters" fPluginFormInputId="${fPluginFormInputId1}"> </div>`;
        document.getElementById(frameId).insertAdjacentHTML('beforeend', filterHTML);
        if (localStorage.getItem('DevelopMode') === 'true') {
            AddInput.Integration(frameId, fPluginFormInputId1);
        }

        filterHTML = `<h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5>`;
        filterHTML += `<div id="${sortShellId}" class="task-filters" fPluginFormInputId="${fPluginFormInputId2}"> </div>`;
        document.getElementById(frameId).insertAdjacentHTML('beforeend', filterHTML);
        if (localStorage.getItem('DevelopMode') === 'true') {
            AddInput.Integration(frameId, fPluginFormInputId2);
        }

        CardContainerPlus.Create(plugin.Data[1].Inputs, filterShellId, this.getFilterHTML);
        CardContainerPlus.Create(plugin.Data[2].Inputs, sortShellId, this.getFilterHTML);

        $('.selectpicker').selectpicker('refresh');

        addListenerByAttr(filterShellId, 'change', function () {
            Filter.resetLimiter(parentFrameId);
            Filter.change(parentFrameId, filterShellId, sortShellId);
        });

        addListenerByAttr(sortShellId, 'change', function () {
            Filter.resetLimiter(parentFrameId);
            Filter.change(parentFrameId, filterShellId, sortShellId);
        });

        Filter.change(parentFrameId, filterShellId, sortShellId);

        Filter.resetLimiter(parentFrameId);

        $(`#${parentFrameId}`).bind(`${parentFrameId}_limiter_create`, function (e) {
            let changeData = JSON.parse(localStorage.getItem(`${parentFrameId}_limiter_create`));
            let targetId = changeData.TargetId;

            Filter.createLimiter(targetId, parentFrameId, filterShellId, sortShellId);
        })

        let filterBtn = document.getElementById(`${frameId}_filter_btn`);
        filterBtn.addEventListener(
            'click',
            function (params) {
                var fltrcontainer = document.getElementById(`${frameId}_container`);
                if ($(fltrcontainer).is(":visible")) {
                    // $(fltrcontainer).addClass("hide-element");
                    // $(fltrcontainer).removeClass("display-element"); --- classes don't exist anymore
                    $(fltrcontainer).hide();
                    this.innerHTML = '<i class="fas fa-filter"></i>';
                }else{
                    // $(fltrcontainer).removeClass("hide-element");
                    // $(fltrcontainer).addClass("display-element");
                    $(fltrcontainer).show();
                    this.innerHTML = '<i class="fas fa-th-large"></i>';
                }
            }
        )
    }
    /**
     * ResetLimiter
     * @param {String} parentFrameId 
     */
    static resetLimiter(parentFrameId) {
        let limiterData = {};
        limiterData.Offset = 0;
        limiterData.Limit = GlobalVaribles.CCLimitSize + 1;
        localStorage.setItem(`${parentFrameId}_limiter`, JSON.stringify(limiterData));
    }
    /**
     * CreateLimiter
     * @param {String} targetId 
     * @param {String} parentFrameId 
     * @param {String} filterShellId 
     * @param {String} sortShellId 
     */
    static createLimiter(targetId, parentFrameId, filterShellId, sortShellId) {
        let limiterId = `${targetId}_limiter`;

        document.getElementById(targetId).insertAdjacentHTML(
            'beforeend',
            Filter.getLimitCard(limiterId)
        );

        let limiterData = JSON.parse(localStorage.getItem(`${parentFrameId}_limiter`));
        limiterData.Offset = parseInt(limiterData.Offset) + GlobalVaribles.CCLimitSize;
        localStorage.setItem(`${parentFrameId}_limiter`, JSON.stringify(limiterData));

        document.getElementById(`${limiterId}_btn`).addEventListener('click', function (e) {
            Filter.change(parentFrameId, filterShellId, sortShellId);
        });
    }
    /**
     * GetLimitCard
     * @param {String} limiterId 
     */
    static getLimitCard(limiterId) {
        return `
            <div id="${limiterId}_btn" class="cc-limit-card">
                <h7>Tovább</h7>
                <i class="fas fa-caret-down"></i>
            </div>
        `;
    }
    /**
     * Change filter data refresh
     * @param {String} parentFrameId 
     * @param {String} filterShellId 
     * @param {String} sortShellId 
     */
    static change(parentFrameId, filterShellId, sortShellId) {
        let filterdata = FormInputs.CreateJSON(filterShellId);
        let sortdata = FormInputs.CreateJSON(sortShellId);

        // Put the filter and sort data into storage
        localStorage.setItem(`${parentFrameId}_filter`, JSON.stringify(filterdata));
        localStorage.setItem(`${parentFrameId}_sort`, JSON.stringify(sortdata));

        $(`#${parentFrameId}`).trigger(`${parentFrameId}_change_filter`);
    }
    /**
     * 
     * @param {Object} objectItem 
     * @param {String} shellId 
     */
    getFilterHTML(objectItem, shellId) {
        switch (objectItem.Type) {
            case "WF":
                FormInputs.WriteFilter(
                    objectItem,
                    shellId
                );
                break;
            case "S":
                FormInputs.SelectFilter(
                    objectItem,
                    shellId
                );
                break;
            case "SO":
                FormInputs.SelectSort(
                    objectItem,
                    shellId
                )
                break;
            default:
                break;
        }

    }
}