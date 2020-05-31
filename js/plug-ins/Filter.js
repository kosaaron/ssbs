/** 
 * **Filters** 
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import FormInputs from '../designs/FormInputs.js';
import { addListenerByAttr } from '../common.js';

let Varibles = {
    ShellId: ''
}

let Filter = {
    Create: function(placeId, moduleName, filters){
        let shellId = `${moduleName}_filters`;
        Varibles.ShellId = shellId;
        let filterHTML = "";
        filterHTML = `<h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>`;
        filterHTML += `<div id="${shellId}" class="task-filters"> </div>`;
        filterHTML += `<h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5>`;
        filterHTML += `<div class="task-orders"> </div>`;
        filterHTML += `<div id="${shellId}" class="task-filters"> </div>`;
        document.getElementById(placeId).innerHTML = filterHTML;
        CardContainerPlus.Create(filters, shellId, Local.getFilterHTML);

        addListenerByAttr(shellId, 'change', Filter.Change);
    },
    Change: function(){
        let shellId = Varibles.ShellId;
        let filterdata = FormInputs.CreateJSON(shellId);
        alert(JSON.stringify(filterdata));
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