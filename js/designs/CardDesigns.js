/**
 * Card designs
 */
export default class CardDesigns {
    /** CC cards */
    getSimpleCard(shellId) {
        return `
        <div class="col-lg-6">
            <div id="${shellId}_card_*1*" class="card taskcard ${shellId}-show-details">
                <div class="card-body">
                    !<h5 class="text-o-ellipsis card-title">*2*</h5>
                    !<p class="card-text">*3*</p>!
                </div>
            </div>
        </div>
        `
    }
    getToolCard(shellId) {
        return `
        <div class="col-lg-12">
            <div id="${shellId}_card_*5*" class="card toolcard ${shellId}-show-details">
                <div class="card-body">
                    <div class="display-flex justify-content-between">
                        <div class="tool-image-container"><img class="tool-image" src="https://images.obi.hu/product/HU/800x600/292962_1.jpg"></div>
                        <div class="tool-datas">
                            !<h3 class="card-title tool-name">*2*</h3>
                            !<p class="tool-detail"><i class="fas fa-map-pin"></i> Helye: *3*</p>
                            <div class="d-flex justify-content-between week-container">
                                <div class="week-day week-day-red">
                                    <p class="day-name">H</p>
                                </div>
                                <div class="week-day week-day-green">
                                    <p class="day-name">K</p>
                                </div>
                                <div class="week-day week-day-red">
                                    <p class="day-name">Sz</p>
                                </div>
                                <div class="week-day week-day-green">
                                    <p class="day-name">Cs</p>
                                </div>
                                <div class="week-day week-day-green">
                                    <p class="day-name">P</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    getEmployeeCard(){
        return `
        <div class="col-lg-12">
            <div id="empl_card_*1*" class="card employeecard empl-show-details">
                <div class="card-body">
                    <div class="display-flex justify-content-between">
                        <div class="employee-image-container display-flex align-items-center"><i class="far fa-user"></i></div>
                        <div class="employee-datas">
                            !<h3 class="card-title employee-name">*4* !*5*</h3>
                            !<p class="employee-position">*2*</p>
                            !<p class="employee-detail">Összes költség: <span>*3*</span> forint/hó</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}