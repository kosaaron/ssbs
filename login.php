<?php
session_start();

if (isset($_SESSION['LoggedIn'])) {
    if ($_SESSION['LoggedIn']) {
        $url = 'index.php';
        header("Location: $url");
    }
}
if (isset($_GET['act_code']) and isset($_GET['new_pass'])) {
    if ($_GET['new_pass'] == 'true') {
        $url = 'change_password.php?act_code=' . $_GET['act_code'];
        header("Location: $url");
    }elseif ($_GET['new_pass'] == 'false') {
        $url = 'blured_mainpage.php?act_code=' . $_GET['act_code'];
        header("Location: $url");
    }
}
?>
<!DOCTYPE html>
<html lang="hu">

<head>
    <title>SSBS - Login</title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.min.css">
    <!-- <link rel="icon" href="images/favicon.ico" type="image/x-icon"> - Ádám: kell ikon-->
    <link rel="stylesheet" href="css/main.css">

</head>

<body>
    <div id=login_page_container>
        <div class="login-form">
            <i class="fas fa-user-circle profile-picture"></i>
            <label for="inputEmail" class="sr-only">Email cím</label>
            <input type="text" name="email" id="login_input_email" class="form-control" placeholder="Email cím" required autofocus>
            <div class="form-check want-new-password-container">
                    <input type="checkbox" class="form-check-input" id="new_password_checkbox">
                    <label class="form-check-label login-checkbox-label" for="new_password_checkbox">Jelszómódosítást kérek</label>
            </div>
            <button id="btn_login" class="btn btn-outline-light">Meghívó küldése</button>
        </div>
        <div class="footer">
            <p class="copyright">© 2019 SSB System</p>
        </div>
        <a id="btn_help"><i class="fas fa-question-circle"></i></a>
        <div id="help_container" style="display: none;">
            <h3 class="help-title">Elfelejtett jelszó?</h3>
            <div class="input-group mb-3">
                <input type="email" class="form-control" placeholder="Email cím" aria-label="Email cím" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
            <p class="help-text">Egyéb probléma bejelentéséhez</br>
                kattints <a href="https://m.blog.hu/az/aztadom/image/junius/problemafa.jpg">ide!</a></p>
        </div>
        <div id="login_message_container" class="toast-message">

        </div>
    </div>
    <script src="js/login.js"></script>
</body>

</html>