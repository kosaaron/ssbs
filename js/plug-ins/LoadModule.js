/** LoadModule.js */
/** Imports */
import SwitchPlugin from './SwitchPlugin.js';


let SSData = {
    "2":{
        "Place":"4",
        "CPluginId":"4",
        "Plugin_name":"Card Container",
        "Data": {
            "Valami":"valami"
        }
    },
    "3":{
        "Place":"5",
        "CPluginId":"5",
        "Plugin_name":"Details",
        "Data": {
            "Valami":"valami"
        }
    },
    "1":{
        "Place":"2",
        "CPluginId":"3",
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
        Framework.LoadGrid(Varibles.ShellId, Varibles.FrameId);
    },
    resize: function () {

    }
};
/** Framework **/
let Framework = {
    LoadGrid: function (targetId, shellId) {
        let screens = Varibles.ScreenStructure;
        let screenModules = "";
        for (let i = 1; i < ( Object.keys(screens).length + 1 ) ; i++) {
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
        Framework.LoadPlugins();
        
    },
    LoadPlugins: function (){
        let screens = Varibles.ScreenStructure;
        for (let i = 1; i < ( Object.keys(screens).length + 1 ) ; i++) {
            let pluginType = "";
            let pluginData = [];
            pluginType = screens[i].CPluginId;
            pluginData = screens[i].Data;

            let pluginHTML = "";
            pluginHTML = SwitchPlugin.Create(pluginType, pluginData);

            let placeId = "";
            placeId = screens[i].Place

            document.getElementById(placeId).innerHTML = pluginHTML; 
        }
    }
}
export default generalModule;