<?php
//require once
require_once('Modules/PartnerManager.php');

//post varibles
$userId = 1;

$PartnerManager = new PartnerManager($userId);
$PartnerManager->CreateFilter();
$PartnerManager->CreateCardContainer();

/** Print data */
$json = json_encode($PartnerManager->main_data);
print_r($json);
