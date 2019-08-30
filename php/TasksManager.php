<?php
include('Connect.php');
include('Modules/QueryByStructure.php');
include('Modules/CreateFilter.php');

//Post varibles
$userId = 1;

//Local varibles
$main_data = array();

/** Task's manager filters */
$createFilter = new CreateFilter();
$fltrStructure = $createFilter->DefaultFilter($userId, "taskfltr");
$main_data['Filters'] = $fltrStructure;

/** Task's manager data */
$resultTDStructure = $pdo->query('SELECT ColumnName, Tables FROM cardc_structures WHERE (' . $userId . '=EmployeeFK && Place="taskmd") ORDER BY Number')->fetchAll();

$structureTD = array();
$tablesTD = array();
foreach ($resultTDStructure as $row) {
    array_push($structureTD, $row['ColumnName']);
    array_push($tablesTD, $row['Tables']);
}
$main_data['DataStructure'] = $structureTD;

$queryByStructure = new QueryByStructure();
$taskDataQuery = $queryByStructure->DefaultQuery($structureTD, "tasks", $tablesTD);
$taskDataResult = $pdo->query($taskDataQuery)->fetchAll(PDO::FETCH_ASSOC);

$main_data['Data'] = $taskDataResult;

/** Task's manager details */
$resultTDtlsStructure = $pdo->query('SELECT ColumnName, dtls_structures.Name FROM dtls_structures WHERE (' . $userId . '=EmployeeFK && Place="taskdtls") ORDER BY Number')->fetchAll();
$structureTDtls = array();
$namesTDtls = array();
foreach ($resultTDtlsStructure as $row) {
    array_push($structureTDtls, $row['ColumnName']);
    array_push($namesTDtls, $row['Name']);
}
$main_data['DetailsStructure']['Data'] = $structureTDtls;
$main_data['DetailsStructure']['Names'] = $namesTDtls;

/** Finish */
$json = json_encode($main_data);
print_r($json);
