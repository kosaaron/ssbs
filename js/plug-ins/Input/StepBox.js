import AutoScroll from "../AutoScroll.js";
import FormInputs from "../../designs/FormInputs.js";
import JSONToUpload from "../JSONToUpload.js";

export default class StepBox {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     *   <frameId>_save
     * ------------------------------
     * @param {JSON} data 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    constructor(data, frameId, parentFrameId) {
        StepBox.load(frameId);
        this.events(parentFrameId, frameId);

        let stepNameWrite = {};
        let stepNameList = {};
        let subitemList = {};
        for (const input of data.Data.Inputs) {
            switch (input.Number) {
                case '2':
                    stepNameWrite = input;
                    break;
                case '3':
                    stepNameList = input;
                    break;
                case '4':
                    subitemList = input;
                    break;
            }
        }

        //stepNameWrite
        let nIputFrameId = frameId + '_new_cnt';
        FormInputs.WritePlus(
            stepNameWrite,
            nIputFrameId
        );

        document.getElementById(`${nIputFrameId}_i_${stepNameWrite.c_103_id}_upl`).addEventListener(
            'click', function (e) {
                let inputId = `${nIputFrameId}_${stepNameWrite.c_103_id}`;
                StepBox.uploadNewStep(frameId, inputId);
            }
        );

        //stepNameList
        let sIputFrameId = frameId + '_saved_cnt';

        FormInputs.SelectPlus(
            stepNameList,
            sIputFrameId
        );

        document.getElementById(`${sIputFrameId}_i_${stepNameList.c_103_id}_upl`).addEventListener(
            'click', function (e) {
                let inputId = `${sIputFrameId}_${stepNameList.c_103_id}`;
                StepBox.addSavedStepClick(frameId, inputId, subitemList);
            }
        );
    }

    /** Frame **/
    /**
     * load
     */
    static load(frameId) {
        document.getElementById(frameId).insertAdjacentHTML(
            'beforeend',
            this.getFrameHTML(frameId)
        );

        AutoScroll.Integration(`${frameId}_cont`);
    }

    /**
     * events
     * @param {String} parentFrameId 
     * @param {String} frameId 
     */
    events(parentFrameId, frameId) {
        document.getElementById(`${frameId}_collapse_btn`).addEventListener(
            'click', function (e) {
                StepBox.addStepToWay(frameId)
            }
        );
        document.getElementById(`${frameId}_new_tab`).addEventListener(
            'click', function (e) {
                StepBox.showNewTab(frameId);
            }
        );
        document.getElementById(`${frameId}_saved_tab`).addEventListener(
            'click', function (e) {
                StepBox.showSavedTab(frameId);
            }
        );

        window.addEventListener('resize', function () {
            AutoScroll.Integration(`${frameId}_cont`);
        });

        $(`#${parentFrameId}`).bind(`${parentFrameId}_save`, function (e) {
            let parentFrameElement = document.getElementById(parentFrameId);
            let lastId = parentFrameElement.getAttribute('last-id');
            let lastIdColumn = parentFrameElement.getAttribute('last-id-colomn');
            let columnLength = lastIdColumn.length;
            let fkColumn = lastIdColumn.substr(0, columnLength - 2);
            fkColumn += 'FK';
            StepBox.uploadSteps(fkColumn, lastId, parentFrameId);
        });
    }

    /**
     * getFrameHTML
     */
    static getFrameHTML(frameId) {
        return `
            <h2 id="ntsk_steps_title" class="new-obj-subtitle">Feladat lépései</h2>
            <div id="ntsk_steps_new_box" class="d-flex justify-content-between align-items-center">
                <div class="add-taskstep-container">
                    <div id="${frameId}_collapse_btn" class="cursor-pointer">
                        <h7 class="collapsable-form-title">Lépés hozzáadása</h7>
                        <span class="btn-show-forms">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                    <div id="${frameId}_collapse" style="display:none;">
                        <div class="add-taskstep-btn-container">
                            <div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons">
                                <label id="${frameId}_new_tab" class="btn collapsable-form-tabs collapsable-form-tabs-active">+ Új lépés</label>
                                <label id="${frameId}_saved_tab" class="btn collapsable-form-tabs">Mentett lépések</label>
                            </div>
                        </div>
                        <div id="${frameId}_new_cnt" class="add-taskstep-form-container">
                            
                        </div>
                        <div id="${frameId}_saved_cnt" class="add-taskstep-form-container" style="display: none">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div id="${frameId}_cont" class="taskstep-container">
                
            </div>
            <div id="ntsk_steps_footer">
                <button type="reset" id="ntsk_steps_trash_btn" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button>
            </div>`
    }

