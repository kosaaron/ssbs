function loadLogin() {

    document.getElementById("username").innerText = localStorage.getItem('firstname');
    document.getElementById("btn_password_login").addEventListener("click", checkPassword, false);
    document.getElementById("password").addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            checkPassword();
        }
    });

}
window.onload = loadLogin;

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
                x.innerHTML = '<p>' + data['Message'] + '</p>'; //<i class="fas fa-check-circle"></i>
                x.style.display = "block";
                window.location.replace("index.php");
            }
            else {
                x.style.display = "block";
                x.innerHTML = '<p>' + data['Message'] + '</p><i class="fas fa-times-circle"></i>';
            }

        },
        dataType: 'json'
    });
}