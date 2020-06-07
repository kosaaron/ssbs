import CardDesigns from "../../designs/CardDesigns.js";

export default class Details {
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
        //Details.create(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);
    }
    /**
     * 
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    events(plugin, frameId, parentFrameId) {
        $(`#${parentFrameId}`).bind(`${parentFrameId}_change_details`, function (e) {
            // Retrieve the data from storage
            let objectId = JSON.parse(localStorage.getItem(`${parentFrameId}_change_details`))['ObjectId'];

            Details.refresh(plugin, frameId, parentFrameId, objectId);
        });
    }

    /**
     * Filtering
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {JSON} filterData 
     * @param {JSON} sortData 
     */
    static refresh(plugin, frameId, parentFrameId, objectId) {
        let className = 'ModuleData';

        let uploadData = {};
        uploadData['CModuleId'] = plugin['CModuleId'];
        uploadData['RequestType'] = plugin['RequestType'];
        uploadData['IdOfData'] = objectId;
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
                console.log(result);
                //console.log(JSON.stringify(result));
                document.getElementById(frameId).innerHTML = '';
                //CardBox.createBox(newPlugin, frameId, parentFrameId)
            },
            dataType: 'json'
        });
    }
}