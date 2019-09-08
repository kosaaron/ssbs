<?php

/**
 * Upload data
 */

//Includes
include('Modules/InsertByStructure.php');

//Post varibles
$place = 'newtsk';
$data = array();
$data['Name'] = '100. feladat';
$data['TaskTypeFK'] = '1';

//Local varobles

//Call upload function
$insertByStructure = new InsertByStructure();
$insertByStructure->DefaultUpload($data, $place);