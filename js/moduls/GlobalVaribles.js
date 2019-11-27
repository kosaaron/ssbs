export default class GlobalVaribles {
    constructor() {

    }

    //Varibles
    static ActiveModul = "";

    //Getters
    static getActiveModul() {
        return this.ActiveModul;
    }

    //Setters
    static setActiveModul(activeModul) {
        this.ActiveModul = activeModul;
    }
}