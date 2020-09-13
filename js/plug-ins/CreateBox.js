export default class CreateBox {
    /**
     * Create
     * @param {JSON} data 
     * @param {String} card 
     * @param {String} targetId 
     */
    create(displayObject, card, targetId) {
        let data = displayObject.Data;
        let structure = displayObject.Structure;
        //Return if no data
        if (data === undefined || data.length == 0) {
            return;
        }

        //Get the indexes on the card
        let cardIndexes = this.getCardIndexes(card);
        //Get the indexes from frist object of data
        let firstObj = data[0];
        let dataIndexes = Object.keys(firstObj);
        //Calculate indexes of usless units
        //let removeIndexes = cardIndexes.filter(n => !dataIndexes.includes(n));
        let removeIndexes = CreateBox.getRemoveIndexes(cardIndexes, dataIndexes, firstObj);
        console.log(cardIndexes);
        console.log(dataIndexes);
        console.log(firstObj);
        console.log(removeIndexes);

        //Get ready card 
        let readyCard = this.getReadyCard(card, removeIndexes);

        //Find primary key object
        let primaryKeyOj = {};
        for (const columnData of structure) {
            //Primary key column
            if (columnData.Number === '1') {
                primaryKeyOj = columnData;
                break;
            }
        }

        for (const object of data) {
            document.getElementById(targetId).insertAdjacentHTML(
                'beforeend',
                CreateBox.replaceValues(object, readyCard)
            );
        }
    }

    static getRemoveIndexes(cardIndexes, dataIndexes, firstObj) {
        let result = [];
        for (const cardIndex of cardIndexes) {
            if (getIsRemoveIndex(cardIndex, dataIndexes, firstObj)) {
                result.push(cardIndex);
            }
        }

        return result;

        //GetIsRemoveIndex
        function getIsRemoveIndex(cardIndex, dataIndexes, firstObj) {
            let isRemoveIndex = true;
            for (const dataIndex of dataIndexes) {
                let value = firstObj[dataIndex];
                if (value && typeof value === 'object' && value.constructor === Object) {
                    let isRemoveIndex = getIsRemoveIndex(cardIndex, Object.keys(value), value);
                    if (!isRemoveIndex) {
                        return isRemoveIndex;
                    }
                }

                if (dataIndex === cardIndex) {
                    isRemoveIndex = false;
                    break;
                }
            }

            return isRemoveIndex;
        }
    }

    /**
     * GetValue
     * @param {JSON} object 
     * @param {String} number 
     */
    static getValue(object, number) {
        if (object.hasOwnProperty(number)) {
            let final = {};
            final['id'] = object['1'];
            final['value'] = object[number];
            return final;
        }

        for (const oNumber in object) {
            if (object.hasOwnProperty(oNumber)) {
                const value = object[oNumber];

                if (value && typeof value === 'object' && value.constructor === Object) {
                    let result = StepBox.getValue(value, number);

                    if (result !== null) {
                        return result;
                    }
                }
            }
        }

        return null;
    }

    /**
     * replaceValues
     * @param {JSON} object 
     * @param {String} card 
     */
    static replaceValues(object, card) {
        for (const number in object) {
            if (object.hasOwnProperty(number)) {
                let value = object[number];
                if (value && typeof value === 'object' && value.constructor === Object) {
                    card = CreateBox.replaceValues(value, card);
                    continue;
                }

                let searchValue = `*${number}*`
                searchValue = new RegExp(`\\*${number}\\*`, 'g')
                card = card.replace(searchValue, value);
            }
        }

        return card;
    }

    /**
     * getCardIndexes
     * @param {String} card 
     */
    getCardIndexes(card) {
        let result = [];
        let splittedCard = card.split('*');

        for (let i = 0; i < splittedCard.length; i++) {
            if ((i + 1) % 2 === 0) {
                result.push(splittedCard[i]);
            }
        }

        return result;
    }

    /**
     * getReadyCard
     * @param {String} card 
     * @param {JSON} removeIndexes 
     */
    getReadyCard(card, removeIndexes) {
        let result = '';
        let cardUnits = card.split('!');
        for (const cardUnit of cardUnits) {
            let isAdd = true;
            for (const index of removeIndexes) {
                if (cardUnit.split(`*${index}*`).length > 1) {
                    isAdd = false;
                }
            }

            if (isAdd) {
                result += cardUnit;
            }
        }

        return result;
    }
}