    /** Events **/
    /** CLick */
    /**
     * Save subitem to step
     * @param {String} fullId element id
     */
    static saveSubitem(shellId, number) {
        let container = "";
        let selector = document.getElementById(`${shellId}_${number}`);

        let eName = selector.options[selector.selectedIndex].text;
        let subitemFKColummn = selector.getAttribute('upload-name');
        let subitemFK = selector.value;

        container = `
            <div class="row add-employee-card">
                <div subitem-fk-colummn="${subitemFKColummn}" subitem-fk="${subitemFK}" 
                        class="ntskstps_slide_${number} btn btn-sm employee-box ntsk-empl-box">
                    <i class="fas fa-user addemployee-icon "></i>${eName}<span onClick="deleteEmployee(this)" class="closebtn">&times;</span> 
                </div>
            </div>
        `;
        let saveBtn = document.getElementById(shellId);
        saveBtn.parentNode.parentNode.insertAdjacentHTML('beforebegin', container);
    }
    /**
     * addStepToWay 
     * @param {String} frameId
     */
    static addStepToWay(frameId) {
        if (document.getElementById(`${frameId}_collapse`).style.display === "none") {
            document.getElementById(`${frameId}_collapse`).style.display = "block";
        }
        else {
            document.getElementById(`${frameId}_collapse`).style.display = "none";
        }

        AutoScroll.Integration(`${frameId}_cont`);
    }
    /**
     * Show 'new task step' tab
     * @param {String} frameId
     */
    static showSavedTab(frameId) {
        let element = document.getElementById(`${frameId}_new_tab`);
        let element2 = document.getElementById(`${frameId}_saved_tab`);

        element.classList.remove("collapsable-form-tabs-active");
        element2.classList.add("collapsable-form-tabs-active");

        document.getElementById(`${frameId}_saved_cnt`).style.display = "block";
        document.getElementById(`${frameId}_new_cnt`).style.display = "none";
    }
    /**
     * Show 'new task step' tab
     * @param {String} frameId
     */
    static showNewTab(frameId) {
        let element = document.getElementById(`${frameId}_saved_tab`);
        let element2 = document.getElementById(`${frameId}_new_tab`);

        element.classList.remove("collapsable-form-tabs-active");
        element2.classList.add("collapsable-form-tabs-active");

        document.getElementById(`${frameId}_saved_cnt`).style.display = "none ";
        document.getElementById(`${frameId}_new_cnt`).style.display = "block";
    }
    /**
     * Create and add new step ot task
     * @param {String} frameId
     */
    static uploadNewStep(frameId, inputId) {
        //let place = 'ntskstpsew';
        let inputBox = document.getElementById(inputId);
        let tableName = inputBox.getAttribute('table-name');
        let columnName = inputBox.getAttribute('column-name');
        let stepName = inputBox.value;

        let data = {};
        data[tableName] = {};
        data[tableName][columnName] = stepName;

        if (stepName === '') {
            Swal.fire({
                type: 'warning',
                title: 'Üres mező!',
                text: 'Kérem töltse ki a mezőt.',
                heightAuto: false
            });
            return;
        }

        $.ajax({
            type: "POST",
            url: "./php/UploadDataWithParam.php",
            data: { 'Data': data },
            success: function (data) {
                //success
            },
            dataType: 'json'
        });
    }

    /**
     * Add saved step click
     * @param {String} frameId 
     * @param {String} inputId 
     * @param {JSON} subitemList 
     */
    static addSavedStepClick(frameId, inputId, subitemList) {
        let selector = document.getElementById(inputId);
        let stepFkColumn = selector.getAttribute('upload-name');
        let stepFk = selector.value;
        let stepName = selector.options[selector.selectedIndex].text;
        StepBox.addNewStep(frameId, stepFkColumn, stepFk, stepName, subitemList);
    }

    /** Functions **/
    /**
     * Add new step
     * @param {String} frameId 
     * @param {String} stepFK 
     * @param {String} stepFkColumn 
     * @param {String} stepName 
     * @param {JSON} subitemList 
     */
    static addNewStep(frameId, stepFkColumn, stepFK, stepName, subitemList) {
        let stepNumber = document.querySelectorAll('.stepNo').length;
        const currentStepNumber = stepNumber + 1;
        const stepShellId = `${frameId}_cont`;
        StepBox.getTaskStepsCard(stepShellId, stepFkColumn, stepFK, currentStepNumber, stepName);

        subitemList.Opportunities;

        subitemList.c_103_id = currentStepNumber;
        subitemList.Name = null;

        let employeeSelectShellId = `${stepShellId}_subitem_select_${currentStepNumber}`;

        FormInputs.Select(
            subitemList,
            employeeSelectShellId
        );

        document.getElementById(`${frameId}_collapse_btn`).click();
        //$('.selectpicker').selectpicker('refresh');

        let ntskStepsCont = document.getElementById(stepShellId);
        ntskStepsCont.scrollTop = ntskStepsCont.scrollHeight;

        //addOneListener('ntskstps_add_empl_' + currentStepNumber, 'click', StepBox.saveSubitem);
        let addEmplBtn = document.getElementById(`${frameId}_cont_add_empl_${currentStepNumber}`);
        addEmplBtn.addEventListener(
            'click',
            function (e) {
                StepBox.saveSubitem(employeeSelectShellId, currentStepNumber);
            }
        );
    }

