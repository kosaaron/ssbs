<?php
session_start();
require_once('Modules/Connect.php');

if ( !isset($_POST['Email'], $_POST['Password']) ) {
	// Could not get the data that should have been sent.
	die ('Please fill both the username and password field!');
}

//Local varibles
$main_data = array();

$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

// Prepare our SQL, preparing the SQL statement will prevent SQL injection.
if ($stmt = $pdo->prepare("SELECT EmployeeId, UserPassword, FirstName FROM employees WHERE Email = ?")) {
	$stmt->execute([$_POST['Email']]);
	$user = $stmt->fetch();
}

if ($user)
{
	if (password_verify($_POST['Password'], $user['UserPassword'])) {
		$_SESSION['loggedin'] = TRUE;
		$_SESSION['name'] = $user['FirstName'];
		$_SESSION['id'] = $user['EmployeeId'];
		$main_data['Message'] = 'Welcome ' . $_SESSION['name'] . '!';
		$main_data['LoggedIn'] = TRUE;
	}
	else{
		$main_data['Message'] = 'Incorrect password!';
		$main_data['LoggedIn'] = FALSE;
	}
} else {
	$main_data['Message'] = 'Incorrect username!';
	$main_data['LoggedIn'] = FALSE;
}
$json = json_encode($main_data);
print_r($json);
