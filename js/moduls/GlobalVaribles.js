export default class GlobalVaribles {
    constructor() {

    }

    //
    static ActiveModul = "";

    //Getters
    static getActiveModul() {
        return this.count;
    }

    //Setters
    static setActiveModul(activeModul) {
        this.ActiveModul = activeModul;
    }
}