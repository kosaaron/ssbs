let TableCreator = {
    /**
     * 
     * @param {Array} data 
     * @param {Array} trStructure
     * @param {Array} tdStructure
     * @param {String} plainHtml 
     * @param {String} shellId 
     * @param {String} checkbody 
     */
    Create: function (data, trStructure, tdStructure, plainHtml, shellId, checkbody) {

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
                                            !<tr id="shell_id_*1*" class="m-0 data-row"> --> !-jel azért van, mert minden adatobjektumonként a következő !-jelig loopolunk ezen a soron, vagyis minden adatobjektum egy sor lesz.
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
        for (var tdSKey in tdStructure) {
            let tdSValue = tdStructure[tdSKey];
            container += headerText[0] + tdSValue.ColumnWidth + headerText[1] + tdSValue.ColumnTitle + headerText[2];
        }

        //end header
        container += plainHtml.split('!')[2];

        //start body
        container += plainHtml.split('!')[3];

        //create body
        let body = plainHtml.split('!')[5];
        let bodyText = body.split('?');

        for (let i = 0; i < data.length; i++) { //tr-ek iterálása
            let dataI = data[i];
            let trHead = plainHtml.split('!')[4];

            for (var trSKey in trStructure) {
                let trSValue = trStructure[trSKey];
                trHead = trHead.replace('*' + trSKey + '*', dataI[trSValue]);
            }
            container += trHead;

            for (var tdSKey in tdStructure) { // td iterálása
                let tdSValue = tdStructure[tdSKey];
                let tdWidth = tdSValue.ColumnWidth;
                container += bodyText[0].split('*')[0] + tdWidth + bodyText[0].split('*')[1];

                let tdSColumnName = dataI[tdSValue.ColumnName];
                if (typeof tdSColumnName == 'boolean') {
                    container += checkbody.split('*')[0];
                    if (tdSColumnName) {
                        container += 'checked';
                    }
                    container += checkbody.split('*')[1];
                }
                else {
                    container += tdSColumnName;
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