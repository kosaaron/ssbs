import cardContainerADetails from './common.js';

function getPartnersMCard() {
    let container = "";
    container += '<div class="col-lg-6"><div class="card taskcard"><div class="card-body">';
    container += '!<h5 class="card-title">*</h5>';
    container += '!<p class="card-text">*</p>';
    container += `!<a href="#" class="btn btn-primary next-button show-detail" onclick='partnerMCardClick("*")'><i class="fas fa-arrow-right"></i></a></div></div></div>`;

    return container;
}

function getPartnersMDetail() {
    let container = "";

    container += '<h2>*</h2>';
    container += '!<p><label class="title-text">Feladat típusa:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Megrendelő:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Létrehozás:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Határidő:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Cím:</label><br><label>*</label></p>';
    container += '!<p><label class="title-text">Leírás:</label><br><label>*</label></p>';

    return container;
}

function partnerMCardClick(cardId) {
    let data = process_maintain_list;
    let structure = partner_m_structure_2;
    let card = getPartnersMDetail();
    let shellId = "details";

    cardContainerADetails.generateDetailById(cardId, data, structure, card, shellId);
}

/*
function showDetail() {
    const side_box = document.getElementById('details');
    const DETAIL = document.getElementsByClassName('show-detail');
    for (let i = 0; i < DETAIL.length; i++) {
        DETAIL[i].addEventListener("click", function () {
            for (let j = 0; j < process_maintain_list.length; j++) {
                const process = process_maintain_list[j];
                if (process.Id == this.getAttribute("data-show-details")) {
                    side_box.getElementsByTagName('h2')[0].innerHTML = process.Name;
                    let labels = side_box.getElementsByTagName('label');
                    let props = [];
                    for (var key in process) {
                        if (process.hasOwnProperty(key)) {
                            props.push(key);
                        }
                    }
                    for (let k = 1, l = 2; k < labels.length; k += 2, l++) {
                        labels[k].innerHTML = process[props[l]];
                    }
                    document.getElementById('detail-placeholder').style.display = "none";
                    side_box.style.display = "block";

                    return;
                }
            }
        })
    }
}*/

$(document).ready(function () {
    // Load card container
    let data = process_maintain_list;
    let cardStructure = partner_m_structure;
    let cardDesign = getPartnersMCard();
    let cardContainer = "card_container_r";
    cardContainerADetails.generateCardContainer(data, cardStructure, cardDesign, cardContainer);
});

var partner_m_structure = [
    "Name",
    "Megrendelő",
    "Id"
];

var partner_m_structure_2 = [
    "Name",
    "Type",
    "Megrendelő",
    null, //"Létrehozás",
    "Határidő",
    "Cím",
    "Leírás"
];

var process_maintain_list = [
    {
        Id: 'fjh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7zd3',
        Name: 'Nyomtató szervíz2',
        Type: 'Szervíz2',
        Megrendelő: 'Lajos Kft.2',
        Létrehozás: '2019.06.24 2',
        Határidő: '2019.06.30 2',
        Cím: 'Érd, Tóth Ilona utca 14., 2340 2',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje 2'
    },
    {
        Id: 'fjh7zd',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7z',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'jh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'h7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7z3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7d3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjhzd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fj7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fh7zd3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh7zw',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh73w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    },
    {
        Id: 'fjh3w',
        Name: 'Nyomtató szervíz',
        Type: 'Szervíz',
        Megrendelő: 'Lajos Kft.',
        Létrehozás: '2019.06.24',
        Határidő: '2019.06.30',
        Cím: 'Érd, Tóth Ilona utca 14., 2340',
        Leírás: 'Nyomtató elhozatala, majd CD-12-es panel cseréje'
    }
]