<?php
session_start();

if (isset($_SESSION['LoggedIn'])) {
    if (!$_SESSION['LoggedIn']) {
        $url = "index.php";
        header("Location: $url");
    }
} else {
    $url = 'login.php';
    header("Location: $url");
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>SSB System</title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <link rel="icon" href="images/logo/logo03.png">
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

<body id="body" class="display-flex flex-column">
    <header id="page_header" class="display-flex">
        <div class="header-item flex-1">

        </div>
        <div class="header-item flex-1">

        </div>
        <div class="header-item flex-1">

        </div>
    </header>
    <div id="content_frame" class="flex-1 display-flex flex-row">
        <div id="main_menu">

        </div>
        <div id="content_shell" class="flex-1">
            <div id="content">

            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.js"></script>
    <script src="js/plug-ins/Sortable.js"></script>
    <script src="js/main.js"></script>
</body>

</html>