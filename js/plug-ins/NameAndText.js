import GlobalVaribles from './GlobalVaribles.js';
export default class NameAndText {
    static getText(name) {
        switch (name) {
            case 'save':
                switch (GlobalVaribles.Langauge) {
                    case 'HU':
                        return 'mentés';
                    case 'EN':
                        return 'save';
                    default:
                        return 'save';
                }
            case 'cancel':
                switch (GlobalVaribles.Langauge) {
                    case 'HU':
                        return 'mégse';
                    case 'EN':
                        return 'cancel';
                    default:
                        return 'cancel';
                }
        }
    }
}