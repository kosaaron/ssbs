export default class VOCardDesign {
    /**
     * 
     * @param {String} shellId 
     */
    getSimple(shellId) {
        return `
        <div class="row" id="${shellId}_*1*">
            <div class="card contactcard">
                <div class="card-body">
                    <div class="display-flex justify-content-between"><i class="fas fa-cube"></i> !
                        <div class="partner-contact-main flex-1">
                            !<h3 class="card-title contact-name">*2*</h3>
                            !<p>*3*</p>!
                        </div>
                    </div>
                    <div class="contact-container" style="">
                        !<p class="contactdata"><i class="fab fa-buffer partnercard-logo"></i>*4*</p>
                        !<p class="contactdata"><i class="fas fa-money-bill partnercard-logo"></i>*5*</p>
                        !<p class="contactdata"><i class="far fa-envelope partnercard-logo"></i>*6*</p>
                        !<p class="contactdata"><i class="far fa-envelope partnercard-logo"></i>*7*</p>!
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    getRemark(shellId) {
        return `
        <div class="row" id="${shellId}_*1*">
            <div class="card commentcard">
                <div class="card-body">
                    <div class="display-flex justify-content-between">
                        !<p class="tool-comment-text">*3*</p>!
                    </div>
                    <div class="row comment-writer-datas">
                        <div class="comment-writer-logocontainer">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="comment-writer-namecontainer">
                            !<p class="commenter-name">*2*</p>
                            !<p class="comment-time">*4*</p>!
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    getContact(shellId) {
        return `
        <div class="row">
            <div class="card contactcard">
                <div class="card-body">
                    <a id="${shellId}_cntcs_*1*">
                        <div class="display-flex justify-content-between">
                            <i class="fas fa-user-circle profile-logo"></i>
                            <div class="partner-contact-main flex-1">
                                !<h3 class="card-title contact-name">*2*</h3>
                                !<p>*3*</p>!
                            </div>
                        </div>
                    </a>
                    <div id="*1*" class="contact-container" style="display: none;">
                        !<p class="contactdata"><i class="fas fa-phone partnercard-logo"></i>*4*</p>
                        !<p class="contactdata"><i class="fas fa-home partnercard-logo"></i>*5*</p>
                        !<p class="contactdata"><i class="far fa-envelope partnercard-logo"></i>*6*</p>!
                    </div>
                </div>
            </div>
        </div>
        `
    }
}