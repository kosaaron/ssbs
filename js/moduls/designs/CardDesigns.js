/**
 * Card designs
 */
export default class CardDesigns {
    /** CC cards */
    getSimpleCard(shellId) {
        return `
            <div class="col-lg-6"><div id="${shellId}_card_*1*" class="card taskcard ${shellId}-show-details"><div class="card-body">
            !<h5 class="text-o-ellipsis card-title">*2*</h5>
            !<p class="card-text">*3*</p>
            </div></div></div>
        `
    }
}