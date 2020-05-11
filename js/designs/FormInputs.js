/** Imports **/
import DateFunctions from './../plug-ins/DateFunctions.js';
import AutoScroll from '../plug-ins/AutoScroll.js';

/** 
 * Write inputs 
 */
let FormInputs = {
    /**
     * 
     * @param {String} placeName 
     * @param {JSON} entryId 
     * @param {Function} refreshFn 
     */
    UpdateInputs: function (placeName, entryId, refreshFn) {
        let updateData = FormInputs.CreateJSON(placeName);

        $.ajax({
            type: "POST",
            url: "./php/UpdateDataWithParam.php",
            data: { 'Data': updateData, 'EntryId': entryId },
            success: function (result) {
                if (refreshFn !== null && refreshFn !== undefined) {
                    refreshFn(result);
                }
            },
            dataType: 'html'
        });
    },
    /**
     * 
     * @param {String} placeName 
     * @param {Function} refreshFn 
     */
    InsertInputs: function (placeName, refreshFn) {
        let insertData = FormInputs.CreateJSON(placeName);

        $.ajax({
            type: "POST",
            url: "./php/UploadDataWithParam.php",
            data: { 'Data': insertData },
            success: function (result) {
                if (refreshFn !== null && refreshFn !== undefined) {
                    refreshFn(result);
                }
            },
            dataType: 'html'
        });
    },
    /**
     * Create json from inputs
     * @param {String} placeName 
     */
    CreateJSON: function (placeName) {
        let inputs = document.querySelectorAll('[data-place=' + placeName + ']');
        let inputValues = [];
        let tables = [];

        //get data from input elements
        for (const input of inputs) {
            let uploadName = input.getAttribute('upload-name').split('.');
            let tableName = uploadName[0];
            let columnName = uploadName[1];
            let isNew = true;

            for (let i = 0; i < tables.length; i++) {
                if (tableName === tables[i]) {
                    isNew = false;
                }
            }

            if (isNew) {
                tables.push(tableName);
            }

            let inputValue = {
                'tableName': tableName,
                'columnName': columnName,
                'value': input.value
            };
            inputValues.push(inputValue);
        }

        let result = {}
        for (let i = 0; i < tables.length; i++) {
            const table = tables[i];
            let tableBlock = {};

            for (let j = 0; j < inputValues.length; j++) {
                const inputValue = inputValues[j];
                if (table === inputValue['tableName']) {
                    tableBlock[inputValue['columnName']] = inputValue['value'];
                    inputValues.splice(j, 1);
                    --j
                }
            }
            result[table] = tableBlock;
        }
        return result;
    },
    /**
     * Write input with label
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {String} uploadName 
     * @param {String} defaultValue 
     */
    Write: function (id, name, shellId, uploadName, defaultValue = null) {
        if (defaultValue === null) {
            defaultValue = '';
        }
        let readyHTML = "";
        readyHTML += '<div class="form-group">';
        readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
        readyHTML += '<input value="' + defaultValue + '" type="text" id="' + shellId + '_' + id + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
        readyHTML += '</div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
    },
    /**
     * Select
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {JSON} opportunities 
     * @param {String} uploadName 
     * @param {Boolean} required 
     * @param {String} default id
     */
    Select: function (id, name, shellId, opportunities, uploadName, required, defaultValue = null) {
        if (defaultValue === null) {
            defaultValue = 'null';
        }

        let readyHTML = "";
        readyHTML += '<div class="form-group">';
        readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
        readyHTML += '<select id="' + shellId + '_' + id + '" required="' + required + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
        if (required === '0') {
            readyHTML += '<option value="null" selected>---</option>';
        }

        for (let k = 0; k < opportunities.length; k++) {
            readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
        }
        readyHTML += '</select> </div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);

        //default value
        if (defaultValue !== 'null') {
            $('#' + shellId + '_' + id).val(defaultValue);
        }
    },
    /**
     * Select ro create new entry
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {JSON} opportunities 
     * @param {String} uploadName 
     * @param {String} truncatedIdName 
     */
    SelectOrNew: function (id, name, shellId, opportunities, uploadName, truncatedIdName) {
        let readyHTML = "";
        //select
        readyHTML += '<div class="form-group">';
        readyHTML += '<label for="taskCat" class="newtask-label">' + name + '</label>';
        readyHTML += '<div class="tasktype-group">';
        readyHTML += '<div class="input-group mb-3">';
        readyHTML += '<select id="' + shellId + '_' + id + '" class="form-control newtask-formcontrol" aria-describedby="button-addon2" upload-name="' + uploadName + '" data-place="' + shellId + '">';
        for (let k = 0; k < opportunities.length; k++) {
            readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
        }
        readyHTML += '</select>';
        readyHTML += '<div class="input-group-append">';
        readyHTML += '<button class="btn btn-outline-secondary" type="button" id="new_' + shellId + '_' + id + '" data-place="new_' + shellId + '">';
        readyHTML += '<i class="fas fa-plus"></i>';
        readyHTML += '</button> </div></div></div></div>';
        //new
        readyHTML += '<div id="collapse_' + shellId + '_' + id + '" class="collapse">';
        readyHTML += '<div class="sn-collapse-body"><div class="sn-collapse-card new-element-card">';
        readyHTML += '<label class="sn-collapse-label">' + name + '</label>';
        readyHTML += '<input id="' + shellId + '_collapse_inp_' + id + '" class="sn-collapse-input" type="text">';
        readyHTML += '<button id="' + shellId + '_collapse_btn_' + id + '" class="sn-collapse-button btn btn-primary">Létrehozás</button>';
        readyHTML += '</div></div></div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
        document.getElementById(shellId + '_collapse_btn_' + id).addEventListener('click', function () {
            if (document.getElementById(shellId + '_collapse_inp_' + id).value === "") {
                document.getElementById(shellId + '_collapse_inp_' + id).style.border = "1px solid #ca3333";
                return;
            } else {
                document.getElementById(shellId + '_collapse_inp_' + id).style.border = "1px solid #aaa";
            }

            let splittedUploadName = uploadName.split('.');
            let columns = {};
            let data = {};
            columns[splittedUploadName[1]] = document.getElementById(shellId + '_collapse_inp_' + id).value;
            data[splittedUploadName[0]] = columns;

            document.getElementById(shellId + '_collapse_inp_' + id).value = "";
            document.getElementById('new_' + shellId + '_' + id).click();

            $.ajax({
                type: "POST",
                url: "./php/UploadDataWithParam.php",
                data: { 'Data': data },
                success: function (result1) {
                    if (result1 === 'S') {
                        let selectData = {};

                        let selectColumns = {};
                        selectColumns[splittedUploadName[1]] = 'Name';
                        selectColumns[truncatedIdName + 'Id'] = 'Id';

                        let selectTableArr = {};
                        selectTableArr['Alias'] = 'SelectedTable';
                        selectTableArr['Columns'] = selectColumns;

                        selectData[splittedUploadName[0]] = selectTableArr;

                        $.ajax({
                            type: "POST",
                            url: "./php/GetDataByParam.php",
                            data: { 'Data': selectData },
                            success: function (result2) {
                                let selectedTableResult = result2.SelectedTable;
                                let addTypeOppHTML = '';

                                for (let k = 0; k < selectedTableResult.length; k++) {
                                    addTypeOppHTML += '<option value="' + selectedTableResult[k].Id + '">' + selectedTableResult[k].Name + '</option>';
                                }

                                let selectElement = document.getElementById(shellId + '_' + id);
                                selectElement.innerHTML = addTypeOppHTML;

                                let selectedItemValue = selectedTableResult[selectedTableResult.length - 1].Id;
                                document.querySelector('#' + shellId + '_' + id + ' [value="' + selectedItemValue + '"]').selected = true;
                            },
                            dataType: 'json'
                        });
                    }
                },
                dataType: 'html'
            });
        });
    },
    /**
     * 
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {JSON} opportunities 
     * @param {String} uploadName 
     * @param {String} truncatedIdName 
     */
    StepBox: function (id, name, shellId, opportunities, uploadName, truncatedIdName, isFullWidth = false) {
        let frameId = `${shellId}_step_box`;

        /** Frame */
        let Frame = {
            load: function () {
                document.getElementById(shellId).parentNode.insertAdjacentHTML(
                    'beforeend',
                    this.getHTML()
                );
            },
            getHTML: function () {
                return `
            <div class="new-obj-shell col-12  ${this.getWidthClass()}" style="height: 100%;">
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
                                <div class="form-group">
                                    <label class="newtaskstep-label">Lépés neve:</label>
                                    <div class="tasktype-group">
                                        <div class="input-group mb-3">
                                            <input type="text" id="ntsk_new_taskstep_name" class="flex-1 newtask-formcontrol">
                                            <div class="input-group-append">
                                                <button id="${frameId}_upld_n_stp_btn" class="btn btn-outline-secondary" type="button"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="${frameId}_saved_cnt" class="add-taskstep-form-container" style="display: none">
                                <div class="form-group">
                                    <label class="newtaskstep-label">Lépés neve:</label>
                                    <div class="tasktype-group">
                                        <div id="ntsk_saved_step_slct_shell" class="input-group mb-3">
                                            <div class="input-group-append">
                                                <button id="ntsk_add_saved_step_btn" class="btn btn-outline-secondary" type="button"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="${frameId}_cont" class="taskstep-container">
                    <div id="ntskstps_slides" class="slides">
                    </div>
                </div>
                <div id="ntsk_steps_footer">
                    <button type="reset" id="ntsk_steps_trash_btn" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`
            },
            getWidthClass: function () {
                if (!isFullWidth) {
                    return 'col-md-6';
                }
            }
        }

        /** Events **/
        let Events = {
            /** CLick */
            addStepToWay: function (e) {
                if (document.getElementById(`${frameId}_collapse`).style.display === "none") {
                    document.getElementById(`${frameId}_collapse`).style.display = "block";
                }
                else {
                    document.getElementById(`${frameId}_collapse`).style.display = "none";
                }

                AutoScroll.Integration(`${frameId}_cont`);
            },
            /**
             * Show 'new task step' tab
             * @param {Element} e 
             */
            showSavedTab: function (e) {
                let element = document.getElementById(`${frameId}_new_tab`);
                let element2 = document.getElementById(`${frameId}_saved_tab`);

                element.classList.remove("collapsable-form-tabs-active");
                element2.classList.add("collapsable-form-tabs-active");

                document.getElementById(`${frameId}_saved_cnt`).style.display = "block";
                document.getElementById(`${frameId}_new_cnt`).style.display = "none";
            },
            /**
             * Show 'new task step' tab
             * @param {Element} e 
             */
            showNewTab: function (e) {
                let element = document.getElementById(`${frameId}_saved_tab`);
                let element2 = document.getElementById(`${frameId}_new_tab`);

                element.classList.remove("collapsable-form-tabs-active");
                element2.classList.add("collapsable-form-tabs-active");

                document.getElementById(`${frameId}_saved_cnt`).style.display = "none ";
                document.getElementById(`${frameId}_new_cnt`).style.display = "block";
            },
            /**
             * Create and add new step ot task
             * @param {String} fullId 
             */
            uploadNewStep: function (fullId) {
                //let place = 'ntskstpsew';
                let inputBox = document.getElementById('ntsk_new_taskstep_name');
                let stepName = inputBox.value;

                let data = {
                    'task_steps': {
                        'Name': stepName
                    }
                };

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
                    data: { 'Data': data},
                    success: function (data) {
                        inputBox.value = "";
                        //General.addNewStep(data[0].InsertedId, stepName);

                        Swal.fire({
                            type: 'success',
                            title: 'Sikeres tranzakció!',
                            text: 'Az új lépés létre lett hozva.',
                            heightAuto: false
                        });
                    },
                    dataType: 'json'
                });
            },
        }

        /** Database **/
        let Database = {
            getStep
        }

        /** Functions **/
        let Functions = {

        }

        //frame
        Frame.load();

        //Events
        document.getElementById(`${frameId}_collapse_btn`).addEventListener('click', Events.addStepToWay);
        document.getElementById(`${frameId}_new_tab`).addEventListener('click', Events.showNewTab);
        document.getElementById(`${frameId}_saved_tab`).addEventListener('click', Events.showSavedTab);
        document.getElementById(`${frameId}_upld_n_stp_btn`).addEventListener('click', Events.uploadNewStep);

        window.addEventListener('resize', function () {
            AutoScroll.Integration(`${frameId}_cont`);
        });
    },
    /**
     * Date time
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {String} uploadName 
     * @param {String} defaultValue 
     */
    DateTime: function (id, name, shellId, uploadName, defaultValue = null) {
        if (defaultValue === null) {
            defaultValue = new Date();
        }

        defaultValue = DateFunctions.dateToString(defaultValue);

        let readyHTML = "";
        readyHTML += '<div class="form-group">';
        readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
        readyHTML += '<input type="date" id="' + shellId + '_' + id + '" value="' + defaultValue + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
        readyHTML += '</div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
    },
    /**
     * Image upload
     * @param {String} shellId 
     * @param {String} inputId 
     * @param {String} previewId 
     */
    Image: function (shellId, inputId, previewId) {
        let iconId = inputId + '_icon';

        let readyHTML = "";
        readyHTML += '<input type="file" id="input_' + shellId + '_' + inputId + '" class="img-input">';
        readyHTML += '<img id="' + previewId + '" class="img_inp_preview">';
        readyHTML += '<i id="icon_' + shellId + '_' + iconId + '"class="fas fa-cloud-upload-alt img_input_icon"></i>';

        document.getElementById(shellId).innerHTML = readyHTML;

        $('#input_' + shellId + '_' + inputId).change(function () {
            Local.imagePreview(this);
            document.getElementById(iconId).style = 'display: none !important;';
            document.getElementById(shellId).style = 'width: fit-content;';
        });
        $("#" + shellId).click(function () {
            document.getElementById(inputId).click();
        });
    }
}
export default FormInputs;