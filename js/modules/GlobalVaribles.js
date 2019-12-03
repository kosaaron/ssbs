export default class GlobalVaribles {
    //Varibles
    static ActiveModul = "";
    static CCLimitSize = 20;

    //Getters
    static getActiveModul() {
        return this.ActiveModul;
    }

    //Setters
    static setActiveModul(activeModul) {
        this.ActiveModul = activeModul;
    }
}