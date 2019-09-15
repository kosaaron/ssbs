<?php
include('Connect.php');

$projects = $pdo->query('SELECT * FROM projects')->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($projects));