/** Imports **/

/** JSONToUpload **/
export default class JSONToUpload {
    /**
     * Constructor
     * @param {JSON} uploadNames 
     */
    constructor(uploadNames = null) {
        if (uploadNames !== null) {
            this.create(uploadName)
        }
    }

    /**
     * Create
     * @param {JSON} uploadNames 
     * **Example**
     *  {
     *      "table1.Column1":"value1"
     *      "table1.Column2":"value2"
     *      "table1.Column3":"value3"
     *  },
     */
    create(uploadNames) {
        let result = {};
        let tables = [];
        
        for (const uploadName in uploadNames) {
            if (!uploadNames.hasOwnProperty(uploadName))
                continue;

            const value = uploadNames[uploadName];

            let uploadNameArr = uploadName.split('.');
            let tableName = uploadNameArr[0];
            let columnName = uploadNameArr[1];
            let isNew = true;

            for (let i = 0; i < tables.length; i++) {
                if (tableName === tables[i]) {
                    isNew = false;
                }
            }

            if (isNew) {
                tables.push(tableName);
                result[tableName] = {};
            }

            result[tableName][columnName] = value;
        }



        //get data from elements
        /*
        for (const uploadName of uploadNames) {
            let uploadNameArr = uploadName.split('.');
            let tableName = uploadNameArr[0];
            let columnName = uploadNameArr[1];
            let isNew = true;

            for (let i = 0; i < tables.length; i++) {
                if (tableName === tables[i]) {
                    isNew = false;
                }
            }

            if (isNew) {
                tables.push(tableName);
            }

            let inputValue = {
                'tableName': tableName,
                'columnName': columnName,
                'value': input.value
            };
            inputValues.push(inputValue);
        }

        let result = {}
        for (let i = 0; i < tables.length; i++) {
            const table = tables[i];
            let tableBlock = {};

            for (let j = 0; j < inputValues.length; j++) {
                const inputValue = inputValues[j];
                if (table === inputValue['tableName']) {
                    tableBlock[inputValue['columnName']] = inputValue['value'];
                    inputValues.splice(j, 1);
                    --j
                }
            }
            result[table] = tableBlock;
        }*/
        return result;
    }
}