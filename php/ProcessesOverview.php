<?php
require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

$projects = $pdo->query('SELECT * FROM projects')->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($projects));