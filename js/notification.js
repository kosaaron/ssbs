/** notifications.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Tool
 * 3. Loacal functions
 */
/** Imports */
import FormElements from './plug-ins/FormElements.js';
import { addOneListener, removeOneListener, mainFrame } from './common.js';
import ElementFunctions from './plug-ins/ElementFunctions.js';


/** Modul parameters */
let Varibles = {
    FrameId: 'ntfctn',
    FrameName: 'Beállítások - Értesítések',
    MainTableIdName: 'NoteSettingsId',
    //element ids
    ModuleFrameId: 'settings_modul_content',
    TitleTextId: 'back_to_settings_text',
    TitleIconId: 'settings_back_to_menu',
    //data
    PageData: []
}
/** Public functions */
var Notifications = {
    loadModule: function () {
        //Title
        document.getElementById(Varibles.TitleTextId).textContent = Varibles.FrameName;
        addOneListener(
            Varibles.TitleIconId,
            "click",
            mainFrame.backToSettingsMenu
        );
        //Loader
        //document.getElementById(Varibles.ModuleFrameId).innerHTML = FormElements.B.CheckBox('01', 'Feladatok', Varibles.ModuleFrameId, 'valami');
        document.getElementById(Varibles.ModuleFrameId).innerHTML = `<img class="loader-gif" src="images/gifs/loader.gif" alt="Italian Trulli"></img>`;
        
        // Data from server
        //Database.getFullPageData();
    },
    resizeModule: function () {

    }
};
export default Notifications;

/** Data from database */
let Database = {
    /**
     * Get full page data
     */
    getFullPageData: function () {
        $.ajax({
            type: "POST",
            url: "./php/Notifications.php",
            data: "",
            success: function (data) {
                Varibles.PageData = data;
                Loadings.reloadFullPage();
            },
            dataType: 'json'
        });
    }
    
}

/** Framework */
let Framework = {
    Load: function (targetId, shellId) {
        //main frame
        let framework = `<div id="${shellId}" class="display-flex flex-row full-screen"></div>`;
        document.getElementById(targetId).innerHTML = framework;

    }
}

/** Loadings functions */
let Loadings = {
    reloadFullPage: function () {

        //Load framework
        Framework.Load(Varibles.ModuleFrameId, Varibles.FrameId);
        
        //Events
        addOneListener(Varibles.FrameId + '_add_new_btn', 'click'. alert("Próba"));
    },
}
