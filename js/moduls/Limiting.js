/**
 * Limit data from server
 */
/** Imports */
import FilterAndSort from './FilterAndSort.js';

export default class Limiting {

    constructor(frameId, offset = 0) {
        this.onCreate(frameId, offset);
    }

    //Loads
    onCreate(frameId, offset) {
        document.getElementById(frameId).insertAdjacentHTML('beforeend', this.getCard(frameId, offset));
        document.getElementById(frameId + '_cc_limit_btn').addEventListener('click', function (e) {
            Limiting.moreClick(frameId, offset);
        })
    }

    //Cards
    getCard(frameId, offset) {
        return `
            <div id="${frameId}_cc_limit_btn" offset="${offset}" class="cc-limit-card">
                <i src=""/><h7>Tovább</h7>
            </div>
        `
    }

    //Events
    static moreClick(frameId, offset) {
        //let offset = document.getElementById(frameId + '_limit_btn').getAttribute('offset');
        let limit = '20';

        let dataPos = {};
        dataPos['Limit'] = limit;
        dataPos['Offset'] = offset;

        FilterAndSort.FilteringOnDB();
    }
}