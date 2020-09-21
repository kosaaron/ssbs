import AutoScroll from "../AutoScroll.js";
import DinamicFormPopup from "../DinamicFormPopup.js";
import CardNumber from "./CardNumber.js";

/**
 * Fill Card
 */
export default class FillCard {
    /**
     * Create
     * @param {String} card 
     * @param {String} fPluginDisplayId 
     * @param {Boolean} isG 
     */
    static Integrate(card, fPluginDisplayId, isG = false) {
        console.log(fPluginDisplayId);
        let parentFrameId = 'content_frame';
        let frameId = 'dev_fil_card';

        let module = 'CustomData';
        let data = {};
        data['Place'] = '7';
        data['VO'] = {};
        data['VO']['1'] = {};
        data['VO']['1']['1'] = fPluginDisplayId;

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (plugins) {
                //console.log(data);
                console.log(JSON.stringify(plugins));

                if (isG) {
                    FillCard.createFrameG(plugins, frameId, parentFrameId, fPluginDisplayId);
                } else {
                    FillCard.createFrame(plugins, frameId, parentFrameId, card, fPluginDisplayId);
                }
            },
            dataType: 'json'
        });


    }

    /**
     * Events
     * @param {JSON} pluginInpt 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    static events(pluginInpt, frameId, parentFrameId, fPluginDisplayId) {
        let childFrameId = `${frameId}_item`;

        //Add click
        document.getElementById(frameId + '_cancel').addEventListener(
            'click',
            function (e) {
                FillCard.cancel(frameId);
            }
        );

        document.onkeydown = function (e) {
            switch (e.code) {
                case 'Escape':
                    FillCard.cancel(frameId);
                    break;
            }
        }

        let displayInput = {};
        displayInput['c_103_id'] = '1';
        displayInput['Type'] = 'W';
        displayInput['Name'] = 'c_106_fk';
        displayInput['UploadName'] = 't_102.c_106_fk';
        displayInput['Required'] = '1';
        displayInput['Visible'] = '0';
        displayInput['DefaultValue'] = fPluginDisplayId;
        displayInput['TableName'] = 't_106';
        displayInput['ColumnName'] = 'c_106_id';

        pluginInpt.Data['1'].Inputs.push(displayInput);

        $(`[data-place="${frameId}_ins_num"]`).click(function () {
            let number = $(this).attr('Number');
            let title = `${number}. place add`;

            if (pluginInpt.Data['1'].Inputs.length < 3) {
                let displayInput = {};
                displayInput['c_103_id'] = '2';
                displayInput['Type'] = 'W';
                displayInput['Name'] = 'Number';
                displayInput['UploadName'] = 't_102.c_60';
                displayInput['Required'] = '1';
                displayInput['Visible'] = '0';
                displayInput['DefaultValue'] = number;
                displayInput['TableName'] = 't_102';
                displayInput['ColumnName'] = 'c_60';
                pluginInpt.Data['1'].Inputs.push(displayInput);
            } else {
                let keys = Object.keys(pluginInpt.Data['1'].Inputs);
                let last = keys[keys.length - 1];
                pluginInpt.Data['1'].Inputs[last]['DefaultValue'] = number;
            }

            let popupInputsShellId = `${childFrameId}_data`;
            let transferData = {};
            transferData['IsFormInput'] = false;
            transferData['TableName'] = pluginInpt['TableName'];
            localStorage.setItem(popupInputsShellId, JSON.stringify(transferData));

            DinamicFormPopup.open(childFrameId, parentFrameId, title, false);
            DinamicFormPopup.onLoad(pluginInpt.Data['1'], childFrameId, parentFrameId, []);
        });

        $(`[data-place="${frameId}_upd_num"]`).click(function () {
            let number = $(this).attr('number');
            let fDisplayId = $(this).attr('f-display-id');
            let title = `${number}. place update`;
            let entryId = {
                IdColumn: 'c_102_id',
                Id: fDisplayId
            }

            if (pluginInpt.Data['1'].Inputs.length < 3) {
                let displayInput = {};
                displayInput['c_103_id'] = '2';
                displayInput['Type'] = 'W';
                displayInput['Name'] = 'Number';
                displayInput['UploadName'] = 't_102.c_60';
                displayInput['Required'] = '1';
                displayInput['Visible'] = '0';
                displayInput['DefaultValue'] = number;
                displayInput['TableName'] = 't_102';
                displayInput['ColumnName'] = 'c_60';
                pluginInpt.Data['1'].Inputs.push(displayInput);
            } else {
                let keys = Object.keys(pluginInpt.Data['1'].Inputs);
                let last = keys[keys.length - 1];
                pluginInpt.Data['1'].Inputs[last]['DefaultValue'] = number;
            }

            let popupInputsShellId = `${childFrameId}_data`;
            let transferData = {};
            transferData['IsFormInput'] = false;
            transferData['TableName'] = pluginInpt['TableName'];
            localStorage.setItem(popupInputsShellId, JSON.stringify(transferData));

            DinamicFormPopup.open(childFrameId, parentFrameId, title, false);
            DinamicFormPopup.onLoad(pluginInpt.Data['1'], childFrameId, parentFrameId, [], entryId);
        });
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
    * CreateFrame
    * @param {JSON} plugins 
    * @param {String} frameId 
    * @param {String} parentFrameId 
    * @param {String} card 
    * @param {String} fPluginDisplayId 
    */
    static createFrame(plugins, frameId, parentFrameId, card, fPluginDisplayId) {
        let pluginVO = plugins[1];
        let pluginInpt = plugins[2];

        let title = 'Fill the card with data';
        let cardNumbers = CardNumber.GetNumbers(card);
        cardNumbers = cardNumbers.filter((v, i, a) => a.indexOf(v) === i);

        card = card.replaceAll('!', '');
        document.getElementById(parentFrameId).insertAdjacentHTML(
            'beforeend',
            FillCard.getFrame(frameId, title, card)
        )
        AutoScroll.Integration(frameId);

        let pluginVOData = pluginVO.Data['1'].VO;

        for (const cardNumber of cardNumbers) {
            document.getElementById(`${frameId}_data`).insertAdjacentHTML(
                'beforeend',
                `<p>${cardNumber}. place</p><div>${getAction(pluginVOData, frameId, cardNumber)}</div>`
            )
        }

        /**
         * getAction
         * @param {JSON} data 
         * @param {String} frameId 
         * @param {String} cardNumber
         */
        function getAction(data, frameId, cardNumber) {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const object = data[key];

                    if (object.Number === cardNumber) {
                        //Update
                        return `
                            <div>
                                <span>${object.TName} - </span><span>${object.CName}</span>
                            </div>
                            <div>
                                <button f-display-id="${object.FDisplayId}" number="${object.Number}" data-place="${frameId}_upd_num">Update</button>
                            </div>
                        `;
                    }
                }
            }

            //Insert
            return `
                <button number="${cardNumber}" data-place="${frameId}_ins_num">Add</button>
            `;
        }

        FillCard.events(pluginInpt, frameId, parentFrameId, fPluginDisplayId);
    }

    /**
    * CreateFrameG
    * @param {JSON} plugins 
    * @param {String} frameId 
    * @param {String} parentFrameId 
    * @param {String} fPluginDisplayId 
    */
    static createFrameG(plugins, frameId, parentFrameId, fPluginDisplayId) {
        let pluginVO = plugins[1];
        let pluginInpt = plugins[2];

        let title = 'Fill the card with data';

        document.getElementById(parentFrameId).insertAdjacentHTML(
            'beforeend',
            FillCard.getFrame(frameId, title, '')
        )
        AutoScroll.Integration(frameId);

        let pluginVOData = pluginVO.Data['1'].VO;

        let cardNumber = 1;
        for (const pluginVOItem of pluginVOData) {
            document.getElementById(`${frameId}_data`).insertAdjacentHTML(
                'beforeend',
                getAction(pluginVOItem, frameId)
            )

            cardNumber = parseInt(pluginVOItem.Number, 10);
        }

        cardNumber++;

        document.getElementById(`${frameId}_data`).insertAdjacentHTML(
            'beforeend',
            `<div><button number="${cardNumber}" data-place="${frameId}_ins_num">Add</button></div>`
        )

        /**
         * getAction
         * @param {JSON} data 
         * @param {String} frameId 
         * @param {String} cardNumber
         */
        function getAction(object, frameId) {
            return `
                <p>${object.Number}. place</p>
                <div>
                    <div>
                        <span>${object.TName} - </span><span>${object.CName}</span>
                    </div>
                    <div>
                        <button f-display-id="${object.FDisplayId}" number="${object.Number}" data-place="${frameId}_upd_num">Update</button>
                    </div>
                </div>
            `;
        }

        FillCard.events(pluginInpt, frameId, parentFrameId, fPluginDisplayId);
    }

    /**
     * Get frame
     * @param {String} frameId 
     * @param {String} title 
     * @param {String} card 
     */
    static getFrame(frameId, title, card) {
        return `
            <div id="${frameId}_frame" class="dnmcppp-frame">
                <div class="dnmcppp-container-shell">
                    <div class="dnmcppp-container display-flex flex-column">
                        <div class="dnmcppp-header">${title}</div>
                        <div id="${frameId}" class="dnmcppp-content">
                            <div id="${frameId}_data" class="new-obj-shell col-12">${card}</div>
                        </div>
                        <div class="dnmcppp-footer">
                            <div class="display-flex justify-content-center">
                                <div id="${frameId}_cancel" class="cancel-btn-1 btn btn-sm">Back</div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
