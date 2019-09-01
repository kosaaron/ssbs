<?php
include('Connect.php');
include('Modules/QueryByStructure.php');
include('Modules/CreateFilter.php');
include('Modules/DataAndStructure.php');

//Post varibles
$userId = 1;

//Local varibles
$main_data = array();

/** Task's manager filters */
$createFilter = new CreateFilter();
$fltrStructure = $createFilter->DefaultFilter($userId, "taskfltr");
$main_data['Filters'] = $fltrStructure;

/** Task's manager data */
$dataAndStructure = new DataAndStructure();
$cardCResult = $dataAndStructure->CardContainer($userId, "taskmd", "tasks");
$main_data['DataStructure'] = $cardCResult['DataStructure'];
$main_data['Data'] = $cardCResult['Data'];

/** Task's manager details */
$cardCResult = $dataAndStructure->Details($userId, "taskdtls");
$main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
$main_data['DetailsStructure']['Data'] = $cardCResult['Data'];

/** Finish */
$json = json_encode($main_data);
print_r($json);
