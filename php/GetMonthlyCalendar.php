<?php
//require once
require_once('Modules/MonthlyCalendar.php');

//post varibles
$userId = 1;

$MonthlyCalendar = new MonthlyCalendar($userId);
$MonthlyCalendar->GetTaskData();

/** Print data */
$json = json_encode($MonthlyCalendar->main_data);
print_r($json);