<?php
require_once('Modules/Connect.php');

if ( !isset($_POST['DeviceCode']) ) {
	// Could not get the data that should have been sent.
	die ('Devicecode failed to send...');
}

//Local varibles
$main_data = array();

$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

$query = "SELECT DeviceId FROM device_verification WHERE DeviceId = :device_code";

$statement = $pdo->prepare($query);
$statement->execute(
    array(
        ':device_code'	=>	$_POST['DeviceCode']
    )
);

$no_of_rows = $statement->rowCount();

if($no_of_rows > 0){
    $main_data['VerifiedDevice'] = TRUE;
}else{
    $main_data['VerifiedDevice'] = FALSE;
}

$json = json_encode($main_data);
print_r($json);
