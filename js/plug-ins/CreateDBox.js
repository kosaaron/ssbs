export default class CreateDBox {
    /**
     * Create
     * @param {JSON} data 
     * @param {String} card 
     * @param {String} targetId 
     */
    create(displayObject, card, subcard, targetId) {
        let data = displayObject.Data;
        let structure = displayObject.Structure;
        //Return if no data
        if (data === undefined || data.length == 0) {
            return;
        }

        let subStructure = this.getSubStructure(structure);

        let counter = 1;
        for (const object of data) {
            counter = CreateDBox.createCard(object, subStructure, card, subcard, targetId, counter)
        }
    }
    /**
     * CreateCard
     * @param {JSON} object 
     * @param {JSON} subStructure 
     * @param {String} card 
     * @param {String} subcard 
     * @param {String} targetId 
     * @param {String} counter 
     */
    static createCard(object, subStructure, card, subcard, targetId, counter) {
        //Get and remove id
        //let objectId = object[1];
        delete object[1];

        //Add subobject frame
        document.getElementById(targetId).insertAdjacentHTML(
            'beforeend',
            CreateDBox.replaceValues({ '1': counter }, card)
        );

        //Add subobjects
        for (const number in object) {
            if (object.hasOwnProperty(number)) {
                const value = object[number];
                if (value === null || value === 'null' || value === '') {
                    continue;
                }

                if (value && typeof value === 'object' && value.constructor === Object) {
                    counter = CreateDBox.createCard(value, subStructure, card, subcard, targetId, counter)
                    continue;
                }

                const label = subStructure[number];

                let subObject = {};
                subObject['n'] = number;
                subObject['c'] = counter;
                subObject['l'] = label;
                subObject['v'] = value;

                document.getElementById(`${targetId}_${counter}`).insertAdjacentHTML(
                    'beforeend',
                    CreateDBox.replaceValues(subObject, subcard)
                );
            }
        }
        ++counter;

        return counter;
    }
    /**
     * getSubStructure
     * @param {JSON} structure 
     */
    getSubStructure(structure) {
        let subStructure = {};
        for (const object of structure) {
            subStructure[object.Number] = object.Name;
        }
        return subStructure;
    }

    /**
     * replaceValues
     * @param {JSON} object 
     * @param {String} card 
     */
    static replaceValues(object, card) {
        for (const number in object) {
            if (object.hasOwnProperty(number)) {
                const value = object[number];

                if (value && typeof value === 'object' && value.constructor === Object) {

                    continue;
                }

                let searchValue = `*${number}*`
                searchValue = new RegExp(`\\*${number}\\*`, 'g')
                card = card.replace(searchValue, value);
            }
        }

        return card;
    }
}