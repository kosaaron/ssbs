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
        Details.create(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);
        Details.callChilds(plugin, frameId);

        AutoScroll.Integration(`${frameId}_content`);
    }

    /**
     * Create
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    static create(plugin, frameId, parentFrameId) {
        //save data to filled form
        let dataDetails = {};
        let dDValue = plugin.Data['1'].Display.Data[0]['1'];
        let dDObject = null;
        for (const object of dataDetails['Structure'] = plugin.Data['1'].Display.Structure) {
            if (object.Number === '1') {
                dDObject = object;
            }
        }
        dataDetails[`${dDObject.TableName}.${dDObject.ColumnName}`] = dDValue;
        localStorage.setItem(`${parentFrameId}_data_details_id`, JSON.stringify(dDObject));

        let changeData = {};
        changeData = plugin;
        localStorage.setItem(frameId, JSON.stringify(changeData));

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

        let dataBtn = document.getElementById(`${frameId}_data_btn`);
        dataBtn.addEventListener(
            'click',
            function (e) {
                $(`.${frameId}_tab`).removeClass('btn-detail-menu-active');
                $(`.${frameId}_content`).hide();
                $(`#${frameId}_cdb_g`).show();
                $(`#${frameId}_data_btn`).addClass('btn-detail-menu-active');
            }
        )
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
     * Events
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
            let currentPlugin = JSON.parse(localStorage.getItem(frameId));

            let pluginNumber = eventResult.PluginNumber;
            let plugins = currentPlugin.Data.Childs;
            let targetId = `${frameId}_content`;

            let childPluginId = `${frameId}_content_${pluginNumber}`;

            Details.createChildFrame(targetId, frameId, childPluginId);

            let changeData = {};
            changeData.Plugin = Details.getCurrentPlugin(plugins, pluginNumber);
            changeData.TitleFrameId = `${frameId}_tab`;
            localStorage.setItem(`${frameId}_change_details_co_${pluginNumber}`, JSON.stringify(changeData));
            $(`#${frameId}`).trigger(`${frameId}_change_details_co_${pluginNumber}`);
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
     * 
     * @param {String} targetId 
     * @param {String} frameId 
     * @param {String} childFrameId 
     */
    static createChildFrame(targetId, frameId, childFrameId) {
        let readyHTML = '';
        readyHTML += `<div id="${childFrameId}" style="display: none;" class="${frameId}_content"></div>`;
        document.getElementById(targetId).insertAdjacentHTML('beforeend', readyHTML);
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

                //Send to childs
                $(`#${frameId}`).trigger(`${frameId}_change_details_co`);
            },
            dataType: 'json'
        });
    }
}