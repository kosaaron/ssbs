import CardDesigns from "../../designs/CardDesigns.js";
import CreateBox from "../CreateBox.js";
import FormInputs from "../../designs/FormInputs.js";
import CardNumber from "../objects/CardNumber.js";
import DinamicFormPopup from "../DinamicFormPopup.js";

export default class CardBox {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     *   <frameId>_change_details
     * ------------------------------
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    constructor(plugin, frameId, parentFrameId) {
        if (!plugin.hasOwnProperty('Data')) {
            console.log('There is no data in CardBox');
            return;
        } else if (!plugin.Data.hasOwnProperty('1')) {
            console.log('There is no data in CardBox');
            return;
        }

        if (localStorage.getItem('DevelopMode') === 'true') {
            //Create add card frame
            document.getElementById(frameId).insertAdjacentHTML(
                'beforebegin',
                CardBox.getDevFrame(frameId)
            );

            let fPluginDisplayId = plugin.Data['1'].FPluginDisplayId;

            CardBox.getDevData(frameId, fPluginDisplayId);
            CardBox.devSaveEvent(plugin, frameId);
        }

        let isMore = false;
        let newData = plugin.Data['1'].Display.Data;
        if (newData.length === 21) {
            isMore = true;
            newData.pop();
        }

        CardBox.createBox(plugin, frameId, parentFrameId, isMore);
        this.events(plugin, frameId, parentFrameId);
    }

