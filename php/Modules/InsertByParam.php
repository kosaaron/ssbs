<?php

/**
 * Insert by structure
 */
class InsertByParam
{
    public function DefaultUpload($data)
    {
        $main_data = array();
        foreach ($data as $object) {
            $main_data[] =  $this->UploadOneObject($object);
        }
        return $main_data;
    }

    function UploadOneObject($object)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $main_data = array();

        $finalSQL = '';

        foreach ($object as $table => $columns) {
            $finalSQL = 'INSERT INTO ' . $table;
            $columnNames = '(';
            $values = ' VALUES (';

            $isFirst = true;
            foreach ($columns as $column => $value) {
                if ($isFirst) {
                    $isFirst = false;
                } else {
                    $columnNames .= ', ';
                    $values .= ', ';
                }
                $columnNames .= $column;

                if ($value === 'null') {
                    $values .= 'null';
                } else {
                    $values .= '"' . $value . '"';
                }
            }

            $columnNames .= ')';
            $values .= ');';
            $finalSQL .= $columnNames . $values;

           $finalQueary = $pdo->prepare($finalSQL);
            $finalQueary->execute();
            $lastId = $pdo->lastInsertId();

            $tableIdQueary = $pdo->prepare("SHOW KEYS FROM $table WHERE Key_name = 'PRIMARY'");
            $tableIdQueary->execute();
            $tableIdArr = $tableIdQueary->fetchAll();
            $tableIdColumn = $tableIdArr[0]['Column_name'];

            if ($finalQueary) {
                $main_data[$table]['Result'] = 'S';
                $main_data[$table]['LastIdColumn'] = $tableIdColumn;
                $main_data[$table]['LastId'] = $lastId;
            } else {
                $main_data[$table]['result'] = 'F';
            }
        }

        return $main_data;
    }
}
/*** Example ***/
/*
$data = [
    array(
        "table1" => array(
            "column1" => "data1",
            "column2" => "data2",
            "column3" => "data3",
        ),
        "table2" => array(
            "column1" => "data4",
            "column2" => "data5",
            "column3" => "data6",
        )
    ),
    array(
        "table1" => array(
            "column1" => "data1",
            "column2" => "data2",
            "column3" => "data3",
        ),
        "table2" => array(
            "column1" => "data4",
            "column2" => "data5",
            "column3" => "data6",
        )
    )
]
*/
