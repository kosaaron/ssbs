<?php

/**
 * Insert by structure
 */
class InsertByStructure
{
    public function DefaultUpload($data, $place)
    {
        $main_data = array();

        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;
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
                if ($data[$row['ColumnName']] === '') {
                    $values .= 'null';
                } else if (sizeof(explode('(', $data[$row['ColumnName']])) === 2) {
                    $values .= $this->getFunctionResult($data[$row['ColumnName']]);
                } else {
                    $values .= '"' . $data[$row['ColumnName']] . '"';
                }
            }
            $finalSQL = 'INSERT INTO ' . $table['InsertTable'] . ' (';
            $finalSQL .= $names;
            $finalSQL .= ') VALUES (';
            $finalSQL .= $values;
            $finalSQL .= ');';
            if ($insertStructures = $pdo->query($finalSQL)) {
                $main_data['query'] = 'S';
            } else {
                $main_data['query'] = 'F';
            }

            $main_data['InsertedId'] = $pdo->lastInsertId();
            return $main_data;
        }
    }

    /**
     * Get function result
     * @param String value
     */
    function getFunctionResult($value)
    {
        $valueArr = explode('(', $value);
        $function = $valueArr[0];
        $parameters = explode(')', $valueArr[1])[0];
        switch ($function) {
            case 'id_to_fk':
                return $this->idForFk($parameters);
                break;
            default:
                break;
        }
    }

    /** Built-in functions **/
    /**
     * ID for FK
     * @param String[id,column] parameter 
     */
    function idForFk($parameters)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $explodedParam = explode(',', $parameters);
        $table = $explodedParam[0];
        $column = $explodedParam[1];

        $result = $pdo->query('SELECT MAX(' . $column . ') AS Id FROM ' . $table . ';')->fetchAll(PDO::FETCH_ASSOC);

        return $result[0]['Id'];
    }
}
