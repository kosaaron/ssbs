/**
 * **Array functions**
 */
let ArrayFunctions = {
    /**
     * Get last element
     * @param {Array} array 
     */
    Last: function (array) {
        return array[array.length - 1];
    },
    /**
     * Has class
     * @param {String} elementId 
     * @param {String} className 
     */
    HasClass(elementId, className) {
        return (' ' + document.getElementById(elementId).className + ' ').indexOf(' ' + className + ' ') > -1;
    },
    /**
     * Get item from array
     * @param {JSON} array 
     * @param {String} column 
     * @param {String} id 
     */
    GetItem: function (array, column, id) {
        for (const entry of array) {
            if (entry[column] === id) {
                return entry;
            }
        }
    }
}
export default ArrayFunctions;
