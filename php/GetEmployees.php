<?php
//require once
require_once('Modules/Employees.php');

//post varibles
$userId = 1;

$Employees = new Employees($userId);
$Employees->CreateFilter();
$Employees->CreateCardContainer('');

/** Print data */
$json = json_encode($Employees->main_data);
print_r($json);
