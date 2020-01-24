<?php
require_once('Modules/CreateForm.php');

//Post varibles
$userId = 1;
$formId = $_POST['FormId'];

//Local varibles
$main_data = array();

$createForm = new CreateForm();
//simple form
$main_data['FormStructure'] = $createForm->DefaultForm($userId, $formId);

/** Finish */
$json = json_encode($main_data);
print_r($json);
