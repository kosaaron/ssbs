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
        //Get the indexes from data
        let dataIndexes = Object.keys(data[0]);
        //Calculate indexes of usless units
        let removeIndexes = cardIndexes.filter(n => !dataIndexes.includes(n));
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
                this.replaceValues(object, readyCard)
            );
        }
    }

    /**
     * replaceValues
     * @param {JSON} object 
     * @param {String} card 
     */
    replaceValues(object, card) {
        for (const number in object) {
            if (object.hasOwnProperty(number)) {
                const value = object[number];

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