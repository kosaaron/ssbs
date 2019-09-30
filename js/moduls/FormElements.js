/** 
 * **Form elements** 
 */
/** Imports */
/** Form elements */
let FormElements = {
    /**
     * **Style: A**
     * Filters
     */
    A: {
        /**
         * Write
         * @param {String} id 
         * @param {String} name 
         * @param {String} shellId 
         */
        Write: function (id, name, shellId) {
            let readyHTML = "";
            readyHTML += '<div class="my-3">';
            readyHTML += '<input type="text" class="form-control" id="' + shellId + '_' + id
                + '" data-place="' + shellId + '" placeholder="' +
                name + '" aria-label="' + name + '" aria-describedby="addon-wrapping">';
            readyHTML += '</div >';
            return readyHTML;
        },
        /**
         * Dropdown
         * @param {String} id 
         * @param {String} name 
         * @param {String} shellId 
         * @param {Array} opportunities 
         */
        Dropdown: function (id, name, shellId, opportunities) {
            let readyHTML = "";
            readyHTML += '<div class="dropdown my-3">';
            readyHTML += '<button id="' + shellId + '_' + id + '" class="' + shellId + ' btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
            readyHTML += name;
            readyHTML += '</button>';
            readyHTML += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';

            for (let j = 0; j < opportunities.length; j++) {
                readyHTML += '<a id="' + opportunities[j].Id + '" class="dropdown-item" href="#">';
                readyHTML += opportunities[j].Name;
                readyHTML += '</a>';
            }

            readyHTML += '</div></div>';
            return readyHTML;
        },
        /**
         * 
         * @param {String} id 
         * @param {String} name 
         * @param {String} shellId 
         * @param {Object} opportunities 
         */
        Select: function (id, name, shellId, opportunities) {
            let readyHTML = "";
            readyHTML += '<div class="form-group">';
            readyHTML += '<label class="taskfilter-label">' + name + '</label>';
            readyHTML += '<select class="selectpicker my-0 form-control taskfilter" id="' + shellId + '_' + id + '" data-place="' + shellId + '" data-live-search="true">';
            for (let k = 0; k < opportunities.length; k++) {
                readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
            }
            readyHTML += '</select></div>';

            return readyHTML;
        }
    },
    /**
     * **Style: B**
     * Inputs
     */
    B: {
        Write: function (id, name, shellId, uploadName) {
            let readyHTML = "";
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
            readyHTML += '<input type="text" id="' + shellId + '_' + id + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
            readyHTML += '</div>';
            return readyHTML;
        },
        Select: function (id, name, shellId, opportunities, uploadName) {
            let readyHTML = "";
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
            readyHTML += '<select id="' + shellId + '_' + id + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
            for (let k = 0; k < opportunities.length; k++) {
                readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
            }
            readyHTML += '</select> </div>';
            return readyHTML;
        },
        SelectOrNew: function (id, name, shellId, opportunities, uploadName) {
            let readyHTML = "";
            //select
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="taskCat" class="newtask-label">' + name + '</label>';
            readyHTML += '<div class="tasktype-group">';
            readyHTML += '<div class="input-group mb-3">';
            readyHTML += '<select id="' + shellId + '_' + id + '" class="form-control newtask-formcontrol" aria-describedby="button-addon2" upload-name="' + uploadName + '" data-place="' + shellId + '">';
            for (let k = 0; k < opportunities.length; k++) {
                readyHTML += '<option value="' + opportunities[k].Id + '">' + opportunities[k].Name + '</option>';
            }
            readyHTML += '</select>';
            readyHTML += '<div class="input-group-append">';
            readyHTML += '<button class="btn btn-outline-secondary" type="button" id="new_' + shellId + '_' + id + '" data-place="new_' + shellId + '">';
            readyHTML += '<i class="fas fa-plus"></i>';
            readyHTML += '</button> </div></div></div></div>';
            //new
            readyHTML += '<div id="collapse_' + shellId + '_' + id + '" class="collapse">';
            readyHTML += '<div class="card card-body"> proident. </div>';
            readyHTML += '</div>';
            return readyHTML;
        },
        DateTime: function (id, name, shellId, uploadName) {
            let readyHTML = "";
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
            readyHTML += '<input type="date" id="' + shellId + '_' + id + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
            readyHTML += '</div>';
            return readyHTML;
        },
        Image: function (shellId, inputId, previewId) {
            let iconId = inputId + '_icon';

            let readyHTML = "";
            readyHTML += '<input type="file" id="input_' + shellId + '_' + inputId + '" class="img-input">';
            readyHTML += '<img id="' + previewId + '" class="img_inp_preview">';
            readyHTML += '<i id="icon_' + shellId + '_' + iconId + '"class="fas fa-cloud-upload-alt img_input_icon"></i>';

            document.getElementById(shellId).innerHTML = readyHTML;
            $('#input_' + shellId + '_' + inputId).change(function () {
                Local.imagePreview(this);
                document.getElementById(iconId).style = 'display: none !important;';
                document.getElementById(shellId).style = 'width: fit-content;';
            });
            $("#" + shellId).click(function () {
                document.getElementById(inputId).click();
            });
        }
    }
}
export default FormElements;

/** Local functons */
let Local = {
    imagePreview: function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#new_t_pic_prev').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
};