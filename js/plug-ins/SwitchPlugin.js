/** 
 * **Switch Plugins** 
 */
/** Imports */
import Filter from './Filter.js';
import FormInputs from '../designs/FormInputs.js';

export default class SwitchPlugin {
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
    Create(plugin, moduleName) {
        let pluginHTML = "";
        let placeId = `${moduleName}_${plugin.Place}`;
        switch (plugin.CPluginId) {
            // case '1':
            //     break;
            // case '2':
            //     break;
            case '3': //Filter
                Filter.Create(
                    placeId,
                    moduleName,
                    plugin.Data[1].Inputs
                );
                break;
            case '4': //Card Container
                pluginHTML = '<div>Card Container</div>'
                document.getElementById(placeId).innerHTML = pluginHTML;

                Promise.all([
                    import('./Display/CardBox.js'),
                ]).then(([Module]) => {
                    //let cardBox = new Module(moduleName, placeId, plugin);
                });
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