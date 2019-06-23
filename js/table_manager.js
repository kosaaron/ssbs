/* Dávid */

//Dropdown generate
function generateDropdown() {
    let dropdownHtml = '';
    if (activeTableFilters.length <= 3) {
        dropdownHtml += '<div class="row">';
        for (var i = 0; i < activeTableFilters.length; i++) {
            dropdownHtml += '<div class="col text-center">';
            if (activeTableFilters[i].Type == 'Write') {
                dropdownHtml += '<div class="my-3"><input type="text" class="form-control col-5" placeholder="'+activeTableFilters[i].Name+'" aria-label="'+activeTableFilters[i].Name+'" aria-describedby="addon-wrapping"></div>';
            }
            else {
                dropdownHtml += '<div class="dropdown my-3">';
                dropdownHtml += '<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
                dropdownHtml += activeTableFilters[i].Name;
                dropdownHtml += '</button>'
                dropdownHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                if (activeTableFilters[i].hasOwnProperty('Opportunities')) {
                    for (let j = 0; j < activeTableFilters[i].Opportunities.length; j++) {
                        dropdownHtml += '<a class="dropdown-item" href="#">';
                        dropdownHtml += activeTableFilters[i].Opportunities[j];
                        dropdownHtml += '</a>';
                    }
                }
                dropdownHtml += '</div></div>';
            }
            dropdownHtml += '</div>';
        }
        dropdownHtml += '</div>';
    }
    document.getElementById('customtable').innerHTML = dropdownHtml;
}

/* Dávid end */
/* Ádam */
/** Adatok **/
var activeTables = ["table 1", "table 2"];
var activeTableData;
var activeTableFilters;

activeTableFilters = [
    {
        Name:"Kategória",
        Type:"Select",
        Default:"Sajt",
        Opportunities: ["Sajt","Karalábé","Csoki"]
    },
    {
        Name:"Raktár",
        Type:"Select",
        Default:"Sajt",
        Opportunities: ["Raktár1","Raktár2","Raktár3"]
    },
    {
        Name:"Típus",
        Type:"Write",
        Default:"",
    },
]

