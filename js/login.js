/** login.js */


function loadLogin() {
    document.getElementById("btn_help").addEventListener("click", openHelp, false);
    document.getElementById("btn_login").addEventListener("click", checkLogin, false);

    /** Push notification testing */
    checkSW();
    askPermission();

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
                x.innerHTML='<p>' + data['Message'] + '</p>'; //<i class="fas fa-check-circle"></i>
                x.style.display= "block";
                window.location.replace("index.php");
            }
            else{
                x.style.display= "block";
                x.innerHTML='<p>' + data['Message'] + '</p><i class="fas fa-times-circle"></i>';
            }
            
        },
        dataType: 'json'
    });    
}



// /** Push notification testing */

// function checkSW(){
//     if (!('serviceWorker' in navigator)) {
//         // Service Worker isn't supported on this browser, disable or hide UI.
//         return;
//       }
    
//       if (!('PushManager' in window)) {
//         // Push isn't supported on this browser, disable or hide UI.
//         return;
//       }
//       registerServiceWorker();
// }

// function registerServiceWorker() {
//     return navigator.serviceWorker.register('./js/service-worker.js')
//     .then(function(registration) {
//       console.log('Service worker successfully registered.');
//       return registration;
//     })
//     .catch(function(err) {
//       console.error('Unable to register service worker.', err);
//     });
// }
// function askPermission() {
//     return new Promise(function(resolve, reject) {
//       const permissionResult = Notification.requestPermission(function(result) {
//         resolve(result);
//       });
  
//       if (permissionResult) {
//         permissionResult.then(resolve, reject);
//       }
//     })
//     .then(function(permissionResult) {
//       if (permissionResult !== 'granted') {
//         throw new Error('We weren\'t granted permission.');
//       }
//     });
// }
