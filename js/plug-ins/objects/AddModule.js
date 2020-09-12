import DinamicFormPopup from "../DinamicFormPopup.js";

/**
 * New module
 */
export default class AddModule {
    /**
     * Integration
     */
    static Integration() {
        let module = 'CustomData';
        let data = {};
        data['Place'] = '1';

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
                    dcmpPlugin = { Data: { 1: { FPluginFormInputId: null, Inputs: [], Title: null } } }
                }

                if (!dcmpPlugin.hasOwnProperty('Data')) {
                    console.warn('No data at popup.')

                    dcmpPlugin = { Data: { 1: { FPluginFormInputId: null, Inputs: [], Title: null } } }
                }

                let frameId = 'add_module';
                let parentFrameId = 'content_frame';
                let title = 'Add module to tab'

                let childFrameId = `${frameId}_dev`;
                let popupInputsShellId = `${childFrameId}_data`;
                let transferData = {};
                transferData['IsFormInput'] = true;
                transferData['TableName'] = dcmpPlugin['TableName'];
                localStorage.setItem(popupInputsShellId, JSON.stringify(transferData));

                DinamicFormPopup.open(childFrameId, parentFrameId, title, false);
                DinamicFormPopup.onLoad(dcmpPlugin.Data[1], childFrameId, parentFrameId, []);
            },
            dataType: 'json'
        });
    }
}