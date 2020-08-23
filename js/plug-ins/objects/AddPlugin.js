import DinamicFormPopup from "../DinamicFormPopup.js";

/**
 * New module
 */
export default class AddPlugin {
    /**
     * Integration
     * @param {String} fUserModuleId 
     */
    static Integration(fUserModuleId) {
        let module = 'CustomData';
        let data = {};
        data['Place'] = '2';

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

                        if (object.UploadName === 'f_module_plugins.FUserModuleFK') {
                            dcmpPlugin.Data.Inputs[key].DefaultValue = fUserModuleId;
                            break;
                        }
                    }
                }

                let frameId = 'add_plugin';
                let parentFrameId = 'content_frame';
                let title = 'Add plugin to module'
                DinamicFormPopup.open(frameId, parentFrameId, title, false);
                DinamicFormPopup.onLoad(dcmpPlugin.Data, frameId, parentFrameId);
            },
            dataType: 'json'
        });
    }

    static events() {

    }
}