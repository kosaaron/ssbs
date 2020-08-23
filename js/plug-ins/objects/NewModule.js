import DinamicFormPopup from "../DinamicFormPopup.js";

/**
 * New module
 */
export default class NewModule {
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
                    dcmpPlugin = { Data: null }
                }

                if (!dcmpPlugin.hasOwnProperty('Data')) {
                    console.warn('No data at popup.')

                    dcmpPlugin = { Data: null }
                }

                let frameId = 'add_module';
                let parentFrameId = 'content_frame';
                let title = 'Add module to tab'
                DinamicFormPopup.open(frameId, parentFrameId, title, false);
                DinamicFormPopup.onLoad(dcmpPlugin.Data, frameId, parentFrameId);
            },
            dataType: 'json'
        });
    }
}