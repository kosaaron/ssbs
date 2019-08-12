/** 
 * **Filters** 
 */
/** Imports */
import { addListener } from './../common.js';
import CardContainerPlus from './CardContainerPlus.js';
import FormElements from './FormElements.js';
/** Filters */
let Filters = {
    /**
     * **Create**
     * Generate filters
     * **use**
     * 1. Create html shell
     * 2. Get data from server (filters)
     * 3. Create filter change event in target js
     * 4. Call this function with parameters
     * @param {Array} filters Filter structure
     * @param {String} shellId 
     * @param {Function} eventFunction Selectpicker change event
     */
    Create: function (filters, shellId, eventFunction) {
        let filterStructure = Local.getFilterStructure(shellId);
        
        let filterCard = Local.getFilterCard();
        CardContainerPlus.Create(filters, shellId, filterCard, Local.getFilter);

        $('.selectpicker').selectpicker('refresh');

        addListener('selectpicker', 'change', eventFunction);
    }
}
export default Filters;

/** Local functions */
let Local = {
    getFilter: function (objectItem) {

        let ready = "";
        switch (objectItem.Type) {
            case "Write":
                ready = FormElements.Write(objectItem.Id, objectItem.Name, "", "A")
                break;
            case "Select":
                ready = FormElements.Something(objectItem.Id, objectItem.Name, "", objectItem.Opportunities, "A")
                break;
            default:
                break;
        }
        return ready;
    },
    getFilterStructure: function (shellId) {
        let filters = [
            {
                Id: "123",
                Name: "Kategória",
                Type: "Select",
                Default: "Karalábé",
                Opportunities: ["Sajt", "Karalábé", "Csoki"]
            },
            {
                Id: "124",
                Name: "Raktár",
                Type: "Select",
                Default: "Raktár3",
                Opportunities: ["Raktár1", "Raktár2", "Raktár3"]
            },
            {
                Id: "125",
                Name: "Harmadik",
                Type: "Select",
                Default: "Karalábé",
                Opportunities: ["Sajt", "Karalábé", "Csoki"]
            },
            {
                Id: "126",
                Name: "Negyedik",
                Type: "Select",
                Default: "Sajt",
                Opportunities: ["Sajt", "Karalábé", "Csoki"]
            },
            {
                Id: "127",
                Name: "Ötödik",
                Type: "Write",
                Default: "",
            },
        ];

        return filters;
    },
    getFilterCard: function () {
        let card = '?';
        return card;
    }
};

