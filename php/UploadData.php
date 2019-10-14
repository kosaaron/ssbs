<?php

/**
 * Upload data
 */

//Includes
require_once('Modules/InsertByStructure.php');

//Post varibles
$place = $_POST['place'];
$data = $_POST['data'];

//Call upload function
$insertByStructure = new InsertByStructure();
foreach ($data as $row) {
    $insertByStructure->DefaultUpload($row, $place);
}
