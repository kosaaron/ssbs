/** 
 * **Filters** 
 */
/** Imports */
import { addListenerByAttr } from './../common.js';
import CardContainerPlus from './CardContainerPlus.js';
import ArrayFunctions from './ArrayFunctions.js';
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
        CardContainerPlus.Create(filters, shellId, Local.getFilterHTML);
        $('.selectpicker').selectpicker('refresh');

        addListenerByAttr(shellId, 'change', eventFunction);
    },
    /**
     * Filtering on database
     * @param {String} dataPlace 
     * @param {String} filterPlace 
     * @param {Function} callbackFunction 
     */
    FilteringOnDB: function (dataPlace, filterPlace, callbackFunction) {
        //Create filter array [{FilterId: "FilterId1", Value: "Value1"},{...}]
        let filterArray = [];
        let filterElements = document.querySelectorAll('[data-place="' + dataPlace + '"]');
        filterElements.forEach(filterElement => {
            let array = {};
            let filterId = ArrayFunctions.Last((filterElement.id).split('_'));
            let value = filterElement.value;
            array['FilterId'] = filterId;
            array['Value'] = value;
            filterArray.push(array);
        });

        //Connect to Filter.php
        $.ajax({
            type: "POST",
            url: "./php/Filter.php",
            data: { 'FilterPlace': filterPlace, 'Filters': filterArray },
            success: function (data) {
                callbackFunction(data);
            },
            dataType: 'json'
        });
    }
}
export default Filters;
/** Local functions */
let Local = {
    getFilterHTML: function (objectItem, shellId) {
        let ready = "";
        switch (objectItem.Type) {
            //Write
            case "W":
                ready = FormElements.A.Write(objectItem.FilterId, objectItem.Name, shellId);
                break;
            //Select
            case "S":
                ready = FormElements.A.Select(objectItem.FilterId, objectItem.Name, shellId, objectItem.Opportunities);
                break;
            default:
                break;
        }
        return ready;
    }
};

