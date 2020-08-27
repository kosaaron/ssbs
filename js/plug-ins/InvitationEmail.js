

export default class InvitationEmail {
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
        InvitationEmail.load(frameId);
        this.events(plugin, parentFrameId, frameId);
    }

    /** Frame **/
    /**
     * load
     */
    static load(frameId) {
            //alert('Email loaded');
    }

    /**
     * events
     * @param {String} plugin 
     * @param {String} parentFrameId 
     * @param {String} frameId 
     */
    events(plugin, parentFrameId, frameId) {
        $(`#${parentFrameId}`).bind(`${parentFrameId}_save`, function (e) {
            let lastObj = JSON.parse(localStorage.getItem(`${parentFrameId}_save`));
            let lastId = lastObj['LastId'];
            let lastIdColumn = lastObj['LastIdColumn'];

            let columnLength = lastIdColumn.length;
            let fkColumn = lastIdColumn.substr(0, columnLength - 2);
            fkColumn += 'FK';

            //alert(JSON.stringify(lastObj));
            InvitationEmail.getEmailAddress(fkColumn, lastId, parentFrameId);
        });

        $(`#${parentFrameId}_save`).bind(`click`, function (e) {


        });

    }

    /** Database **/
    /**
     * uploadSteps
     * @param {String} itemIdColumn 
     * @param {String} itemId 
     * @param {String} parentFrameId 
     */
    static getEmailAddress(itemIdColumn, itemId, parentFrameId) {
        if (true) {

            $.ajax({
                type: "POST",
                url: "./php/SendInvitation.php",
                data: { 'EmployeeId': itemId},
                success: function (result) {
                    alert(JSON.stringify(result));
                    if (result['Result'] === 'S') {
                        alert("Sikeres mentés");
                        $(`#${parentFrameId}`).trigger(`${parentFrameId}_save_end`);
                    } else {
                        Swal.fire({
                            type: 'error',
                            title: 'Sikertelen',
                            text: 'A feladat létrehozása sikertelen volt!',
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
}