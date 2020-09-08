import AutoScroll from "../AutoScroll.js";
import FormInputs from "../../designs/FormInputs.js";
import JSONToUpload from "../JSONToUpload.js";

export default class Gallery {
    /**
     * Constructor
     * ------------------------------
     * **Events**
     * 
     * ------------------------------
     * @param {JSON} plugin 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    constructor(plugin, frameId, parentFrameId) {
        Gallery.load(frameId);
        this.events(plugin, parentFrameId, frameId);
    }

    /** Frame **/
    /**
     * load
     */
    static load(frameId) {
        document.getElementById(frameId).insertAdjacentHTML(
            'beforeend',
            this.getFrameHTML(frameId)
        );

        AutoScroll.Integration(`${frameId}_cont`);
    }

    /**
     * events
     * @param {String} plugin 
     * @param {String} parentFrameId 
     * @param {String} frameId 
     */
    events(plugin, parentFrameId, frameId) {
        window.addEventListener('resize', function () {
            AutoScroll.Integration(`${frameId}_cont`);
        });

        $(`#${parentFrameId}`).bind(`${parentFrameId}_save`, function (e) {
            let lastObj = JSON.parse(localStorage.getItem(`${parentFrameId}_save`));
            let lastId = lastObj['LastId'];
            let lastIdColumn = lastObj['LastIdColumn'];

            let columnLength = lastIdColumn.length;
            let fkColumn = lastIdColumn.substr(0, columnLength - 2);
            fkColumn += 'FK';

            Gallery.uploadGallery(frameId, parentFrameId);
        });

        $(`#ntsk_steps_trash_btn_2`).bind(`click`, function (e) {
            Gallery.uploadGallery(frameId, parentFrameId);
        });

        $(`#${frameId}_add`).bind(`click`, function () {
            $(`#${frameId}_add_input`).click();
        });

        let changeData = {};
        //changeData.Remove = [];
        changeData.Add = [];
        $(`#${frameId}_add_input`).bind('change', function () {
            let files = document.getElementById(`${frameId}_add_input`).files;
            let fLength = files.length;
            for (let i = 0; i < fLength; i++) {
                const file = files[i];
                let url = URL.createObjectURL(file);

                let reader = new FileReader();

                reader.onloadend = function () {
                    let imgObj = {};
                    imgObj.FileName = file.name;
                    imgObj.Source = reader.result;
                    changeData.Add.push(imgObj);

                    document.getElementById(`${frameId}_cont`).insertAdjacentHTML(
                        'beforeend',
                        `<div class="gallery-item-shell display-flex flex-column  justify-content-center">
                            <a href="${url}" target="_blank"><img class="gallery-item" src="${url}"></a><div>`
                    );

                    if (fLength - 1 === i) {
                        localStorage.setItem(`${frameId}_upload_gallary`, JSON.stringify(changeData));
                    }
                }

                if (file) {
                    reader.readAsDataURL(file);
                }
            }
            $(`#${parentFrameId}`).trigger(`${parentFrameId}_child_loaded`);
        });
    }

    /**
     * getFrameHTML
     */
    static getFrameHTML(frameId) {
        return `
            <h2 class="new-obj-subtitle">Galéria</h2>
            <div id="${frameId}_cont" class="">
                <div class="upload-img-shell">
                    <div id="${frameId}_add" class="img-upload justify-content-center display-flex flex-column">
                        <div class="text-center">
                            <div>
                                <i class="img-upload-icon far fa-file-image"></i>
                            </div>
                            <div>
                                <h6 class="img-upload-text unselectable">Choose images</h6>
                            </div>
                        </div>
                    </div>
                    <input type="file" id="${frameId}_add_input" class="custom-input" multiple
                        accept="image/x-png,image/gif,image/jpeg"/>
                </div>
            </div>
            <div id="ntsk_steps_footer">
                <button type="reset" id="ntsk_steps_trash_btn_2" class="btn btn-primary grey-button"><i class="fas fa-trash-alt"></i></button>
            </div>`
    }

    /** Database **/
    /**
     * Upload Gallery
     * @param {String} parentFrameId 
     */
    static uploadGallery(frameId, parentFrameId) {

        if (true) {
            let uploadData = {};
            let className = 'InsertImage';

            uploadData = JSON.parse(localStorage.getItem(`${frameId}_upload_gallary`));

            let formData = new FormData();
            formData.append('Module', className);
            uploadData['FileToUpload'] = [];

            for (let i = 0; i < uploadData.Add.length; i++) {
                const fileItem = uploadData.Add[i];

                let fileName = fileItem.FileName;
                let imageURL = fileItem.Source;
                // Split the base64 string in data and contentType
                let block = imageURL.split(";");
                // Get the content type
                let contentType = block[0].split(":")[1];// In this case "image/gif"
                // get the real base64 content of the file
                let realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."

                // Convert to blob
                let blob = Gallery.b64toBlob(realData, contentType);

                formData.append(`Gallery_${i}`, blob, fileName);
                uploadData['FileToUpload'].push(`Gallery_${i}`)
            }

            formData.append('Data', JSON.stringify(uploadData));


            $.ajax({
                type: "POST",
                url: "./php/Router.php",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                success: function (result) {
                    let tableResultData = {};
                    console.log(result);

                    for (const table in result[0]) {
                        if (result[0].hasOwnProperty(table)) {
                            tableResultData = result[0][table];
                        }
                    }

                    //if (tableResultData['Result'] === 'S') {
                    if (true) {
                        $(`#${parentFrameId}`).trigger(`${parentFrameId}_save_end`);
                    } else {
                        Swal.fire({
                            type: 'error',
                            title: 'Sikertelen',
                            text: 'A galéria feltöltése sikertelen volt!',
                            heightAuto: false
                        });
                    }
                },
                dataType: 'json'
            });
        } else {
            $(`#${parentFrameId}`).trigger(`${parentFrameId}_save_end`);
        }
    }

    /**
     * Convert a base64 string in a Blob according to the data and contentType.
     * 
     * @param b64Data {String} Pure base64 string without contentType
     * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
     * @param sliceSize {Int} SliceSize to process the byteCharacters
     * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     * @return Blob
     */
    static b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}