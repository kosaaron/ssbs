/** partners_manager.js */
/** Imports */

export default class Logout {
    /**
     * Create logout
     * @param {String} parentFrameId 
     * @param {String} shellId 
     */
    Create(frameId, parentFrameId) {
        /*         //partner manager frame
                let framework = `
                <div id="${parentFrameId}_logout" class="display-flex flex-row full-screen">
                    <a href="../php/LogOut.php">Logout</a>
                </div>`;
                document.getElementById(frameId).innerHTML = framework; */

        //partner manager frame
        let framework = `<div id=${parentFrameId}_settings class="display-flex flex-row full-screen">
                <nav id="settingsMenu" class="col-sm-4 col-md-3 d-md-block sidebar">
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>General</span>
                    </h6>
                    
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item setting-menu-item-active" href="#">
                                <i class="fas fa-user settings-icon"></i>
                                Logging out <span class="sr-only">(current)</span>
                            </a>
                        </li>    
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item" href="#">
                                <i class="fas fa-cog settings-icon"></i>
                                Personal Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item" href="#">
                                <i class="fas fa-cogs settings-icon2"></i>
                                Team Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item" href="#">
                                <i class="far fa-credit-card settings-icon"></i>
                                Billing
                            </a>
                        </li>
                    </ul>
        
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Advanced</span>
                        <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item" href="#">
                                <i class="fas fa-cog settings-icon"></i>
                                Personal Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item" href="#">
                                <i class="fas fa-cogs settings-icon2"></i>
                                Team Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item" href="#">
                                <i class="fas fa-user settings-icon"></i>
                                Members <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link setting-menu-item" href="#">
                                <i class="far fa-credit-card settings-icon"></i>
                                Billing
                            </a>
                        </li>
                    </ul>
                </nav>
        
                <main role="main" class="col-sm-8 col-md-9 ml-sm-auto px-md-4 settings-card-container">
                    <div class="card-container">
                        <div
                            class="settings-card">
                            <div class="row">
                                <div class="col-12">
                                    <h1 class="h2 setting-title">Logging out</h1>
                                </div>
                                <a href="../php/LogOut.php">
                                    <button type="button" class="btn btn-sm btn-outline-secondary settings-button">
                                        <span data-feather="calendar"></span>
                                        Log out
                                    </button>
                                </a>
                            </div>
                            <div class="row">
                            <div class="col-12">
                                <p>You can log in again easily by entering your PIN.</p>
                            </div>
                        </div>
                        </div>
                        <div
                            class="settings-card">
                            <div class="row">
                                <div class="col-12">
                                    <h1 class="h2 setting-title">Change account</h1>
                                </div>
                                <button type="button" class="btn btn-sm btn-outline-secondary settings-button">
                                    <span data-feather="calendar"></span>
                                    Change profile
                                </button>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <p>
                                        Use this option to log in with a different account on this device.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>`;

        document.getElementById(frameId).innerHTML = framework;
        
    }

}