    /**
     * GetDevData
     * @param {String} frameId 
     * @param {String} fPluginDisplayId 
     */
    static getDevData(frameId, fPluginDisplayId) {
        let module = 'CustomData';
        let data = {};
        data['Place'] = '5';

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (plugins) {
                //console.log(data);
                console.log(JSON.stringify(plugins));

                let cBDevPlugin = plugins[1];

                if (cBDevPlugin === undefined) {
                    console.warn('No data at CardBox dev.')
                    cBDevPlugin = { Data: null }
                }

                if (!cBDevPlugin.hasOwnProperty('Data')) {
                    console.warn('No data at CardBox dev.')

                    cBDevPlugin = { Data: null }
                }

                let cBDevInputs = [];
                if (cBDevPlugin.Data.hasOwnProperty('1')) {
                    cBDevInputs = cBDevPlugin.Data['1'].Inputs;
                }
                if (cBDevPlugin.Data.hasOwnProperty('2')) {
                    let displayInput = {};
                    displayInput['FFormInputId'] = '1';
                    displayInput['Type'] = 'W';
                    displayInput['Name'] = 'FPluginDisplayFK';
                    displayInput['UploadName'] = 'f_display.FPluginDisplayFK';
                    displayInput['Required'] = '1';
                    displayInput['Visible'] = '0';
                    displayInput['DefaultValue'] = fPluginDisplayId;
                    displayInput['TableName'] = 'f_plugin_display';
                    displayInput['ColumnName'] = 'FPluginDisplayId';

                    cBDevPlugin.Data['2'].Inputs.push(displayInput);
                }

                let cardNumberInpt = {};

                for (const cBDevInput of cBDevInputs) {
                    if (cBDevInput.Number === '2') {
                        cardNumberInpt = cBDevInput;
                    }
                    switch (cBDevInput.Number) {
                        case '2':
                            cardNumberInpt = cBDevInput;
                            break;
                    }
                }

                let shellId = `${frameId}_dev_card_id`;
                FormInputs.Select(cardNumberInpt, shellId);

                let cardIdDOM = document.querySelector(`[upload-name="f_plugin_cards.CCardFK"][data-place="${shellId}"]`);
                let cardId = cardIdDOM.value;

                changeCard(frameId, cardId);

                cardIdDOM.addEventListener('change', function () {
                    cardId = cardIdDOM.value;
                    changeCard(frameId, cardId);
                })

                function changeCard(frameId, cardId) {
                    let cardShellId = `${frameId}_dev_card`;
                    let inputsShellId = `${frameId}_dev_inputs`;

                    document.getElementById(cardShellId).innerHTML = "";
                    document.getElementById(inputsShellId).innerHTML = "";

                    let devCard = CardDesigns.getCardById(cardId, cardShellId);
                    devCard = devCard.replaceAll('!', '');

                    let cardNumbers = CardNumber.GetNumbers(devCard);
                    for (const cardNumber of cardNumbers) {
                        devCard = devCard.replaceAll(`*${cardNumber}*`, `<span number="${cardNumber}" data-place="${inputsShellId}_place">*${cardNumber}*</span>`);
                    }

                    document.getElementById(cardShellId).insertAdjacentHTML(
                        'beforeend',
                        devCard
                    );

                    $(`[data-place="${inputsShellId}_place"]`).click(function () {
                        let parentFrameId = 'content_frame';
                        let number = $(this).attr('number');
                        let title = `${number}. place`;

                        let displayInput = {};
                        displayInput['FFormInputId'] = '2';
                        displayInput['Type'] = 'W';
                        displayInput['Name'] = 'Number';
                        displayInput['UploadName'] = 'f_display.Number';
                        displayInput['Required'] = '1';
                        displayInput['Visible'] = '0';
                        displayInput['DefaultValue'] = number;
                        displayInput['TableName'] = 'f_display';
                        displayInput['ColumnName'] = 'Number';

                        if (cBDevPlugin.Data['2'].Inputs.length > 2) {
                            cBDevPlugin.Data['2'].Inputs.pop();
                        }
                        cBDevPlugin.Data['2'].Inputs.push(displayInput);

                        let childFrameId = `${frameId}_card_dev`;
                        let popupInputsShellId = `${childFrameId}_data`;
                        let transferData = {};
                        transferData['IsFormInput'] = false;
                        localStorage.setItem(popupInputsShellId, JSON.stringify(transferData));

                        DinamicFormPopup.open(childFrameId, parentFrameId, title, false);
                        DinamicFormPopup.onLoad(cBDevPlugin.Data['2'], childFrameId, parentFrameId, []);
                    });
                }
            },
            dataType: 'json'
        });
    }

    static getDevFrame(frameId) {
        return `<div>
                    <div id="${frameId}_dev_card_id"></div>
                    <div id="${frameId}_dev_card"></div>
                    <div id="${frameId}_dev_inputs"></div>
                    <div><button id="${frameId}_dev_save">Save</button></div>
                </div>`;
    }

    static getInsertCard(frameId) {
        return `${frameId}`;
    }

    static devSaveEvent(plugin, frameId) {
        document.getElementById(`${frameId}_dev_save`).addEventListener('click', function () {
            let shellId = `${frameId}_dev_card_id`;
            let CCardFK = document.querySelector(`[upload-name="f_plugin_cards.CCardFK"][data-place="${shellId}"]`).value;
            let updateData = [];
            let tables = {};

            tables['f_plugin_cards'] = {};
            tables['f_plugin_cards']['CCardFK'] = CCardFK;
            updateData.push(tables);

            let entryId = {};
            entryId['IdColumn'] = 'FPluginCardId';
            entryId['Id'] = plugin.Data.FPluginCardId[1];

            $.ajax({
                type: "POST",
                url: "./php/UpdateDataWithParam.php",
                data: { 'Data': tables, 'EntryId': entryId },
                success: function (result) {
                    console.log(result);
                },
                dataType: 'json'
            });
        });
    }

    /**
     * Events
     * @param {String} parentFrameId 
     */
    events(plugin, frameId, parentFrameId) {
        $(`#${parentFrameId}`).bind(`${parentFrameId}_change_filter`, function (e) {
            // Retrieve the data from storage
            let filterData = JSON.parse(localStorage.getItem(`${parentFrameId}_filter`));
            let sortData = JSON.parse(localStorage.getItem(`${parentFrameId}_sort`));
            let limiterData = JSON.parse(localStorage.getItem(`${parentFrameId}_limiter`));

            CardBox.filtering(plugin, frameId, parentFrameId, filterData, sortData, limiterData);
        });

        $(`#${parentFrameId}`).bind(`${parentFrameId}_data_reload`, function (e) {
            // Retrieve the data from storage
            let filterData = JSON.parse(localStorage.getItem(`${parentFrameId}_filter`));
            let sortData = JSON.parse(localStorage.getItem(`${parentFrameId}_sort`));
            let limiterData = JSON.parse(localStorage.getItem(`${parentFrameId}_limiter`));
            limiterData.Offset = 0;

            CardBox.filtering(plugin, frameId, parentFrameId, filterData, sortData, limiterData);
        });

    }

    /**
     * CreateBox
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {Boolean} isMore 
     */
    static createBox(plugin, frameId, parentFrameId, isMore) {
        let card = CardBox.getCard(plugin, frameId);
        //First data package
        let displayObject = plugin.Data['1'].Display;
        let createBox = new CreateBox();
        createBox.create(displayObject, card, frameId);

        let cards = document.querySelectorAll(`[data-place="${frameId}"]`);
        for (const card of cards) {
            card.addEventListener('click', function (e) {
                let changeData = {};
                changeData['ObjectId'] = this.getAttribute('object-id');
                localStorage.setItem(`${parentFrameId}_change_details`, JSON.stringify(changeData));
                $(`#${parentFrameId}`).trigger(`${parentFrameId}_change_details`);
                $(`.cc-details-container`).show();
            })
        }

        if (isMore) {
            let limiterData = {};
            limiterData.TargetId = frameId;
            localStorage.setItem(`${parentFrameId}_limiter_create`, JSON.stringify(limiterData));
            $(`#${parentFrameId}`).trigger(`${parentFrameId}_limiter_create`);
        }
    }

    /**
     * Filtering
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {JSON} filterData 
     * @param {JSON} sortData 
     * @param {JSON} limiterData 
     */
    static filtering(plugin, frameId, parentFrameId, filterData, sortData, limiterData) {
        let className = 'ModuleData';

        let uploadData = {};
        uploadData['CModuleId'] = plugin['CModuleId'];
        uploadData['RequestType'] = plugin['RequestType'];
        uploadData['FilterData'] = filterData;
        uploadData['SortData'] = sortData;
        uploadData['LimiterData'] = limiterData;
        if (plugin['RequestType'] === 'MP') {
            uploadData['FModulePluginId'] = plugin['FModulePluginId'];
        } else {
            uploadData['FPluginPluginId'] = plugin['FPluginPluginId'];
        }

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': className, 'Data': uploadData },
            success: function (result) {
                let newPlugin = result[0];
                let newData = newPlugin.Data['1'].Display.Data;
                let isMore = false;

                if (newData.length === 21) {
                    isMore = true;
                    newData.pop();
                }

                if (limiterData.Offset === '0' || limiterData.Offset === 0) {
                    plugin.Data['1'].Display.Data = newPlugin.Data['1'].Display.Data;
                } else {
                    plugin.Data['1'].Display.Data = plugin.Data['1'].Display.Data.concat(newData);
                }

                //console.log(result);
                console.log(JSON.stringify(plugin));
                console.log(JSON.stringify(result));
                document.getElementById(frameId).innerHTML = '';
                CardBox.createBox(plugin, frameId, parentFrameId, isMore);
            },
            dataType: 'json'
        });
    }
    static isMoreButton(pluginData) {
        if (pluginData.length === 21) {
            isMore = true;
        }

        newData.pop();
    }

    /**
     * getCard
     * @param {JSON} plugin 
     * @param {String} frameId 
     */
    static getCard(plugin, frameId) {
        let cardId = plugin.Data['CCardId']['1'];
        return CardDesigns.getCardById(cardId, frameId)
    }
}