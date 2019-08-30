<?php

/**
 * Create filter
 */
class CreateFilter
{
    public function DefaultFilter($employee, $place)
    {
        include('Connect.php');

        $resultFltrStructure = $pdo->query('SELECT FilterId, filters.Name, filters.Type, DefaultValue, ColumnName, TableName FROM filters WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number;')->fetchAll(PDO::FETCH_ASSOC);

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
                foreach ($oppStructure as $row) {
                    array_push($oppArr, $row[0]);
                }
                $f_array['Opportunities'] = $oppArr;
            }

            $fltrStructure[] = $f_array;
        }

        return $fltrStructure;
    }
}
