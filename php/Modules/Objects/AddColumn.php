<?php

/**
 * AddPlugin
 */
class AddColumn
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

        $name = $data['Name'];
        $tableId = $data['TableId'];
        $size = $data['Size'];

        $finalSQL = "INSERT INTO `f_columns`(`Name`) VALUES ('$name');";
        $finalQueary = $this->pdo->prepare($finalSQL);
        $finalQueary->execute();
        $lastId = $this->pdo->lastInsertId();

        $columnName = "c_$lastId";

        $tableQueary = $this->pdo->query("SELECT * FROM c_tables WHERE CTableId=$tableId");
        $table = $tableQueary->fetch()['TableName'];
        $newColumnSQL = "ALTER TABLE $table ADD $columnName varchar($size)";
        $this->pdo->exec($newColumnSQL);

        $updateSQL = "UPDATE `f_columns` SET `CTableFK`='$tableId',`ColumnName`='$columnName' WHERE `FColumnId`='$lastId';";
        $updateQueary = $this->pdo->prepare($updateSQL);
        $updateQueary->execute();

        if ($updateQueary) {
            $main_data['Result'] = 'S';
        } else {
            $main_data['Result'] = 'F';
        }

        return $main_data;
    }
}
