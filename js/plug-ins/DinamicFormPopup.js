/**
 * Limit data from server
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import NameAndText from './NameAndText.js';
import ArrayFunctions from './ArrayFunctions.js';
import FormInputs from './../designs/FormInputs.js';

export default class DinamicFormPopup {
    /**
     * Constructor
     * @param {String} targetId 
     * @param {String} targetPos 
     * @param {String} title 
     */
    constructor(targetId, targetPos = 'afterbegin', title, isFullscreen = false) {
        const dataFrameId = targetId + '_dnmcppp_data';

        document.getElementById(targetId).insertAdjacentHTML(
            targetPos,
            this.getFrame(targetId, title, isFullscreen)
        );
        document.getElementById(dataFrameId).innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        this.setPopupSize(targetId);
    }

    /**
     * Set popup size
     */
    setPopupSize(targetId) {
        let element = $(`#${targetId}_dnmcppp_frame`);

        element.height(element.parent().height());
    }

    /**
     * Load form data
     * @param {String} addNFormId 
     * @param {JSON} processesDataArray 
     * @param {String} targetId 
     * @param {JSON} entryIdJSON use it only for update
     * @param {Function} setUploadsCallback 
     * @param {Function} refreshFn 
     */
    loadFormData(
        addNFormId,
        processesDataArray,
        targetId,
        entryIdJSON = null,
        setUploadsCallback = null,
        refreshFn = null
    ) {
        $.ajax({
            type: "POST",
            url: "./php/GetFormData.php",
            data: { 'FormId': addNFormId },
            success: function (data) {
                let formData = data.FormStructure.Data;
                let fillFormData = {}
                if (entryIdJSON !== null) {
                    let entry = ArrayFunctions.GetItem(
                        processesDataArray,
                        entryIdJSON['Name'],
                        entryIdJSON['Id']
                    );

                    for (const formItem of formData) {
                        let uploadName = formItem['UploadName'];
                        let value = entry[formItem['UploadName']];

                        fillFormData[uploadName] = value;
                    }
                }

                let formObject = {
                    'FormData': formData,
                    'FillFormData': fillFormData
                }

                if (setUploadsCallback !== null) {
                    formObject = setUploadsCallback(formObject);
                }

                DinamicFormPopup.onLoad(formData, fillFormData, targetId, entryIdJSON, refreshFn);
            },
            dataType: 'json'
        });
    }

    /**
     * Loads
     * @param {JSON} formData
     * @param {JSON} fillFormData 
     * @param {String} targetId 
     * @param {JSON} entryId 
     * @param {Function} refreshFn 
     */
    static onLoad(formData, fillFormData, targetId, entryId = null, refreshFn) {
        const dataFrameId = targetId + '_dnmcppp_data';

        for (const uploadName in fillFormData) {
            if (fillFormData.hasOwnProperty(uploadName)) {
                const defaultValue = fillFormData[uploadName];

                for (let i = 0; i < formData.length; i++) {
                    const entry = formData[i];
                    if (entry.UploadName === uploadName) {
                        formData[i].DefaultValue = defaultValue;
                        break;
                    }
                }
            }
        }

        document.getElementById(dataFrameId).innerHTML =
            '<h2 id="ntsk_steps_title" class="new-obj-subtitle">Adatok</h2>';
        CardContainerPlus.Create(formData, dataFrameId, DinamicFormPopup.loadFormItem);

        //Add click
        document.getElementById(targetId + '_dnmcppp_cancel').addEventListener(
            'click',
            function (e) {
                DinamicFormPopup.cancel(targetId);
            }
        );
        document.getElementById(targetId + '_dnmcppp_save').addEventListener(
            'click',
            function (e) {
                DinamicFormPopup.save(targetId, entryId, refreshFn);
            }
        );

        document.onkeydown = function (e) {
            switch (e.code) {
                case 'Escape':
                    DinamicFormPopup.cancel(targetId);
                    break;
            }
        }
    }

    /** Events **/
    //click
    /**
     * Load form item
     * @param {JSON} objectItem 
     * @param {String} shellId 
     */
    static loadFormItem(objectItem, shellId) {
        switch (objectItem.Type) {
            case "W":
                FormInputs.Write(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.UploadName,
                    objectItem.DefaultValue
                );
                break;
            case "S":
                FormInputs.Select(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.Opportunities,
                    objectItem.UploadName,
                    objectItem.Required,
                    objectItem.DefaultValue
                );
                break;
            case "SN":
                FormInputs.SelectOrNew(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.Opportunities,
                    objectItem.UploadName,
                    objectItem.TruncatedIdName
                );
                break;
            case "ST":
                FormInputs.StepBox(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.Opportunities,
                    objectItem.UploadName,
                    objectItem.TruncatedIdName
                );
                break;
            case "DT":
                FormInputs.DateTime(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.UploadName,
                    objectItem.DefaultValue
                );
                break;
            default:
                break;
        }
    }

    /**
     * Cancel
     * @param {String} targetId 
     */
    static cancel(targetId) {
        $('#' + targetId + '_dnmcppp_frame').remove();
        document.onkeydown = null;
    }

    /**
     * Save
     * @param {String} targetId 
     * @param {JSON} entryId 
     * @param {Function} refreshFn 
     */
    static save(targetId, entryId, refreshFn) {
        //prco_dnmcppp
        if (entryId === null) {
            FormInputs.InsertInputs(targetId + '_dnmcppp', refreshFn);
        } else {
            FormInputs.UpdateInputs(targetId + '_dnmcppp', entryId, refreshFn);
        }

        DinamicFormPopup.cancel(targetId)
    }

    /** Frame **/
    /**
     * Get frame
     * @param {String} targetId 
     * @param {String} title 
     * @param {Boolean} isFullscreen 
     */
    getFrame(targetId, title, isFullscreen) {
        let fullscreenHTML = '';
        let fullWidthData = ''
        if (isFullscreen) {
            fullscreenHTML = 'dnmcppp-container-full';
            fullWidthData = 'col-md-6';
        }
        return `
            <div id="${targetId}_dnmcppp_frame" class="dnmcppp-frame">
                <div class="dnmcppp-container-shell">
                    <div class="dnmcppp-container ${fullscreenHTML} display-flex flex-column">
                        <div class="dnmcppp-header">${title}</div>
                        <div id="${targetId}_dnmcppp" class="dnmcppp-content flex-1">
                            <div id="${targetId}_dnmcppp_data" class="new-obj-shell col-12 ${fullWidthData}"></div>
                        </div>
                        <div class="dnmcppp-footer">
                            <div class="display-flex justify-content-center">
                                <div id="${targetId}_dnmcppp_cancel" class="cancel-btn-1 btn btn-sm">
                                    ${NameAndText.getText('cancel')}
                                </div>    
                                <div id="${targetId}_dnmcppp_save" class="save-btn-1 btn btn-sm">
                                    ${NameAndText.getText('save')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}