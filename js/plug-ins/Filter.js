/** 
 * **Filters** 
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import FormInputs from '../designs/FormInputs.js';
import { addListenerByAttr } from '../common.js';


let Filter = {
    Create: function(filters, shellId, eventFunction){
        CardContainerPlus.Create(filters, shellId, Local.getFilterHTML);
        

        addListenerByAttr(shellId, 'change', eventFunction);
    }
}
let Local = {
    getFilterHTML: function(objectItem, shellId){
        switch (objectItem.Type) {
            case "WF":
                FormInputs.WriteFilter(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.UploadName,
                    objectItem.DefaultValue,
                    objectItem.TableName,
                    objectItem.ColumnName
                );
                break;
            case "S":
                FormInputs.SelectFilter(
                    objectItem.FormStructureId,
                    objectItem.Name,
                    shellId,
                    objectItem.Opportunities,
                    objectItem.UploadName,
                    objectItem.Required,
                    objectItem.DefaultValue
                );
                break;
            default:
                break;
        }
        
    }
}
export default Filter;