/** new_task.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Tasks manager
 * 3. Local functions
 */
/** Imports */

function loadLogin() {
    document.getElementById("btn_help").addEventListener("click", openHelp, false)
}
window.onload = loadLogin;

function openHelp(){
    var x = document.getElementById("help_container");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("btn_help").innerHTML='<i class="fas fa-times-circle"></i>';
    } else {
        x.style.display = "none";
        document.getElementById("btn_help").innerHTML='<i class="fas fa-question-circle"></i>';
    }
}
