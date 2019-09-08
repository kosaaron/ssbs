<?php

/**
 * Create form
 */
class CreateForm
{
    public function DefaultForm($employee, $place)
    {
        include('Connect.php');

        $resultFltrStructure = $pdo->query('SELECT FormStructureId, form_structures.Name, form_structures.Type, DefaultValue, ColumnName, TableName FROM form_structures WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number;')->fetchAll(PDO::FETCH_ASSOC);

        $fltrStructure = array();
        foreach ($resultFltrStructure as $row) {
            $f_array = array();
            $f_array['FormStructureId'] = $row['FormStructureId'];
            $f_array['Name'] = $row['Name'];
            $f_array['Type'] = $row['Type'];
            $f_array['DefaultValue'] = $row['DefaultValue'];
            $f_array['ColumnName'] = $row['ColumnName'];

            //$oppQuery = 'SELECT DISTINCT ' . $row['TableName'] . '.' . end($column) . ' FROM ' . $row['TableName'] . ';';

            $columnCaunter = 1;
            $oppQuery = 'SELECT DISTINCT ';
            $columns = explode(",", $row['ColumnName']);
            $column = $columns[0];
            $oppQuery .= $row['TableName'] . '.' . $column;
            for ($i = 1; $i < sizeof($columns); $i++) {
                $column = $columns[$i];
                $oppQuery .= ', ' . $row['TableName'] . '.' . $column;
                ++$columnCaunter;
            }
            $oppQuery .= ' FROM ' . $row['TableName'] . ';';

            $oppStructure = $pdo->query($oppQuery)->fetchAll();
            if ($row['Type'] == 'S' || $row['Type'] == 'SN') {
                $oppArr = array();
                foreach ($oppStructure as $row) {
                    //array_push($oppArr, $row[0]);
                    for ($j = 0; $j < $columnCaunter; $j++) {
                        $oppArr[$columns[$j]] = $row[$j];
                    }
                }
                $f_array['Opportunities'] = $oppArr;
            }

            $fltrStructure[] = $f_array;
        }

        return $fltrStructure;
    }
}
