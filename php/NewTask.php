<?php
include('Connect.php');
include('Modules/QueryByStructure.php');
include('Modules/CreateForm.php');
include('Modules/DataAndStructure.php');

//Post varibles
$userId = 1;

//Local varibles
$main_data = array();

//Form
$createForm = new CreateForm();
$main_data['FormStructure'] = $createForm->DefaultForm($userId, 'newtsk');

/** Finish */
$json = json_encode($main_data);
print_r($json);
