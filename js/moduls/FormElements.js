/** 
 * **Form elements** 
 */
/** Imports */
/** Filters */
let FormElements = {
    /**
     * **Style: A**
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
            readyHTML += '<input type="text" class="form-control" id="' + id
                + '" data-place="' + shellId + '" placeholder="' +
                name + '" aria-label="' + name + '" aria-describedby="addon-wrapping">';
            readyHTML += '</div >';
            return readyHTML;
        },
        Dropdown: function (id, name, shellId, opportunities) {
            let readyHTML = "";
            readyHTML += '<div class="dropdown my-3">';
            readyHTML += '<button id="' + id + '" class="' + shellId + ' btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
            readyHTML += name;
            readyHTML += '</button>';
            readyHTML += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';

            for (let j = 0; j < opportunities.length; j++) {
                readyHTML += '<a class="dropdown-item" href="#">';
                readyHTML += opportunities[j];
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
            readyHTML += '<select class="selectpicker my-0 form-control taskfilter" id="' + id + '" data-place="' + shellId + '" data-live-search="true">';
            for (let k = 0; k < opportunities.length; k++) {
                readyHTML += '<option>' + opportunities[k] + '</option>';
            }
            readyHTML += '</select></div>';

            return readyHTML;
        }
    },
    B: {
        Write: function (id, name, shellId) {
            let readyHTML = "";
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="' + id + '" class="newtask-label">' + name + '</label>';
            readyHTML += '<input type="text" id="' + id + '" class="newtask-formcontrol" data-place="' + shellId + '">';
            readyHTML += '</div>';
            return readyHTML;
        },
        Select: function (id, name, shellId, opportunities) {
            let readyHTML = "";
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="' + id + '" class="newtask-label">' + name + '</label>';
            readyHTML += '<select id="' + id + '" class="newtask-formcontrol" data-place="' + shellId + '">';
            for (let k = 0; k < opportunities.length; k++) {
                readyHTML += '<option>' + opportunities[k] + '</option>';
            }
            readyHTML += '</select> </div>';
            return readyHTML;
        },
        SelectOrNew: function (id, name, shellId, opportunities) {
            let readyHTML = "";
            //select
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="taskCat" class="newtask-label">' + name + '</label>';
            readyHTML += '<div class="tasktype-group">';
            readyHTML += '<div class="input-group mb-3">';
            readyHTML += '<select id="' + id + '" class="form-control newtask-formcontrol" aria-describedby="button-addon2" data-place="' + shellId + '">';
            for (let k = 0; k < opportunities.length; k++) {
                readyHTML += '<option>' + opportunities[k] + '</option>';
            }
            readyHTML += '</select>';
            readyHTML += '<div class="input-group-append">';
            readyHTML += '<button class="btn btn-outline-secondary" type="button" id="new_' + id + '" data-place="new_' + shellId + '">';
            readyHTML += '<i class="fas fa-plus"></i>';
            readyHTML += '</button> </div></div></div></div>';
            //new
            readyHTML += '<div id="collapse_' + id + '" class="collapse">';
            readyHTML += '<div class="card card-body"> proident. </div>';
            readyHTML += '</div>';
            return readyHTML;
        },
        DateTime: function (id, name, shellId) {
            let readyHTML = "";
            readyHTML += '<div class="form-group">';
            readyHTML += '<label for="' + id + '" class="newtask-label">' + name + '</label>';
            readyHTML += '<input type="date" id="' + id + '" class="newtask-formcontrol" data-place="' + shellId + '">';
            readyHTML += '</div>';
            return readyHTML;
        }
    }
}
export default FormElements;
/** Local functons */
let Local = {

};