function loadLogin() {
    checkDevice();
    document.getElementById("username").innerText = localStorage.getItem('firstname');
    document.getElementById("btn_password_login").addEventListener("click", checkPassword, false);
    document.getElementById("password").addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            checkPassword();
        }
    });

}
window.onload = loadLogin;
function checkDevice(){
    var devicecode = localStorage.getItem("devicecode");
    var id_dev = localStorage.getItem("id_dev");
    var x = document.getElementById('password_message');
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
                    x.innerHTML='<i class="far fa-check-circle"></i><p class="text-center">Eszköz regisztrációja aktív!</p>'; //<i class="fas fa-check-circle"></i>
                    x.classList.add("toast-message-displayed");
                    setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
                }
                else{
                    x.innerHTML='<i class="fas fa-cogs"></i><p class="text-center">Eszköz nincs regisztrálva! Átirányítás...</p>';
                    x.classList.add("toast-message-displayed");
                    setTimeout(function(){ window.location.replace("login.php"); }, 3000);
                }
                
            },
            dataType: 'json'
        });  

    }else{
        x.innerHTML='<i class="fas fa-cogs"></i><p class="text-center">Eszköz nincs regisztrálva! Átirányítás...</p>';
        x.classList.add("toast-message-displayed");
        setTimeout(function(){ window.location.replace("login.php"); }, 3000);
        
    }
}
function checkPassword() {
    var email = localStorage.getItem('email');
    var password = document.getElementById("password").value;

    $.ajax({
        type: "POST",
        url: "./php/Authenticate.php",
        data: {
            Email: email,
            Password: password
        },
        success: function (data) {
            var x = document.getElementById('password_message')
            if (data['LoggedIn']) {
                x.innerHTML = '<p class="text-center">' + data['Message'] + '</p>'; //<i class="fas fa-check-circle"></i>
                x.classList.add("toast-message-displayed");
                setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
                window.location.replace("index.php");
            }
            else {
                x.classList.add("toast-message-displayed");
                x.innerHTML = '<p class="text-center">' + data['Message'] + '</p><i class="fas fa-times-circle"></i>';
                setTimeout(function(){ x.classList.remove("toast-message-displayed"); }, 3000);
            }

        },
        dataType: 'json'
    });
}