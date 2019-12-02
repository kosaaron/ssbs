/**
 * Limit data from server
 */
/** Imports */
import FilterAndSort from './FilterAndSort.js';

export default class Limiting {
    constructor(frameId, filterPlace, callback, offset = 0) {
        offset += 20;
        this.onCreate(frameId, filterPlace, callback, offset);
    }

    //Loads
    onCreate(frameId, filterPlace, callback, offset) {
        document.getElementById(frameId + '_cc').insertAdjacentHTML(
            'beforeend',
            this.getCard(frameId)
        );

        document.getElementById(frameId + '_cc_limit_btn').addEventListener('click', function (e) {
            Limiting.moreClick(frameId, filterPlace, callback, offset);
        });
    }

    //Cards
    getCard(frameId) {
        return `
            <div id="${frameId}_cc_limit_btn" class="cc-limit-card">
                <i src=""/><h7>Tovább</h7>
            </div>
        `
    }

    //Events
    static moreClick(frameId, filterPlace, callback, offset) {
        let limit = '20';

        let dataPos = {};
        dataPos['Limit'] = limit;
        dataPos['Offset'] = offset;
        let isClear = false;

        FilterAndSort.FilteringOnDB(frameId, filterPlace, callback, dataPos, isClear);
    }
}