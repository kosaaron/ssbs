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
    loadModule: function (parentFrameId) {
        Database.getFullPageData(parentFrameId);
    },
    resize: function () {

    }
};
let Database = {
    /**
     * Get card container data
     * @param {String} parentFrameId 
     */
    getFullPageData: function (parentFrameId) {
        let module = 'ModuleData';
        let data = {};
        // data['CTabId'] = '102';
        // data['CModuleId'] = '1004';
        data['CTabId'] = '103';
        data['CModuleId'] = '1009';
        // RequestType: D - default frame, MP - module's plugin, PP plugin's plugin
        data['RequestType'] = 'D';

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (data) {
                Varibles.ScreenStructure = data;
                console.log(data);
                //console.log(JSON.stringify(data));
                Framework.LoadGrid(parentFrameId);
            },
            dataType: 'html'
        });
    }
}
/** Framework **/
let Framework = {
    LoadGrid: function (parentFrameId) {
        let plugins = Varibles.ScreenStructure;
        let frameId = Varibles.FrameId;

        //Load module frame
        document.getElementById(parentFrameId).innerHTML =
            `<div id="${frameId}" class="display-flex flex-row full-screen"></div>`;

        //Define SwitchPlugin
        let switchPlugin = new SwitchPlugin();

        for (const plugin of plugins) {
            let childFrameId = `${frameId}_${plugin.Number}`;
            let testText = plugin.Plugin_name;

            //Load frame for child by place
            let screenModules = "";

            //switch plugin
            switch (plugin.Place) {
                case '1':
                    screenModules += `
                        <div id="${childFrameId}" class="display-flex flex-row full-screen" 
                            style="background-color:#888;">${testText}</div>`;
                    break;
                case '2':
                    screenModules += `
                        <div id="${childFrameId}" class="flex-fill col-2 filter-box">${testText}</div>`;
                    break;
                case '3':
                    screenModules += `
                        <div id="${childFrameId}" class="flex-fill table-container-xscroll" 
                            style="background-color:#888;">${testText}</div>`;
                    break;
                case '4':
                    screenModules += `
                    <div class="card-container col-7">
                        <div id="${childFrameId}" class="row"></div>
                    </div>`;
                    break;
                case '5':
                    screenModules += `
                        <div id="${childFrameId}" class="col-3 cc-details" 
                            style="background-color:#888;">${testText}</div>`;
                    break;
            }
            document.getElementById(frameId).insertAdjacentHTML('beforeend', screenModules);

            //Call current plugin creater functiono
            switchPlugin.Create(plugin, childFrameId, frameId);
        }
    }
}
export default generalModule;