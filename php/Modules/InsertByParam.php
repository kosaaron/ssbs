<?php

/**
 * Insert by structure
 */
class InsertByParam
{
    public function DefaultUpload($data)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $finalSQL = '';

        foreach ($data as $table => $columns) {
            $finalSQL .= 'INSERT INTO ' . $table;
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
                $values .= '"' . $value . '"';
            }

            $columnNames .= ')';
            $values .= ');';
            $finalSQL .= $columnNames . $values;
        }

        if ($pdo->query($finalSQL)) {
            echo "S";
        } else {
            echo "F";
        }
    }
}
