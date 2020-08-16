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



$query = "SELECT * FROM device_verification WHERE Id = :id_dev";
$statement = $pdo->prepare($query);
$statement->execute(
    array(
        ':id_dev'	=>	$_POST['Id']
    )
);

$no_of_rows = $statement->rowCount();



if($no_of_rows == 1){
    foreach ($statement as $result) {
        $dbdevicecode = $result['DeviceId'];
    }
    if (password_verify($_POST['DeviceCode'], $dbdevicecode)) {
        $main_data['VerifiedDevice'] = TRUE;
    }
    else{
        $main_data['VerifiedDevice'] = FALSE;
    }
}else{
    $main_data['VerifiedDevice'] = FALSE;
}

$json = json_encode($main_data);
print_r($json);
