/**
 * Imports
 */
import CardContainer from './CardContainer.js';

/**
 * **Virtual object**
 */
let VirtualObject = {
    DetailsObj: function (data, card, shellId) {
        let cardBlock = card.split('!');
        let container = "";

        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];

            for (let j = 0; j < cardBlock.length; j++) {
                const elementJ = cardBlock[j];
                let elementX = elementJ.split('*');

                if (elementX.length === 1) {
                    container += elementJ;

                } else {
                    const elementC = elementX[1];
                    if (elementI[elementC] !== '' && elementI[elementC] !== undefined && elementI[elementC] !== null) {
                        container += elementX[0];
                        container += elementI[elementC];
                        container += elementX[2];
                    }
                }
            }
        }

        document.getElementById(shellId).insertAdjacentHTML('beforeend', container);
    }
}
export default VirtualObject;