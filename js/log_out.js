/** partners_manager.js */
/** Imports */

/** Varibles */
let Varibles = {
    FrameId: 'prtnrm',
    FrameName: 'Partnerek',
    //element ids
    ShellId: null
}

/** Public functions **/
var partnersManager = {
    loadModule: function (shellId) {
        Varibles.ShellId = shellId;

        Framework.Load(Varibles.ShellId, Varibles.FrameId);
    },
    resize: function () {

    }
};
export default partnersManager;

/** Framework **/
let Framework = {
    Load: function (targetId, shellId) {
        //partner manager frame
        let framework = `
        <div id="${shellId}" class="display-flex flex-row full-screen">
            <a href="../php/LogOut.php">Logout</a>
        </div>`;
        document.getElementById(targetId).innerHTML = framework;
    }
}