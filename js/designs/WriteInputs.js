/** 
 * Write inputs 
 */
let WriteInputs = {
    /**
     * Simple write input
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     */
    Simple: function (id, name, shellId) {
        let readyHTML = "";
        readyHTML += '<div class="my-3">';
        readyHTML += '<input type="text" class="form-control" id="' + shellId + '_' + id
            + '" data-place="' + shellId + '" placeholder="' +
            name + '" aria-label="' + name + '" aria-describedby="addon-wrapping">';
        readyHTML += '</div >';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
    },
    /**
     * Write input with label
     * @param {String} id 
     * @param {String} name 
     * @param {String} shellId 
     * @param {String} uploadName 
     */
    WithLabel: function (id, name, shellId, uploadName) {
        let readyHTML = "";
        readyHTML += '<div class="form-group input-row">';
        readyHTML += '<label for="' + shellId + '_' + id + '" class="newtask-label">' + name + '</label>';
        readyHTML += '<input type="text" id="' + shellId + '_' + id + '" class="newtask-formcontrol" upload-name="' + uploadName + '" data-place="' + shellId + '">';
        readyHTML += '</div>';

        document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
    }
}
export default WriteInputs;