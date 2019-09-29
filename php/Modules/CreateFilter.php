<?php

/**
 * Create filter
 */
class CreateFilter
{
    public function DefaultFilter($employee, $place)
    {
        include('Connect.php');

        $resultFltrStructure = $pdo->query('SELECT * FROM filters WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number;')->fetchAll(PDO::FETCH_ASSOC);

        $fltrStructure = array();
        foreach ($resultFltrStructure as $row) {
            $f_array = array();
            $f_array['FilterId'] = $row['FilterId'];
            $f_array['Name'] = $row['Name'];
            $f_array['Type'] = $row['Type'];
            $f_array['DefaultValue'] = $row['DefaultValue'];
            $f_array['ColumnName'] = $row['ColumnName'];

            $column = explode(".", $row['ColumnName']);
            $oppStructure = $pdo->query('SELECT DISTINCT ' . $row['TableName'] . '.' . end($column) . ' FROM ' . $row['TableName'] . ';')->fetchAll();
            if ($row['Type'] == 'S') {
                $oppArr = array();

                if ($row['Required'] === '0') {
                    $oppArr['Id'] = '0';
                    $oppArr['Name'] = '-- Válassz --';
                    $f_array['Opportunities'][] = $oppArr;
                }
                foreach ($oppStructure as $row2) {
                    $oppArr['Id'] = $row['FilterId'];
                    $oppArr['Name'] = $row2[0];
                    $f_array['Opportunities'][] = $oppArr;
                }
            }

            $fltrStructure[] = $f_array;
        }

        return $fltrStructure;
    }
}
