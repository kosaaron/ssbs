/**
 * Import CardContainer for CreatePlus function
 */
import CardContainer from './CardContainer.js';
import VirtualObject from './VirtualObject.js';
import AutoScroll from './AutoScroll.js';
import VOCardDesign from '../designs/VOCardDesign.js';

/**
 * **Card details**
 */

let CardDetails = {
    /**
     * **Create**
     * Generate detail by id
     * **use**
     * 1. Click event
     * 2. Call this function
     * @param {Integer} cardId Id of clicked card
     * @param {Array} data Object list
     * @param {Array} structure Card data structure
     * @param {String} card Card design
     * @param {String} shellId Shell id
     * @param {String} IdName Name of id
     */
    Create: function (cardId, data, structure, card, shellId, IdName) {
        let cCData = [];
        let vObjects = [];

        let cardBlock = card.split('!');
        let container = "";

        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];
            if (cardId === elementI[IdName]) {
                for (let j = 0; j < cardBlock.length; j++) {
                    let elementJ = cardBlock[j];

                    if (elementJ.split('*').length === 1) {
                        container += elementJ;
                    } else {
                        let elementX2 = elementJ.split('**');
                        const elementN = structure.Names[elementX2[1]];

                        let elementX1 = elementJ.split('*');
                        const elementD = structure.Data[elementX1[1]];
                        if (elementI[elementD] !== '' && elementI[elementD] !== null && elementI[elementD] !== undefined) {
                            if (elementN !== '' && elementN !== null) {
                                if (elementX2.length !== 1) {
                                    elementJ = elementJ.replace('**' + elementX2[1] + '**', elementN);
                                }
                            }
                            container += elementJ.replace('*' + elementX1[1] + '*', elementI[elementD]);
                        }
                    }
                }

                for (let key in structure.Data) {
                    if (key[0] === 'g') {
                        let ccDataItem = {}
                        ccDataItem['Value'] = elementI[structure.Data[key]];
                        if (ccDataItem['Value'] === "" || ccDataItem['Value'] === null) {
                            continue;
                        }

                        ccDataItem['Id'] = key;
                        ccDataItem['Name'] = structure.Names[key];
                        cCData.push(ccDataItem);
                    } else if (key[0] === 'o') {
                        elementI[structure.Data[key]]['Number'] = key;
                        vObjects.push(elementI[structure.Data[key]]);
                    }
                }

                break;
            }
        }

        // Default data
        document.getElementById(shellId).innerHTML = container;

        /** Details tab framework */
        let vObjectsLength = vObjects.length;
        if (vObjectsLength === 0) {
            let readyHTML = '';
            readyHTML += '<div id="' + shellId + '_content">';

            //readyHTML += '<div id="task_timeline" class="task-timeline"> </div>';
            readyHTML += '<div id="' + shellId + '_cc_g"> </div>';
            readyHTML += '</div>';

            document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);
        } else {
            //Frame
            let readyHTML = '';
            readyHTML += '<div class="display-flex justify-content-center">';
            readyHTML += '<div id="' + shellId + '_tab" class="btn-group btn-group-toggle btn-group-detailmenu" data-toggle="buttons">';

            //Labels
            readyHTML += '<label id="' + shellId + '_data_btn" tab-cont-id="' + shellId + '_cc_g" class="btn btn-detail-menu btn-detail-menu-active">';
            readyHTML += 'Adatok </label>';

            for (let i = 0; i < vObjectsLength; i++) {
                const vObject = vObjects[i];

                readyHTML += '<label id="' + shellId + '_vo_' + vObject['Number'] + '_btn"' 
                    + ' tab-cont-id="' + shellId + '_vo_' + vObject['Number']
                    + '" class="btn btn-detail-menu">';
                readyHTML += vObject['NameAlias'] + '</label>';
            }
            readyHTML += '</div></div>';

            //Containers
            readyHTML += '<div id="' + shellId + '_content">';
            readyHTML += '<div id="' + shellId + '_cc_g" class="' + shellId + '_vo"> </div>';
            for (let i = 0; i < vObjectsLength; i++) {
                const vObject = vObjects[i];
                readyHTML += '<div id="' + shellId + '_vo_' + vObject['Number'] + '" style="display: none;" class="' + shellId + '_vo"> </div>';
            }
            readyHTML += '</div>';
            document.getElementById(shellId).insertAdjacentHTML('beforeend', readyHTML);

            //Events
            function vOClick(event) {
                $('.btn-detail-menu-active').removeClass('btn-detail-menu-active');
                $('.' + shellId + '_vo').css("display", "none");

                $('#' + this.id).addClass('btn-detail-menu-active');
                $('#' + this.getAttribute('tab-cont-id')).css("display", "block");
            }

            document.getElementById(shellId + '_data_btn').addEventListener('click', vOClick);

            for (let i = 0; i < vObjectsLength; i++) {
                const vObject = vObjects[i];
                document.getElementById(shellId + '_vo_' + vObject['Number'] + '_btn').addEventListener('click', vOClick);
            }
        }

        /** Auto data generator */
        if (cCData.length === 0) {
            return;
        }

        let cCStructure = {
            '1': 'Id',
            '2': 'Name',
            '3': 'Value'
        };
        let cCCard = '<p id="*1*">!<label class="title-text">*2*!</label><br><label>*3*</label></p>';
        CardContainer.Create(cCData, cCStructure, cCCard, shellId + '_cc_g');


        /** Virtual object generator */
        for (let i = 0; i < vObjects.length; i++) {
            const vObject = vObjects[i];
            if (!('Data' in vObject)) {
                return;
            }
            let vOShellId = shellId + '_vo_' + vObject['Number'];
            VirtualObject.DetailsObj(vObject.Data, getVOCard(vObject.Card, vOShellId), vOShellId);
        }

        AutoScroll.Integration(shellId + '_content');
    },
    /**
     * Create plus
     * @param {String} cardId 
     * @param {JSON} data 
     * @param {JSON} structure 
     * @param {String} card 
     * @param {String} shellId 
     * @param {String} IdName 
     * @param {Function} getData 
     */
    CreatePlus: function (cardId, data, card, shellId, IdName, getData) {

        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];
            if (cardId === elementI[IdName]) {
                const contactFullData = getData(elementI);
                const contactData = contactFullData.Data;
                const contactStructure = contactFullData.DataStructure;

                CardContainer.Create(contactData, contactStructure, card, shellId);
                break;
            }
        }
    }

};
export default CardDetails;

/** Local functions */
/**
 * Get virtual object card
 * @param {String} func 
 * @param {String} vOShellId 
 */
function getVOCard(func, vOShellId) {
    let vOCardDesign = new VOCardDesign()
    switch (func) {
        case 'simple':
            return vOCardDesign.getSimple(vOShellId)
        case 'remark':
            return vOCardDesign.getRemark(vOShellId)
        case 'contacts':
            return vOCardDesign.getContact(vOShellId)
        default:
            break;
    }
}