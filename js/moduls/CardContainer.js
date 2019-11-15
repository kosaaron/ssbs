/**
 * **Card container**
 */
let CardContainer = {
    /**
     * **Create**
     * Generate card container
     * **use**
     * 1. Create html shell
     * 2. Get data from server
     * 3. Create a card structure
     * 4. Create card design
     * 5. Call this function
     * @param {JSON} data Object list
     * @param {JSON} structure Card data structure
     * @param {String} card Card design
     * @param {String} shellId Shell id
     */
    Create: function (data, structure, card, shellId) {
        card = card.replace('?', '');
        let cardBlock = card.split('!');
        let container = "";
        for (let i = 0; i < data.length; i++) {
            const elementI = data[i];

            for (let j = 0; j < cardBlock.length; j++) {
                const elementJ = cardBlock[j];
                let elementX = elementJ.split('*');

                if (elementX.length === 1) {
                    container += elementJ;

                } else {
                    const elementC = structure[elementX[1]];
                    if (elementI[elementC] !== '' && elementI[elementC] !== null) {
                        container += elementX[0];
                        container += elementI[elementC];
                        container += elementX[2];
                    }
                }
            }
        }
        document.getElementById(shellId).insertAdjacentHTML('beforeend', container);
    },
    /**
     * **Clickable card**
     * @param {Function} clickEvent 
     * @param {String} parent 
     */
    ClickableCard: function (clickEvent, parent) {
        let buttons = document.getElementsByClassName(parent + '-show-details');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                clickEvent(this.id);
            });
        }
    }
};
export default CardContainer;