    /** Cards **/
    /**
     * getTaskStepsCard
     * @param {String} targetId 
     * @param {String} stepFkColumn 
     * @param {String} stepFK 
     * @param {String} number 
     * @param {String} name 
     */
    static getTaskStepsCard(targetId, stepFkColumn, stepFK, number, name) {
        let card = `
        <div class="slide">
            <div class="row taskstep-card d-flex align-items-center">
                <div class="stepNo">${number}</div>
                <h4 id="ntskstps_slide_${number}" step-fk-column="${stepFkColumn}" step-fk="${stepFK}" 
                        number="${number}" class=taskstep-title data-place="processes_new_t_steps">${name}</h4>
            </div>
            <div class="row add-employee-card">
                <div class="display-flex btn btn-sm added-employee-input">
                    <i class="fas fa-user-plus addemployee-icon "></i>
                    <div id="${targetId}_subitem_select_${number}" class="full-width"></div>
                    <i id="${targetId}_add_empl_${number}" class="ntskstps-save-empl fas fa-check-circle save-employee-icon"></i>
                </div>
            </div>
       </div>`

        document.getElementById(targetId).insertAdjacentHTML(
            'beforeend',
            card
        );
    }

    /** Database **/
    /**
     * uploadSteps
     * @param {String} itemIdColumn 
     * @param {String} itemId 
     * @param {String} parentFrameId 
     */
    static uploadSteps(itemIdColumn, itemId, parentFrameId) {
        let uploadSteps = [];
        let steps = document.querySelectorAll('[data-place=processes_new_t_steps]');
        let number = 1;
        steps.forEach(step => {
            let subitems = document.getElementsByClassName(step.id);
            let emplsLength = subitems.length;

            let subitemSelects = step.parentNode.parentNode.querySelectorAll('select[upload-name]');
            let subitemFKColummn = subitemSelects[0].getAttribute('upload-name');
            let tableName = subitemFKColummn.split('.')[0];

            if (emplsLength === 0) {
                let array = {};
                array[`${tableName}.Number`] = parseInt(number);
                array[`${tableName}.${itemIdColumn}`] = itemId;
                array[step.getAttribute('step-fk-column')] = step.getAttribute('step-fk');

                array[subitemFKColummn] = null;
                if (number === 1) {
                    array[`${tableName}.Active`] = 1;
                } else {
                    array[`${tableName}.Active`] = 0;
                }
                array[`${tableName}.Ready`] = 0;
                uploadSteps.push(array);
            }

            for (let i = 0; i < emplsLength; i++) {
                let array = {};
                array[`${tableName}.Number`] = parseInt(number);
                array[`${tableName}.${itemIdColumn}`] = itemId;
                array[step.getAttribute('step-fk-column')] = step.getAttribute('step-fk');

                const subitem = subitems[i];
                let subitemFK = subitem.getAttribute('subitem-fk');

                array[subitemFKColummn] = subitemFK;
                if (number === 1) {
                    array[`${tableName}.Active`] = 1;
                } else {
                    array[`${tableName}.Active`] = 0;
                }
                array[`${tableName}.Ready`] = 0;
                uploadSteps.push(array);
            }

            ++number;
        });
        if (number !== 1) {
            let uploadJSON = new JSONToUpload();
            let uploadData = [];

            for (const uploadStep of uploadSteps) {
                uploadData.push(uploadJSON.create(uploadStep));
            }

            let className = 'InsertByParam';

            $.ajax({
                type: "POST",
                url: "./php/Router.php",
                data: { 'Module': className, 'Data': uploadData },
                success: function (result) {
                    let tableResultData = {};

                    for (const table in result[0]) {
                        if (result[0].hasOwnProperty(table)) {
                            tableResultData = result[0][table];
                        }
                    }

                    if (tableResultData['Result'] === 'S') {
                        $(`#${parentFrameId}`).trigger(`${parentFrameId}_save_end`);
                    } else {
                        Swal.fire({
                            type: 'error',
                            title: 'Sikertelen',
                            text: 'A feladat létrehozása sikertelen volt!',
                            heightAuto: false
                        });
                    }
                },
                dataType: 'json'
            });
        } else {
            $(`#${parentFrameId}`).trigger(`${parentFrameId}_save_end`);
        }
    }
}