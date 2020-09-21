<?php
$a = 0;
// True because $a is set
if (isset($a)) {
  echo "Variable 'a' is set.<br>";
}
/*
echo $b;
// False because $b is NULL
if (isset($b)) {
  echo "Variable 'b' is set.";
}*/
/*
$host = $_SERVER['HTTP_HOST'];
$url = "index.php";
echo $url;
header("Location: $url");*/
session_start();
session_destroy();
