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
        get Kategória() {console.log('működik 1');},
        get Raktár() {console.log('működik 2');},
        get Harmadik() {console.log('működik 3');},
        get Negyedik() {console.log('működik 4');}
    }
};

export default setFilter;