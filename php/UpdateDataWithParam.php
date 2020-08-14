<?php

/**
 *Upload data with parameters
 */

//Includes
require_once('Modules/UpdateByParam.php');

//Post varibles
$userId = 1;
$data = $_POST['Data'];
$entryId = $_POST['EntryId'];

//Call upload function
$updateByParam = new UpdateByParam();
$mainData = [$updateByParam->Default($data, $entryId)];
print_r(json_encode($mainData));
