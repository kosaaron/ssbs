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
    }
}
export default ArrayFunctions;
