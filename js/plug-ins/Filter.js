/** 
 * **Filters** 
 */
/** Imports */
import CardContainerPlus from './CardContainerPlus.js';
import FormInputs from '../designs/FormInputs.js';
import { addListenerByAttr } from '../common.js';

export default class Filter {
    /**
     * Create filter
     * @param {String} placeId 
     * @param {String} moduleName 
     * @param {JSON} filters 
     */
    Create(frameId, moduleName, plugin){
        let filterShellId = `${moduleName}_filters`;
        let sortShellId = `${moduleName}_sorts`;
        let filterHTML = "";
        filterHTML = `<h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>`;
        filterHTML += `<div id="${filterShellId}" class="task-filters"> </div>`;
        filterHTML += `<h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5>`;
        filterHTML += `<div class="task-orders"> </div>`;
        filterHTML += `<div id="${sortShellId}" class="task-filters"> </div>`;
        document.getElementById(frameId).innerHTML = filterHTML;
        CardContainerPlus.Create(plugin.Data[1].Inputs, filterShellId, this.getFilterHTML);
        CardContainerPlus.Create(plugin.Data[2].Inputs, sortShellId, this.getFilterHTML);

        addListenerByAttr(filterShellId, 'change', function(){
            Filter.Change(moduleName);
            }
        );

        addListenerByAttr(sortShellId, 'change', function(){
            Filter.Change(moduleName);
            }
        );
    }
    /**
     * Change filter data refresh
     * @param {String} shellId 
     */
    static Change(shellId){
        let filterdata = FormInputs.CreateJSON(shellId + '_filters');
        let sortdata = FormInputs.CreateJSON(shellId + '_sorts');
        alert(JSON.stringify(filterdata));
        alert(JSON.stringify(sortdata));
    }
    /**
     * 
     * @param {Object} objectItem 
     * @param {String} shellId 
     */
    getFilterHTML(objectItem, shellId){
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