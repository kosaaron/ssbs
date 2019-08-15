/** common.js */
/**
 * @param {String} className
 * @param {String} eventType
 * @param {Function} eventFunction 
 */
function addListener(className, eventType, eventFunction) {
    let targets = document.getElementsByClassName(className);
    for (let i = 0; i < targets.length; i++) {
        targets[i].addEventListener(eventType, function () {
            eventFunction(this.id);
        });
    }
}

function addListenerByAttr(shellId, eventType, eventFunction) {
    let targets = document.querySelectorAll('[data-place=' + shellId + ']');
    for (let i = 0; i < targets.length; i++) {
        targets[i].addEventListener(eventType, function () {
            eventFunction(this.id);
        });
    }
}

function addOneListener(id, eventType, eventFunction) {
    let target = document.getElementById(id);
    target.addEventListener(eventType, function () {
        eventFunction(this.id);
    });
}

function removeOneListener(id) {
    let old_element = document.getElementById(id);
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}

let mainFrame = {
    backToProcessesMenu: function () {
        document.getElementById("processes_menu").style.display = "block";
        document.getElementById("processes_content").style.display = "none";
    }
}


export { addListener, addListenerByAttr, addOneListener, removeOneListener, mainFrame };
