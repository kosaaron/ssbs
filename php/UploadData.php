<?php

/**
 * Upload data
 */

//Includes
include('Modules/InsertByStructure.php');

//Post varibles
$place = $_POST['place'];
$data = $_POST['data'];

//Call upload function
$insertByStructure = new InsertByStructure();
foreach ($data as $row) {
    $insertByStructure->DefaultUpload($row, $place);
}
