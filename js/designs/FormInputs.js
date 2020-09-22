/** Imports **/
import DateFunctions from './../plug-ins/DateFunctions.js';
import AutoScroll from '../plug-ins/AutoScroll.js';
import SelectInput from '../plug-ins/objects/SelectInput.js';

/** 
 * Write inputs 
 */
let FormInputs = {
    /**
     * Update Inputs
     * @param {String} placeName 
     * @param {JSON} entryId 
     * @param {Function} refreshFn 
     */
    UpdateInputs: function (placeName, entryId, refreshFn) {
        let updateData = FormInputs.CreateJSON(placeName),
            className = 'UpdateByParam',
            uploadData = {};
        uploadData['UpdateByParamData'] = updateData;
        uploadData['EntryId'] = entryId;
        
        console.log(uploadData);

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': className, 'Data': uploadData },
            success: function (result) {
                if (refreshFn !== null && refreshFn !== undefined) {
                    refreshFn(result);
                }
            },
            dataType: 'json'
        });
    },
    /**
     * Insert Inputs
     * @param {String} placeName 
     * @param {Function} refreshFn 
     */
    InsertInputs: function (placeName, refreshFn) {
        let insertData = [FormInputs.CreateJSON(placeName)],
            className = 'InsertByParam';

        console.log(insertData);

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': className, 'Data': insertData },
            success: function (result) {
                if (refreshFn !== null && refreshFn !== undefined) {
                    refreshFn(result);
                }
            },
            dataType: 'json'
        });
    },
    /**
     * Create json from inputs
     * @param {String} placeName 
     */
    CreateJSON: function (placeName) {
        let inputs = document.querySelectorAll('[data-place="' + placeName + '"]'),
            inputValues = [],
            tables = [];

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
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    Write: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            uploadName = objectItem.UploadName,
            required = objectItem.Required,
            visible = objectItem.Visible,
            defaultValue = objectItem.DefaultValue,
            tableName = objectItem.TableName,
            columnName = objectItem.ColumnName;

        if (defaultValue === null) {
            defaultValue = '';
        }

        let visibility = '';
        if (visible === '0') {
            visibility = 'display-none-i';
        }

        let readyHTML = "";
        readyHTML += `<div class="form-group input-row ${visibility}">`;
        readyHTML += `<label for="${shellId}_${id}" class="newtask-label">${name}</label>`;
        readyHTML += `<input value="${defaultValue}" type="text" id="${shellId}_${id}" 
            class="newtask-formcontrol" upload-name="${uploadName}" data-place="${shellId}"
            table-name="${tableName}" column-name="${columnName}">`;
        readyHTML += '</div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
    },
    /**
     * Write input with label
     * @param {JSON} objectItem 
     * @param {String} shellId  
     */
    WritePlus: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            uploadName = objectItem.UploadName,
            required = objectItem.Required,
            visible = objectItem.Visible,
            defaultValue = objectItem.DefaultValue,
            tableName = objectItem.TableName,
            columnName = objectItem.ColumnName;

        if (defaultValue === null) {
            defaultValue = '';
        }

        let visibility = '';
        if (visible === '0') {
            visibility = 'display-none-i';
        }

        let readyHTML = "";
        readyHTML += `<div class="form-group input-row ${visibility}">`;
        //select
        readyHTML += '<div class="form-group input-row">';
        readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
        readyHTML += '<div class="tasktype-group">';
        readyHTML += '<div class="input-group ">';
        readyHTML += `<input value="${defaultValue}" type="text" id="${shellId}_${id}" 
            class="newtask-formcontrol form-control flex-1" upload-name="${uploadName}" data-place="${shellId}"
            table-name="${tableName}" column-name="${columnName}">`;

        readyHTML += '<div class="input-group-append">';
        readyHTML += '<button class="btn btn-outline-secondary" type="button" id="' + shellId + '_i_' + id + '_upl" data-place="new_' + shellId + '">';
        readyHTML += '<i class="fas fa-plus"></i>';
        readyHTML += '</button> </div></div></div></div></div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
    },
    /**
     * Select
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    Select: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            opportunities = objectItem.Opportunities,
            uploadName = objectItem.UploadName,
            required = objectItem.Required,
            visible = objectItem.Visible,
            defaultValue = objectItem.DefaultValue;

        let visibility = '';
        if (visible === '0') {
            visibility = 'display-none-i';
        }

        let readyHTML = '',
            fullWidth = '',
            formGroup = '',
            label = '';
        if (name !== null) {
            formGroup = 'form-group';
            label += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
        } else {
            fullWidth = 'full-width-i';
        }

        readyHTML += `<div class="${formGroup} input-row ${visibility}">`;
        readyHTML += label;
        readyHTML += `<select id="${shellId}_${id}" required="${required}" 
                        class="newtask-formcontrol ${fullWidth}" 
                        upload-name="${uploadName}" data-place="${shellId}">`;
        if (required === '0') {
            readyHTML += '<option value="null" selected>---</option>';
        }

        for (let k = 0; k < opportunities.length; k++) {
            readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
        }
        readyHTML += '</select> </div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);

        //default value
        if (defaultValue !== 'null' && defaultValue !== null && defaultValue !== '') {
            $('#' + shellId + '_' + id).val(defaultValue);
        }
    },
    /**
     * Select plus
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    SelectPlus: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            opportunities = objectItem.Opportunities,
            uploadName = objectItem.UploadName,
            required = objectItem.Required,
            visible = objectItem.Visible,
            upload = objectItem.Upload,
            defaultValue = objectItem.DefaultValue;

        let visibility = '';
        if (visible === '0') {
            visibility = 'display-none-i';
        }

        let customInput = '';
        if (upload === '0') {
            customInput = '_cstm';
        }

        let readyHTML = "";
        //select
        readyHTML += `<div class="form-group input-row ${visibility}">`;
        readyHTML += '<label for="taskCat" class="newtask-label">' + name + '</label>';
        readyHTML += '<div class="tasktype-group">';
        readyHTML += '<div class="input-group">';
        readyHTML += `<select id="${shellId}_${id}" class="form-control newtask-formcontrol" aria-describedby="button-addon2" upload-name="${uploadName}" data-place="${shellId}${customInput}">`;

        if (required === '0') {
            readyHTML += '<option value="null" selected>---</option>';
        }
        for (let k = 0; k < opportunities.length; k++) {
            readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
        }
        readyHTML += '</select>';
        readyHTML += '<div class="input-group-append">';
        readyHTML += `<button class="btn btn-outline-secondary" type="button" 
                        id="${shellId}_i_${id}_upl" 
                        data-place="new_${shellId}">`;
        readyHTML += '<i class="fas fa-plus"></i>';
        readyHTML += '</button> </div></div></div></div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);

        //default value
        if (defaultValue !== 'null' && defaultValue !== null && defaultValue !== '') {
            $('#' + shellId + '_' + id).val(defaultValue);
        }
    },
    /**
     * Select ro create new entry
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    SelectOrNew: function (objectItem, shellId, isInsert = true) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            tableName = objectItem.TableName,
            columnName = objectItem.ColumnName,
            defaultValue = objectItem.DefaultValue;

        let readyHTML = "";
        FormInputs.SelectPlus(objectItem, shellId);

        let collapseInputId = `${shellId}_collapse_inp_${id}`;
        //new
        readyHTML += `
            <div id="${shellId}_${id}_collapse" class="collapse">
                <div class="sn-collapse-body">
                    <div class="sn-collapse-card new-element-card">
                        <label class="sn-collapse-label">${name}</label>
                        <input id="${collapseInputId}" class="sn-collapse-input" upload-name="${tableName}.${columnName}" 
                            type="text" data-place="${collapseInputId}">
                        <button id="${shellId}_i_${id}_collapse_btn" class="sn-collapse-button btn btn-primary">Létrehozás</button>
                    </div>
                </div>
            </div>`;

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);

        document.getElementById(`${shellId}_i_${id}_upl`).addEventListener('click', function () {
            let collapseElement = document.getElementById(`${shellId}_${id}_collapse`);

            if (collapseElement.style.display === 'block') {
                collapseElement.style.display = 'none'

                $(`#${shellId}_i_${id}_upl .fa-minus`).addClass('fa-plus');
                $(`#${shellId}_i_${id}_upl .fa-minus`).removeClass('fa-minus');
            } else {
                collapseElement.style.display = 'block'

                $(`#${shellId}_i_${id}_upl .fa-plus`).addClass('fa-minus');
                $(`#${shellId}_i_${id}_upl .fa-plus`).removeClass('fa-plus');
            }
        });

        if (isInsert) {
            document.getElementById(`${shellId}_i_${id}_collapse_btn`).addEventListener('click', function (e) {
                let collapseInputElement = document.getElementById(collapseInputId);
                if (collapseInputElement.value === "") {
                    collapseInputElement.style.border = "1px solid #ca3333";
                    return;
                } else {
                    collapseInputElement.style.border = "1px solid #aaa";
                }

                FormInputs.InsertInputs(collapseInputId, function (result) {
                    let tableResultData = {};

                    for (const table in result[0]) {
                        if (result[0].hasOwnProperty(table)) {
                            tableResultData = result[0][table];
                        }
                    }

                    let optionId = tableResultData['LastId'];

                    document.getElementById(shellId + '_' + id).insertAdjacentHTML(
                        'beforeend',
                        `<option value="${optionId}">${collapseInputElement.value}</option>`
                    );

                    document.querySelector(`[id="${shellId}_${id}"]  [value="${optionId}"]`).selected = true;
                    document.getElementById(`${shellId}_i_${id}_upl`).click();
                })
            });
        }

        //default value
        if (defaultValue !== 'null' && defaultValue !== null && defaultValue !== '') {
            $('#' + shellId + '_' + id).val(defaultValue);
        }
    },
    /**
     * Select ro create new entry
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    SelectColumn: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            tableName = objectItem.TableName,
            columnName = objectItem.ColumnName,
            defaultValue = objectItem.DefaultValue;

        let transferData = JSON.parse(localStorage.getItem(shellId));
        let isFormInput = false;
        let pluginTable = '';
        if (transferData !== null) {
            if (transferData.hasOwnProperty('IsFormInput')) {
                isFormInput = transferData['IsFormInput'];
            }
            if (transferData.hasOwnProperty('TableName')) {
                pluginTable = transferData['TableName'];
            }
        }

        let readyHTML = "";
        let collapseInputId = `${shellId}_collapse_inp_${id}`;

        FormInputs.SelectOrNew(objectItem, shellId, false);

        document.getElementById(`${collapseInputId}`).insertAdjacentHTML('beforebegin',
            `<div id="${collapseInputId}_ct" number="1"></div>
             <div id="${collapseInputId}_ct_p" class="add-input-btn"><i class="far fa-plus-square"></i></div>`
        );

        let cTNumber = 1;
        objectItem.c_103_id = `${id}_${cTNumber}`;
        objectItem.Name = 'Connect table';
        FormInputs.Select(objectItem, `${collapseInputId}_ct`, false);

        document.getElementById(`${collapseInputId}_ct_p`).addEventListener('click', function (e) {
            cTNumber++;
            objectItem.c_103_id = `${id}_${cTNumber}`;
            FormInputs.Select(objectItem, `${collapseInputId}_ct`, false);
        });

        let cObjectItem = {};
        cObjectItem.c_103_id = `${id}_c`;
        cObjectItem.Name = 'Select column';
        cObjectItem.TableName = 't_7';
        cObjectItem.ColumnName = 'Name';
        cObjectItem.Opportunities = [{ Id: 'null', Name: '--' }];
        if (isFormInput) {
            cObjectItem.UploadName = 't_103.c_7_fk';
        } else {
            cObjectItem.UploadName = 't_102.c_7_fk';
        }
        cObjectItem.Required = '1';
        cObjectItem.Visible = '1';
        cObjectItem.Upload = '1';
        cObjectItem.DefaultValue = '';
        FormInputs.SelectOrNew(cObjectItem, shellId, false);

        document.getElementById(`${collapseInputId}_c`).style.width = '48%';
        document.getElementById(`${collapseInputId}_c`).insertAdjacentHTML(
            'afterend',
            `<input id="${collapseInputId}_c_s" class="sn-collapse-input" type="text" placeholder="Length" style="width: 15%;">`
        )

        //Events
        //Table
        document.getElementById(`${shellId}_i_${id}_collapse_btn`).addEventListener('click', function (e) {
            let connTables = document.getElementById(`${collapseInputId}_ct`).querySelectorAll(`[data-place=${collapseInputId}_ct]`);
            let connTableIds = [];
            connTables.forEach(table => {
                connTableIds.push(table.value);
            });

            let module = 'AddTable';
            let data = {};
            data['Name'] = document.getElementById(collapseInputId).value;
            data['ConnTableIds'] = connTableIds;

            $.ajax({
                type: "POST",
                url: "./php/Router.php",
                data: { 'Module': module, 'Data': data },
                success: function (plugins) {
                    //console.log(data);
                    console.log(JSON.stringify(plugins));
                },
                dataType: 'json'
            });
        });
        //Column
        document.getElementById(`${shellId}_i_${id}_c_collapse_btn`).addEventListener('click', function (e) {
            let module = 'AddColumn';
            let data = {};
            alert(document.getElementById(collapseInputId).value);
            data['TableId'] = document.getElementById(`${shellId}_${id}`).value;
            data['Name'] = document.getElementById(`${collapseInputId}_c`).value;
            data['Size'] = document.getElementById(`${collapseInputId}_c_s`).value;

            $.ajax({
                type: "POST",
                url: "./php/Router.php",
                data: { 'Module': module, 'Data': data },
                success: function (plugins) {
                    //console.log(data);
                    console.log(JSON.stringify(plugins));
                },
                dataType: 'json'
            });
        });

        changeTable(document.getElementById(`${shellId}_${id}`).value);

        document.getElementById(`${shellId}_${id}`).addEventListener('change', function (e) {
            changeTable(this.value);
        });

        if (isFormInput) {
            document.querySelector(`[upload-name="t_103.c_61"][data-place="${shellId}"]`).addEventListener(
                'change',
                function () {
                    setUploadName(shellId);
                }
            );
        }

        //Change table
        function changeTable(tableId) {
            let module = 'CustomData';
            let data = {};
            data['Place'] = '4';
            data['VO'] = {};
            data['VO']['1'] = {};
            data['VO']['1']['1'] = tableId;

            $.ajax({
                type: "POST",
                url: "./php/Router.php",
                data: { 'Module': module, 'Data': data },
                success: function (plugins) {
                    //console.log(data);
                    console.log(JSON.stringify(plugins));

                    let plugin = plugins[1];
                    let columnOpp = plugin.Data['1'].VO;

                    document.getElementById(`${shellId}_${id}_c`).innerHTML = '';
                    for (const option of columnOpp) {
                        document.getElementById(`${shellId}_${id}_c`).insertAdjacentHTML(
                            'beforeend',
                            `<option value="${option.Id}">${option.Name}</option>`
                        );
                    }

                    if (isFormInput) {
                        setUploadName(shellId);
                    }
                },
                dataType: 'json'
            });
            document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
        }

        function setUploadName(shellId) {
            let frgnTableId = document.querySelector(`[upload-name="t_103.c_5_fk"][data-place="${shellId}_cstm"]`).value;
            console.log(frgnTableId);
            let inputType = document.querySelector(`[upload-name="t_103.c_61"][data-place="${shellId}"]`).value;
            console.log(inputType);

            let uploadName = document.querySelector(`[upload-name="t_103.c_36"][data-place="${shellId}"]`);
            if (SelectInput.Decide(inputType)) {
                uploadName.value = `${pluginTable}.c_${frgnTableId}_fk`
            } else {
                let columnName = document.querySelector(`[upload-name="t_103.c_7_fk"][data-place="${shellId}"]`).value;
                console.log(inputType);
                uploadName.value = `t_${frgnTableId}.c_${columnName}`;
            }
        }
    },
    /**
     * Date time
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    DateTime: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            uploadName = objectItem.UploadName,
            required = objectItem.Required,
            visible = objectItem.Visible,
            defaultValue = objectItem.DefaultValue;

        if (defaultValue === null) {
            defaultValue = new Date();
        }

        let visibility = '';
        if (visible === '0') {
            visibility = 'display-none-i';
        }

        defaultValue = DateFunctions.dateToString(defaultValue);

        let readyHTML = "";
        readyHTML += `<div class="form-group input-row ${visibility}">`;
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
    },
    /**
     * Write input with label
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    WriteFilter: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            uploadName = objectItem.UploadName,
            defaultValue = objectItem.DefaultValue;

        if (defaultValue === null) {
            defaultValue = '';
        }

        let readyHTML = "";
        readyHTML += '<div class="my-3">';
        readyHTML += `<input type="text" class="form-control" id="${shellId}_${id}"`
        readyHTML += ` data-place="${shellId}" upload-name="${uploadName}" placeholder="${name}"`
        readyHTML += ` aria-label="${name}" aria-describedby="addon-wrapping">`;
        readyHTML += '</div >';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
    },
    /**
     * Select
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    SelectFilter: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            opportunities = objectItem.Opportunities,
            uploadName = objectItem.UploadName,
            required = objectItem.Required,
            visible = objectItem.Visible,
            defaultValue = objectItem.DefaultValue;

        let visibility = '';
        if (visible === '0') {
            visibility = 'display-none-i';
        }

        let readyHTML = '',
            fullWidth = '',
            formGroup = '',
            label = '';
        if (name !== null) {
            formGroup = 'form-group';
            label += '<label for="' + shellId + '_' + id + '" class="taskfilter-label">' + name + '</label>';
        } else {
            fullWidth = 'full-width-i';
        }

        readyHTML += `<div class="${formGroup} input-row ${visibility}">`;
        readyHTML += label;
        readyHTML += `<select id="${shellId}_${id}" required="${required}" 
                        class="selectpicker my-0 form-control taskfilter ${fullWidth}" 
                        upload-name="${uploadName}" data-place="${shellId}" data-live-search="true">`;

        if (required === '0') {
            readyHTML += `<option value="null" selected>---</option>`;
        }

        for (let k = 0; k < opportunities.length; k++) {
            readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
        }
        readyHTML += '</select></div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);

        //default value
        if (defaultValue !== 'null' && defaultValue !== null && defaultValue !== '') {
            $('#' + shellId + '_' + id).val(defaultValue);
        }
    },
    /**
     * Select
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    SelectSort: function (objectItem, shellId) {
        let id = objectItem.c_103_id,
            name = objectItem.Name,
            uploadName = objectItem.UploadName,
            required = objectItem.Required,
            visible = objectItem.Visible,
            defaultValue = objectItem.DefaultValue;

        let visibility = '';
        if (visible === '0') {
            visibility = 'display-none-i';
        }

        let readyHTML = '',
            fullWidth = '',
            formGroup = '',
            label = '';
        if (name !== null) {
            formGroup = 'form-group';
            label += '<label for="' + shellId + '_' + id + '" class="taskfilter-label">' + name + '</label>';
        } else {
            fullWidth = 'full-width-i';
        }

        readyHTML += `<div class="${formGroup} input-row ${visibility}">`;
        readyHTML += label;

        readyHTML += `<select id="${shellId}_${id}" required="${required}"
                        class="selectpicker my-0 form-control taskfilter"
                        upload-name="${uploadName}" data-place="${shellId}" data-live-search="false">`;
        if (required === '0') {
            readyHTML += '<option value="2">Nincs</option>';
        } readyHTML += '<option value="0">Csökkenő</option>';
        readyHTML += '<option value="1">Növekvő</option>';
        readyHTML += '</select></div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);

        //default value
        if (defaultValue !== 'null' && defaultValue !== null && defaultValue !== '') {
            $('#' + shellId + '_' + id).val(defaultValue);
        }
    }
}
export default FormInputs;