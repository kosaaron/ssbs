import DinamicFormPopup from "../DinamicFormPopup.js";

/**
 * New module
 */
export default class AddInput {
    /**
     * Integration
     * @param {String} frameId 
     * @param {String} fPluginFormInputId 
     */
    static Integration(frameId, fPluginFormInputId) {
        document.getElementById(frameId).insertAdjacentHTML(
            'beforeend',
            AddInput.getFrame(fPluginFormInputId)
        );

        $(`#add_input_${fPluginFormInputId}`).click(function () {
            AddInput.loadDinamicPopup(fPluginFormInputId);
        });
    }

    static loadDinamicPopup(fPluginFormInputId) {
        let module = 'CustomData';
        let data = {};
        data['Place'] = '3';

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (plugins) {
                //console.log(data);
                console.log(JSON.stringify(plugins));

                let dcmpPlugin = plugins[1];

                if (dcmpPlugin === undefined) {
                    console.warn('No data at popup.')
                    dcmpPlugin = { Data: null }
                }

                if (!dcmpPlugin.hasOwnProperty('Data')) {
                    console.warn('No data at popup.')

                    dcmpPlugin = { Data: null }
                }

                for (const key in dcmpPlugin.Data['1'].Inputs) {
                    if (dcmpPlugin.Data['1'].Inputs.hasOwnProperty(key)) {
                        const object = dcmpPlugin.Data['1'].Inputs[key];

                        if (object.UploadName === 't_103.c_107_fk') {
                            dcmpPlugin.Data['1'].Inputs[key].DefaultValue = fPluginFormInputId;
                            break;
                        }
                    }
                }

                let frameId = 'add_input';
                let parentFrameId = 'content_frame';
                let title = 'Insert input to plugin'

                let childFrameId = `${frameId}_card_dev`;
                let popupInputsShellId = `${childFrameId}_data`;
                let transferData = {};
                transferData['IsFormInput'] = true;
                transferData['TableName'] = dcmpPlugin['TableName'];
                localStorage.setItem(popupInputsShellId, JSON.stringify(transferData));

                DinamicFormPopup.open(childFrameId, parentFrameId, title, false);
                DinamicFormPopup.onLoad(dcmpPlugin.Data['1'], childFrameId, parentFrameId, []);
            },
            dataType: 'json'
        });
    }

    static getFrame(fPluginFormInputId) {
        return `<div id="add_input_${fPluginFormInputId}" class="add-input-btn"><i class="far fa-plus-square"></i></div>`
    }
}
