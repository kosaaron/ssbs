/**
 * Import CardContainer for CreatePlus function
 */
import CardContainer from './CardContainer.js';
import CardContainerPlus from './CardContainerPlus.js';

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
        let cCData = [];

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

                        let elementX1 = elementJ.split('*');
                        const elementD = structure.Data[elementX1[1]];
                        if (elementI[elementD] !== '' && elementI[elementD] !== null) {
                            if (elementN !== '' && elementN !== null) {
                                if (elementX2.length !== 1) {
                                    elementJ = elementJ.replace('**' + elementX2[1] + '**', elementN);
                                }
                            }

                            container += elementJ.replace('*' + elementX1[1] + '*', elementI[elementD]);
                        }

                        c++;
                    }
                }

                for (let key in structure.Data) {
                    if (key[0] === 'g') {
                        let ccDataItem = {}
                        ccDataItem['Value'] = elementI[structure.Data[key]];
                        if (ccDataItem['Value'] === "" || ccDataItem['Value'] === null) {
                            continue;
                        }

                        ccDataItem['Id'] = key;
                        ccDataItem['Name'] = structure.Names[key];
                        cCData.push(ccDataItem);
                    }
                }

                break;
            }
        }
        document.getElementById(shellId).innerHTML = container;

        /** Auto data generator */
        if (cCData.length === 0) {
            return;
        }

        let cCStructure = {
            '1': 'Id',
            '2': 'Name',
            '3': 'Value'
        };
        let cCCard = '<p id="*1*">!<label class="title-text">*2*!</label><br><label>*3*</label></p>';
        CardContainer.Create(cCData, cCStructure, cCCard, shellId + '_cc_g');
    },
    /**
     * Create plus
     * @param {String} cardId 
     * @param {JSON Array} data 
     * @param {JSON Array} structure 
     * @param {String} card 
     * @param {String} shellId 
     * @param {String} IdName 
     * @param {Function} getData 
     */
    CreatePlus: function (cardId, data, card, shellId, IdName, getData) {

        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];
            if (cardId === elementI[IdName]) {
                const contactFullData = getData(elementI);
                const contactData = contactFullData.Data;
                const contactStructure = contactFullData.DataStructure;

                CardContainer.Create(contactData, contactStructure, card, shellId);
                break;
            }
        }
    }

};

export default CardDetails;