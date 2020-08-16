import AutoScroll from "../AutoScroll.js";
import FormInputs from "../../designs/FormInputs.js";
import JSONToUpload from "../JSONToUpload.js";

export default class Gallery {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     * 
     * ------------------------------
     * @param {JSON} data 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    constructor(data, frameId, parentFrameId) {
        Gallery.load(frameId);
        this.events(parentFrameId, frameId);
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
            Gallery.uploadSteps(fkColumn, lastId, parentFrameId);
        });

        $(`#${frameId}_add`).bind(`click`, function (e) {
            $(`#${frameId}_add_input`).click();
        });

        $(`#${frameId}_add_input`).bind('change', function (e) {
            let changeData = {};
            //changeData.Remove = [];
            changeData.Add = [];

            let files = document.getElementById(`${frameId}_add_input`).files;
            let fLength = files.length;
            for (let i = 0; i < fLength; i++) {
                const file = files[i];

                let reader = new FileReader();

                reader.onloadend = function () {
                    let imgObj = {};
                    imgObj.fileName = file.name;
                    imgObj.src = reader.result;
                    changeData.Add.push(imgObj);

                    document.getElementById(`${frameId}_cont`).insertAdjacentHTML(
                        'beforeend',
                        `<div class="gallery-item-shell display-flex flex-column  justify-content-center">
                        <img class="gallery-item" src="${reader.result}"><div>`
                    )

                    if (fLength - 1 === i) {
                        localStorage.setItem(`${frameId}_uploaded_data`, JSON.stringify(changeData));
                        $(`#${parentFrameId}`).trigger(`${parentFrameId}_child_loaded`);
                    }
                }

                if (file) {
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    /**
     * getFrameHTML
     */
    static getFrameHTML(frameId) {
        return `
            <h2 class="new-obj-subtitle">Galéria</h2>
            <div id="${frameId}_cont" class="">
                <div class="upload-img-shell">
                    <div id="${frameId}_add" class="img-upload justify-content-center display-flex flex-column">
                        <div class="text-center">
                            <div>
                                <div class="icon-own-product-documents item-icon"></div>
                            </div>
                            <div>
                                <h6 class="menu-item-text unselectable">Choose image</h6>
                            </div>
                        </div>
                    </div>
                    <input type="file" id="${frameId}_add_input" class="custom-input" multiple
                        accept="image/x-png,image/gif,image/jpeg"/>
                </div>
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
        //let steps = document.querySelectorAll('[data-place=processes_new_t_steps]');

        if (false) {
            let uploadData = [];

            //let className = 'InsertByParam';
            let className = '';

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