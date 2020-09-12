/** Imports **/
import FrameDesign from "../designs/FrameDesign.js";
import AutoScroll from "./AutoScroll.js";
import MenuPopup from "./objects/MenuPopup.js";
import NewModule from "./objects/NewModule.js";
import AddPlugin from "./objects/AddPlugin.js";
import AddModule from "./objects/AddModule.js";

export default class LoadFrame {
    /**
     * LoadFrame
     */
    constructor() {
        LoadFrame.load();
        LoadFrame.events();
    }
    static events() {
        $(window).click(function () {
            //MenuPopup.events();
        });
    }

    static load() {
        $.ajax({
            type: "POST",
            url: "./php/GetFrameData.php",
            data: {},
            success: function (result) {
                console.log(result)
                LoadFrame.loadTabs(result);
                LoadFrame.addClickEvents(result);
            },
            dataType: 'json'
        });
    }

    static loadTabs(data) {
        document.getElementById('main_menu').innerHTML = '';
        document.getElementById('content').innerHTML = '';

        let isFirst = true;
        for (const tabId in data) {
            if (data.hasOwnProperty(tabId)) {
                const entry = data[tabId];

                //main tabs
                let html = FrameDesign.tabMenuItem(
                    tabId,
                    entry['TabName'],
                    LoadFrame.getTabIconClass(entry['TabIcon']),
                    isFirst
                );
                document.getElementById('main_menu').insertAdjacentHTML('beforeend', html);

                //content
                if (Object.keys(entry['Modules']).length < 10) {
                    document.getElementById('content').insertAdjacentHTML(
                        'beforeend',
                        FrameDesign.tabContent(tabId, isFirst),
                    );
                    document.getElementById('tab_c_' + tabId).insertAdjacentHTML(
                        'beforeend',
                        FrameDesign.moduleSubtab(tabId, entry['Modules'])
                    );

                    AutoScroll.Integration(`tab_${tabId}_mdl`);
                }

                if (isFirst) {
                    //Module id to path
                    let moduleId = Object.keys(entry['Modules'])[0];
                    let modulePath = LoadFrame.getModulePath(moduleId);
                    let targetId = 'tab_' + tabId + '_mdl';

                    //Load module
                    Promise.all([
                        import(modulePath),
                    ]).then(([Module]) => {
                        Module.default.loadModule(moduleId, targetId);
                    });

                    //Show first tab
                    $('.menu-content').hide();
                    $('#tab_c_' + tabId).show();
                    $('.menu-item').removeClass('menu-item-active');
                    $('#tab_i_' + tabId).addClass('menu-item-active');

                    isFirst = false;
                }
            }
        }

        if (localStorage.getItem('DevelopMode') === 'true') {
            let items = [];
            let submenuItems = [];

            items.push({
                Id: 'am',
                Title: 'Add module',
            }, {
                Id: 'nm',
                Title: 'New module',
            })

            submenuItems.push({
                Id: 'ap',
                Title: 'Add plugin',
            }, {
                Id: 't',
                Title: 'Test',
            })

            $('.menu-item-more').bind('click', function (e) {
                e.stopImmediatePropagation();

                let parentId = $(this).parent()[0].id;
                let position = 'right';
                MenuPopup.Integration(parentId, items, position, chosenItem);
            });

            $('.submenu-item-more').bind('click', function (e) {
                e.stopImmediatePropagation();

                let parentId = $(this).parent()[0].id;
                let position = 'down';
                MenuPopup.Integration(parentId, submenuItems, position, function (itemId) {
                    chosenSubmenuItem(itemId, parentId);
                });
            });

            function chosenItem(itemId) {
                switch (itemId) {
                    case 'am':
                        AddModule.Integration();
                        break;
                    case 'nm':
                        NewModule.Integration();
                        break;
                }
            }

            function chosenSubmenuItem(itemId, parentId) {
                switch (itemId) {
                    case 'ap':
                        let fUserModuleId = $(`#${parentId}`).attr('f-user-module-id');
                        AddPlugin.Integration(fUserModuleId);
                        break;
                }
            }
        }
    }

    /**
     * Add click events
     * @param {JSON} data
     */
    static addClickEvents(data) {
        //Click events for tabs
        for (const tabId in data) {
            if (data.hasOwnProperty(tabId)) {
                const entry = data[tabId];

                //Modules of tab
                let modules = entry['Modules'];
                let cModuleId = Object.keys(modules)[0];

                //Change the tab design
                document.getElementById('tab_i_' + tabId).addEventListener('click', function (e) {
                    let targetId = 'tab_' + tabId + '_mdl';
                    let modulePath = LoadFrame.getModulePath(Object.keys(modules)[0]);

                    //Load module if it never has been loaded before
                    if (document.getElementById(targetId).innerHTML === '') {
                        Promise.all([
                            import(modulePath),
                        ]).then(([Module]) => {
                            Module.default.loadModule(cModuleId, targetId);
                        });
                    }

                    $('.menu-content').hide();
                    $('#tab_c_' + tabId).show();
                    $('.menu-item').removeClass('menu-item-active');
                    $('#tab_i_' + tabId).addClass('menu-item-active');
                });

                //Add click event for each modules
                for (const moduleId in modules) {
                    if (modules.hasOwnProperty(moduleId)) {
                        document.getElementById('tab_' + tabId + '_stab_' + moduleId).addEventListener(
                            'click',
                            function (e) {
                                let targetId = 'tab_' + tabId + '_mdl';
                                let modulePath = LoadFrame.getModulePath(moduleId);

                                //Change tab
                                $(`.${tabId}-subtab`).removeClass('finance-subtab-active');
                                $(`#tab_${tabId}_stab_${moduleId}`).addClass('finance-subtab-active');

                                //Loader
                                document.getElementById(targetId).innerHTML = '<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>';

                                //Load module
                                Promise.all([
                                    import(modulePath),
                                ]).then(([Module]) => {
                                    Module.default.loadModule(moduleId, targetId);
                                });
                            }
                        );
                    }
                }
            }
        }
    }

    /**
     * Get tab icon class name by icon id
     * @param {String} iconId 
     */
    static getTabIconClass(iconId) {
        switch (iconId) {
            case '101':
                return 'icon-own-general-ledger';
            case '102':
                return 'icon-own-flow-chart';
            case '103':
                return 'icon-own-product-documents';
            case '104':
                return 'icon-own-work';
            case '105':
                return 'icon-own-services';
            default:
                return ''
        }
    }

    /**
     * Get js module path by module id
     * @param {String} moduleId 
     */
    static getModulePath(moduleId) {
        // case '1012':
        return './LoadModule.js';
        /*
        switch (moduleId) {
            case '1001':
                return '../financial_charts.js';
            case '1002':
                return '../reports.js';
            case '1003':
                return '../projects.js';
            case '1004':
                return '../tasks_manager.js';
            case '1005':
                return '../partners_manager.js';
            case '1006':
                return '../calendar_monthly.js';
            case '1007':
                return '../weekly_calendar.js';
            case '1008':
                return '../order_manager.js';
            case '1009':
                return '../products_overview.js';
            case '1010':
                return './LoadModule.js';
            case '1011':
                return '../employees.js';
            case '1012':
                return './LoadModule.js';
            case '1013':
                return '../settings.js';
            case '1014':
                return '../log_out.js';
            default:
                return '../financial_charts.js';
        }*/
    }
}