<?php

/**
 * Data and structure
 */
class DataAndStructure
{
    public function CardContainer($employee, $place, $table)
    {
        include('Connect.php');
        $main_data = array();

        $resultTDStructure = $pdo->query('SELECT cardc_structures.Number, ColumnName, Tables FROM cardc_structures WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number')->fetchAll();

        $structureTD = array();
        $tablesTD = array();
        foreach ($resultTDStructure as $row) {
            array_push($structureTD, $row['ColumnName']);
            array_push($tablesTD, $row['Tables']);
            if (!is_null($row['Number'])) {
                $itemInStructure = array();
                $itemInStructure['Place'] = $row['Number'];
                $itemInStructure['Column'] = $row['ColumnName'];

                $main_data['DataStructure'][] = $itemInStructure;
            }
        }

        $queryByStructure = new QueryByStructure();
        $partnerDataQuery = $queryByStructure->DefaultQuery($structureTD, $table, $tablesTD);
        if ($partnerDataQuery) {
            $partnerDataResult = $pdo->query($partnerDataQuery)->fetchAll(PDO::FETCH_ASSOC);
            $main_data['Data'] = $partnerDataResult;
        } else {
            $main_data['Data'] = '';
        }

        return $main_data;
    }
}
