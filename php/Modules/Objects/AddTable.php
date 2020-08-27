<?php

/**
 * AddPlugin
 */
class AddTable
{
    function __construct()
    {
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }
    public function Create($data)
    {
        $main_data = array();

        $tName = $data['Name'];

        $finalSQL = "INSERT INTO `c_tables`(`TName`) VALUES ('$tName');";
        $finalQueary = $this->pdo->prepare($finalSQL);
        $finalQueary->execute();
        $lastId = $this->pdo->lastInsertId();

        $tableName = "t_$lastId";
        $tableIdName = "c_$lastId" . "_id";

        $newTableSQL = "CREATE table $tableName(
            $tableIdName INT( 11 ) AUTO_INCREMENT PRIMARY KEY);";
        $this->pdo->exec($newTableSQL);

        $updateSQL = "UPDATE `c_tables` SET `TableName`='$tableName',`TableIdName`='$tableIdName' WHERE `CTableId`='$lastId';";
        $updateQueary = $this->pdo->prepare($updateSQL);
        $updateQueary->execute();

        return $main_data;
    }
}
