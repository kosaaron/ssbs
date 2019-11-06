<?php
require_once('QueryByStructure.php');
require_once('VirtualObject.php');
require_once('Connect.php');

/**
 * Data and structure
 */
class DataAndStructure
{
    public function CardContainer($employee, $place, $table, $where = null)
    {
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $main_data = array();

        $resultTDStructure = $pdo->query('SELECT cardc_structures.Number, ColumnName, Tables, BackendF FROM cardc_structures WHERE (' . $employee . '=EmployeeFK && Place="' . $place . '") ORDER BY Number')->fetchAll();

        $structureTD = array();
        $tablesTD = array();
        $vOParamObjects = array();
        $dataStructure = array();
        foreach ($resultTDStructure as $row) {
            $functionArray = explode(',', $row['BackendF']);
            foreach ($functionArray as $key => $bFunction) {
                $funcWithParams = explode('/', $bFunction);
                if ($funcWithParams[0] === 'vo') {
                    $vOParams = array();
                    $vOParams = $this->BackendFunctions($funcWithParams);
                    $vOParams['vOName'] = explode(".", $row['ColumnName'])[1];
                    array_push($vOParamObjects, $vOParams);
                    continue 2;
                }
            }

            array_push($structureTD, $row['ColumnName']);
            array_push($tablesTD, $row['Tables']);
            if (!is_null($row['Number'])) {
                $dataStructure[$row['Number']] = $row['ColumnName'];
            }
        }
        $main_data['DataStructure'] = $dataStructure;

        $queryByStructure = new QueryByStructure();
        $dataQuery = $queryByStructure->DefaultQuery($structureTD, $table, $tablesTD, $where);
        if ($dataQuery) {
            $dataResult = $pdo->query($dataQuery)->fetchAll(PDO::FETCH_ASSOC);

            foreach ($vOParamObjects as $paramObject) {
                $virtualObject = new VirtualObject(
                    $paramObject['vOId']
                );

                foreach ($dataResult as $key => $row) {
                    $vOSelectArr = array();
                    $vOWhereArr = array();

                    foreach ($paramObject['vOSelectParams'] as $param) {
                        array_push($vOSelectArr, $row[$param]);
                    }
                    foreach ($paramObject['vOWhereParams'] as $param) {
                        array_push($vOWhereArr, $row[$param]);
                    }
                    $dataResult[$key][$paramObject['vOName']] = $virtualObject->CreateVO($vOSelectArr, $vOWhereArr);
                }
            }

            $main_data['Data'] = $dataResult;
        } else {
            $main_data['Data'] = '';
        }

        return $main_data;
    }

    public function Details($employee, $place)
    {
        /** Includes */
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

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

    private function BackendFunctions($funcWithParams)
    {
        $result = array();
        $result['vOId'] = $funcWithParams[1];
        if ($funcWithParams[2]) {
            $result['vOSelectParams'] = explode(',', $funcWithParams[2]);
        } else {
            $result['vOSelectParams'] = array();
        }
        if ($funcWithParams[3]) {
            $result['vOWhereParams'] = explode(',', $funcWithParams[3]);
        } else {
            $result['vOWhereParams'] = array();
        }
        return $result;
    }
}
