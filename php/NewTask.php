<?php
require_once('Modules/CreateForm.php');

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
