/** 
 * **Filters** 
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import FormInputs from '../designs/FormInputs.js';


let Filter = {
    Create: function(filters, shellId){
        CardContainerPlus.Create(filters, shellId, Local.getFilterHTML);
        
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