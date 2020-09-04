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
                console.log(JSON.stringify("Ez tényleg az: " + plugins));

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

                        if (object.UploadName === 'f_module_plugins.FUserModuleFK') {
                            dcmpPlugin.Data['1'].Inputs[key].DefaultValue = fUserModuleId;
                            break;
                        }
                    }
                }
                let frameId = 'add_plugin';
                let parentFrameId = 'content_frame';
                let title = 'Add plugin to module';
                DinamicFormPopup.open(frameId, parentFrameId, title, false);
                DinamicFormPopup.onLoad(dcmpPlugin.Data['1'], frameId, parentFrameId);

                AddPlugin.events(frameId);
            },
            dataType: 'json'
        });
    }

    static events(frameId) {
        $(`#${frameId}`).bind(`${frameId}_save`, function (e) {
            let resultIdObject = JSON.parse(localStorage.getItem(`${frameId}_save`));
            let id = resultIdObject['LastId'];

            let pluginSelect = $(`[upload-name="f_module_plugins.CPluginFK"][data-place="${frameId}_data"]`);
            let pluginId = pluginSelect.val();

            AddPlugin.switchPlugin(pluginId, id, frameId);
        });
    }

    /**
     * SwitchPlugin
     * @param {String} pluginId 
     * @param {String} id 
     * @param {String} frameId 
     */
    static switchPlugin(pluginId, id, frameId) {
        switch (pluginId) {
            case '2':
                Promise.all([
                    import('./APDinamicPopup.js'),
                ]).then(([Module]) => {
                    Module.default.Create(id, frameId);
                });
                break;
            case '3':
                Promise.all([
                    import('./APFilterAndSort.js'),
                ]).then(([Module]) => {
                    Module.default.Create(id, frameId);
                });
                break;
            case '4':
                Promise.all([
                    import('./APCardBox.js'),
                ]).then(([Module]) => {
                    Module.default.Create(id, frameId);
                });
                break;
            default:
                break;
        }
    }
}