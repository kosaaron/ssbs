<?php
session_start();
session_unset();
session_destroy();
$url = 'http://localhost/login.php';
header("Location: $url");
