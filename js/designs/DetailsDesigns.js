export default class DetailsDesigns {
    /**
     * getDefaultDetails
     * @param {String} frameId 
     */
    static getDefaultDetails(frameId) {
        let result = '';
        //result = `<div id="${frameId}" class="col-4 cc-details" object-id="*1*">`;
        result += `<h3 id="${frameId}_title" class="details-title name-grey">*2*</h3>`;
        //-------------------------
        result += `<div class="display-flex justify-content-center">`;
        result += `<div id="${frameId}_tab" class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons">`;
        result += `<label id="${frameId}_data_btn" `;
        result += `class="${frameId}_tab btn btn-detail-menu btn-detail-menu-active">Adatok</label>`;
        result += `</div></div>`;
        result += `<div id="${frameId}_content" class="co-shell">`;
        result += `<div id="${frameId}_cdb_g" class="${frameId}_content"> `;
        result += `</div></div>`;
        return result;
    }

    /**
     * getDefaultObjectFrame
     * @param {String} frameId 
     */
    static getDefaultObjectFrame(frameId) {
        let result = '';
        result += `<div id="${frameId}_*1*"></div>`;
        return result;
    }

    /**
     * getSimpleObjectFrame
     * @param {String} frameId 
     */
    static getSimpleObjectFrame(frameId) {
        let result = '';
        result += `<div class="row">`;
        result += `<div class="${frameId}_contactcard card contactcard">`;
        result += `<div id="${frameId}_*1*" class="card-body"></div>`;
        result += `<div class="contactcard-cover"><i class="fas fa-angle-down"></i></div>`;
        result += `</div></div>`;
        return result;
    }

    /**
     * getSimpleObjectFrame
     * @param {String} frameId 
     * @param {String} parentFrameId 
     * @param {String} title 
     */
    static getSimpleTitleFrame(frameId, parentFrameId, title) {
        let result = '';
        result += `<label id="${frameId}_tab"`;
        result += ` class="${parentFrameId}_tab btn btn-detail-menu">`;
        result += `${title}`;
        result += `</label>`;
        return result;
    }
    /**
     * getDefaultObject
     * @param {String} frameId 
     */
    static getDefaultObject(frameId) {
        let result = '';
        result += `<p id="${frameId}_*c*_*n*" class="co-card-item">`;
        result += `<label class="title-text">*l*</label><br>`;
        result += `<label>*v*</label>`;
        result += `</p>`;
        return result;
    }

    static getSimpleDetails(shellId) {
        return `
            <h3 id="${shellId}_title" class="details-title name-grey">*1*</h3>
            !<p><label class="employee-position">*2*</label></p>
        `;
    }

    getE(shellId) {
        return `
        <h2 id="${shellId}_title" class="name-grey">*1*</h2>
        <div id="partner_details_tab" class="display-flex justify-content-center"><div class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons">
        <label id="prtnr_dtl_data_btn" class="btn btn-detail-menu btn-detail-menu-active">
        <input type="radio" name="options" id="prtnr_dtls_tab_data" autocomplete="off"> Adatok </label>
        <label id="prtnr_dtl_cnt_btn" class="btn btn-detail-menu">
        <input type="radio" name="options" id="prtnr_dtls_tab_contacts" autocomplete="off"> Kapcsolatok </label></div></div><div id="partner_details_content">
        !<div id="partner_data_container">
        !<div id="${shellId}_cc_g"> </div>
        !</div><div id="partner_contacts_container" style="display: none" ></div></div>
        `
    }

    /** VO cards */
    getVOContact(shellId) {
        let container = `
        <div class="row">
            <div class="card contactcard">
                <div class="card-body">
                    <a id="${shellId}_cntcs_*1*">
                        <div class="display-flex justify-content-between">
                            <i class="fas fa-user-circle profile-logo"></i>
                            <div class="partner-contact-main flex-1">
                                !<h3 class="card-title contact-name">*2*</h3>
                                !<p>*5*</p>!
                            </div>
                        </div>
                    </a>
                    <div id="*1*" class="contact-container" style="display: none;">
                        !<p class="contactdata"><i class="fas fa-home partnercard-logo"></i>*2*</p>
                        !<p class="contactdata"><i class="fas fa-phone partnercard-logo"></i>*4*</p>
                        !<p class="contactdata"><i class="far fa-envelope partnercard-logo"></i>*3*</p>!
                    </div>
                </div>
            </div>
        </div>
        `
        return container;
    }
}