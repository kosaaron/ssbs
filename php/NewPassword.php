<?php
require_once('Modules/Connect.php');

$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

if ( !isset($_POST['Password'], $_POST['UserId']) ) {
	// Could not get the data that should have been sent.
	die ('Something went wrong...');
}else{
    $password = $_POST['Password'];
    $userid = $_POST['UserId'];
}

/*Set new password*/
$password_encrypted = password_hash($password,  PASSWORD_DEFAULT);
$query = "UPDATE t_200 SET c_75 = :Password, c_78=1, c_77=NULL
                        WHERE c_200_id = :UserId";
$update = $pdo->prepare($query);
$update->execute(
    array(
        ':Password'         =>  $password_encrypted,
        ':UserId'	=>	$userid
    )
);

/* New device verification*/
$device_code = rand(10000, 99999);
$device_hash = hash("sha256", $device_code);
$device_hash_encrypted = password_hash($device_hash, PASSWORD_DEFAULT);

$query = "SELECT 
            c_200_id,
            c_8 AS FirstName,
            c_74 AS LastName,
            c_75 AS UserPassword,
            c_76 AS Email,
            c_77 AS ActivationCode,
            c_78 AS VerificationStatus
          FROM t_200
          WHERE c_200_id = :UserId";

$resultSet = $pdo->prepare($query);
$resultSet->execute(
    array(
		':UserId'	=>	$userid
	)    
);
foreach ($resultSet as $result) {
    $userId = $result['c_200_id'];
    $userFName = $result['FirstName'];
    $userEmail = $result['Email'];
}


$query = "INSERT INTO t_100 
(c_55, c_200_fk) 
VALUES (:device_code, :user_id)";

$update = $pdo->prepare($query);
$update->execute(
    array(
        ':device_code'  =>  $device_hash_encrypted,
        ':user_id'	=>	$userid
    )
);

$query = "SELECT 
              c_100_id,
              c_200_fk,
              c_55 AS DeviceId
          FROM t_100
          WHERE c_55 = :device_code";

$resultSet = $pdo->prepare($query);
$resultSet->execute(
    array(
		':device_code'	=>	$device_hash_encrypted
	)    
);

foreach ($resultSet as $result)
{
    $id_dev = $result['c_100_id'];
}

$main_data = array();
$main_data["success"] = 'S';
$main_data["id_dev"] = $id_dev;
$main_data["devicecode"] = $device_hash;
$main_data["userId"] = $userId;
$main_data["firstname"] = $userFName;
$main_data["email"] = $userEmail;

$_SESSION['LoggedIn'] = TRUE;
$_SESSION['Name'] = $userFName;
$_SESSION['UserId'] = $userId;

$json = json_encode($main_data);
print_r($json);


?>