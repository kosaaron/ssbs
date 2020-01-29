/**
 * Limit data from server
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import NameAndText from './NameAndText.js';
import ArrayFunctions from './ArrayFunctions.js';
import FormInputs from './../designs/FormInputs.js';

export default class DinamicPopupForm {
    /**
     * Constructor
     * @param {String} targetId 
     * @param {String} targetPos 
     * @param {String} title 
     */
    constructor(targetId, targetPos = 'afterbegin', title) {
        const frameId = targetId + '_dnmcppp';
        document.getElementById(targetId).insertAdjacentHTML(targetPos, this.getFrame(targetId, title));
        document.getElementById(frameId).innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';
    }

    /**
     * 
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

                DinamicPopupForm.onLoad(formData, fillFormData, targetId, entryIdJSON, refreshFn);
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
        const frameId = targetId + '_dnmcppp';

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

        document.getElementById(frameId).innerHTML = '';
        CardContainerPlus.Create(formData, frameId, DinamicPopupForm.loadFormItem);

        //Add click
        document.getElementById(targetId + '_dnmcppp_cancel').addEventListener(
            'click',
            function (e) {
                DinamicPopupForm.cancel(targetId);
            }
        );
        document.getElementById(targetId + '_dnmcppp_save').addEventListener(
            'click',
            function (e) {
                DinamicPopupForm.save(targetId, entryId, refreshFn);
            }
        );
    }

    //Events
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

        DinamicPopupForm.cancel(targetId)
    }

    //Frame
    getFrame(targetId, title) {
        return `
            <div id="${targetId}_dnmcppp_frame" class="dnmcppp-frame">
                <div class="dnmcppp-container-shell">
                    <div class="dnmcppp-container display-flex flex-column">
                        <div class="dnmcppp-header">${title}</div>
                        <div id="${targetId}_dnmcppp" class="dnmcppp-content flex-1"></div>
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