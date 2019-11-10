<?php
require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;
require_once('Modules/CreateFilter.php');
require_once('Modules/DataAndStructure.php');

//Post varibles
$userId = 1;

//Local varibles
$main_data = array();

/** Tool's manager filters */
$createFilter = new CreateFilter();
$fltrStructure = $createFilter->DefaultFilter($userId, "tlsfltr");
$main_data['Filters'] = $fltrStructure;

/** Tool's manager data */
$dataAndStructure = new DataAndStructure();
$cardCResult = $dataAndStructure->CardContainer($userId, "tlsmd", "tools");
$main_data['DataStructure'] = $cardCResult['DataStructure'];

foreach ($cardCResult['Data'] as $row) {
    $remarks = $pdo->query('SELECT ToolRemarkId, tool_remarks.RemarkText, EmployeeFK, employees.FirstName, employees.LastName FROM tool_remarks INNER JOIN employees ON EmployeeFK=EmployeeId WHERE (' . $row['ToolId'] . '=ToolFK)')->fetchAll(PDO::FETCH_ASSOC);
    $row['remarks'] = $remarks;
    $main_data['Data'][] = $row;
}

/** Tool's manager details */
$cardCResult = $dataAndStructure->Details($userId, "tlsdtls");
$main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
$main_data['DetailsStructure']['Data'] = $cardCResult['Data'];

/** Finish */
$json = json_encode($main_data);
print_r($json);
