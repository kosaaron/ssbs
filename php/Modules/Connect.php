<?php
class PDOConnect
{
    public $pdo;
    function __construct()
    {
        $servername = "ssbsystem.com";
        $username = "ssbsyste_server";
        $password = "Sport2018";

        try {
            $pdo = new PDO("mysql:host=$servername;dbname=ssbsyste_ssbs;charset=utf8", $username, $password);
            // set the PDO error mode to exception
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo = $pdo;
        } catch (PDOException $e) {
            echo "Connection failed!" . " " . $e->getMessage();
        }
    }
}
