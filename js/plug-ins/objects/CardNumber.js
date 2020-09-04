/**
 * Card Number
 */
export default class CardNumber {
    /**
     * Create
     * @param {String} card 
     */
    static GetNumbers(card, isSort = true) {
        let result = [];
        let splittedCard = card.split('*');
        let flags = {};
        for (let i = 0; i < splittedCard.length; i++) {
            //Skip the even index
            if (i % 2 === 0) continue;

            const piece = splittedCard[i];

            //Skip if it has already been added
            if (flags[piece]) continue;

            flags[piece] = true;
            if (piece !== '1') {
                result.push(piece);
            }

        }

        if (isSort) {
            result.sort();
        }

        return result;
    }
}
