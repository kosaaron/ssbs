/** common.js */
/** Card container with details */
import setFilter from './filterFunctions.js';

let cardContainerADetails = {
    /**
     * Generate card container
     * **use**
     * 1. Create html shell
     * 2. Get data from server
     * 3. Create a card structure
     * 4. Create card design
     * 5. Call this function
     * @param {Array} data Object list
     * @param {Array} structure Card data structure
     * @param {String} card Card design
     * @param {String} shellId Shell id
     */
    generateCardContainer: function (data, structure, card, shellId) {
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
        }
        document.getElementById(shellId).innerHTML = container;

    },
    /**
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
    generateDetailById: function (cardId, data, structure, card, shellId) {
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
    },
    /**
     * 
     * @param {Function} clickEvent 
     */
    generateClickableCard: function (clickEvent) {
        let buttons = document.getElementsByClassName('show-details');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                clickEvent(this.id);
            });
        }
    }
};

/**
 * @param {String} className
 * @param {String} eventType
 * @param {Function} eventFunction 
 */
function addListener(className, eventType, eventFunction) {
    let targets = document.getElementsByClassName(className);
    for (let i = 0; i < targets.length; i++) {
        targets[i].addEventListener(eventType, function () {
            let place = this.getAttribute('data-place');
            if (place) {
                eventFunction(place, this.id);
            }
        });
    }
}

export {cardContainerADetails as default, addListener};