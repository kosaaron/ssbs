/** 
 * **Switch Plugins** 
 */
/** Imports */
import Filter from './Filter.js';
import DinamicFormPopup from './DinamicFormPopup.js';
import Logout from './Logout.js';

export default class SwitchPlugin {
    /**
     * **Create**
     * Generate filters
     * **use**
     * 1. Create html shell
     * 2. Get data from server (filters)
     * 3. Create filter change event in target js
     * 4. Call this function with parameters
     * @param {Array} filters Filter structure
     * @param {String} shellId 
     * @param {Function} eventFunction Selectpicker change event
     */
    Create(plugin, frameId, parentFrameId) {
        let pluginHTML = "";

        switch (plugin.CPluginId) {
            case '1':
                //let stepBox = new StepBox(frameId, target, plugin);
                Promise.all([
                    import('./Input/StepBox.js'),
                ]).then(([Module]) => {
                    let StepBox = Module.default;
                    new StepBox(plugin, frameId, parentFrameId);
                });
                break;
            case '2':
                Promise.all([
                    import('./DinamicFormPopup.js'),
                ]).then(([Module]) => {
                    let DinamicFormPopup = Module.default;
                    new DinamicFormPopup(plugin, frameId, parentFrameId);
                });
                break;
            /** Filter */
            case '3':
                let filter = new Filter();
                filter.Create(plugin, frameId, parentFrameId);
                break;
            /** Card Container */
            case '4':
                Promise.all([
                    import('./Display/CardBox.js'),
                ]).then(([Module]) => {
                    let CardBox = Module.default;
                    new CardBox(plugin, frameId, parentFrameId);
                });
                break;
            /** Details */
            case '5':
                Promise.all([
                    import('./Display/Details.js'),
                ]).then(([Module]) => {
                    let Details = Module.default;
                    new Details(plugin, frameId, parentFrameId);
                });
                break;
            /** Connected Object */
            case '6':
                Promise.all([
                    import('./Display/ConnectedObject.js'),
                ]).then(([Module]) => {
                    let ConnectedObject = Module.default;
                    new ConnectedObject(plugin, frameId, parentFrameId);
                });
                break;
            /** Table */
            case '7':
                break;
            /** Step Box (display) */
            case '8':
                Promise.all([
                    import('./Display/StepBox.js'),
                ]).then(([Module]) => {
                    let StepBox = Module.default;
                    new StepBox(plugin, frameId, parentFrameId);
                });
                break;
            /** Gallery (input) */
            case '9':
                Promise.all([
                    import('./Input/Gallery.js'),
                ]).then(([Module]) => {
                    let Gallery = Module.default;
                    new Gallery(plugin, frameId, parentFrameId);
                });
                break;
            /** Display Gallery */
            case '10':
                Promise.all([
                    import('./Display/DisplayGallery.js'),
                ]).then(([Module]) => {
                    let Gallery = Module.default;
                    new Gallery(plugin, frameId, parentFrameId);
                });
                break;
            /** Logout */
            case '11':
                let logout = new Logout();
                logout.Create(frameId, parentFrameId);
                break;
            /** Sending user invitation */
            case '15':
                Promise.all([
                    import('./InvitationEmail.js'),
                ]).then(([Module]) => {
                    let Invitationemail = Module.default;
                    new Invitationemail(plugin, frameId, parentFrameId);
                });
                break;
            default:
                break;
        }
    }
}