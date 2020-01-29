<?php
require_once('Modules/Connect.php');
$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

$projects = $pdo->query('SELECT * FROM projects')->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i < count($projects); $i++) {
    $new_prjct_arr;
    foreach ($projects[$i] as $key => $value) {
        $new_prjct_arr['projects.' . $key] = $value;
    }
    $projects[$i] = $new_prjct_arr;
}

print_r(json_encode($projects));
