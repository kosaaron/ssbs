<?php
require_once('Modules/Connect.php');
$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

$userModules = $pdo->query(
    'SELECT CTabId, TabName, TabIcon, CModuleId, ModuleName, ModuleDescription FROM user_modules 
    INNER JOIN c_tabs 
    ON CTabId = CTabFK
    INNER JOIN c_modules 
    ON CModuleId = CModuleFK'
)->fetchAll(PDO::FETCH_ASSOC);

foreach ($userModules as $key => $entry) {
    $nUserModules[$entry['CTabId']]['TabName'] = $entry['TabName'];
    $nUserModules[$entry['CTabId']]['TabIcon'] = $entry['TabIcon'];
    $nUserModules[$entry['CTabId']]['Modules'][$entry['CModuleId']] =$entry['ModuleName'];
}

print_r(json_encode($nUserModules));
