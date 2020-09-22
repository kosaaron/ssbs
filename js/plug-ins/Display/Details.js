import DetailsDesigns from "../../designs/DetailsDesigns.js";
import CreateBox from "../CreateBox.js";
import CreateDBox from "../CreateDBox.js";
import AutoScroll from "../AutoScroll.js";
import SwitchPlugin from "../SwitchPlugin.js";
import FillCard from "../objects/FillCard.js";

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
        if (localStorage.getItem('DevelopMode') === 'true') {
            //Create add card frame
            document.getElementById(frameId).insertAdjacentHTML(
                'beforebegin',
                Details.getDevFrame(frameId)
            );

            Details.devSaveEvent(plugin, frameId);
        }

        Details.create(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);
        Details.callChildren(plugin, frameId);
    }

    /**
     * Create
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    static create(plugin, frameId, parentFrameId) {
        if (!plugin.hasOwnProperty('Data')) {
            console.log('There is no data in Details');
            return;
        } else if (!plugin.Data.hasOwnProperty('1')) {
            console.log('There is no data in Details[1]');
            return;
        }

        //save data to filled form
        let dataDetails = {};
        let dDValue = plugin.Data['1'].Display.Data[0]['1'];
        let dDObject = null;
        for (const object of dataDetails['Structure'] = plugin.Data['1'].Display.Structure) {
            if (object.Number === '1') {
                dDObject = object;
            }
        }

        let dataDetailsResult = {};
        dataDetailsResult['IdColumn'] = `${dDObject.TableName}.${dDObject.ColumnName}`;
        dataDetailsResult['Id'] = dDValue;
        localStorage.setItem(`${parentFrameId}_data_details_id`, JSON.stringify(dataDetailsResult));

        let changeData = {};
        changeData = plugin;
        localStorage.setItem(frameId, JSON.stringify(changeData));

        if (!plugin.Data.hasOwnProperty('2')) {
            console.log('There is no data in Details[2]');
            return;
        }

        let headerData = plugin.Data['1'].Display;
        let detailsHTML = DetailsDesigns.getDefaultDetails(frameId);
        let createBox = new CreateBox();
        createBox.create(headerData, detailsHTML, frameId);

        if (localStorage.getItem(`${parentFrameId}_edit_mode`) === 'true') {
            document.getElementById(frameId).insertAdjacentHTML(
                'beforeend',
                `<button id="${frameId}_edit_btn" class="fixededitbutton">Edit<i class="far fa-edit"></i></button>`
            )
        }

        let contentData = plugin.Data['2'].Display;
        let dataFrameId = `${frameId}_cdb_g`;
        let createDBox = new CreateDBox();
        let detailsObjectFrame = DetailsDesigns.getDefaultObjectFrame(dataFrameId);
        let detailsObject = DetailsDesigns.getDefaultObject(dataFrameId);
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

        // Backward navigation to button
        let backBtn = document.getElementById(`${frameId}_back_btn`);
        backBtn.addEventListener(
            'click',
            function (params) {
                $(`.cc-details-container`).hide();
            }
        )

        // Backward navigation to button
        document.getElementById(`${frameId}_edit_btn`).addEventListener(
            'click',
            function () {
                let openFormData = {};
                openFormData.Type = 'update';
                localStorage.setItem(`${parentFrameId}_open_form`, JSON.stringify(openFormData));
                $(`#${parentFrameId}`).trigger(`${parentFrameId}_open_form`);
            }
        )

        AutoScroll.Integration(`${frameId}_content`);
    }

    static getDevFrame(frameId) {
        return `
        <div>
            <button id="${frameId}_edit_details_1">Details1</button>
            <button id="${frameId}_edit_details_2">Details2</button>
        </div>
        `
    }

    /**
     * DevSaveEvent
     * @param {JSON} plugin 
     * @param {String} frameId 
     */
    static devSaveEvent(plugin, frameId) {
        document.getElementById(`${frameId}_edit_details_1`).addEventListener('click', function () {
            let card = DetailsDesigns.getDefaultDetails(frameId);

            let fPluginDisplayId1 = plugin.Data['1'].FPluginDisplayId;
            FillCard.Integrate(card, fPluginDisplayId1);
        });

        document.getElementById(`${frameId}_edit_details_2`).addEventListener('click', function () {
            let card = DetailsDesigns.getDefaultDetails(frameId);

            let fPluginDisplayId2 = plugin.Data['2'].FPluginDisplayId;
            FillCard.Integrate(card, fPluginDisplayId2, true);
        });
    }
    /**
     * CallChildren
     * @param {JSON} plugin 
     * @param {String} frameId 
     */
    static callChildren(plugin, frameId) {
        if (!plugin.Data.hasOwnProperty('Children')) {
            console.log('There is no data in CardBox');
            return;
        }

        let children = plugin.Data.Children;
        for (const childPlugin of children) {
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

        $(`#${parentFrameId}`).bind(`${parentFrameId}_data_reload`, function (e) {
            // Retrieve the data from storage
            let objectId = JSON.parse(localStorage.getItem(`${parentFrameId}_data_details_id`))['Id'];
            Details.refresh(plugin, frameId, parentFrameId, objectId);
        });

        $(`#${frameId}`).bind(`${frameId}_child_loaded`, function (e) {
            // Retrieve the data from storage
            let eventResult = JSON.parse(localStorage.getItem(`${frameId}_child_loaded`));
            let currentPlugin = JSON.parse(localStorage.getItem(frameId));

            let pluginNumber = eventResult.PluginNumber;
            let plugins = currentPlugin.Data.Children;
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

                //Send to children
                $(`#${frameId}`).trigger(`${frameId}_change_details_co`);
            },
            dataType: 'json'
        });
    }
}