/** LoadModule.js */
let SSData = {
    "2":{
        "Place":"4",
        "CPluginId:":"4",
        "Plugin_name":"Card Container",
        "Data": {
            "Valami":"valami"
        }
    },
    "3":{
        "Place":"5",
        "CPluginId:":"5",
        "Plugin_name":"Details",
        "Data": {
            "Valami":"valami"
        }
    },
    "1":{
        "Place":"2",
        "CPluginId:":"3",
        "Plugin_name":"Filter",
        "Data": {
            "Valami":"valami"
        }
    }
};
let Varibles = {
    FrameId: 'prtnrm', //???
    //FrameName: 'Partnerek',
    //FilterPlace: 'prtnrfltr',
    //MainTableIdName: 'PartnerId',
    //element ids
    ShellId: null,
    ScreenStructure: SSData
    //Frame id of add new item
    //AddNFormId: 'nprtnr',
    //Processes data array
    //processesDataArray: null,
    //data
    //PageData: []
}

var generalModule = {
    loadModule: function (shellId) {
        Varibles.ShellId = shellId;
        Framework.Load(Varibles.ShellId, Varibles.FrameId);
    },
    resize: function () {

    }
};
/** Framework **/
let Framework = {
    Load: function (targetId, shellId) {
        let screens = Varibles.ScreenStructure;
        let screenModules = "";
        for (let i = 1; i < ( Object.keys(screens).length + 1 ) ; i++) {
            //alert(screens[i].Place);
            switch (screens[i].Place) {
                case '1':
                    screenModules += `<div id="${screens[i].Place}" class="display-flex flex-row full-screen" style="background-color:#888;">`+ screens[i].Plugin_name +`</div>`;
                    break;
                case '2':
                    screenModules += `<div id="${screens[i].Place}" class="flex-fill col-2 filter-box" style="background-color:#888;">`+ screens[i].Plugin_name +`</div>`;
                    break;
                case '3':
                    screenModules += `<div id="${screens[i].Place}" class="flex-fill table-container-xscroll" style="background-color:#888;">`+ screens[i].Plugin_name +`</div>`;
                    break;
                case '4':
                    screenModules += `<div id="${screens[i].Place}" class="card-container col-6" style="background-color:#888;">`+ screens[i].Plugin_name +`</div>`;
                    break;
                case '5':
                    screenModules += `<div id="${screens[i].Place}" class="col-4 cc-details" style="background-color:#888;">`+ screens[i].Plugin_name +`</div>`;
                    break;
            }
        }
        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen"><h1>Betöltve</h1></div>`;
        document.getElementById(targetId).innerHTML = framework;
        document.getElementById(shellId).innerHTML = screenModules;
        //partner manager frame
        // let framework = `<div id="${shellId}" class="display-flex flex-row full-screen"><h1>Betöltve</h1></div>`;
        // document.getElementById(targetId).innerHTML = framework;
        // let screenId = Varibles.ScreenStructure; 
        
        // if (screenId[0] == '1') {
        //     let screenModules = `<div id="${screenId[0]}" class="display-flex flex-row full-screen" style="background-color:#888;"></div>`;
        //     document.getElementById(shellId).innerHTML = screenModules;
        // }
        // else{
        //     if (screenId[1] == '3') {
        //         let screenModules = `<div id="${screenId[0]}" class="flex-fill col-2 filter-box" style="background-color:#888;"></div>`;
        //         screenModules += `<div id="${screenId[1]}" class="flex-fill table-container-xscroll" style="background-color:#888;"></div>`;
        //         document.getElementById(shellId).innerHTML = screenModules;
        //     }
        //     else if(screenId[1] == '4'){
        //         let screenModules = `<div id="${screenId[0]}" class="flex-fill col-2 filter-box" style="background-color:#888;"></div>`;
        //         screenModules += `<div id="${screenId[1]}" class="card-container col-6" style="background-color:#888;"></div>`;
        //         screenModules += `<div id="${screenId[2]}" class="col-4 cc-details" style="background-color:#888;"></div>`;
        //         document.getElementById(shellId).innerHTML = screenModules;
        //     }
        // }

        // let containerDesigns = new ContainerDesigns();
        // //filter frame
        // containerDesigns.loadSimpleFilterFw(shellId, shellId, 'beforeend');
        // //card container frame
        // containerDesigns.loadSimpleCCFw(shellId, shellId, 'beforeend');
    }
}
export default generalModule;