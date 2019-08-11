/**
 * **Fixed - changeable elements**
 * Fixed -> changeable
 */
let FixedChangeableElements = {
    /**
     * **Create**
     * Generate card container
     * **use**
     * 1. Create html shell
     * 2. Get data from server
     * 3. Create a card structure
     * 4. Create card design
     * 5. Call this function
     * @param {Array} data Object list
     * @param {Array} structure Card data structure
     * @param {String} shellId Shell id
     * @param {String} card Card design
     * @param {Function} secundCardF Secund card function with object parameter
     */
    Create: function (data, structure, shellId, card, secundCardF) {
        let cardBlock = card.split('!');
        let container = "";
        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];

            let c = 0;
            for (let j = 0; j < cardBlock.length; j++) {
                const elementJ = cardBlock[j];
                const elementC = structure[c];
                let elementX = elementJ.split('*');

                if (elementX.length === 1) {
                    //simple html code
                    container += elementJ;
                } else {
                    //add data
                    if (elementC !== null) {
                        container += elementX[0];
                        container += elementI[elementC];
                        container += elementX[1];
                    }
                    c++;
                }

                container = container.replace("?", secundCardF(elementI));
            }
        }
        document.getElementById(shellId).innerHTML = container;

    }
};
export default FixedChangeableElements;