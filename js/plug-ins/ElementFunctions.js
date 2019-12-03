export default class ElementFunctions {
    constructor() { }

    //Functions
    removeChilds(nodeId) {
        let node = document.getElementById(nodeId);
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}