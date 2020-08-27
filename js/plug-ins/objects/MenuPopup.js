/**
 * Menu Popup
 */
export default class MenuPopup {
    /**
     * Integration
     * @param {String} sorceElement 
     * @param {JSON} items 
     * @param {Function} callback 
     * @param {String} postition 
     */
    static Integration(sorceId, items, postition = 'right', callback = null) {
        MenuPopup.closePopup();

        let sorceElement = $(`#${sorceId}`);
        let srcPosition = sorceElement.offset();

        let newTop = 0;
        let newleft = 0;

        switch (postition) {
            case 'right':
                newTop = srcPosition.top;
                newleft = srcPosition.left + sorceElement.outerWidth(true);
                break;
            case 'down':
                newTop = srcPosition.top + sorceElement.outerHeight(true);
                newleft = srcPosition.left + sorceElement.outerWidth(true) - 200;
                break;
            default:
                break;
        }

        let title = 'Options';

        MenuPopup.createPopup(sorceId, newTop, newleft, title, items);
        MenuPopup.events(sorceId, callback);
    }

    static createPopup(sorceId, top, left, title, items) {
        document.getElementById('content_frame').insertAdjacentHTML('beforeend',
            `<div class="menu-popup" style="top: ${top}px; left: ${left}px;">
                 <div class="menu-popup-header">
                     <h7>${title}</h7>
                     <i class="menu-popup-h-icon far fa-times-circle"></i>
                 </div>
                 <ul>${createItems()}</ul>
             </div>
        `);

        function createItems() {
            let result = '';

            for (const item of items) {
                result += `<li value="${item.Id}" class="${sorceId}_menupopup">${item.Title}</li>`;
            }

            return result;
        }
    }

    /**
     * Events
     * @param {String} sorceId 
     * @param {Function} callback 
     */
    static events(sorceId, callback) {
        $('#content_shell').click(MenuPopup.closePopup);
        $('#main_menu').click(MenuPopup.closePopup);
        $('.menu-popup-h-icon').click(MenuPopup.closePopup);
        $(`.${sorceId}_menupopup`).click(function () {
            let itemId = $(this).attr("value");;
            callback(itemId);
            MenuPopup.closePopup();
        });
    }

    static closePopup() {
        let popups = $('.menu-popup');

        if (popups.length === 0) {
            return;
        }

        popups.remove();

        $('#main_menu').unbind('click', MenuPopup.closePopup);
        $('#content_shell').unbind('click', MenuPopup.closePopup);
    }
}