<?php
$servername = "localhost";
$username = "root";
$password = "";


try {
    $pdo = new PDO("mysql:db_host=$servername;dbname=test", $username, $password);
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully<br />"; 
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }

$data = $pdo->query("SELECT * FROM test_table")->fetchAll();
// and somewhere later:
foreach ($data as $row) {
    echo $row['name']."<br />\n";
}
?>