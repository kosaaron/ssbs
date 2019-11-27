<?php
//require once
require_once('Modules/TaskManager.php');

//post varibles
$userId = 1;

$TaskManager = new TaskManager($userId);
$TaskManager->CreateFilter();
$TaskManager->CreateCardContainer();

/** Print data */
$json = json_encode($TaskManager->main_data);
print_r($json);
