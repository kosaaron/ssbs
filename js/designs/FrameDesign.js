/** Imports **/

/** Frame design **/
export default class FrameDesign {
    /**
     * Get tab menu item html
     * @param {String} tabId tab menu item
     * @param {String} title 
     * @param {Boolean} isActive 
     */
    static tabMenuItem(tabId, title, icon, isActive) {
        let active = '';
        if (isActive) {
            active = 'menu-item-active';
        }

        let readyHTML = `
            <div id="tab_i_${tabId}" class="menu-item display-flex flex-column ${active}">
                <div class="text-center">
                    <div>
                        <div class="${icon} item-icon"></div>
                    </div>
                    <div>
                        <h6 class="menu-item-text unselectable">${title}</h6>
                    </div>
                </div>
            </div>
            `;
        return readyHTML;
    }

    /**
     * Get 'tab content' html
     * @param {String} tabId 
     */
    static tabContent(tabId) {
        let readyHTML = `
            <div id="tab_c_${tabId}" class="menu-content">
            </div>
        `;
        return readyHTML;
    }

    /**
     * Get module subtab ready HTML
     * @param {String} tabId 
     * @param {JSON} modules modules of entry
     */
    static moduleSubtab(tabId, modules) {
        let readyHTML = `<div class="finance-shell display-flex flex-column full-screen">`;
        let tabHTML = `<div class="display-flex flex-row">`;
        let mdlHTML = `<div id="tab_${tabId}_mdl" class="flex-fill full-screen">`;

        let isFirst = true;
        for (const moduleId in modules) {
            if (modules.hasOwnProperty(moduleId)) {
                const moduleName = modules[moduleId];
                if (isFirst) {
                    tabHTML += `<div id="tab_${tabId}_stab_${moduleId}" class="${tabId}-subtab finance-subtab flex-1 finance-subtab-active">`;
                    isFirst = false;
                } else {
                    tabHTML += `<div id="tab_${tabId}_stab_${moduleId}" class="${tabId}-subtab finance-subtab flex-1">`;
                }
                tabHTML += `<h7>${moduleName}</h7>`;
                tabHTML += `</div>`;
            }
        }
        tabHTML += `</div>`;
        mdlHTML += `</div>`;

        readyHTML += tabHTML + mdlHTML;
        readyHTML += `</div>`;
        return readyHTML;
    }
}