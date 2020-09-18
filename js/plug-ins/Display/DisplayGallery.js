import DetailsDesigns from "../../designs/DetailsDesigns.js";
import AutoScroll from "../AutoScroll.js";

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
        //Tab title
        document.getElementById(titleFrameId).insertAdjacentHTML(
            'beforeend',
            DetailsDesigns.getSimpleTitleFrame(frameId, parentFrameId, plugin.Data['1'].Title)
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
        let detailsObjectFrame = DetailsDesigns.getSimpleObjectFrame(frameId);
        let detailsObject = DetailsDesigns.getDefaultObject(frameId);

        /*
        let createDBox = new CreateDBox();
        createDBox.create(contentData, detailsObjectFrame, detailsObject, frameId);*/
        DisplayGallery.createContent(contentData, frameId);
    }
    static createContent(contentData, frameId) {
        let frameElement = document.getElementById(frameId);
        // frameElement.classList.add('task-timeline');

        let data = contentData.Data;
        if (DisplayGallery.isIterable(data)) {
            for (const object of data) {
                //step number & name
                frameElement.insertAdjacentHTML(
                    'beforeend',
                    DisplayGallery.getImage(frameId, object)
                )
            }
        }

    }
    static isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
          return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
      }

    static getImage(frameId, object) {
        let imgId = object["imgId"];
        let blobFile = object["imgBlob"];
        let imgAlt = object["imgAlt"];

        return `
            <div class="row">
                <div class="col-12 gallery-image-container">
                    <div class="d-flex justify-content-center gallery-image-content">
                        <img src="${blobFile}" id=${frameId}_${imgId} class="img-fluid" alt="${imgAlt}">
                    </div>
                    <div class="d-flex justify-content-center gallery-image-footer">
                        <p>${imgAlt}</p>
                    </div>
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

            let uploadData = {};
            let className = 'ModuleData';


            uploadData['isDownload'] = true;
            uploadData['RequestType'] = 'PP';
            uploadData['FPluginPluginId'] = plugin['FPluginPluginId'];

            $.ajax({
                type: "POST",
                url: "./php/Router.php",
                data: { 'Module': className, 'Data': uploadData },
                success: function (result) {
                    let newPlugin = result[0].Data['1'].Display;
                    //console.log(result);
                    console.log(JSON.stringify(result));
                    document.getElementById(frameId).innerHTML = '';
                    DisplayGallery.createContent(newPlugin, frameId);
                },
                dataType: 'json'
            });


        });
    }

}