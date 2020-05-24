/**
 * Dinamic Form Popup
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import NameAndText from './NameAndText.js';
import ArrayFunctions from './ArrayFunctions.js';
import FormInputs from './../designs/FormInputs.js';
import StepBox from './Input/StepBox.js';

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
        refreshFn = null,
    ) {
        let module = 'ModuleData';
        let data = {};
        data['CTabId'] = '102';
        data['CModuleId'] = '1004';
        // RequestType: D - default frame, MP - module's plugin, PP plugin's plugin
        data['RequestType'] = 'MP';
        data['FModulePluginId'] = '1';

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (data) {
                let number = '1';
                let place = '100';

                let formData = data[0].Data;
                let formInputs = data[0].Data.Inputs;
                let fillFormData = {}
                if (entryIdJSON !== null) {
                    let entry = ArrayFunctions.GetItem(
                        processesDataArray,
                        entryIdJSON['Name'],
                        entryIdJSON['Id']
                    );

                    for (const formItem of formInputs) {
                        let uploadName = formItem['UploadName'];
                        let value = entry[uploadName];

                        fillFormData[uploadName] = value;
                    }
                }

                let formObject = {
                    'FormData': formInputs,
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
        const frameId = targetId + '_dnmcppp';
        let formInputs = formData.Inputs;

        for (const uploadName in fillFormData) {
            if (fillFormData.hasOwnProperty(uploadName)) {
                const defaultValue = fillFormData[uploadName];

                for (let i = 0; i < formInputs.length; i++) {
                    const entry = formInputs[i];
                    if (entry.UploadName === uploadName) {
                        formInputs[i].DefaultValue = defaultValue;
                        break;
                    }
                }
            }
        }

        document.getElementById(dataFrameId).innerHTML =
            '<h2 id="ntsk_steps_title" class="new-obj-subtitle">Adatok</h2>';

        CardContainerPlus.Create(formInputs, dataFrameId, DinamicFormPopup.loadFormItem);

        //Childs
        let childs = formData.Childs;

        for (const plugin of childs) {
            let place = plugin.Place;
            let number = plugin.Number;
            let childFrameId = `${frameId}_dnmcppp_data_${number}`;

            DinamicFormPopup.placeSwitch(place, frameId, childFrameId);
            DinamicFormPopup.pluginSwitch(frameId, childFrameId, plugin);
        }

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
                //Broadcast for subplug-ins
                let customEvent = new Event(`${frameId}_save`);
                document.getElementById(frameId).dispatchEvent(customEvent);

                //Save default inputs in form
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

    /**
     * placeSwitch
     * @param {String} place 
     * @param {String} targetId 
     * @param {String} childFrameId 
     */
    static placeSwitch(place, targetId, childFrameId) {
        let readyHTML;
        switch (place) {
            case '1':
                readyHTML = `<div id="${childFrameId}" class="new-obj-shell col-12 col-xl-6 full-height"></div>`;
        }

        document.getElementById(targetId).insertAdjacentHTML(
            'beforeend',
            readyHTML
        );
    }

    static pluginSwitch(frameId, target, plugin) {
        let stepBox = new StepBox(frameId, target, plugin);
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
                    objectItem.DefaultValue,
                    objectItem.TableName,
                    objectItem.ColumnName
                );
                break;
            case "WP":
                FormInputs.WritePlus(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.UploadName,
                    objectItem.DefaultValue,
                    objectItem.TableName,
                    objectItem.ColumnName
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
                /*
                FormInputs.StepBox(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.Opportunities,
                    objectItem.UploadName,
                    objectItem.TruncatedIdName
                );*/
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
        let frameId = targetId + '_dnmcppp_frame';
        $('#' + frameId).remove();
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
            FormInputs.InsertInputs(targetId + '_dnmcppp_data', refreshFn);
        } else {
            FormInputs.UpdateInputs(targetId + '_dnmcppp_data', entryId, refreshFn);
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
            fullWidthData = 'col-xl-6';
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