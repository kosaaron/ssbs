import DetailsDesigns from "../../designs/DetailsDesigns.js";
import CreateBox from "../CreateBox.js";
import CreateDBox from "../CreateDBox.js";
import AutoScroll from "../AutoScroll.js";

export default class ConnectedObject {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     *   <parentFrameId>_child_loaded
     * ------------------------------
     * @param {JSON} plugin 
     * @param {String} parentFrameId 
     */
    constructor(plugin, frameId, parentFrameId) {
        //Details.create(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);

        let changeData = {};
        changeData.PluginNumber = plugin.Number;
        localStorage.setItem(`${parentFrameId}_child_loaded`, JSON.stringify(changeData));
        $(`#${parentFrameId}`).trigger(`${parentFrameId}_child_loaded`);
    }

    static create(plugin, frameId, parentFrameId, titleFrameId) {
        let detailsDesigns = new DetailsDesigns;

        //Tab title
        document.getElementById(titleFrameId).insertAdjacentHTML(
            'beforeend',
            detailsDesigns.getSimpleTitleFrame(frameId, parentFrameId, plugin.Data['1'].Title)
        )
        document.getElementById(`${frameId}_tab`).addEventListener(
            'click',
            function (e) {
                $(`.${parentFrameId}_tab`).removeClass('btn-detail-menu-active');
                $(`.${parentFrameId}_content`).hide();
                $(`#${frameId}`).show();
                $(`#${frameId}_tab`).addClass('btn-detail-menu-active');
            }
        )

        //Tab content
        let contentData = plugin.Data['1'].Display;
        let detailsObjectFrame = detailsDesigns.getSimpleObjectFrame(frameId);
        let detailsObject = detailsDesigns.getDefaultObject(frameId);

        let createDBox = new CreateDBox();
        createDBox.create(contentData, detailsObjectFrame, detailsObject, frameId);
    }
    /**
     * Events
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    events(plugin, frameId, parentFrameId) {
        $(`#${parentFrameId}`).bind(`${parentFrameId}_change_details_co_${plugin.Number}`, function (e) {
            // Retrieve the data from storage
            let changeData = JSON.parse(localStorage.getItem(`${parentFrameId}_change_details_co_${plugin.Number}`));
            let titleFrameId = changeData.TitleFrameId;
            let newPlugin = ConnectedObject.getCurrentPlugin(changeData.Plugins, plugin.Number);

            ConnectedObject.create(newPlugin, frameId, parentFrameId, titleFrameId);
        });
    }

    /**
     * GetCurrentPlugin
     * @param {JSON} plugins 
     * @param {String} number 
     */
    static getCurrentPlugin(plugins, number) {
        for (const plugin of plugins) {
            if (plugin.Number === number) {
                return plugin;
            }
        }
        return {};
    }

    /**
     * Filtering
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {JSON} filterData 
     * @param {JSON} sortData 
     */
    static refresh(plugin, frameId, parentFrameId) {
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
        /*
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
                });*/
    }
}