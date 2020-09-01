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
        $connTableIds = $data['ConnTableIds'];

        $cTSql = "SELECT * FROM c_tables WHERE CTableId IN (" . implode(',', $connTableIds) . ")";
        $cTQueary = $this->pdo->prepare($cTSql);
        $cTQueary->execute();
        $cTData = $cTQueary->fetchAll(PDO::FETCH_ASSOC);

        $ctResult = "";
        foreach ($cTData as $cTRow) {
            $ctResult .= ", c_" . $cTRow['CTableId'] . "_fk INT(11) NULL, INDEX fk_" . $cTRow['CTableId'] . " (c_" . $cTRow['CTableId'] . "_fk), FOREIGN KEY (c_" . $cTRow['CTableId'] . "_fk) REFERENCES " . $cTRow['TableName'] . "(" . $cTRow['TableIdName'] . ") ON DELETE SET NULL";//CONSTRAINT fk_" . $cTRow['CTableId'] . " FOREIGN KEY (c_" . $cTRow['CTableId'] . "_fk) REFERENCES " . $cTRow['TableName'] . "(" . $cTRow['TableIdName'] . ")";
        }

        //Upload to list
        $finalSQL = "INSERT INTO `c_tables`(`TName`) VALUES ('$tName');";
        $finalQueary = $this->pdo->prepare($finalSQL);
        $finalQueary->execute();
        $lastId = $this->pdo->lastInsertId();

        $tableName = "t_$lastId";
        $tableIdName = "c_$lastId" . "_id";

        //Create table
        $newTableSQL = "CREATE table $tableName(
            $tableIdName INT( 11 ) AUTO_INCREMENT PRIMARY KEY" . $ctResult . ");";
        $this->pdo->exec($newTableSQL);

        //Update list by id
        $updateSQL = "UPDATE `c_tables` SET `TableName`='$tableName',`TableIdName`='$tableIdName' WHERE `CTableId`='$lastId';";
        $updateQueary = $this->pdo->prepare($updateSQL);
        $updateQueary->execute();

        return $main_data;
    }
}
