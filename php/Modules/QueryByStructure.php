<?php

/**
 * Query by structure
 */
class QueryByStructure
{
    /**
     * Default query generator
     * **Example:**
     * columns {
     *     "Column1",
     *     "TruncatedId1.Foreign2",
     *     "TruncatedId3.TruncatedId2.Column3"
     * },
     * tables {
     *     null,
     *     "TableForTruncatedId1",
     *     "TableForTruncatedId3, TableForTruncatedId2"
     * },
     * table: "table1",
     * where: "WHERE condition1 && condition2 || condition3"
     * sort: "ORDER BY column1 ASC"
     * limit: "LIMIT 20 OFFSET 0"
     */
    public function DefaultQuery(
        $columns,
        $tables,
        $table,
        $where = null,
        $sort = null,
        $limit = null
    ) {
        //if columns array size is vaild then tables array valid too
        if (sizeof($columns) == 0 || $table == '') {
            return '';
        }

        $fullQuery = 'SELECT DISTINCT ';
        $fullJoin = '';
        $alreadyAdded = false;
        $alreadyAddedTablse = array();

        //first
        if (is_null($tables[0])) {
            $fullQuery .= $table . '.' . $columns[0];
        } else {
            $tablesArray = explode(",", $tables[0]);
            $path = explode(".", $columns[0]);
            $fullQuery .=  end($tablesArray) . '.' . end($path) . ' AS "' . $columns[0] . '"';

            for ($j = 0; $j < sizeof($tablesArray); $j++) {
                foreach ($alreadyAddedTablse as $value) {
                    if ($value === $tablesArray[$j]) {
                        $alreadyAdded = true;
                        break;
                    }
                }

                if (!$alreadyAdded) {
                    array_push($alreadyAddedTablse, $tablesArray[$j]);
                    $fullJoin .= ' LEFT JOIN ' . $tablesArray[$j] . ' ON ' . $path[$j] . 'Id =' . $path[$j] . 'FK';
                }
            }
        }
        //more
        for ($i = 1; $i < sizeof($columns); $i++) {
            if (is_null($tables[$i])) {
                $fullQuery .=  ', ' . $table . '.' . $columns[$i];
            } else {
                $tablesArray = explode(",", $tables[$i]);
                $path = explode(".", $columns[$i]);
                $fullQuery .=  ', ' . end($tablesArray) . '.' . end($path) . ' AS "' . $columns[$i] . '"';

                for ($j = 0; $j < sizeof($tablesArray); $j++) {
                    foreach ($alreadyAddedTablse as $value) {
                        if ($value === $tablesArray[$j]) {
                            $alreadyAdded = true;
                            break;
                        }
                    }

                    if (!$alreadyAdded) {
                        array_push($alreadyAddedTablse, $tablesArray[$j]);
                        $fullJoin .= ' LEFT JOIN ' . $tablesArray[$j] . ' ON ' . $path[$j] . 'Id =' . $path[$j] . 'FK';
                    }
                }
            }
        }
        $fullQuery .= ' FROM ' . $table;
        $fullQuery .= $fullJoin;

        if (!is_null($where)) {
            $fullQuery .= ' ' . $where;
        }
        if (!is_null($sort)) {
            $fullQuery .= ' ' . $sort;
        }
        if (!is_null($limit)) {
            $fullQuery .= ' ' . $limit;
        }

        $fullQuery .= ';';
        return $fullQuery;
    }
}
