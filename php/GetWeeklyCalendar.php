<?php
//require once
require_once('Modules/WeeklyCalendar.php');

//post varibles
$userId = 1;

$WeeklyCalendar = new WeeklyCalendar($userId);
$WeeklyCalendar->GetTaskData();

/** Print data */
$json = json_encode($WeeklyCalendar->main_data);
print_r($json);