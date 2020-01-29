export default class GlobalVaribles {
    //Varibles
    static ActiveModule = "";
    static CCLimitSize = 20;
    static Langauge = "HU";

    //Getters
    static getActiveModule() {
        return this.ActiveModule;
    }

    //Setters
    static setActiveModule(activeModul) {
        this.ActiveModule = activeModul;
    }
}