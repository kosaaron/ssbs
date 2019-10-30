<?php

/**
 * Insert by structure
 */
class SelectByParam
{
    /**
     * Default select
     */
    public function DefaultSelect($data)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        // Result
        $main_data = array();


        foreach ($data as $table => $tableArray) {
            $columns = '';

            $isFirst = true;
            foreach ($tableArray['Columns'] as $column => $columnAlias) {
                if ($isFirst) {
                    $isFirst = false;
                } else {
                    $columns .= ', ';
                }
                $columns .= $column . ' AS ' . $columnAlias;
            }

            $tableAlias = $tableArray['Alias'];
            $finalSQL = 'SELECT ' . $columns . ' FROM ' . $table . ' AS ' . $tableAlias . ';';
            $main_data[$tableAlias] = $pdo->query($finalSQL)->fetchAll(PDO::FETCH_ASSOC);
        }
        
        return $main_data;
    }
}
