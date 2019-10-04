<?php
include('Connect.php');

//Post varibles
$userId = 1;
$taskFK = $_POST['task_fk'];
$taskEmplId = $_POST['empl_id'];

//Local varibles
$main_data = array();

/** Task way data */
$numAndEmployees = $pdo->query('UPDATE task_ways SET Ready=1 WHERE TaskFK=' . $taskFK . ' && EmployeeFK=' . $taskEmplId . ' && Active=1;');

$statusOfEmpls = $pdo->query('SELECT TaskWayId, task_ways.Ready, task_ways.Number FROM task_ways WHERE TaskFK=' . $taskFK . ' && Active=1;')->fetchAll(PDO::FETCH_ASSOC);

$isNext = true;
foreach ($statusOfEmpls as $statusOfEmpl) {
    if ($statusOfEmpl['Ready'] === '0') {
        $isNext = false;
    }
}

if ($isNext) {
    $number0 = intval($statusOfEmpls[0]['Number']);
    $number1 = $number0 + 1;
    $updateNextActive = $pdo->query('UPDATE task_ways SET Active=0 WHERE task_ways.Number=' . $number0 . ' && TaskFK=' . $taskFK . ';');
    $updateNextActive = $pdo->query('UPDATE task_ways SET Active=1 WHERE task_ways.Number=' . $number1 . ' && TaskFK=' . $taskFK . ';');
}

if ($statusOfEmpls) {
    $main_data['result'] = 'S';
} else {
    $main_data['result'] = 'F';
}

print_r($main_data);
