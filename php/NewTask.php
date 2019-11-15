<?php
require_once('Modules/CreateForm.php');

//Post varibles
$userId = 1;

//Local varibles
$main_data = array();

$createForm = new CreateForm();
//simple form
$main_data['FormStructure'] = $createForm->DefaultForm($userId, 'newtsk');
//add step select
$main_data['AddStepSelect'] = $createForm->DefaultForm($userId, 'ntskstpss');
//add employee to step select
$main_data['AddEmplSelect'] = $createForm->DefaultForm($userId, 'ntskstpses');

/** Finish */
$json = json_encode($main_data);
print_r($json);
