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

                for (const key in dcmpPlugin.Data.Inputs) {
                    if (dcmpPlugin.Data.Inputs.hasOwnProperty(key)) {
                        const object = dcmpPlugin.Data.Inputs[key];

                        if (object.UploadName === 'f_form_inputs.FPluginFormInputFK') {
                            dcmpPlugin.Data.Inputs[key].DefaultValue = fPluginFormInputId;
                            break;
                        }
                    }
                }

                let frameId = 'add_input';
                let parentFrameId = 'content_frame';
                let title = 'Insert input to plugin'
                DinamicFormPopup.open(frameId, parentFrameId, title, false);
                DinamicFormPopup.onLoad(dcmpPlugin.Data, frameId, parentFrameId);
            },
            dataType: 'json'
        });
    }

    static getFrame(fPluginFormInputId) {
        return `<div id="add_input_${fPluginFormInputId}" class="add-input-btn"><i class="far fa-plus-square"></i></div>`
    }
}