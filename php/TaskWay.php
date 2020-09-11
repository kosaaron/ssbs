<?php
require_once('Modules/Connect.php');
require_once('Modules/DataAndStructure.php');

//Post varibles
$userId = 1;
$taskId = $_POST['task_id'];

//Local varibles
$main_data = array();

$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

/** Task way data */
$dataAndStructure = new DataAndStructure();
$cardCResult = $dataAndStructure->CardContainer($userId, "taskwy", "task_ways", 'WHERE ' . $taskId . '=TaskFK');
$numAndEmployees = $pdo->query('SELECT task_ways.Number, c_200_id, concat(LastName, " " , FirstName) as EmployeeName, task_ways.Ready FROM task_ways INNER JOIN employees ON EmployeeFK=EmployeeId WHERE (' . $taskId . '=TaskFK) ORDER BY Number')->fetchAll(PDO::FETCH_ASSOC);

$final_data = array();
foreach ($cardCResult['Data'] as $row) {
    $step_number = $row['Number'];
    foreach ($numAndEmployees as $key => $empl_row) {
        if ($empl_row['Number'] === $step_number) {
            $employee = array();
            $employee['EmployeeId'] = $empl_row['c_200_id'];
            $employee['EmployeeName'] = $empl_row['EmployeeName'];
            $employee['Ready'] = $empl_row['Ready'];
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
