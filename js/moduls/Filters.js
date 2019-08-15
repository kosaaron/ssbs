/** 
 * **Filters** 
 */
/** Imports */
import { addListenerByAttr } from './../common.js';
import CardContainerPlus from './CardContainerPlus.js';
import FormElements from './FormElements.js';
/** Filters */
let Filters = {
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
    Create: function (filters, shellId, eventFunction) {
        let filterCard = Local.getFilterCard();
        CardContainerPlus.Create(filters, shellId, filterCard, Local.getFilterHTML);
        $('.selectpicker').selectpicker('refresh');

        addListenerByAttr(shellId, 'change', eventFunction);
    }
}
export default Filters;
/** Local functions */
let Local = {
    getFilterHTML: function (objectItem, shellId) {
        let ready = "";
        switch (objectItem.Type) {
            case "Write":
                ready = FormElements.A.Write(objectItem.Id, objectItem.Name, shellId);
                break;
            case "Select":
                ready = FormElements.A.Select(objectItem.Id, objectItem.Name, shellId, objectItem.Opportunities);
                break;
            default:
                break;
        }
        return ready;
    },
    getFilterCard: function () {
        //full card will be generated by getFilterHTML function
        let card = '?';
        return card;
    }
};

