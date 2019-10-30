<?php

/**
 * Upload data
 */

//Includes
require_once('Modules/SelectByParam.php');

//Post varibles
$userId = 1;
$data = $_POST['Data'];

//Local varibles
$main_data = array();

//Call upload function
$SelectByParam = new SelectByParam();
$main_data = $SelectByParam->DefaultSelect($data);

$json = json_encode($main_data);
print_r($json);

/*
$data = array(
    "table1" => array(
        "Alias" => "tablea1",
        "Columns" => array(
            "column1" => "alias1",
            "column2" => "alias2",
            "column3" => "alias3",
        )
    ),
    "table2" => array(
        "Alias" => "tablea2",
        "Columns" => array(
            "column1" => "alias4",
            "column2" => "alias5",
            "column3" => "alias6",
        )
    )
);*/
