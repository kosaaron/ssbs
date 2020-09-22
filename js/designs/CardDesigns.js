/**
 * Card designs
 */
export default class CardDesigns {
    /**
     * New entry card
     * @param {String} id 
     */
    static getNewEntryCard(id) {
        return `<div class="col-12"> <div id="${id}" class="card taskcard"><span class="absolute-add-button">+ Add item</span></div></div>`;
    }

    /**
     * getCardById
     * @param {String} cardId 
     * @param {String} shellId 
     */
    static getCardById(cardId, shellId) {
        switch (cardId) {
            case '1':
                return this.getSimpleCard(shellId);
            case '2':
                return this.getToolCard(shellId);
            case '3':
                return this.getEmployeeCard(shellId);
            default:
                break;
        }
    }

    /**
     * getSimpleCard
     * @param {String} shellId 
     */
    static getSimpleCard(shellId) {
        return `<div class="col-lg-6"> <div id="${shellId}_card_*1*" class="card taskcard ${shellId}-show-details" data-place="${shellId}" object-id="*1*"> <div class="card-body">!<h5 class="text-o-ellipsis card-title">*2*</h5>!<p class="card-text">*3*</p>! </div></div></div>`;
    }

    /**
     * getToolCard
     * @param {String} shellId 
     */
    static getToolCard(shellId) {
        return `<div class="col-lg-12"> <div id="${shellId}_card_*1*" class="card toolcard ${shellId}-show-details" data-place="${shellId}" object-id="*1*"> <div class="card-body"> <div class="display-flex justify-content-between"> <div class="tool-image-container"><img class="tool-image" src="https://images.obi.hu/product/HU/800x600/292962_1.jpg"></div><div class="tool-datas">!<h3 class="card-title tool-name">*2*</h3>!<p class="tool-detail"><i class="fas fa-map-pin"></i> Helye: *3*</p><div class="d-flex justify-content-between week-container"> <div class="week-day week-day-red"> <p class="day-name">H</p></div><div class="week-day week-day-green"> <p class="day-name">K</p></div><div class="week-day week-day-red"> <p class="day-name">Sz</p></div><div class="week-day week-day-green"> <p class="day-name">Cs</p></div><div class="week-day week-day-green"> <p class="day-name">P</p></div></div></div></div></div></div></div>`;
    }

    /**
     * getEmployeeCard
     * @param {String} shellId 
     */
    static getEmployeeCard(shellId) {
        return ` <div class="col-xl-4 col-lg-6"> <div id="${shellId}_card_*1*" class="card employeecard ${shellId}-show-details" data-place="${shellId}" object-id="*1*"> <div class="card-body"> <div class="row"> <div class="col-12 employee-image-container"> <i class="far fa-user"></i> </div></div><div class="row"> <div class="col-12 employee-datas">!<h3 class="card-title employee-name">*2*</h3>!<p class="employee-detail">*3*</p>!<p class="employee-detail"><span>*4*</span> ft/hó</p></div></div></div></div></div>`;
    }
}