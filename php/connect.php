<?php
$servername = "localhost";
$username = "root";
$password = "";


try {
    $pdo = new PDO("mysql:db_host=$servername;dbname=ssbs_db;charset=utf8", $username, $password);
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
}
/*
$data = $pdo->query("SELECT * FROM test_table")->fetchAll();
// and somewhere later:
foreach ($data as $row) {
    echo $row['name']."<br />\n";
}*/
