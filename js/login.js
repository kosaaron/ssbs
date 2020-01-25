/** new_task.js */
/**
 * 1. Imports
 * 2. Public functions
 *    -  Tasks manager
 * 3. Local functions
 */
/** Imports */

function loadLogin() {
    document.getElementById("btn_help").addEventListener("click", openHelp, false);
    document.getElementById("btn_login").addEventListener("click", checkLogin, false);
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
function checkLogin(){
    var email = document.getElementById("login_input_email").value;
    var password = document.getElementById("login_input_password").value;

    //Connect to Filter.php
    $.ajax({
        type: "POST",
        url: "./php/Authenticate.php",
        data: { 
            Email: email,
            Password: password
        },
        success: function (data) {
            var x = document.getElementById('login_message_container')
            if(data['LoggedIn']){
                x.innerHTML='<p>' + data['Message'] + '</p><i class="fas fa-check-circle"></i>';
                x.style.display= "block";
                window.location.replace("index.html");
            }
            else{
                x.style.display= "block";
                x.innerHTML='<p>' + data['Message'] + '</p><i class="fas fa-times-circle"></i>';
            }
            
        },
        dataType: 'json'
    });    
}
