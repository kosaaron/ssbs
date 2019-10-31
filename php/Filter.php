<?php
require_once('Modules/Connect.php');
require_once('Modules/QueryByStructure.php');
require_once('Modules/DataAndStructure.php');
require_once('Modules/QueryOptimizer.php');

//Post varibles
$userId = 1;
$filters = $_POST['Filters'];
$filterPlace = $_POST['FilterPlace'];


//Local varibles
$main_data = array();

$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;
$filterString = '';
$first = true;

foreach ($filters as $filter) {
    if ($filter['Value'] === '' || $filter['Value'] === '0') {
        continue;
    }

    $resultFltrStructure = $pdo->query('SELECT Place, ColumnName, TableName FROM filters WHERE (FilterId="' . $filter['FilterId'] . '") ORDER BY Number;')->fetchAll(PDO::FETCH_ASSOC);
    if ($first) {
        $filterString .= ' WHERE';
        $first = false;
    } else {
        $filterString .= ' &&';
    }
    $row = $resultFltrStructure[0];
    $splittedColumn = explode('.', $row['ColumnName']);
    $spltdCSize = sizeof($splittedColumn);
    if ($spltdCSize === 1) {
        $filterString .= ' ' . $row['TableName'] . '.' . $splittedColumn[0] . ' LIKE "%' . $filter['Value'] . '%"';
    } else if ($spltdCSize === 2) {
        $filterString .= ' ' . $row['TableName'] . '.' . $splittedColumn[0] . 'Id="' . $filter['Value'] . '"';
    } else if ($spltdCSize === 3) {
        $splittedTable = explode('.', $row['TableName']);
        $queryOptimizer = new QueryOptimizer();
        $filterString .= $queryOptimizer->SwitchTable($splittedTable, $splittedColumn, 'PartnerTagId', $filter['Value'], 'Partner');
    }
}

/** Get card container filtered data */
$main_data['Data'] = getCardC($filterPlace, $userId, $filterString);

/** Print result */
$json = json_encode($main_data);
print_r($json);

/** 
 ----------------------------------------80----------------------------------------
 * Functions
 */
/** Get card container */
function getCardC($filterPlace, $userId, $filter)
{
    $data = array();
    
    switch ($filterPlace) {
        case 'taskfltr':
            require_once('Modules/TaskManager.php');

            $TaskManager = new TaskManager($userId);
            $TaskManager->CreateCardContainer($filter);

            $data = $TaskManager->main_data['Data'];
            break;
        case 'prtnrfltr':
            require_once('Modules/PartnerManager.php');

            $PartnerManager = new PartnerManager($userId);
            $PartnerManager->CreateCardContainer($filter);

            $data = $PartnerManager->main_data['Data'];
            break;
        case 'emplfltr':
            require_once('Modules/Employees.php');

            $Employees = new Employees($userId);
            $Employees->CreateCardContainer($filter);

            $data = $Employees->main_data['Data'];
            break;
        default:
            break;
    }

    return $data;
}
