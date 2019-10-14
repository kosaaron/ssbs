<?php
require_once('Connect.php');

/**
 * Update by structure
 */
class UpdateByStructure
{
    public function DefaultUpdate($data, $place, $nameOfId, $valuOfId)
    {
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $updateTables = array();
        $updateStructures = $pdo->query('SELECT * FROM update_structures WHERE (Place="' . $place . '");')->fetchAll(PDO::FETCH_ASSOC);

        foreach ($updateStructures as $row) {
            $updateArr = array();
            $updateTables[$row['UpdateTable']]['UpdateTable'] = $row['UpdateTable'];
            $updateArr['UpdateName'] = $row['UpdateName'];
            $updateArr['ColumnName'] = $row['ColumnName'];
            $updateTables[$row['UpdateTable']]['UpdateData'][] = $updateArr;
        }

        foreach ($updateTables as $table) {
            $names = '';
            $values = '';
            $isFirst = true;

            $finalSQL = 'UPDATE ' . $table['UpdateTable'] . ' SET ';
            foreach ($table['UpdateData'] as $row) {
                if ($isFirst) {
                    $isFirst = false;
                } else {
                    $finalSQL .= ', ';
                }
                $finalSQL .= $row['UpdateName'] . '="' . $data[$row['ColumnName']] . '"';
            }
            $finalSQL .= ' WHERE ' . $nameOfId . ' = ' . $valuOfId . ';';

            if ($updateStructures = $pdo->query($finalSQL)) {
                echo 'S';
            } else {
                echo 'F';
            }
        }
    }
}
