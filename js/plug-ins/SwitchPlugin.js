/** 
 * **Switch Plugins** 
 */
/** Imports */
import Filter from './Filter.js';


let SwitchPlugin = {
    /**
     * **Create**
     * Generate filters
     * **use**
     * 1. Create html shell
     * 2. Get data from server (filters)
     * 3. Create filter change event in target js
     * 4. Call this function with parameters
     * @param {Array} filters Filter structure
     * @param {String} shellId 
     * @param {Function} eventFunction Selectpicker change event
     */
    Create: function (plugin, moduleName) {
        let pluginHTML = "";
        let placeId = `${moduleName}_${plugin.Place}`;
        switch (plugin.CPluginId) {
            // case '1':
            //     break;
            // case '2':
            //     break;
            case '3': //Filter
                pluginHTML = `<h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>`;
                pluginHTML += `<div id="${moduleName}_filters" class="task-filters"> </div>`;
                pluginHTML += `<h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5>`;
                pluginHTML += `<div class="task-orders"> </div>`;
                pluginHTML += `<div id="${moduleName}_sorts" class="task-filters"> </div>`;
                
                document.getElementById(placeId).innerHTML = pluginHTML;
                Filter.Create(
                    plugin.Data[1].Inputs,
                    moduleName + "_filters"
                );
                 
                break;

            case '4': //Card Container
                pluginHTML = '<div>Card Container</div>'
                document.getElementById(placeId).innerHTML = pluginHTML;
                break;

            case '5': //Details
                pluginHTML = '<div>Details</div>'
                document.getElementById(placeId).innerHTML = pluginHTML;
                break;
        
            default:
                break;
        }
    }
}
export default SwitchPlugin;