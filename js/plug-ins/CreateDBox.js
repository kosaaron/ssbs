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
            //Get and remove id
            //let objectId = object[1];
            delete object[1];

            //Add subobject frame
            document.getElementById(targetId).insertAdjacentHTML(
                'beforeend',
                this.replaceValues({ '1': counter }, card)
            );

            //Add subobjects
            for (const number in object) {
                if (object.hasOwnProperty(number)) {
                    const value = object[number];
                    const label = subStructure[number];

                    let subObject = {};
                    subObject['n'] = number;
                    subObject['c'] = counter;
                    subObject['l'] = label;
                    subObject['v'] = value;

                    if (value === null || value === 'null' || value === '') {
                        continue;
                    }

                    document.getElementById(`${targetId}_${counter}`).insertAdjacentHTML(
                        'beforeend',
                        this.replaceValues(subObject, subcard)
                    );
                }
            }
            ++counter;
        }
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
}