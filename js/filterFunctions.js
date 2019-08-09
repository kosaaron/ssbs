/**
 * 
 * @param {String} place táblázat azonosító
 * @param {String} Id input azonosító
 */
function setFilter(place, Id) {
    return filterFunctions[place][Id];
}

/**
 * táblázat és inputid alapján adja a funkciót
 */
let filterFunctions = {
    'keszletkovetes': {
        get Kategória() { console.log('működik 1'); },
        get Raktár() { console.log('működik 2'); },
        get Harmadik() { console.log('működik 3'); },
        get Negyedik() { console.log('működik 4'); }
    }
};

/**
 * Generate filters
 * **use**
 * 1. Create html shell
 * 2. Get data from server (filters)
 * 3. Create filter change event in target js
 * 4. Call this function with parameters
 * @param {Array} filters Filter structure
 * @param {String} shellId 
 * @param {Function} eventFunction Selectpicker change event
 */
function generateFilters(filters, shellId, eventFunction) {
    let dropdownHtml = "";
    for (var i = 0; i < filters.length; i++) {
        if (filters[i].Type == "Write") {
            dropdownHtml += '<div class="my-3"><input type="text" class="form-control" id="' + filters[i].Name + '" data-place="' + shellId + '" placeholder="' +
                filters[i].Name + '" aria-label="' + filters[i].Name + '" aria-describedby="addon-wrapping"></div>';
        }
        else if (filters[i].Type == "Dropdown") {
            dropdownHtml += '<div class="dropdown my-3">';
            dropdownHtml += '<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" data-place="' + shellId + '" aria-haspopup="true" aria-expanded="false">';
            dropdownHtml += filters[i].Name;
            dropdownHtml += '</button>';
            dropdownHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
            if (filters[i].hasOwnProperty('Opportunities')) {
                for (let j = 0; j < filters[i].Opportunities.length; j++) {
                    dropdownHtml += '<a class="dropdown-item" href="#">';
                    dropdownHtml += filters[i].Opportunities[j];
                    dropdownHtml += '</a>';
                }
            }
            dropdownHtml += '</div></div>';
        }
        else {
            dropdownHtml += '<div class="form-group">';
            dropdownHtml += '<label class="taskfilter-label">' + filters[i].Name + '</label>';
            dropdownHtml += '<select class="selectpicker my-0 form-control taskfilter" id="' + filters[i].Name + '" data-live-search="true" data-place="' + shellId + '">';
            for (let k = 0; k < filters[i].Opportunities.length; k++) {
                dropdownHtml += '<option>' + filters[i].Opportunities[k] + '</option>';
            }
            dropdownHtml += '</select></div>';
        }
    }

    document.getElementById(shellId).innerHTML = dropdownHtml;
    $('.selectpicker').selectpicker('refresh');

    addListener('selectpicker', 'change', eventFunction);
}

export { setFilter, generateFilters as default };