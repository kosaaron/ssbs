/**
 * Limit data from server
 */
/** Imports */
import GlobalVaribles from './GlobalVaribles.js';

export default class Limiter {
    /**
     * Integration
     * @param {String} parentFrameId 
     */
    static integration(parentFrameId) {
        let frameId = `${parentFrameId}_limiter`;

        //Set limiter default data
        let limiterData = {};
        limiterData.LimitOffset = '0';
        limiterData.LimitUnit = `${GlobalVaribles.CCLimitSize}`;
        localStorage.setItem(frameId, JSON.stringify(limiterData));

        //Limiter integrating
        this.create(frameId, parentFrameId);
    }

    /**
     * Create
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    static create(frameId, parentFrameId) {
        document.getElementById(parentFrameId).insertAdjacentHTML(
            'beforeend',
            this.getCard(frameId)
        );

        document.getElementById(`${frameId}_btn`).addEventListener('click', function (e) {
            Limiter.moreClick(frameId);
        });
    }

    /**
     * GetCard
     * @param {String} frameId 
     */
    static getCard(frameId) {
        return `
            <div id="${frameId}_btn" class="cc-limit-card">
                <i src=""/><h7>Tovább</h7>
            </div>
        `;
    }

    /** Events **/
    /**
     * moreClick
     * @param {String} frameId 
     */
    static moreClick(frameId) {
        let limit = '20';
/*
        let dataPos = {};
        dataPos['Limit'] = limit;
        dataPos['Offset'] = offset;*/
        alert();
    }
}