//folyamatok/feladatok modul
function generateProcessList(data) {
    let container = `<div class="row">`;
    for (let i = 0; i < data.length; i++) {
        container += `<div class="col-sm-6"><div class="card taskcard"><div class="card-body">`;
        container += `<h5 class="card-title">${data[i].Name}</h5>`;
        container += `<p class="card-text">${data[i].Megrendelő}</p>`;
        container += `<a href="#" class="btn btn-primary next-button show-detail" data-show-details="${data[i].Id}"><i class="fas fa-arrow-right"></i></a>`;
        container += `</div></div></div>`;
    }
    document.getElementById('card-container').innerHTML = container;
    showDetail();
}

function showDetail() {
    const side_box = document.getElementById('details');
    const DETAIL = document.getElementsByClassName('show-detail');
    for (let i = 0; i < DETAIL.length; i++) {
        DETAIL[i].addEventListener("click", function() {
            for (let j = 0; j < process_maintain_list.length; j++) {
                const process = process_maintain_list[j];
                if(process.Id == this.getAttribute("data-show-details")) {
                    side_box.getElementsByTagName('h2').innerHTML = process.Name;
                    let labels = side_box.getElementsByTagName('label');
                    let props = [];
                    for (var key in process) {
                        if (process.hasOwnProperty(key)) {
                            props.push(key);
                        }
                    }
                    for (let k = 1, l = 2; k < labels.length; k+=2, l++) {
                        labels[k].innerHTML = process[props[l]];
                    }
                    document.getElementById('detail-placeholder').style.display = "none";
                    side_box.style.display = "block";
                    
                    return;
                }
            }
        })
    }
}

$(document).ready(function() {
    generateProcessList(process_maintain_list);
});

let process_maintain_list = [
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