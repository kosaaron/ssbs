/** 
 * **Form elements** 
 */
/** Imports */
/** Filters */
let FormElements = {
    /**
     * **Write**
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {Char} style 
     */
    Write: function (id, name, shellId, style) {
        let readyHTML = "";
        switch (style) {
            case "A":
                readyHTML += '<div class="my-3">';
                readyHTML += '<input type="text" class="form-control" id="' + id
                    + '" data-place="' + shellId + '" placeholder="' +
                    name + '" aria-label="' + name + '" aria-describedby="addon-wrapping">';
                readyHTML += '</div >';
                break;
            default:
                    readyHTML += '<div class="my-3">';
                    readyHTML += '<input type="text" class="form-control" id="' + id
                        + '" data-place="' + shellId + '" placeholder="' +
                        name + '" aria-label="' + name + '" aria-describedby="addon-wrapping">';
                    readyHTML += '</div >';
                break;
        }
        return readyHTML;
    },
    Dropdown: function (id, name, shellId, opportunities, style) {
        let readyHTML = "";
        switch (style) {
            case "A":
                readyHTML += '<div class="dropdown my-3">';
                readyHTML += '<button id="' + id + '" class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" data-place="' + shellId + '" aria-haspopup="true" aria-expanded="false">';
                readyHTML += name;
                readyHTML += '</button>';
                readyHTML += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';

                for (let j = 0; j < opportunities.length; j++) {
                    readyHTML += '<a class="dropdown-item" href="#">';
                    readyHTML += opportunities[j];
                    readyHTML += '</a>';
                }

                readyHTML += '</div></div>';
                break;
            default:
                readyHTML += '<div class="dropdown my-3">';
                readyHTML += '<button id="' + id + '" class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" data-place="' + shellId + '" aria-haspopup="true" aria-expanded="false">';
                readyHTML += name;
                readyHTML += '</button>';
                readyHTML += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';

                for (let j = 0; j < opportunities.length; j++) {
                    readyHTML += '<a class="dropdown-item" href="#">';
                    readyHTML += opportunities[j];
                    readyHTML += '</a>';
                }

                readyHTML += '</div></div>';
                break;
        }
        return readyHTML;
    },
    Something: function (id, name, shellId, opportunities, style) {
        let readyHTML = "";
        switch (style) {
            case "A":
                readyHTML += '<div class="form-group">';
                readyHTML += '<label class="taskfilter-label">' + name + '</label>';
                readyHTML += '<select class="selectpicker my-0 form-control taskfilter" id="' + id + '" data-live-search="true" data-place="' + shellId + '">';
                for (let k = 0; k < opportunities.length; k++) {
                    readyHTML += '<option>' + opportunities[k] + '</option>';
                }
                readyHTML += '</select></div>';
                break;

            default:
                break;
        }
        return readyHTML;
    }
}
export default FormElements;