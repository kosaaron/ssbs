/** login.js */


function loadLogin() {
    checkDevice();

    document.getElementById("btn_help").addEventListener("click", openHelp, false);
    document.getElementById("btn_login").addEventListener("click", checkLogin, false);

    /** Push notification testing */
    /*
    checkSW();
    askPermission();
*/
}
window.onload = loadLogin;

function checkDevice(){
    var devicecode = localStorage.getItem("devicecode");
    var id_dev = localStorage.getItem("id_dev");
    var x = document.getElementById('login_message_container')
    if(devicecode !== null){
        $.ajax({
            type: "POST",
            url: "./php/DeviceCheck.php",
            data: {
                Id: id_dev, 
                DeviceCode: devicecode
            },
            success: function (data) {
                console.log(data);
                if(data['VerifiedDevice']){
                    x.innerHTML='<i class="fas fa-check-circle"></i><p>Továbbirányítjuk az Ön SSBS rendszerébe!</p>';
                    x.classList.add("toast-message-displayed");
                    window.location.replace("blured_mainpage.php");
                    setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
                }
                else{
                    x.innerHTML='<p class="text-center">Eszköz nincs regisztrálva! Kérjük adja meg email címét!</p><i class="fas fa-times-circle"></i>';
                    x.classList.add("toast-message-displayed");
                    setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
                }
                
            },
            dataType: 'json'
        });  

    }else{
        x.innerHTML='<i class="fas fa-cogs"></i><p class="text-center">Eszköz nincs regisztrálva! Kérjük adja meg email címét!</p>';
        x.classList.add("toast-message-displayed");
        setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
    }
}

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
    var newpassword = document.getElementById("new_password_checkbox").checked;

    $.ajax({
        type: "POST",
        url: "./php/SendVerification.php",
        data: { 
            Email: email,
            NewPassword: newpassword
        },
        success: function (data) {
            var x = document.getElementById('login_message_container')
            if(data['EmailSent']){
                x.innerHTML='<i class="fas fa-check-circle"></i><p>' + data['Message'] + '</p>';
                x.classList.add("toast-message-displayed");
                document.getElementById("login_input_email").value = "";
                setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
            }
            else{
                x.style.display= "block";
                x.innerHTML='<i class="fas fa-times-circle"></i><p>' + data['Message'] + '</p>';
                x.classList.add("toast-message-displayed");
                setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
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
