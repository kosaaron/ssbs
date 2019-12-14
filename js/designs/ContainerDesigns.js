/**
 * Container designs
 */
export default class ContainerDesigns {
    /**
     * Get simple filter framework
     * @param {String} shellId 
     * @param {String} targetId 
     * @param {String} position 
     */
    loadSimpleFilterFw(shellId, targetId, position) {
        let framework = `
            <div class="flex-fill col-2 filter-box">
                <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>
                <div id="${shellId}_filters" class="task-filters"> </div>
                <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5>
                <div class="task-orders"> </div>
                <div id="${shellId}_sorts" class="task-filters"> </div>
            </div>
        `;
        document.getElementById(targetId).insertAdjacentHTML(position, framework);
    }
    /**
     * Get simple card container framework
     * @param {String} shellId 
     * @param {String} targetId 
     * @param {String} position 
     */
    loadSimpleCCFw(shellId, targetId, position) {
        let framework = `
            <div class="col-10 filtered-table display-flex flex-1">
                <button id="${shellId}_add_new_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button>
                <div class="card-container col-8">
                    <div id="${shellId}_cc" class="row"> </div>
                </div>
                <div class="col-4" id="${shellId}_detail_placeholder" style="display: none"> A részletekért válassz egy feladatot! </div>
                <div id="${shellId}_details" class="col-4 cc-details"> </div>
                <div class="filtered-table-fade flex-1"></div>
            </div>
        `;
        document.getElementById(targetId).insertAdjacentHTML(position, framework);
    }
}