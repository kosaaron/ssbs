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
    Create(plugin, frameId, parentFrameId) {
        let pluginHTML = "";

        switch (plugin.CPluginId) {
            // case '1':
            //     break;
            // case '2':
            //     break;
            /** Filter */
            case '3':
                let filter = new Filter;
                filter.Create(
                    frameId,
                    parentFrameId,
                    plugin
                    //plugin.Data[1].Inputs
                );
                break;
            /** Card Container */
            case '4':
                pluginHTML = '<div>Card Container</div>'
                document.getElementById(frameId).innerHTML = pluginHTML;


                Promise.all([
                    import('./Display/CardBox.js'),
                ]).then(([Module]) => {
                    let CardBox = Module.default;
                    //let cardBox = new Module(parentFrameId, placeId, plugin);
                    new CardBox(parentFrameId, frameId, plugin);
                });
/*
                let obj = await import('./Display/CardBox.js');
                let CardBox = obj.default;*/
                break;
            /** Details */
            case '5':
                pluginHTML = '<div>Details</div>'
                document.getElementById(frameId).innerHTML = pluginHTML;
                break;
            default:
                break;
        }
    }
}