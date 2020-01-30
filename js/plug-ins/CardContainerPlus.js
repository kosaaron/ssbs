/**
 * **Fixed - changeable elements**
 * Fixed -> changeable
 */
let CardContainerPlus = {
    /**
     * **Create**
     * Generate card container
     * **use**
     * 1. Create html shell
     * 2. Get data from server
     * 3. Create a callback function
     * 4. Call this function
     * @param {Array} data Object list
     * @param {String} shellId Shell id
     * @param {String} card Card design
     * @param {Function} secundCardF Secund card function with object parameter
     */
    Create: function (data, shellId, cardF) {
        if (data === undefined || data === null) {
            return;
        }

        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];
            cardF(elementI, shellId);
        }
    },
    /**
     * **CreateWithData**
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
     * @param {Function} secundCardF Secund card function with object, shell id parameters
     */
    CreateWithData: function (data, structure, shellId, card, secundCardF) {
        if (data === undefined || data === null) {
            return;
        }

        let cardBlock = card.split('!');
        let container = "";
        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];

            let c = 0;
            for (let j = 0; j < cardBlock.length; j++) {
                const elementJ = cardBlock[j];
                let elementX = elementJ.split('*');

                if (elementX.length === 1) {
                    //simple html code
                    container += elementJ;
                } else {
                    const elementC = structure[elementX[1]];

                    //add data
                    if (elementI[elementC] !== null && elementI[elementC] !== '') {
                        container += elementX[0];
                        container += elementI[elementC];
                        container += elementX[2];
                    }
                    c++;
                }
                container = container.replace("?", secundCardF(elementI, shellId));
            }
        }
        document.getElementById(shellId).innerHTML = container;

    },
    CreateWithActive: function (data, structure, shellId, card, activeCard, activeColumn, secundCardF) {
        if (data === undefined || data === null) {
            return;
        }
        
        let cardBlock = card.split('!');
        let activeCardBlock = activeCard.split('!');
        let container = "";
        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];

            let currentCard;
            if (elementI[activeColumn] === '1') {
                currentCard = activeCardBlock;
            } else {
                currentCard = cardBlock;
            }

            for (let j = 0; j < currentCard.length; j++) {
                const elementJ = currentCard[j];
                let elementX = elementJ.split('*');

                if (elementX.length === 1) {
                    //simple html code
                    container += elementJ;
                } else {
                    const elementC = structure[elementX[1]];
                    //add data
                    if (elementI[elementC] !== null) {
                        container += elementX[0];
                        container += elementI[elementC];
                        container += elementX[2];
                    }
                }
                if (container.split('?').length > 1) {
                    container = container.replace("?", secundCardF(elementI));
                }
            }
        }
        document.getElementById(shellId).innerHTML = container;

    }
};
export default CardContainerPlus;