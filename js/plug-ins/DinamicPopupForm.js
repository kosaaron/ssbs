/**
 * Limit data from server
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import FormInputs from './../designs/FormInputs.js';

export default class DinamicPopupForm {
    /**
     * Constructor
     * @param {JSON} formData
     * @param {JSON} fillFormData 
     * @param {String} targetId 
     * @param {String} targetPos 
     */
    constructor(targetId, targetPos = 'afterbegin', title = 'Szerkesztés') {
        const frameId = targetId + '_dnmcppp';
        document.getElementById(targetId).insertAdjacentHTML(targetPos, this.getFrame(targetId, title));
        document.getElementById(frameId).innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';
    }

    //Loads
    onLoad(formData, fillFormData, targetId) {
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
                    objectItem.UploadName
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

    //Frame
    getFrame(targetId, title) {
        return `
            <div class="dnmcppp-frame">
                <div class="dnmcppp-container-shell">
                    <div class="dnmcppp-container display-flex flex-column">
                        <div class="dnmcppp-header">${title}</div>
                        <div id="${targetId}_dnmcppp" class="dnmcppp-content flex-1"></div>
                        <div class="dnmcppp-footer">
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}