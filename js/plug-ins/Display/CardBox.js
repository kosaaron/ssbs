import CardDesigns from "../../designs/CardDesigns.js";
import CreateBox from "../CreateBox.js";

export default class CardBox {
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
        CardBox.createBox(plugin, frameId, parentFrameId);
        this.events(plugin, frameId, parentFrameId);
    }

    /**
     * Events
     * @param {String} parentFrameId 
     */
    events(plugin, frameId, parentFrameId) {
        $(`#${parentFrameId}`).bind(`${parentFrameId}_change_filter`, function (e) {
            // Retrieve the data from storage
            let filterData = JSON.parse(localStorage.getItem(`${parentFrameId}_filter`));
            let sortData = JSON.parse(localStorage.getItem(`${parentFrameId}_sort`));

            CardBox.filtering(plugin, frameId, parentFrameId, filterData, sortData);
        });
    }

    static createBox(plugin, frameId, parentFrameId) {
        let card = CardBox.getCard(plugin, frameId);
        //First data package
        let displayObject = plugin.Data['1'].Display;
        let createBox = new CreateBox();
        createBox.create(displayObject, card, frameId)

        let cards = document.querySelectorAll(`[data-place=${frameId}]`);
        for (const card of cards) {
            card.addEventListener('click', function (e) {
                alert(this.getAttribute('object-id'));
                let changeData = {};
                changeData['ObjectId'] = this.getAttribute('object-id');
                localStorage.setItem(`${parentFrameId}_change_details`, JSON.stringify(changeData));
                $(`#${parentFrameId}`).trigger(`${parentFrameId}_change_details`);
            })
        }
    }

    /**
     * Filtering
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {JSON} filterData 
     * @param {JSON} sortData 
     */
    static filtering(plugin, frameId, parentFrameId, filterData, sortData) {
        let className = 'ModuleData';

        let uploadData = {};
        uploadData['CModuleId'] = plugin['CModuleId'];
        uploadData['RequestType'] = plugin['RequestType'];
        uploadData['FilterData'] = filterData;
        uploadData['SortData'] = sortData;
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
                CardBox.createBox(newPlugin, frameId, parentFrameId)
            },
            dataType: 'json'
        });
    }

    /**
     * getCard
     * @param {JSON} plugin 
     * @param {String} frameId 
     */
    static getCard(plugin, frameId) {
        let cardId = plugin.Data['CCardId'];
        let cardDesign = new CardDesigns();
        return cardDesign.getCardById(cardId, frameId)
    }
}