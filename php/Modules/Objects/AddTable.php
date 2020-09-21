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

        $cTSql = "SELECT 
                    c_5_fk,
                    c_31 AS TName,
                    c_51 AS TableName,
                    c_52 AS TableIdName,
                  FROM t_5 
                  WHERE c_5_id 
                  IN (" . implode(',', $connTableIds) . ")";
        $cTQueary = $this->pdo->prepare($cTSql);
        $cTQueary->execute();
        $cTData = $cTQueary->fetchAll(PDO::FETCH_ASSOC);

        $ctResult = "";
        foreach ($cTData as $cTRow) {
            $ctResult .= ", c_" . $cTRow['c_5_id'] . "_fk INT(11) NULL, INDEX fk_" . $cTRow['c_5_id'] . " (c_" . $cTRow['c_5_id'] . "_fk), FOREIGN KEY (c_" . $cTRow['c_5_id'] . "_fk) REFERENCES " . $cTRow['TableName'] . "(" . $cTRow['TableIdName'] . ") ON DELETE SET NULL";//CONSTRAINT fk_" . $cTRow['c_5_id'] . " FOREIGN KEY (c_" . $cTRow['c_5_id'] . "_fk) REFERENCES " . $cTRow['TableName'] . "(" . $cTRow['TableIdName'] . ")";
        }

        //Upload to list
        $finalSQL = "INSERT INTO `t_5`(`c_31`) VALUES ('$tName');";
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
        $updateSQL = "UPDATE `t_5` SET `c_51`='$tableName',`c_52`='$tableIdName' WHERE `c_5_id`='$lastId';";
        $updateQueary = $this->pdo->prepare($updateSQL);
        $updateQueary->execute();

        return $main_data;
    }
}
