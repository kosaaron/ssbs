import DetailsDesigns from "../../designs/DetailsDesigns.js";

export default class DisplayGallery {
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
        let detailsDesigns = new DetailsDesigns();

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

        /*
        let createDBox = new CreateDBox();
        createDBox.create(contentData, detailsObjectFrame, detailsObject, frameId);*/
        DisplayGallery.createContent(contentData, frameId);
    }
    static createContent(contentData, frameId) {
        let frameElement = document.getElementById(frameId);
        // frameElement.classList.add('task-timeline');

        let data = contentData.Data;

        for (const object of data) {
            //step number & name
            frameElement.insertAdjacentHTML(
                'beforeend',
                DisplayGallery.getImage(frameId, object)
            )
        }
    }

    static getImage(frameId, object) {
        let imgId = object["imgId"];
        let blobFile = object["imgBlob"];
        let imgAlt = object["imgAlt"];

        return `
            <div class=row>
                <div class=col-12>
                    <img src="${blobFile}" id=${frameId}_${imgId} class="img-fluid" alt="${imgAlt}">
                </div>
            </div>
            `;
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

            DisplayGallery.create(changeData.Plugin, frameId, parentFrameId, titleFrameId);
            AutoScroll.Integration(`${parentFrameId}_content`);
        });

        $(`#${parentFrameId}`).bind(`${parentFrameId}_change_details_co`, function (e) {
            let changeData = {};
            changeData.PluginNumber = plugin.Number;
            localStorage.setItem(`${parentFrameId}_child_loaded`, JSON.stringify(changeData));
            $(`#${parentFrameId}`).trigger(`${parentFrameId}_child_loaded`);
        });
    }

}