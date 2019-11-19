<?php

/**
 * Upload data
 */

//Includes
require_once('Modules/InsertByStructure.php');

//Post varibles
$place = $_POST['place'];
$data = $_POST['data'];

//Local varibles
$main_data = array();

//Call upload function
$insertByStructure = new InsertByStructure();
foreach ($data as $row) {
    $main_data[] = $insertByStructure->DefaultUpload($row, $place);
}

$json = json_encode($main_data);
print_r($json);