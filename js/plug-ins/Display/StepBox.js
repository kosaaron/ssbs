import DetailsDesigns from "../../designs/DetailsDesigns.js";
import CreateDBox from "../CreateDBox.js";
import AutoScroll from "../AutoScroll.js";
import { addListener } from "../../common.js";

export default class StepBox {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     *   <parentFrameId>_child_loaded
     * ------------------------------
     * @param {JSON} plugin 
     * @param {String} parentFrameId 
     */
    constructor(plugin, frameId, parentFrameId) {
        //Details.create(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);

        let changeData = {};
        changeData.PluginNumber = plugin.Number;
        localStorage.setItem(`${parentFrameId}_child_loaded`, JSON.stringify(changeData));
        $(`#${parentFrameId}`).trigger(`${parentFrameId}_child_loaded`);
    }

    static create(plugin, frameId, parentFrameId, titleFrameId) {
        //Tab title
        document.getElementById(titleFrameId).insertAdjacentHTML(
            'beforeend',
            DetailsDesigns.getSimpleTitleFrame(frameId, parentFrameId, plugin.Data['1'].Title)
        )
        document.getElementById(`${frameId}_tab`).addEventListener(
            'click',
            function (e) {
                $(`.${parentFrameId}_tab`).removeClass('btn-detail-menu-active');
                $(`.${parentFrameId}_content`).hide();
                $(`#${frameId}`).show();
                $(`#${frameId}_tab`).addClass('btn-detail-menu-active');
            }
        )

        //Tab content
        let contentData = plugin.Data['1'].Display;
        let detailsObjectFrame = DetailsDesigns.getSimpleObjectFrame(frameId);
        let detailsObject = DetailsDesigns.getDefaultObject(frameId);

        /*
        let createDBox = new CreateDBox();
        createDBox.create(contentData, detailsObjectFrame, detailsObject, frameId);*/
        StepBox.cerateContent(contentData, frameId);
    }
    /**
     * CerateContent
     * @param {JSON} contentData 
     * @param {String} frameId 
     */
    static cerateContent(contentData, frameId) {
        let frameElement = document.getElementById(frameId);
        frameElement.classList.add('task-timeline');

        let data = contentData.Data;
        data.sort(function (a, b) {
            return a['2'] - b['2'];
        });

        let numbers = [];
        for (const object of data) {
            let currentNumber = object['2'];
            let isNew = true;
            for (const number of numbers) {
                if (currentNumber === number) {
                    isNew = false;
                }
            }

            if (isNew) {
                //step number & name
                frameElement.insertAdjacentHTML(
                    'beforeend',
                    StepBox.getStepCard(frameId, object)
                )

                numbers.push(currentNumber);
            }

            //step empls
            document.getElementById(`${frameId}_${currentNumber}`).insertAdjacentHTML(
                'beforeend',
                StepBox.getSubstepCard(frameId, object)
            )
        }
    }
    /**
     * GetStepCard
     * @param {String} frameId 
     * @param {JSON} object 
     */
    static getStepCard(frameId, object) {
        let number = StepBox.getValue(object, '2').value;
        let name = StepBox.getValue(object, '3').value;
        let active = StepBox.getValue(object, '5').value;

        let show = '';
        let activevStep = '';
        if (active === '1') {
            show = 'show';
            activevStep = 'actual-step';
        }

        return `
            <li>
                <div class="task-timeline-item">
                <span class="${activevStep}">${number}</span>
                <div class="task-timeline-item-content">
                    <a data-toggle="collapse" href="#${frameId}_${number}" role="button" aria-expanded="true" aria-controls="task_timel" class="">
                        <h3>${name}</h3>
                    </a>
                    <div id="${frameId}_${number}" class="collapse ${show}"></div>
                </div>
                </div>
            </li>`;
    }
    /**
     * GetSubstepCard
     * @param {String} frameId 
     * @param {JSON} object 
     */
    static getSubstepCard(frameId, object) {
        let number = StepBox.getValue(object, '2').value;
        let employee = StepBox.getValue(object, '4');
        let active = StepBox.getValue(object, '5').value;
        let ready = StepBox.getValue(object, '6').value;

        if (employee.id === null || object === 'null') {
            return "";
        }

        let icon = '';
        let checkIcon = '';
        if (ready === '1') {
            icon = 'fa-check empl-status-ready';
        } else {
            icon = 'fa-user empl-status-work';
            if (active === '1') {
                checkIcon = `<i id="${frameId}_${number}_${employee.id}_check" class="tsk-way-empl-icon-check fas fa-check"></i>`;
            }
        }

        return `
            <div class="row add-employee-card">
                <div employee="${frameId}_${number}_${employee.id}" 
                    class="btn btn-sm employee-box employee-button">
                    <i class="addemployee-icon fas ${icon}"></i>${employee.value}${checkIcon}</div>
            </div>`;
    }
    /**
     * GetValue
     * Get value with id
     * @param {JSON} object 
     * @param {String} number 
     */
    static getValue(object, number) {
        if (object.hasOwnProperty(number)) {
            let final = {};
            final['id'] = object['1'];
            final['value'] = object[number];
            return final;
        }

        for (const oNumber in object) {
            if (object.hasOwnProperty(oNumber)) {
                const value = object[oNumber];

                if (value && typeof value === 'object' && value.constructor === Object) {
                    let result = StepBox.getValue(value, number);

                    if (result !== null) {
                        return result;
                    }
                }
            }
        }

        return null;
    }
    /**
     * Events
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    events(plugin, frameId, parentFrameId) {
        $(`#${parentFrameId}`).bind(`${parentFrameId}_change_details_co_${plugin.Number}`, function (e) {
            // Retrieve the data from storage
            let changeData = JSON.parse(localStorage.getItem(`${parentFrameId}_change_details_co_${plugin.Number}`));
            let titleFrameId = changeData.TitleFrameId;

            StepBox.create(changeData.Plugin, frameId, parentFrameId, titleFrameId);
            AutoScroll.Integration(`${parentFrameId}_content`);
        });

        $(`#${parentFrameId}`).bind(`${parentFrameId}_change_details_co`, function (e) {
            let changeData = {};
            changeData.PluginNumber = plugin.Number;
            localStorage.setItem(`${parentFrameId}_child_loaded`, JSON.stringify(changeData));
            $(`#${parentFrameId}`).trigger(`${parentFrameId}_child_loaded`);
        });

    }
}