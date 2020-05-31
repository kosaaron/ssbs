/** LoadModule.js */
/** Imports */
import SwitchPlugin from './SwitchPlugin.js';

let Varibles = {
    FrameId: 'prtnrm', //???
    //FrameName: 'Partnerek',
    //FilterPlace: 'prtnrfltr',
    //MainTableIdName: 'PartnerId',
    //element ids
    ShellId: null,
    ScreenStructure: []
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
        Database.getFullPageData();
        
    },
    resize: function () {

    }
};
let Database = {
    /** Get card container data */
    getFullPageData: function () {
        let module = 'ModuleData';
        let data = {};
        data['CTabId'] = '102';
        data['CModuleId'] = '1004';
        // RequestType: D - default frame, MP - module's plugin, PP plugin's plugin
        data['RequestType'] = 'D';

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (data) {
                Varibles.ScreenStructure = data; 
                //console.log(data);
                console.log(JSON.stringify(data));
                Framework.LoadGrid(Varibles.ShellId, Varibles.FrameId);
            },
            dataType: 'json'
        });
    }
}
/** Framework **/
let Framework = {
    LoadGrid: function (targetId, shellId) {
        let screens = Varibles.ScreenStructure;
        let moduleName = Varibles.FrameId;
        let screenModules = "";
        for (const screen of screens) {
            switch (screen.Place) {
                case '1':
                    screenModules += `<div id="${moduleName}_${screen.Place}" class="display-flex flex-row full-screen" style="background-color:#888;">`+ screen.Plugin_name +`</div>`;
                    break;
                case '2':
                    screenModules += `<div id="${moduleName}_${screen.Place}" class="flex-fill col-2 filter-box">`+ screen.Plugin_name +`</div>`;
                    break;
                case '3':
                    screenModules += `<div id="${moduleName}_${screen.Place}" class="flex-fill table-container-xscroll" style="background-color:#888;">`+ screen.Plugin_name +`</div>`;
                    break;
                case '4':
                    screenModules += `<div id="${moduleName}_${screen.Place}" class="card-container col-6" style="background-color:#888;">`+ screen.Plugin_name +`</div>`;
                    break;
                case '5':
                    screenModules += `<div id="${moduleName}_${screen.Place}" class="col-4 cc-details" style="background-color:#888;">`+ screen.Plugin_name +`</div>`;
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
        for (const screen of screens) {
            // let pluginType = "";
            // let pluginData = [];
            // pluginType = screen.CPluginId;
            // pluginData = screen.Data;

            let moduleName = Varibles.FrameId;

            let switchPlugin = new SwitchPlugin();
            switchPlugin.Create(screen, moduleName);
        }
    }
}
export default generalModule;