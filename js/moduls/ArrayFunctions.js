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
     * @param {HTML DOM Element} element 
     * @param {String} className 
     */
    HasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
    }
}
export default ArrayFunctions;
