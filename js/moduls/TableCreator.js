let TableCreator = {
    /**
     * 
     * @param {Array} data 
     * @param {Array} structure 
     * @param {String} plainHtml 
     * @param {String} shellId 
     * @param {String} checkbody 
     */
    Create: function (data, structure, plainHtml, shellId, checkbody, widths) {

        /*
        plainHTML-re egy példa:
        let tableStandardBody = `<div class="container-fluid row">
                                    <table class="table table-hover mb-0 col-12">
                                        <thead class="thead-light">
                                            <tr class="row m-0">
                                                !<th class="d-inline-block *'">*</th>! --> a headerben csak ezt a sok iteráljuk, ezért van a két végén !-jel. 
                                            </tr>
                                        </thead>
                                    </table>
                                    !<table class="table table-hover mb-0 col-12"> --> itt a !-jel inkább jelzés értékű, hogy ez már a rendes táblázat, nem a header.
                                        <tbody>
                                            !<tr class="m-0 data-row"> --> !-jel azért van, mert minden adatobjektumonként a következő !-jelig loopolunk ezen a soron, vagyis minden adatobjektum egy sor lesz.
                                                !<td class="d-inline-block *">?</td> --> ezt a sort a ?jel ketté bontja, a megjelenítendő szöveg kerül a ?jel helyére. A * azért van, mert ha checkbox típusú a cella, akkor az kerül oda.
                                            !</tr>! --> adatobjektumonként egy ilyen kell, hogy bezárjon a sor
                                        </tbody>
                                    </table>
                                </div>`;
        */
        let container = "";

        //start header
        container += plainHtml.split('!')[0];

        //create header
        let header = plainHtml.split('!')[1];
        let headerText = header.split('*');
        for (let i = 0; i < structure.length; i++) {
            container += headerText[0] + widths[i] + headerText[1] + structure[i] + headerText[2];
        }

        //end header
        container += plainHtml.split('!')[2];

        //start body
        container += plainHtml.split('!')[3];

        //create body
        let body = plainHtml.split('!')[5];
        let bodyText = body.split('?');

        for (let i = 0; i < data.length; i++) { //tr-ek iterálása
            container += plainHtml.split('!')[4];
            for (let j = 0; j < structure.length; j++) {// td iterálása
                console.log('data[i]');
                container += bodyText[0].split('*')[0] + widths[j] + bodyText[0].split('*')[1];
                if(typeof data[i][structure[j]] == 'boolean') {
                    container += checkbody.split('*')[0];
                    if(data[i][structure[j]]) {
                        container += 'checked';
                    }
                    container += checkbody.split('*')[1];
                }
                else {
                    container += data[i][structure[j]];
                }
                container += bodyText[1];
            }
            container += plainHtml.split('!')[6];
        }
        //end body
        container += plainHtml.split('!')[7];

        document.getElementById(shellId).innerHTML = container;
    }
}

export default TableCreator;