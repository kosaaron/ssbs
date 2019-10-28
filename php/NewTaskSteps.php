<?php
require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;
require_once('Modules/QueryByStructure.php');
require_once('Modules/CreateForm.php');
require_once('Modules/DataAndStructure.php');

//Post varibles
$userId = 1;
$taskTypeId = $_POST['TaskTypeId'];

//Local varibles
$main_data = array();

/** Steps */
$dataAndStructure = new DataAndStructure();
$cardCResult = $dataAndStructure->CardContainer($userId, "ntaskwy", "task_way_templates", 'WHERE ' . $taskTypeId . '=TaskTypeFK');
$numAndEmployees = $pdo->query('SELECT task_way_templates.Number, EmployeeId, concat(LastName, " " , FirstName) as EmployeeName FROM task_way_templates INNER JOIN employees ON EmployeeFK=EmployeeId WHERE (' . $taskTypeId . '=TaskTypeFK) ORDER BY Number')->fetchAll(PDO::FETCH_ASSOC);

$final_data = array();
foreach ($cardCResult['Data'] as $row) {
    $step_number = $row['Number'];
    foreach ($numAndEmployees as $key => $empl_row) {
        if ($empl_row['Number'] === $step_number) {
            $employee = array();
            $employee['EmployeeId'] = $empl_row['EmployeeId'];
            $employee['EmployeeName'] = $empl_row['EmployeeName'];
            $row['Employees'][] = $employee;
            unset($numAndEmployees[$key]);
        } else {
            break;
        }
    }
    $final_data[] = $row;
}
$main_data['DataStructure'] = $cardCResult['DataStructure'];
$main_data['Data'] = $final_data;

/** Finish */
$json = json_encode($main_data);
print_r($json);
