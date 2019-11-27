<?php
//require once
require_once('Modules/OrderManager.php');

//post varibles
$userId = 1;

$OrderManager = new OrderManager($userId);
$OrderManager->CreateFilter();
$OrderManager->CreateCardContainer();

/** Print data */
$json = json_encode($OrderManager->main_data);
print_r($json);
