/**
 * **Card details**
 */
let CardDetails = {
    /**
     * **Create**
     * Generate detail by id
     * **use**
     * 1. Click event
     * 2. Call this function
     * @param {Integer} cardId Id of clicked card
     * @param {Array} data Object list
     * @param {Array} structure Card data structure
     * @param {String} card Card design
     * @param {String} shellId Shell id
     */
    Create: function (cardId, data, structure, card, shellId) {
        let cardBlock = card.split('!');

        let container = "";
        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];

            if (cardId === elementI.Id) {
                let c = 0;
                for (let j = 0; j < cardBlock.length; j++) {
                    const elementJ = cardBlock[j];
                    const elementC = structure[c];
                    let elementX = elementJ.split('*');

                    if (elementX.length === 1) {
                        container += elementJ;

                    } else {
                        if (elementC !== null) {
                            container += elementX[0];
                            container += elementI[elementC];
                            container += elementX[1];
                        }
                        c++;
                    }
                }
                break;
            }
        }
        document.getElementById(shellId).innerHTML = container;
    }
};

export default CardDetails;