/** employees.js */
/**
 * 1. Imports
 * 2. Loacal functions
 * 3. Public functions
 *    -  Employees
 */
/** Imports */
import CardContainer from './moduls/CardContainer.js';
import CardDetails from './moduls/CardDetails.js';
import Filters from './moduls/Filters.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';



function getEmployeesCard() {
    let container = "";
    container += '<div class="col-lg-12"><div class="card employeecard"><div class="card-body"><div class="display-flex justify-content-between">';
    container += '!<div class="employee-image-container display-flex align-items-center"><img class="employee-image"src="*"></div>';
    container += '!<div class="employee-datas"><h3 class="card-title employee-name">*</h3>';
    container += '!<span class="employee-rate"><i class="far fa-star"></i> *</span>';
    container += '!<p class="employee-position">*</p>';
    container += '!<p class="employee-detail">Összes költség: <span>*</span> forint/hó</p>';
    container += '!<a href="#" class="btn btn-primary message-button show-details"><i class="fas fa-paper-plane"></i></a>';
    container += '!<a href="#" class="btn btn-primary next-button show-details" id="fjh7zd"><i class="fas fa-arrow-right"></i></a></div></div></div></div></div>';

    return container;

    


}

/**
 * Partners manager details template
 */
function getEmployeeDetail() {
    let container = "";
    
    container += '<h2>*</h2>';
    container += '!<p><label class="employee-position">*</label></p>';
    container += '!<div class="card"><div class="card-header employee-card-header" id="headingOne"><h5 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><label class="title-text">Elérhetőségek</label></button></h5></div><div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body collapse-card-body">';
    container += '!<p class="employee-detail-par"><label><i class="fas fa-mobile-alt employee-contact-icon"></i> *</label></p>';
    container += '!<p class="employee-detail-par"><label><i class="far fa-envelope employee-contact-icon"></i> *</label></p>';
    container += '!<p class="employee-detail-par"><label><i class="fas fa-home employee-contact-icon"></i></i> *</label></p></div></div></div>';
    container += '!<div class="card"><div class="card-header employee-card-header" id="headingTwo"><h5 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><label class="title-text">Személyes adatok</label></button></h5></div><div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample"><div class="card-body collapse-card-body">';
    for (let i = 0; i < 7; i++) {
        container += '<p class="employee-detail-par"><label><span class="employee-datatype">**: </span>*</label></p>';
    }
    container += '</div></div></div><div class="card"><div class="card-header employee-card-header" id="headingThree"><h5 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><label class="title-text">Pénzügyek</label></button></h5></div><div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample"><div class="card-body collapse-card-body">';
    for (let i = 0; i < 5; i++) {
        container += '<p class="employee-detail-par"><label><span class="employee-datatype">**: </span>* Ft</label></p>';
    }
    container += '!<p class="employee-detail-par"><label class="employee-aggregated"><span class="employee-datatype">**: </span><span class="cost-red-style">* Ft</span></label></p>';
    container += '!<p class="employee-detail-par"><label><span class="employee-datatype">**: </span><span class="income-green-style">* Ft</span></label></p>';
    container += '!<p class="employee-detail-par"><label class="employee-aggregated"><span class="employee-datatype">**: </span><span class="income-green-style">* Ft</span></label></p></div></div></div></div>';
    container += '!<div class="employee-button-container"><button id="edit_*" type="button" class="btn btn-primary  edit-employee-button"><i class="fas fa-edit tool-tag-icon"></i>Szerkeszt</button></div>';
    
    return container;

}

function getEmployeesMDStructure() {
    return employee_structure_2;
}

function employeeCardClick(cardId) {
    let data = employees_list;
    let structure = getEmployeesMDStructure();
    let card = getEmployeeDetail();
    let shellId = "employee_details";

    CardDetails.Create(cardId, data, structure, card, shellId);
}

function employeeFileterChange(id) {
    alert(id);
}

function addEmployee() {
    newTool.loadNewTool();
    /*Ezt még rendesen át kell alakítani*/
    addOneListener("back_to_tool", "click", tools.loadTools);
}

