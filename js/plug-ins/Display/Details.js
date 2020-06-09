import DetailsDesigns from "../../designs/DetailsDesigns.js";
import CreateBox from "../CreateBox.js";
import CreateDBox from "../CreateDBox.js";
import AutoScroll from "../AutoScroll.js";

export default class Details {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     *   <frameId>_smtg
     * ------------------------------
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    constructor(plugin, frameId, parentFrameId) {
        Details.create(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);
    }

    static create(plugin, frameId, parentFrameId) {
        let headerData = plugin.Data['1'].Display;
        let detailsDesigns = new DetailsDesigns;
        let detailsHTML = detailsDesigns.getDefaultDetails(frameId);
        let createBox = new CreateBox();
        createBox.create(headerData, detailsHTML, frameId);

        let contentData = plugin.Data['2'].Display;
        let dataFrameId = `${frameId}_cdb_g`;
        let createDBox = new CreateDBox();
        let detailsObjectFrame = detailsDesigns.getDefaultObjectFrame(dataFrameId);
        let detailsObject = detailsDesigns.getDefaultObject(dataFrameId);
        createDBox.create(contentData, detailsObjectFrame, detailsObject, dataFrameId);

        AutoScroll.Integration(`${frameId}_content`);
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
                //console.log(result);
                console.log(JSON.stringify(result));
                document.getElementById(frameId).innerHTML = '';
                Details.create(newPlugin, frameId, parentFrameId);
                //CardBox.createBox(newPlugin, frameId, parentFrameId)
            },
            dataType: 'json'
        });
    }
}