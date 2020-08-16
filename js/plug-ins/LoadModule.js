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
    loadModule: function (frameId, parentFrameId) {
        Database.getFullPageData(frameId, parentFrameId);
    },
    resize: function () {

    }
};
let Database = {
    /**
     * Get card container data
     * @param {String} parentFrameId 
     * @param {String} frameId 
     */
    getFullPageData: function (frameId, parentFrameId) {
        let module = 'ModuleData';
        let data = {};
        data['CModuleId'] = frameId;
        //data['CTabId'] = '103';
        //data['CModuleId'] = '1004';
        // RequestType: D - default frame, MP - module's plugin, PP plugin's plugin
        data['RequestType'] = 'D';

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (data) {
                //console.log(data);
                console.log(JSON.stringify(data));
                Framework.LoadGrid(data, frameId, parentFrameId);
            },
            dataType: 'json'
        });
    }
}
/** Framework **/
let Framework = {
    /**
     * LoadGrid
     * @param {JSON} plugins 
     * @param {String} frameId 
     * @param {String} parentFrameId 
     */
    LoadGrid: function (plugins, frameId, parentFrameId) {
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
                    screenModules += `<div id="${childFrameId}" class="col-3 cc-details"></div>`;
                    break;
            }
            document.getElementById(frameId).insertAdjacentHTML('beforeend', screenModules);

            //Call current plugin creater functiono
            switchPlugin.Create(plugin, childFrameId, frameId);
        }
    }
}
export default generalModule;