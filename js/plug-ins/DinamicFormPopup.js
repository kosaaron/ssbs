/**
 * Dinamic Form Popup
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import NameAndText from './NameAndText.js';
import FormInputs from './../designs/FormInputs.js';
import StepBox from './Input/StepBox.js';
import SwitchPlugin from './SwitchPlugin.js';
import AutoScroll from './AutoScroll.js';
import AddInput from './objects/AddInput.js';

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
        if (plugin.Data.Children.length === 0) {
            isFullscreen = false;
        }

        localStorage.setItem(frameId, JSON.stringify(plugin));
        localStorage.setItem(`${parentFrameId}_edit_mode`, 'true');

        this.events(frameId, parentFrameId, title, isFullscreen);
    }

    /**
     * Events
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {String} title 
     * @param {Boolean} isFullscreen 
     */
    events(frameId, parentFrameId, title, isFullscreen) {
        $(`#${parentFrameId}`).bind(`${parentFrameId}_open_form`, function () {
            DinamicFormPopup.open(frameId, parentFrameId, title, isFullscreen);

            let openFormData = {};
            openFormData = JSON.parse(localStorage.getItem(`${parentFrameId}_open_form`));

            let detailsIdData = null;
            if (openFormData.Type === 'update') {
                detailsIdData = JSON.parse(localStorage.getItem(`${parentFrameId}_data_details_id`));
            }

            DinamicFormPopup.loadFormData(frameId, detailsIdData, parentFrameId);
        });
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
     * @param {String} frameId 
     * @param {JSON} entryIdJSON use it only for update
     * @param {String} parentFrameId 
     */
    static loadFormData(
        frameId,
        entryIdJSON = null,
        parentFrameId
    ) {
        let plugin = JSON.parse(localStorage.getItem(frameId));

        /*
        if (plugin !== null) {
            plugin = JSON.parse(plugin);
            success(plugin);
            return;
        }*/

        let module = 'ModuleData';
        let data = {};
        data['CModuleId'] = plugin['CModuleId'];
        // RequestType: D - default frame, MP - module's plugin, PP plugin's plugin
        data['RequestType'] = plugin['RequestType'];
        data['FModulePluginId'] = plugin['FModulePluginId'];
        data['IdOfData'] = null;

        if (entryIdJSON !== null) {
            data['IdOfData'] = entryIdJSON.Id;
        }

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (data) {
                console.log(JSON.stringify(data));
                success(data[0], entryIdJSON, parentFrameId);
            },
            dataType: 'json'
        });

        function success(plugin, entryIdJSON, parentFrameId) {
            let formData = plugin.Data['1'];
            let children = plugin.Data['Children'];

            DinamicFormPopup.onLoad(formData, frameId, parentFrameId, children, entryIdJSON);
        }
    }

    /**
     * Loads
     * @param {JSON} formData
     * @param {String} frameId 
     * @param {JSON} entryId 
     */
    static onLoad(formData, frameId, parentFrameId, children, entryId = null) {
        AutoScroll.Integration(frameId);

        const dataFrameId = frameId + '_data';

        if (formData === undefined || formData === null) {
            console.warn('No data at dinamic popup.')
            formData = { Inputs: [] }
        }

        if (!formData.hasOwnProperty('Inputs')) {
            console.warn('No data at dinamic popup.')

            formData['Inputs'] = [];
        }

        let formInputs = formData.Inputs;

        document.getElementById(dataFrameId).innerHTML =
            '<h2 id="ntsk_steps_title" class="new-obj-subtitle">Adatok</h2>';

        CardContainerPlus.Create(formInputs, dataFrameId, DinamicFormPopup.loadFormItem);

        if (localStorage.getItem('DevelopMode') === 'true') {
            let FPluginFormInputId = formData.FPluginFormInputId;
            AddInput.Integration(`${frameId}_data`, FPluginFormInputId);
        }

        for (const plugin of children) {
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
                DinamicFormPopup.save(frameId, parentFrameId, entryId);
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
            case "SC":
                FormInputs.SelectColumn(
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
    static save(frameId, parentFrameId, entryId) {
        let dataFrameId = frameId + '_data';

        if (entryId === null) {
            FormInputs.InsertInputs(dataFrameId, function (result) {
                DinamicFormPopup.saveCallback(frameId, result, parentFrameId, true);
            });
        } else {
            FormInputs.UpdateInputs(dataFrameId, entryId, function (result) {
                DinamicFormPopup.saveCallback(frameId, result, parentFrameId, false);
            });
        }
    }

    static saveCallback(frameId, result, parentFrameId, isNew) {
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
                    let text = '';
                    if (isNew) {
                        text = 'A feladat létrehozása sikeres volt!';
                    } else {
                        text = 'A feladat sikeresen frissült!';
                    }

                    Swal.fire({
                        type: 'success',
                        title: 'Siker',
                        text: text,
                        heightAuto: false
                    });
                    DinamicFormPopup.cancel(frameId);

                    $(`#${parentFrameId}`).trigger(`${parentFrameId}_data_reload`);
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

            if (saveEventMax === 0) {
                let text = '';
                if (isNew) {
                    text = 'A feladat létrehozása sikeres volt!';
                } else {
                    text = 'A feladat sikeresen frissült!';
                }

                Swal.fire({
                    type: 'success',
                    title: 'Siker',
                    text: text,
                    heightAuto: false
                });
                DinamicFormPopup.cancel(frameId);

                $(`#${parentFrameId}`).trigger(`${parentFrameId}_data_reload`);
            }

            let resultIdObject = {};
            resultIdObject['LastId'] = tableResultData['LastId'];
            resultIdObject['LastIdColumn'] = tableResultData['LastIdColumn'];
            localStorage.setItem(`${frameId}_save`, JSON.stringify(resultIdObject));

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