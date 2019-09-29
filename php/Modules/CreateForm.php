<?php

/**
 * Create form
 */
class CreateForm
{
    public function DefaultForm($employee, $place)
    {
        include('Connect.php');
        //Result form structure
        $resultFormStructure = $pdo->query('SELECT * FROM form_structures WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number;')->fetchAll(PDO::FETCH_ASSOC);

        $mainResult = array();

        //Form structure add opportunities
        foreach ($resultFormStructure as $row) {
            //simlpe form
            $f_array = array();
            $f_array['FormStructureId'] = $row['FormStructureId'];
            $f_array['Name'] = $row['Name'];
            $f_array['Type'] = $row['Type'];
            $f_array['DefaultValue'] = $row['DefaultValue'];
            $f_array['ColumnName'] = $row['ColumnName'];
            $f_array['Required'] = $row['Required'];
            $f_array['UploadName'] = $row['UploadName'];

            //funtions
            $functionArr = array();
            if ($row['Functions'] !== null) {
                $functionArr['Id'] = $row['FormStructureId'];
                $functionArr['Name'] = $row['Functions'];
                $mainResult['Functions'][] = $functionArr;
            }

            //opportunities
            $columnCaunter = 1;
            $oppQuery = 'SELECT DISTINCT ';
            $columns = explode(",", $row['ColumnName']);
            $aliases = explode(",", $row['Alias']);
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
                $i = 0;
                foreach ($oppStructure as $row) {
                    $oppSubArr = array();
                    for ($j = 0; $j < $columnCaunter; $j++) {
                        $oppSubArr[$aliases[$j]] = $row[$j];
                    }
                    $oppArr[$i] = $oppSubArr;
                    ++$i;
                }
                $f_array['Opportunities'] = $oppArr;
            }

            $mainResult['Data'][] = $f_array;
        }

        return $mainResult;
    }
}