activeTableData=[
    {				
        "Beszállító": 		1		,
        "Termék": "		Termék1	"	,
        "Raktár": "		Raktár1	"	,
        "Készlet":"		Készlet1	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		2		,
        "Termék": "		Termék2	"	,
        "Raktár": "		Raktár2	"	,
        "Készlet":"		Készlet2	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		3		,
        "Termék": "		Termék3	"	,
        "Raktár": "		Raktár3	"	,
        "Készlet":"		Készlet3	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		4		,
        "Termék": "		Termék4	"	,
        "Raktár": "		Raktár4	"	,
        "Készlet":"		Készlet4	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		5		,
        "Termék": "		Termék5	"	,
        "Raktár": "		Raktár5	"	,
        "Készlet":"		Készlet5	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		6		,
        "Termék": "		Termék6	"	,
        "Raktár": "		Raktár6	"	,
        "Készlet":"		Készlet6	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		7		,
        "Termék": "		Termék7	"	,
        "Raktár": "		Raktár7	"	,
        "Készlet":"		Készlet7	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		8		,
        "Termék": "		Termék8	"	,
        "Raktár": "		Raktár8	"	,
        "Készlet":"		Készlet8	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		9		,
        "Termék": "		Termék9	"	,
        "Raktár": "		Raktár9	"	,
        "Készlet":"		Készlet9	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		10		,
        "Termék": "		Termék10	"	,
        "Raktár": "		Raktár10	"	,
        "Készlet":"		Készlet10	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		11		,
        "Termék": "		Termék11	"	,
        "Raktár": "		Raktár11	"	,
        "Készlet":"		Készlet11	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		12		,
        "Termék": "		Termék12	"	,
        "Raktár": "		Raktár12	"	,
        "Készlet":"		Készlet12	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		13		,
        "Termék": "		Termék13	"	,
        "Raktár": "		Raktár13	"	,
        "Készlet":"		Készlet13	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		14		,
        "Termék": "		Termék14	"	,
        "Raktár": "		Raktár14	"	,
        "Készlet":"		Készlet14	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		15		,
        "Termék": "		Termék15	"	,
        "Raktár": "		Raktár15	"	,
        "Készlet":"		Készlet15	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		16		,
        "Termék": "		Termék16	"	,
        "Raktár": "		Raktár16	"	,
        "Készlet":"		Készlet16	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		17		,
        "Termék": "		Termék17	"	,
        "Raktár": "		Raktár17	"	,
        "Készlet":"		Készlet17	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		18		,
        "Termék": "		Termék18	"	,
        "Raktár": "		Raktár18	"	,
        "Készlet":"		Készlet18	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		19		,
        "Termék": "		Termék19	"	,
        "Raktár": "		Raktár19	"	,
        "Készlet":"		Készlet19	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		20		,
        "Termék": "		Termék20	"	,
        "Raktár": "		Raktár20	"	,
        "Készlet":"		Készlet20	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		21		,
        "Termék": "		Termék21	"	,
        "Raktár": "		Raktár21	"	,
        "Készlet":"		Készlet21	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		22		,
        "Termék": "		Termék22	"	,
        "Raktár": "		Raktár22	"	,
        "Készlet":"		Készlet22	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		23		,
        "Termék": "		Termék23	"	,
        "Raktár": "		Raktár23	"	,
        "Készlet":"		Készlet23	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		24		,
        "Termék": "		Termék24	"	,
        "Raktár": "		Raktár24	"	,
        "Készlet":"		Készlet24	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		25		,
        "Termék": "		Termék25	"	,
        "Raktár": "		Raktár25	"	,
        "Készlet":"		Készlet25	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		26		,
        "Termék": "		Termék26	"	,
        "Raktár": "		Raktár26	"	,
        "Készlet":"		Készlet26	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		27		,
        "Termék": "		Termék27	"	,
        "Raktár": "		Raktár27	"	,
        "Készlet":"		Készlet27	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		28		,
        "Termék": "		Termék28	"	,
        "Raktár": "		Raktár28	"	,
        "Készlet":"		Készlet28	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		29		,
        "Termék": "		Termék29	"	,
        "Raktár": "		Raktár29	"	,
        "Készlet":"		Készlet29	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		30		,
        "Termék": "		Termék30	"	,
        "Raktár": "		Raktár30	"	,
        "Készlet":"		Készlet30	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		31		,
        "Termék": "		Termék31	"	,
        "Raktár": "		Raktár31	"	,
        "Készlet":"		Készlet31	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		32		,
        "Termék": "		Termék32	"	,
        "Raktár": "		Raktár32	"	,
        "Készlet":"		Készlet32	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		33		,
        "Termék": "		Termék33	"	,
        "Raktár": "		Raktár33	"	,
        "Készlet":"		Készlet33	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		34		,
        "Termék": "		Termék34	"	,
        "Raktár": "		Raktár34	"	,
        "Készlet":"		Készlet34	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		35		,
        "Termék": "		Termék35	"	,
        "Raktár": "		Raktár35	"	,
        "Készlet":"		Készlet35	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		36		,
        "Termék": "		Termék36	"	,
        "Raktár": "		Raktár36	"	,
        "Készlet":"		Készlet36	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		37		,
        "Termék": "		Termék37	"	,
        "Raktár": "		Raktár37	"	,
        "Készlet":"		Készlet37	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		38		,
        "Termék": "		Termék38	"	,
        "Raktár": "		Raktár38	"	,
        "Készlet":"		Készlet38	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		39		,
        "Termék": "		Termék39	"	,
        "Raktár": "		Raktár39	"	,
        "Készlet":"		Készlet39	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		40		,
        "Termék": "		Termék40	"	,
        "Raktár": "		Raktár40	"	,
        "Készlet":"		Készlet40	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		41		,
        "Termék": "		Termék41	"	,
        "Raktár": "		Raktár41	"	,
        "Készlet":"		Készlet41	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		42		,
        "Termék": "		Termék42	"	,
        "Raktár": "		Raktár42	"	,
        "Készlet":"		Készlet42	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		43		,
        "Termék": "		Termék43	"	,
        "Raktár": "		Raktár43	"	,
        "Készlet":"		Készlet43	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		44		,
        "Termék": "		Termék44	"	,
        "Raktár": "		Raktár44	"	,
        "Készlet":"		Készlet44	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		45		,
        "Termék": "		Termék45	"	,
        "Raktár": "		Raktár45	"	,
        "Készlet":"		Készlet45	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		46		,
        "Termék": "		Termék46	"	,
        "Raktár": "		Raktár46	"	,
        "Készlet":"		Készlet46	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		47		,
        "Termék": "		Termék47	"	,
        "Raktár": "		Raktár47	"	,
        "Készlet":"		Készlet47	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		48		,
        "Termék": "		Termék48	"	,
        "Raktár": "		Raktár48	"	,
        "Készlet":"		Készlet48	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		49		,
        "Termék": "		Termék49	"	,
        "Raktár": "		Raktár49	"	,
        "Készlet":"		Készlet49	"	,
        "Kihelyezve": 		true		,
        },				
        {				
        "Beszállító": 		50		,
        "Termék": "		Termék50	"	,
        "Raktár": "		Raktár50	"	,
        "Készlet":"		Készlet50	"	,
        "Kihelyezve": 		true		,
        }        
];
/* Ádám end */