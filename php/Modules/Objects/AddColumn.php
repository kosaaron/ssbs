<?php

/**
 * Add Column
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

        $finalSQL = "INSERT INTO `t_7`(`Name`) VALUES ('$name');";
        $finalQueary = $this->pdo->prepare($finalSQL);
        $finalQueary->execute();
        $lastId = $this->pdo->lastInsertId();

        $columnName = "c_$lastId";

        $tableQueary = $this->pdo->query(
            "SELECT 
                c_5_fk,
                c_31 AS TName,
                c_51 AS TableName,
                c_52 AS TableIdName,
            FROM t_5 
            WHERE c_5_id=$tableId"
        );
        $table = $tableQueary->fetch()['TableName'];
        $newColumnSQL = "ALTER TABLE $table ADD $columnName varchar($size)";
        $this->pdo->exec($newColumnSQL);

        $updateSQL = "UPDATE `t_7` SET `c_5_fk`='$tableId',`ColumnName`='$columnName' WHERE `c_7_id`='$lastId';";
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
