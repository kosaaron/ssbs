<?php
$servername = "localhost";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:db_host=$servername;dbname=ssbs;charset=utf8", $username, $password);
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed!";
}