var employees = {
    loadEmployees: function () {
        // Load framework
        let framework = '<div id="employees" class="display-flex flex-row full-screen"> <div class="flex-fill col-2 filter-box"> <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5><div id="employee_filters" class="task-filters"></div><div class="task-orders"> <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés</h5> <div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés1</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div><div class="form-group"> <label class="taskfilter-label" for="exampleFormControlSelect1">Rendezés2</label> <select class="form-control taskfilter" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </div></div></div><div class="col-10 filtered-table display-flex flex-1"> <button id="add_employee_btn" class="btn btn-primary fixedaddbutton"><i class="fas fa-plus"></i></button> <div class="card-container col-8"> <div id="employees_card_container" class="row"> </div></div><div class="col-4" id="detail-placeholder" style="display: none"> A részletekért válassz egy feladatot! </div><div class="col-4" id="employee_details"> </div><div class="filtered-table-fade flex-1"></div></div></div>';
        document.getElementById("resources_content").innerHTML = framework;

        // Load card container
        let data = employees_list;
        let cardStructure = employee_structure;
        let cardDesign = getEmployeesCard();
        let cardContainer = "employees_card_container";
        CardContainer.Create(data, cardStructure, cardDesign, cardContainer);
        CardContainer.ClickableCard(employeeCardClick);
        if (data[0].Id !== null) {
            employeeCardClick(data[0].Id);
        }

        Filters.Create(activeTableFilters, "employee_filters", employeeFileterChange);

        addOneListener("add_employee_btn", "click", addEmployee);
    }
};
export default employees;

var employee_structure = [
    "ImgSrc",
    "Name",
    "Teljesítmény_pont",
    "Beosztás",
    "Összköltség",
    "Id"
];

var employee_structure_2 = {
    Names: [
        null,
        null,
        null,
        null,
        null,
        "Születési név",
        "Neme",
        "Személyig. száma",
        "Adószám",
        "Születési év",
        "Születési hely",
        "Anyja neve",
        "Bruttó bér",
        "Céges autó költségei",
        "Telefonszámla",
        "Egészségügyi kezelés",
        "Biztosítás",
        "Összes költség",
        "Megtermelt bevétel",
        "Mérleg",
        null
    ],
    Data: [
        "Name",
        "Beosztás",
        "Mobilszám",
        "Email",
        "Cím",
        "Születési_név",
        "Neme",
        "Személyi_szám",
        "Adószám",
        "Születési_év",
        "Születési_hely",
        "Anyja_neve",
        "Bruttó_bér",
        "Céges_autó",
        "Telefonszámla",
        "Egészségügyi_kezelés",
        "Biztosítás",
        "Összes_költés",
        "Megtermelt_bevétel",
        "Mérleg",
        "Id"]
};


var activeTableFilters = [
    {
        Id: "1234",
        Name: "Kategória",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "1235",
        Name: "Raktár",
        Type: "Select",
        Default: "Raktár3",
        Opportunities: ["Raktár1", "Raktár2", "Raktár3"]
    },
    {
        Id: "1236",
        Name: "Harmadik",
        Type: "Select",
        Default: "Karalábé",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "1237",
        Name: "Negyedik",
        Type: "Select",
        Default: "Sajt",
        Opportunities: ["Sajt", "Karalábé", "Csoki"]
    },
    {
        Id: "1238",
        Name: "Ötödik",
        Type: "Write",
        Default: "",
    },
];

var employees_list = [
    {
        Id: 'fjh7zd3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'


    },
    {
        Id: 'fjh7zd3',
        Name: 'Jabba',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://vignette.wikia.nocookie.net/starwars/images/7/7f/Jabba_SWSB.png/revision/latest?cb=20160910034237',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjh7zd',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjh7z',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Name: 'Microsoft Corporation',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'h7zd3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjh7z3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjh7d3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjhzd3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fj7zd3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fh7zd3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjh7zw',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjh73w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    },
    {
        Id: 'fjh3w',
        Name: 'Luke Skywalker',
        Kezdés_dátum: '2019.01.31.',
        ImgSrc: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-i-am-a-jedi_fce1d84d.jpeg?region=204%2C0%2C414%2C413',
        Teljesítmény_pont: '4,67',
        Beosztás: 'Jedilovag',
        Összköltség: '814 450',
        Mobilszám: '+36 30 123 12 12',
        Email: 'swluke@rebelmail.com',
        Cím: 'Budapest, 1132, Pozsonyi utca 45.',
        Születési_név: 'Luke Skywalker',
        Neme: 'férfi',
        Személyi_szám: '454512WE',
        Adószám: '123123123',
        Születési_év: '1987.03.15',
        Születési_hely: 'Budapest',
        Anyja_neve: 'Nagy Katalin',
        Bruttó_bér: '674 000 Ft',
        Céges_autó: '79 540 Ft',
        Telefonszámla: '4560 Ft',
        Egészségügyi_kezelés: '8900 Ft',
        Biztosítás: '47 450 Ft',
        Összes_költés: '814 450 Ft',
        Megtermelt_bevétel: '950 000 Ft',
        Mérleg: '+135 550 Ft'
    }
]