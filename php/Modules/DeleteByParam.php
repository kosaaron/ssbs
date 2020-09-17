<?php

/**
 * Update by parameters
 */
class DeleteByParam
{
    public function
    Default($data, $entryId)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        foreach ($data as $table) {
            $finalSQL = 'DELETE FROM ' . $table . ' SET ';

            $finalSQL .= ' WHERE ' . $entryId['IdColumn'] . '=' . $entryId['Id'] . ';';

            $finalQueary = $pdo->prepare($finalSQL);
            $finalQueary->execute();

            $tableIdQueary = $pdo->prepare("SHOW KEYS FROM $table WHERE Key_name = 'PRIMARY'");
            $tableIdQueary->execute();
            $tableIdArr = $tableIdQueary->fetchAll();
            $tableIdColumn = $tableIdArr[0]['Column_name'];

            if ($finalQueary) {
                $main_data[$table]['Result'] = 'S';
                $main_data[$table]['LastIdColumn'] = $tableIdColumn;
                $main_data[$table]['LastId'] = $entryId['Id'];
            } else {
                $main_data[$table]['result'] = 'F';
            }
        }

        return $main_data;
    }

    function ifNull($varible)
    {
        if ($varible === null) {
            return   " IS NULL";
        } else {
            return "='$varible'";
        }
    }
}
