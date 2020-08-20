export default class ElementFunctions {
    constructor() { }

    //Functions
    removeChildren(nodeId) {
        let node = document.getElementById(nodeId);
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}