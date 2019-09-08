<?php

/**
 * Insert by structure
 */
class InsertByStructure
{
    public function DefaultUpload($data, $place)
    {
        include('Connect.php');

        $insertTables = array();
        $insertStructures = $pdo->query('SELECT * FROM insert_structures WHERE (Place="' . $place . '");')->fetchAll(PDO::FETCH_ASSOC);

        foreach ($insertStructures as $row) {
            $insertArr = array();
            $insertTables[$row['InsertTable']]['InsertTable'] = $row['InsertTable'];
            $insertArr['InsertName'] = $row['InsertName'];
            $insertArr['ColumnName'] = $row['ColumnName'];
            $insertTables[$row['InsertTable']]['InsertData'][] = $insertArr;
        }

        foreach ($insertTables as $table) {
            $names = '';
            $values = '';
            $isFirst = true;
            foreach ($table['InsertData'] as $row) {
                if ($isFirst) {
                    $isFirst = false;
                } else {
                    $names .= ', ';
                    $values .= ', ';
                }
                $names .= $row['InsertName'];
                $values .= '"' . $data[$row['ColumnName']] . '"';
            }
            $finalSQL = 'INSERT INTO ' . $table['InsertTable'] . ' (';
            $finalSQL .= $names;
            $finalSQL .= ') VALUES (';
            $finalSQL .= $values;
            $finalSQL .= ');';

            if ($insertStructures = $pdo->query($finalSQL)) {
                echo 'S';
            } else {
                echo 'F';
            }
        }
    }
}
