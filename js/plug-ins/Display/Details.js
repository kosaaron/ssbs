import DetailsDesigns from "../../designs/DetailsDesigns.js";
import CreateBox from "../CreateBox.js";
import CreateDBox from "../CreateDBox.js";
import AutoScroll from "../AutoScroll.js";
import SwitchPlugin from "../SwitchPlugin.js";

export default class Details {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     *   <frameId>_change_details_co
     * ------------------------------
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    constructor(plugin, frameId, parentFrameId) {
        Details.callChilds(plugin, frameId);
        Details.create(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);
    }

    /**
     * Create
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
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
    }
    /**
     * CallChilds
     * @param {JSON} plugin 
     * @param {String} frameId 
     */
    static callChilds(plugin, frameId) {
        let childs = plugin.Data.Childs;
        for (const childPlugin of childs) {
            let switchPlugin = new SwitchPlugin();
            let childPluginId = `${frameId}_content_${childPlugin.Number}`;
            switchPlugin.Create(childPlugin, childPluginId, frameId);
        }
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

        $(`#${frameId}`).bind(`${frameId}_child_loaded`, function (e) {
            // Retrieve the data from storage
            let eventResult = JSON.parse(localStorage.getItem(`${frameId}_child_loaded`));
            let pluginNumber = eventResult.PluginNumber;

            let changeData = {};
            changeData.Plugins = plugin.Data.Childs;
            changeData.TargetId = `${frameId}_content`;
            localStorage.setItem(`${frameId}_change_details_co_${pluginNumber}`, JSON.stringify(changeData));
            $(`#${frameId}`).trigger(`${frameId}_change_details_co_${pluginNumber}`);

            AutoScroll.Integration(`${frameId}_content`);
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
            },
            dataType: 'json'
        });
    }
}