<?php
session_start();
require_once('Modules/Connect.php');


if ( !isset($_POST['username'], $_POST['password']) ) {
	// Could not get the data that should have been sent.
	die ('Please fill both the username and password field!');
}
$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;
// Prepare our SQL, preparing the SQL statement will prevent SQL injection.
if ($stmt = $pdo->prepare("SELECT EmployeeId, UserPassword FROM employees WHERE UserName = ?")) {
	$stmt->execute([$_POST['username']]);
	$user = $stmt->fetch();
}
if ($user)
{
	if (password_verify($_POST['password'], $user['UserPassword'])) {
		$_SESSION['loggedin'] = TRUE;
		$_SESSION['name'] = $_POST['username'];
		$_SESSION['id'] = $user['EmployeeId'];
		echo 'Welcome ' . $_SESSION['name'] . '!';
	}
	else{
		echo 'Incorrect password!';
	}
} else {
    echo 'Incorrect username!';
}
