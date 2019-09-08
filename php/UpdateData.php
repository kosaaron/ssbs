<?php

/**
 * Update data
 */

//Includes
include('Modules/UpdateByStructure.php');

//Post varibles
$place = 'edttsk';
$nameOfId = 'TaskId';
$valuOfId = '10';
$data = array();
$data['Name'] = '100. feladat4';
$data['TaskTypeFK'] = '2';

//Local varobles

//Call update function
$updateByStructure = new UpdateByStructure();
$updateByStructure->DefaultUpdate($data, $place, $nameOfId, $valuOfId);
