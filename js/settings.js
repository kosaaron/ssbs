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
var settings = {
    loadModule: function (shellId) {
        Varibles.ShellId = shellId;

        Framework.Load(Varibles.ShellId, Varibles.FrameId);
    },
    resize: function () {

    }
};
export default settings;

/** Framework **/
let Framework = {
    Load: function (targetId, shellId) {
        //partner manager frame
        let framework = `<div id=${shellId} class="display-flex flex-row full-screen">
        <nav id="settingsMenu" class="col-sm-4 col-md-3 d-md-block sidebar">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>General</span>
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
                    <a class="nav-link setting-menu-item setting-menu-item-active" href="#">
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

        <main role="main" class="col-sm-8 col-md-9 ml-sm-auto px-md-4">
            <div class="card-container">
                <div
                    class="settings-card">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="h2 setting-title">+ Add new member</h1>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-secondary settings-button">
                            <span data-feather="calendar"></span>
                            Invite
                        </button>
                    </div>
                </div>
                <div
                    class="settings-card">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="h2 setting-title">Maintain members</h1>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-secondary settings-button">
                            <span data-feather="calendar"></span>
                            Maintain members
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis mollis velit, vitae
                                condimentum quam efficitur sed. Praesent viverra iaculis libero sed sollicitudin. Aenean in
                                faucibus justo. Etiam dictum augue eu dolor fringilla, sed vulputate nibh bibendum. In quis
                                magna eget sem dapibus egestas ac id sem. Fusce nec viverra dui. Nunc vitae leo nibh. Duis
                                augue lectus, vulputate a molestie non, dapibus mollis nisl. Mauris pharetra neque ac tortor
                                maximus, ultricies luctus mauris maximus. In vel lectus arcu. Fusce eget ultricies massa.
                                Cras eget nisl mi. Vestibulum imperdiet lectus a magna feugiat varius. Morbi laoreet
                                elementum eros, id dapibus lacus bibendum id.</p>
                            <p>Etiam a blandit tellus. Duis venenatis ornare leo eget interdum. Aliquam erat volutpat.
                                Curabitur vulputate viverra arcu et cursus. Aliquam viverra leo at luctus maximus. Integer
                                quis arcu dolor. Vestibulum vitae odio id magna iaculis convallis sed sed lorem. Fusce nunc
                                ipsum, commodo ac porta sed, mollis ac turpis. Etiam euismod est sed nunc porta, id ornare
                                justo viverra. In quis tellus ut justo placerat vulputate. Mauris tempus justo tortor, et
                                gravida diam pharetra non. Sed fermentum, leo sed malesuada ultricies, massa enim finibus
                                sem, ut rhoncus tellus leo posuere nisi. Sed hendrerit lorem quis mi hendrerit molestie.
                                Nulla iaculis at velit vel tincidunt.</p>
                            <p>Nullam egestas ultrices lectus. Vestibulum eleifend, lacus at tincidunt consequat, ante risus
                                condimentum ante, mattis posuere arcu eros in libero. Proin eu orci eu lectus faucibus
                                maximus eget vel velit. Phasellus leo mauris, iaculis ac erat ac, pretium feugiat tortor.
                                Vivamus quam quam, posuere quis felis ut, tincidunt gravida felis. Nulla viverra porttitor
                                aliquam. Duis vitae sollicitudin felis, sed dignissim felis. Integer leo purus, tristique
                                non purus at, accumsan finibus ante. Fusce convallis mauris est, et convallis metus volutpat
                                a. Etiam laoreet augue a velit sollicitudin dignissim. Donec gravida iaculis neque. Proin et
                                risus non orci euismod euismod at at erat. Morbi quis gravida felis. Cras eros sem, volutpat
                                in ullamcorper et, pretium suscipit erat. Nam id vehicula dui. Sed viverra pulvinar massa
                                eget semper.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    class="settings-card">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="h2 setting-title">Maintain members</h1>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-secondary settings-button">
                            <span data-feather="calendar"></span>
                            Maintain members
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis mollis velit, vitae
                                condimentum quam efficitur sed. Praesent viverra iaculis libero sed sollicitudin. Aenean in
                                faucibus justo. Etiam dictum augue eu dolor fringilla, sed vulputate nibh bibendum. In quis
                                magna eget sem dapibus egestas ac id sem. Fusce nec viverra dui. Nunc vitae leo nibh. Duis
                                augue lectus, vulputate a molestie non, dapibus mollis nisl. Mauris pharetra neque ac tortor
                                maximus, ultricies luctus mauris maximus. In vel lectus arcu. Fusce eget ultricies massa.
                                Cras eget nisl mi. Vestibulum imperdiet lectus a magna feugiat varius. Morbi laoreet
                                elementum eros, id dapibus lacus bibendum id.</p>
                            <p>Etiam a blandit tellus. Duis venenatis ornare leo eget interdum. Aliquam erat volutpat.
                                Curabitur vulputate viverra arcu et cursus. Aliquam viverra leo at luctus maximus. Integer
                                quis arcu dolor. Vestibulum vitae odio id magna iaculis convallis sed sed lorem. Fusce nunc
                                ipsum, commodo ac porta sed, mollis ac turpis. Etiam euismod est sed nunc porta, id ornare
                                justo viverra. In quis tellus ut justo placerat vulputate. Mauris tempus justo tortor, et
                                gravida diam pharetra non. Sed fermentum, leo sed malesuada ultricies, massa enim finibus
                                sem, ut rhoncus tellus leo posuere nisi. Sed hendrerit lorem quis mi hendrerit molestie.
                                Nulla iaculis at velit vel tincidunt.</p>
                            <p>Nullam egestas ultrices lectus. Vestibulum eleifend, lacus at tincidunt consequat, ante risus
                                condimentum ante, mattis posuere arcu eros in libero. Proin eu orci eu lectus faucibus
                                maximus eget vel velit. Phasellus leo mauris, iaculis ac erat ac, pretium feugiat tortor.
                                Vivamus quam quam, posuere quis felis ut, tincidunt gravida felis. Nulla viverra porttitor
                                aliquam. Duis vitae sollicitudin felis, sed dignissim felis. Integer leo purus, tristique
                                non purus at, accumsan finibus ante. Fusce convallis mauris est, et convallis metus volutpat
                                a. Etiam laoreet augue a velit sollicitudin dignissim. Donec gravida iaculis neque. Proin et
                                risus non orci euismod euismod at at erat. Morbi quis gravida felis. Cras eros sem, volutpat
                                in ullamcorper et, pretium suscipit erat. Nam id vehicula dui. Sed viverra pulvinar massa
                                eget semper.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    class="settings-card">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="h2 setting-title">Maintain members</h1>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-secondary settings-button">
                            <span data-feather="calendar"></span>
                            Maintain members
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis mollis velit, vitae
                                condimentum quam efficitur sed. Praesent viverra iaculis libero sed sollicitudin. Aenean in
                                faucibus justo. Etiam dictum augue eu dolor fringilla, sed vulputate nibh bibendum. In quis
                                magna eget sem dapibus egestas ac id sem. Fusce nec viverra dui. Nunc vitae leo nibh. Duis
                                augue lectus, vulputate a molestie non, dapibus mollis nisl. Mauris pharetra neque ac tortor
                                maximus, ultricies luctus mauris maximus. In vel lectus arcu. Fusce eget ultricies massa.
                                Cras eget nisl mi. Vestibulum imperdiet lectus a magna feugiat varius. Morbi laoreet
                                elementum eros, id dapibus lacus bibendum id.</p>
                            <p>Etiam a blandit tellus. Duis venenatis ornare leo eget interdum. Aliquam erat volutpat.
                                Curabitur vulputate viverra arcu et cursus. Aliquam viverra leo at luctus maximus. Integer
                                quis arcu dolor. Vestibulum vitae odio id magna iaculis convallis sed sed lorem. Fusce nunc
                                ipsum, commodo ac porta sed, mollis ac turpis. Etiam euismod est sed nunc porta, id ornare
                                justo viverra. In quis tellus ut justo placerat vulputate. Mauris tempus justo tortor, et
                                gravida diam pharetra non. Sed fermentum, leo sed malesuada ultricies, massa enim finibus
                                sem, ut rhoncus tellus leo posuere nisi. Sed hendrerit lorem quis mi hendrerit molestie.
                                Nulla iaculis at velit vel tincidunt.</p>
                            <p>Nullam egestas ultrices lectus. Vestibulum eleifend, lacus at tincidunt consequat, ante risus
                                condimentum ante, mattis posuere arcu eros in libero. Proin eu orci eu lectus faucibus
                                maximus eget vel velit. Phasellus leo mauris, iaculis ac erat ac, pretium feugiat tortor.
                                Vivamus quam quam, posuere quis felis ut, tincidunt gravida felis. Nulla viverra porttitor
                                aliquam. Duis vitae sollicitudin felis, sed dignissim felis. Integer leo purus, tristique
                                non purus at, accumsan finibus ante. Fusce convallis mauris est, et convallis metus volutpat
                                a. Etiam laoreet augue a velit sollicitudin dignissim. Donec gravida iaculis neque. Proin et
                                risus non orci euismod euismod at at erat. Morbi quis gravida felis. Cras eros sem, volutpat
                                in ullamcorper et, pretium suscipit erat. Nam id vehicula dui. Sed viverra pulvinar massa
                                eget semper.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>`;
        document.getElementById(targetId).innerHTML = framework;
    }
}