<?php
//require once
require_once('Modules/ToolManager.php');

//post varibles
$userId = 1;

$Tools = new Tools($userId);
$Tools->CreateFilter();
$Tools->CreateCardContainer();

/** Print data */
$json = json_encode($Tools->main_data);
print_r($json);