/** 
 * **Filters** 
 */
/** Imports */
import { addListenerByAttr } from '../common.js';
import CardContainerPlus from './CardContainerPlus.js';
import ArrayFunctions from './ArrayFunctions.js';
import FormElements from './FormElements.js';
/** Filters */
let FilterAndSort = {
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
    CreateSort: function(sorts, shellId, eventFunction){
        CardContainerPlus.Create(sorts, shellId, Local.getSortHTML);
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
        /*let filterArray = [];
        let filterElements = document.querySelectorAll('[data-place="' + dataPlace + '"]');
        filterElements.forEach(filterElement => {
            let array = {};
            let filterId = ArrayFunctions.Last((filterElement.id).split('_'));
            let value = filterElement.value;
            array['FilterId'] = filterId;
            array['Value'] = value;
            filterArray.push(array);
        });*/

        let filterArray = [];
        let sortArray = [];
        var lastIndex = dataPlace.lastIndexOf('_');
        let mainDataPlace = dataPlace.substring(0, lastIndex);
        let filterElements = document.querySelectorAll('[data-place="' + mainDataPlace + '_filters"]')
        filterElements.forEach(filterElement => {
            let array = {};
            let filterId = ArrayFunctions.Last((filterElement.id).split('_'));
            let value = filterElement.value;
            array['FilterId'] = filterId;
            array['Value'] = value;
            filterArray.push(array);
        })
        let sortElements = document.querySelectorAll('[data-place="' + mainDataPlace + '_sorts"]')
        sortElements.forEach(sortElement => {
            let array = {};
            let sortId = ArrayFunctions.Last((sortElement.id).split('_'));
            let value = sortElement.value;
            array['SortId'] = sortId;
            array['Value'] = value;
            sortArray.push(array);
        })
        //Connect to Filter.php
        $.ajax({
            type: "POST",
            url: "./php/Filter.php",
            data: { 'FilterPlace': filterPlace, 'Filters': filterArray, 'Sorts': sortArray },
            success: function (data) {
                callbackFunction(data);
            },
            dataType: 'json'
        });
    }
}
export default FilterAndSort;

/** Local functions */
let Local = {
    getFilterHTML: function (objectItem, shellId) {
        let ready = "";
        switch (objectItem.Type) {
            //Write
            case "W":
                FormElements.A.Write(objectItem.FilterId, objectItem.Name, shellId);
                break;
            //Select
            case "S":
                FormElements.A.Select(objectItem.FilterId, objectItem.Name, shellId, objectItem.Opportunities);
                break;
            default:
                break;
        }
        return ready;
    },
    getSortHTML: function(objectItem, shellId){
        FormElements.A.SortSelect(objectItem.SortId, objectItem.Name, shellId, objectItem.DefaultValue, objectItem.Required);
    }
};

