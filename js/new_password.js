function loadVerification() {

    document.getElementById("username").innerText = localStorage.getItem('firstname');
    document.getElementById("btn_create_password").addEventListener("click", savePassword, false);
    document.getElementById("new_password2").addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            savePassword();
        }
    });

}
window.onload = loadVerification;

function savePassword() {
    
    var password1 = document.getElementById("new_password1").value;
    var password2 = document.getElementById("new_password2").value;
    var x = document.getElementById('password_message')
    if(password1 === password2)
    {
        /*
        let module = 'NewPassword';
        let data = {};
        data['Password'] = password1;
        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': module, 'Data': data },
            success: function (data) {
                console.log(JSON.stringify(data));
                success(data[0], entryIdJSON, parentFrameId);
            },
            dataType: 'json'
        });
        */
        userid = localStorage.getItem("UserId");
        $.ajax({
            type: "POST",
            url: "./php/NewPassword.php",
            data: {
                UserId: userid,
                Password: password1
            },
            success: function (data) {
                if (data.success == 'S') {
                    localStorage.setItem('id_dev', data['id_dev']);
                    localStorage.setItem('devicecode', data['devicecode']);
                    localStorage.setItem('firstname', data['firstname']);
                    localStorage.setItem('email', data['email']);
                    x.innerHTML = '<p>Sikeres jelszómódosítás!</p><i class="fas fa-check-circle"></i>';
                    x.style.display = "block";
                    window.location.replace("index.php");
                }
                else {
                    x.style.display = "block";
                    x.innerHTML = '<p>Sikertelen próbálkozás</p><i class="fas fa-times-circle"></i>';
                }
    
            },
            dataType: 'json'
        });
    }else{
        x.innerHTML = '<p>A két jelszó nem azonos</p>';
    }
}