/**
 * Dinamic Form Popup
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import NameAndText from './NameAndText.js';
import ArrayFunctions from './ArrayFunctions.js';
import FormInputs from './../designs/FormInputs.js';
import StepBox from './Input/StepBox.js';
import SwitchPlugin from './SwitchPlugin.js';
import AutoScroll from './AutoScroll.js';

export default class DinamicFormPopup {
    static saveEventMax = 0;
    static saveEventCounter = 0;
    /**
     * Constructor
     * @param {String} targetId 
     * @param {String} targetPos 
     * @param {String} title 
     */
    constructor(plugin, frameId, parentFrameId) {
        const title = plugin['Plugin name'];
        let isFullscreen = true;
        if (plugin.Childs === []) {
            isFullscreen = false;
        }

        localStorage.setItem(frameId, JSON.stringify(plugin));

        this.create(frameId, parentFrameId);
        this.events(frameId, parentFrameId, title, isFullscreen);
    }

    /**
     * Create
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    create(frameId, parentFrameId) {
        document.getElementById(parentFrameId).insertAdjacentHTML(
            'beforeend',
            this.getPlusBtnCard(frameId),
        );
    }
    /**
     * Events
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {String} title 
     * @param {String} isFullscreen 
     */
    events(frameId, parentFrameId, title, isFullscreen) {
        document.getElementById(`${frameId}_btn`).addEventListener('click', function (e) {
            DinamicFormPopup.open(frameId, parentFrameId, title, isFullscreen);
        });
    }

    /**
     * GetPlusBtnCard
     * @param {String} frameId 
     */
    getPlusBtnCard(frameId) {
        return `<button id="${frameId}_btn" class="btn btn-primary fixedaddbutton">
                <i class="fas fa-plus"></i>
            </button>`;
    }

    /**
     * Open
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {String} title 
     * @param {String} isFullscreen 
     */
    static open(frameId, parentFrameId, title, isFullscreen) {
        document.getElementById(parentFrameId).insertAdjacentHTML(
            'beforeend',
            this.getFrame(frameId, title, isFullscreen)
        );
        document.getElementById(`${frameId}_data`).innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

        this.setPopupSize(frameId);
        this.loadFormData(frameId);

        AutoScroll.Integration(frameId);
    }

    /**
     * Set popup size
     * @param {String} frameId 
     */
    static setPopupSize(frameId) {
        let element2 = $(`#${frameId}_frame`);
        element2.height(element2.parent().height());
    }

    /**
     * Load form data
     * @param {String} addNFormId 
     * @param {JSON} dataArray 
     * @param {String} targetId 
     * @param {JSON} entryIdJSON use it only for update
     * @param {Function} setUploadsCallback 
     */
    static loadFormData(
        frameId,
        dataArray = null,
        entryIdJSON = null,
        setUploadsCallback = null,
    ) {
        let plugin = localStorage.getItem(frameId);

        if (plugin !== null) {
            plugin = JSON.parse(plugin);
            success(plugin);
            return;
        }

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
                console.log(JSON.stringify(data));
                success(data[0]);
            },
            dataType: 'json'
        });

        function success(plugin) {
            let number = '1';
            let place = '100';

            let formData = plugin.Data;
            let formInputs = plugin.Data.Inputs;
            let fillFormData = {}
            if (entryIdJSON !== null) {
                let entry = ArrayFunctions.GetItem(
                    dataArray,
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

            DinamicFormPopup.onLoad(formData, fillFormData, frameId, entryIdJSON);
        }
    }

    /**
     * Loads
     * @param {JSON} formData
     * @param {JSON} fillFormData 
     * @param {String} frameId 
     * @param {JSON} entryId 
     */
    static onLoad(formData, fillFormData, frameId, entryId = null) {
        const dataFrameId = frameId + '_data';
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
            let childFrameId = `${frameId}_child_${number}`;

            DinamicFormPopup.placeSwitch(place, frameId, childFrameId);
            let switchPlugin = new SwitchPlugin();
            switchPlugin.Create(plugin, childFrameId, frameId);
        }

        //Add click
        document.getElementById(frameId + '_cancel').addEventListener(
            'click',
            function (e) {
                DinamicFormPopup.cancel(frameId);
            }
        );

        document.getElementById(frameId + '_save').addEventListener(
            'click',
            function (e) {
                //Save default inputs in form
                DinamicFormPopup.save(frameId, entryId);
            }
        );

        document.onkeydown = function (e) {
            switch (e.code) {
                case 'Escape':
                    DinamicFormPopup.cancel(frameId);
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
        /*
        switch (place) {
            case '1':
                readyHTML = `<div id="${childFrameId}" class="new-obj-shell col-12 col-xl-6 full-height"></div>`;
        }*/
        readyHTML = `<div id="${childFrameId}" class="new-obj-shell col-12 col-xl-6 full-height"></div>`;


        document.getElementById(targetId).insertAdjacentHTML(
            'beforeend',
            readyHTML
        );
    }

    /**
     *PluginSwitch
     * @param {String} frameId 
     * @param {String} target 
     * @param {JSON} plugin 
     */
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
                    objectItem,
                    shellId
                );
                break;
            case "WP":
                FormInputs.WritePlus(
                    objectItem,
                    shellId
                );
                break;
            case "S":
                FormInputs.Select(
                    objectItem,
                    shellId
                );
                break;
            case "SN":
                FormInputs.SelectOrNew(
                    objectItem,
                    shellId
                );
                break;
            case "DT":
                FormInputs.DateTime(
                    objectItem,
                    shellId
                );
                break;
            default:
                break;
        }
    }

    /**
     * Cancel
     * @param {String} frameId 
     */
    static cancel(frameId) {
        $(`#${frameId}_frame`).remove();
        document.onkeydown = null;
    }

    /**
     * Save
     * @param {String} targetId 
     * @param {JSON} entryId 
     */
    static save(frameId, entryId) {
        let dataFrameId = frameId + '_data';

        if (entryId === null) {
            FormInputs.InsertInputs(dataFrameId, function (result) {
                DinamicFormPopup.saveCallback(frameId, result);
            });
        } else {
            FormInputs.UpdateInputs(dataFrameId, entryId, DinamicFormPopup.saveCallback);
        }
    }

    static saveCallback(frameId, result) {
        let tableResultData = {};

        for (const table in result[0]) {
            if (result[0].hasOwnProperty(table)) {
                tableResultData = result[0][table];
            }
        }

        if (tableResultData['Result'] === 'S') {
            let frameElement = document.getElementById(frameId);
            frameElement.setAttribute('last-id', tableResultData['LastId']);
            frameElement.setAttribute('last-id-colomn', tableResultData['LastIdColumn']);

            let counter = 1;
            //Broadcast event get response
            $(`#${frameId}`).bind(`${frameId}_save_end`, function (e) {
                if (counter === saveEventMax) {
                    Swal.fire({
                        type: 'success',
                        title: 'Siker',
                        text: 'A feladat létrehozása sikeres volt!',
                        heightAuto: false
                    });
                    DinamicFormPopup.cancel(frameId);
                }
                ++counter;
            });

            //Broadcast for subplug-ins
            let saveEventMax = 0;
            $.each($._data($(`#${frameId}`)[0], "events"), function (i, event) {
                if (i === `${frameId}_save`) {
                    $.each(event, function (j, h) {
                        ++saveEventMax;
                    });
                }
            });

            $(`#${frameId}`).trigger(`${frameId}_save`);
        }
    }

    /** Frame **/
    /**
     * Get frame
     * @param {String} frameId 
     * @param {String} title 
     * @param {Boolean} isFullscreen 
     */
    static getFrame(frameId, title, isFullscreen) {
        let fullscreenHTML = '';
        let fullWidthData = ''
        if (isFullscreen) {
            fullscreenHTML = 'dnmcppp-container-full';
            fullWidthData = 'col-xl-6';
        }
        return `
            <div id="${frameId}_frame" class="dnmcppp-frame">
                <div class="dnmcppp-container-shell">
                    <div class="dnmcppp-container ${fullscreenHTML} display-flex flex-column">
                        <div class="dnmcppp-header">${title}</div>
                        <div id="${frameId}" class="dnmcppp-content">
                            <div id="${frameId}_data" class="new-obj-shell col-12 ${fullWidthData}"></div>
                        </div>
                        <div class="dnmcppp-footer">
                            <div class="display-flex justify-content-center">
                                <div id="${frameId}_cancel" class="cancel-btn-1 btn btn-sm">
                                    ${NameAndText.getText('cancel')}
                                </div>    
                                <div id="${frameId}_save" class="save-btn-1 btn btn-sm">
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