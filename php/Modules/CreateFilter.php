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

        $main_data = array();
        foreach ($resultFltrStructure as $row) {
            $f_array = array();
            $f_array['FilterId'] = $row['FilterId'];
            $f_array['Name'] = $row['Name'];
            $f_array['Type'] = $row['Type'];
            $f_array['DefaultValue'] = $row['DefaultValue'];
            $f_array['ColumnName'] = $row['ColumnName'];

            if ($row['Type'] == 'S') {
                $column = explode(".", $row['ColumnName']);
                $oppIdColumn = $column[sizeof($column) - 2] . 'Id';
                $oppStructure = $pdo->query('SELECT ' . $oppIdColumn . ' AS Id, ' . $row['TableName'] . '.' . end($column) . ' AS Name FROM ' . $row['TableName'] . ';')->fetchAll();

                $oppArr = array();

                if ($row['Required'] === '0') {
                    $oppArr['Id'] = '0';
                    $oppArr['Name'] = '-- Válassz --';
                    $f_array['Opportunities'][] = $oppArr;
                }
                foreach ($oppStructure as $row2) {
                    $oppArr['Id'] = $row2['Id'];
                    $oppArr['Name'] = $row2['Name'];
                    $f_array['Opportunities'][] = $oppArr;
                }
            }

            $main_data[] = $f_array;
        }

        return $main_data;
    }
}
