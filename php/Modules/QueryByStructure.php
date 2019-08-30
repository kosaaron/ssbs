<?php

/**
 * Query by structure
 */
class QueryByStructure
{
    public function DefaultQuery($strucure, $table, $tables, $where = null, $order = null)
    {
        $fullQuery = 'SELECT ';
        $fullJoin = '';

        //first
        if (is_null($tables[0])) {
            $fullQuery .= $table.'.'.$strucure[0];
        } else {
            $tablesArray = explode(",", $tables[0]);
            $path = explode(".", $strucure[0]);
            $fullQuery .=  end($tablesArray) . '.' . end($path) . ' AS "' . $strucure[0] . '"';

            for ($j = 0; $j < sizeof($tablesArray); $j++) {
                $fullJoin .= ' LEFT JOIN ' . $tablesArray[$j] . ' ON ' . $path[$j] . 'Id =' . $path[$j] . 'FK';
            }
        }
        //more
        for ($i = 1; $i < sizeof($strucure); $i++) {
            if (is_null($tables[$i])) {
                $fullQuery .=  ', ' . $table.'.'.$strucure[$i];
            } else {
                $tablesArray = explode(",", $tables[$i]);
                $path = explode(".", $strucure[$i]);
                $fullQuery .=  ', ' . end($tablesArray) . '.' . end($path) . ' AS "' . $strucure[$i] . '"';

                for ($j = 0; $j < sizeof($tablesArray); $j++) {
                    $fullJoin .= ' LEFT JOIN ' . $tablesArray[$j] . ' ON ' . $path[$j] . 'Id =' . $path[$j] . 'FK';
                }
            }
        }
        $fullQuery .= ' FROM ' . $table;
        $fullQuery .= $fullJoin;

        if (!is_null($where)) {
            $fullQuery .= ' ' . $where;
        }
        if (!is_null($order)) {
            $fullQuery .= ' ' . $order;
        }

        $fullQuery .= ';';
        return $fullQuery;
    }
}
