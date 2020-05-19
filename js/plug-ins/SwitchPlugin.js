/** 
 * **Switch Plugins** 
 */

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
    Create: function (pluginType, pluginData) {
        let pluginHTML = "";
        
        switch (pluginType) {
            // case '1':
            //     break;
            // case '2':
            //     break;
            case '3': //Filter
                pluginHTML = '<div>Filter</div>'
                break;

            case '4': //Card Container
                pluginHTML = '<div>Card Container</div>'
                break;

            case '5': //Details
                pluginHTML = '<div>Details</div>'
                break;
        
            default:
                pluginHTML = '<div>Plugin Not Found :(</div>'
                break;
        }
        return pluginHTML;
        
    }
}
export default SwitchPlugin;