/**
 * Import CardContainer for CreatePlus function
 */
import CardContainer from './CardContainer.js';


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
     * @param {String} IdName Name of id
     */
    Create: function (cardId, data, structure, card, shellId, IdName) {
        let cardBlock = card.split('!');

        let container = "";
        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];
            if (cardId === elementI[IdName]) {
                let c = 0;
                for (let j = 0; j < cardBlock.length; j++) {
                    let elementJ = cardBlock[j];

                    if (elementJ.split('*').length === 1) {
                        container += elementJ;

                    } else {
                        let elementX2 = elementJ.split('**');
                        const elementN = structure.Names[elementX2[1]];

                        if (elementN !== '' && elementN !== null) {
                            if (elementX2.length !== 1) {
                                elementJ = elementJ.replace('**' + elementX2[1] + '**', elementN);
                            }
                        }
                        let elementX1 = elementJ.split('*');
                        const elementD = structure.Data[elementX1[1]];
                        if (elementI[elementD] !== '' && elementI[elementD] !== null) {
                            container += elementJ.replace('*' + elementX1[1] + '*', elementI[elementD]);
                        }

                        c++;
                    }
                }
                break;
            }
        }
        document.getElementById(shellId).innerHTML = container;
    },
    
    CreatePlus: function(cardId, data, structure, card, shellId, IdName, getData){
        
        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];
            if (cardId === elementI[IdName]) {
                const element = data[i];
                const contactdata = getData(element);
                CardContainer.Create(contactdata, structure, card, shellId);
                break;
            }
        }
    }

};

export default CardDetails;