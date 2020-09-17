<?php 

if ( !isset($_POST['PhotoTagId']) ) {
	// Could not get the data that should have been sent.
	die ('Please fill both the username and password field!');
}

$PhotoTagId = $_POST['PhotoTagId'];

// A betöltés helye alapján lekérjük adatbázisból, hogy milyen kép kell (itt demozva ez a $photo)

if (!isset($photo)) 
    $photo = new stdClass();

$photo->PhotoId = '1';
$photo->PhotoURL = '../images/';
$photo->PhotoName = 'testpic1.jpg';

$path = $photo->PhotoURL . $photo->PhotoName;
$type = pathinfo($path, PATHINFO_EXTENSION);
$photodata = file_get_contents($path);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($photodata);

if (!isset($maindata)) 
    $maindata = new stdClass();
$maindata->PhotoTagId = $PhotoTagId;
$maindata->Base64file = $base64;

$json = json_encode($maindata);
print_r($json);