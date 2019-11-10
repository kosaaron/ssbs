<?php
//require once
require_once('Modules/ProductsOverview.php');

//post varibles
$userId = 1;

$ProductsOverview = new ProductsOverview($userId);
$ProductsOverview->CreateFilter();
$ProductsOverview->CreateTableData('');

/** Print data */
$json = json_encode($ProductsOverview->main_data);
print_r($json);
