<?php

/**
 * Upload data with parameters
 */

//Includes
require_once('Modules/InsertByParam.php');

//Post varibles
$userId = 1;
$data = $_POST['Data'];

//Call upload function
$insertByParam = new InsertByParam();
$insertByParam->DefaultUpload($data);


/*
$data = array(
    "table1" => array(
        "column1" => "data1",
        "column2" => "data2",
        "column3" => "data3",
    ),
    "table2" => array(
        "column1" => "data4",
        "column2" => "data5",
        "column3" => "data6",
    )
);
*/
