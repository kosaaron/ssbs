/** 
 * Write inputs 
 */
let FormInputs = {
    /**
     * Write input with label
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {String} uploadName 
     * @param {String} defaultValue 
     */
    Write: function (id, name, shellId, uploadName, defaultValue) {
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
     */
    Select: function (id, name, shellId, opportunities, uploadName) {
        let readyHTML = "";
        readyHTML += '<div class="form-group">';
        readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
        readyHTML += '<select id="' + shellId + '_' + id + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
        for (let k = 0; k < opportunities.length; k++) {
            readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
        }
        readyHTML += '</select> </div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
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
     * Date time
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {String} uploadName 
     * @param {String} defaultValue 
     */
    DateTime: function (id, name, shellId, uploadName, defaultValue) {
        defaultValue = defaultValue.toISOString().slice(0,10);

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