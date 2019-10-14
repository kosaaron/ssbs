<?php

/**
 * Query optimizer
 */
class QueryOptimizer
{
    /**
     * Default optimizer
     */
    public function SwitchTable($tables, $columns, $filterColumn, $filterValue, $truncatedId)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $lastResult = '';
        $first = true;
        for ($i = sizeof($tables) - 1; $i >= 0; $i--) {
            $query = 'SELECT ';

            if ($first) {
                $query .= $columns[$i] . 'Id AS Id';
                $query .= ' FROM ';
                $query .= $tables[$i];
                $query .= ' WHERE ' . $filterColumn . '="' . $filterValue . '"';

                $first = false;
            } else {
                $query .= $truncatedId . 'FK AS Id';
                $query .= ' FROM ';
                $query .= $tables[$i];
                $query .= ' WHERE ' . $columns[$i + 1] . 'FK IN (' . $lastResult . ')';
            }

            $queryResult = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
            $lastResult = $this->ArrayToString($queryResult);
        }
        $result = ' ' . $truncatedId . 'Id IN (' . $lastResult . ')';

        return $result;
    }

    //private functions
    function ArrayToString($array)
    {
        $result = '';
        $first = true;

        foreach ($array as $value) {
            if ($first) {
                $first = false;
            } else {
                $result .= ', ';
            }
            $result .= $value['Id'];
        }
        return $result;
    }
}
