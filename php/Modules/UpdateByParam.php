<?php

/**
 * Update by parameters
 */
class UpdateByParam
{
    public function
    Default($data, $entryId)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $finalSQL = '';

        //UPDATE `projects` SET `ProjectId`=[value-1] WHERE 1;

        foreach ($data as $table => $columns) {
            $finalSQL .= 'UPDATE ' . $table . ' SET ';

            $isFirst = true;
            foreach ($columns as $column => $value) {
                if ($isFirst) {
                    $isFirst = false;
                } else {
                    $finalSQL .= ', ';
                }
                $finalSQL .= $column;
                if ($value === 'null') {
                    $finalSQL .= '=null';
                } else {
                    $finalSQL .= '="' . $value . '"';
                }
            }

            $finalSQL .= ' WHERE ' . $entryId['Name'] . '=' . $entryId['Id'] . ';';
        }
        echo $finalSQL;

        if ($pdo->query($finalSQL)) {
            echo "S";
        } else {
            echo "F";
        }
    }
}
