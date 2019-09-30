<?php

/**
 * Data and structure
 */
class DataAndStructure
{
    public function CardContainer($employee, $place, $table, $where = null)
    {
        /** Includes */
        include('Connect.php');

        $main_data = array();

        $resultTDStructure = $pdo->query('SELECT cardc_structures.Number, ColumnName, Tables FROM cardc_structures WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number')->fetchAll();

        $structureTD = array();
        $tablesTD = array();
        $dataStructure = array();
        foreach ($resultTDStructure as $row) {
            array_push($structureTD, $row['ColumnName']);
            array_push($tablesTD, $row['Tables']);
            if (!is_null($row['Number'])) {
                $dataStructure[$row['Number']] = $row['ColumnName'];
            }
        }
        $main_data['DataStructure'] = $dataStructure;

        $queryByStructure = new QueryByStructure();
        $partnerDataQuery = $queryByStructure->DefaultQuery($structureTD, $table, $tablesTD, $where);
        if ($partnerDataQuery) {
            $partnerDataResult = $pdo->query($partnerDataQuery)->fetchAll(PDO::FETCH_ASSOC);
            $main_data['Data'] = $partnerDataResult;
        } else {
            $main_data['Data'] = '';
        }

        return $main_data;
    }

    public function Details($employee, $place)
    {
        /** Includes */
        include('Connect.php');

        $main_data = array();

        $resultTDtlsStructure = $pdo->query('SELECT ColumnName, dtls_structures.Name, dtls_structures.Number FROM dtls_structures WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number')->fetchAll();
        $structureTDtls = array();
        $namesTDtls = array();
        foreach ($resultTDtlsStructure as $row) {
            $structureTDtls[$row['Number']] = $row['ColumnName'];
            $namesTDtls[$row['Number']] = $row['Name'];
        }
        $main_data['Data'] = $structureTDtls;
        $main_data['Names'] = $namesTDtls;

        return $main_data;
    }
}
