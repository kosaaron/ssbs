<?php
require_once('Modules/Connect.php');
$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

$userModules = $pdo->query(
    'SELECT c_110_id, c_6_fk, TabName, TabIcon, c_3_fk, ModuleName, ModuleDescription 
     FROM t_110 
     INNER JOIN t_6 
     ON c_6_id = c_6_fk
     INNER JOIN t_3 
     ON c_3_id = c_3_fk'
)->fetchAll(PDO::FETCH_ASSOC);

foreach ($userModules as $key => $entry) {
    $nUserModules[$entry['c_6_fk']]['TabName'] = $entry['TabName'];
    $nUserModules[$entry['c_6_fk']]['TabIcon'] = $entry['TabIcon'];
    $nUserModules[$entry['c_6_fk']]['Modules'][$entry['c_3_fk']]['FUserModuleId'] = $entry['c_110_id'];
    $nUserModules[$entry['c_6_fk']]['Modules'][$entry['c_3_fk']]['Name'] = $entry['ModuleName'];
}

print_r(json_encode($nUserModules));
