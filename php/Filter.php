<?php
require_once('Modules/Connect.php');
require_once('Modules/DataAndStructure.php');
require_once('Modules/QueryOptimizer.php');

//Post varibles
$userId = 1;
$filters = $_POST['Filters'];
$sorts = $_POST['Sorts'];
$filterPlace = $_POST['FilterPlace'];
if (!empty($_POST['DataPos'])) {
    $dataPos = $_POST['DataPos'];
} else {
    $dataPos = array(
        'Limit' => 20,
        'Offset' => 0
    );
}

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

$firstSort = true;
$sortString = '';
foreach ($sorts as $key => $sort) {
    if ($sort['Value'] == 2) {
        continue;
    }

    $resultSrtStructure = $pdo->query('SELECT Place, ColumnName, TableName FROM sorts WHERE (SortId="' . $sort['SortId'] . '") ORDER BY Number;')->fetchAll(PDO::FETCH_ASSOC);
    if ($firstSort) {
        $sortString .= ' ORDER BY';
        $firstSort = false;
    } else {
        $sortString .= ', ';
    }
    $row = $resultSrtStructure[0];
    $columnStrArray = explode('.', $row['ColumnName']);
    $ColumnName = end($columnStrArray);
    $sortString .= ' ' . $row['TableName'] . '.' . $ColumnName . ' ';
    if ($sort['Value'] == 0) {
        $sortString .= ' DESC';
    } else if ($sort['Value'] == 1) {
        $sortString .= ' ASC';
    }
}
/** Get card container filtered data */
$main_data['Data'] = getCardC($filterPlace, $userId, $filterString, $sortString, $dataPos);

/** Print result */
$json = json_encode($main_data);
print_r($json);
/**
----------------------------------------80----------------------------------------
 */
/** Functions **/
/** Get card container */
function getCardC($filterPlace, $userId, $filter, $sortString, $dataPos)
{
    $data = array();

    switch ($filterPlace) {
        case 'tskfltr':
            require_once('Modules/TaskManager.php');

            $TaskManager = new TaskManager($userId);
            $TaskManager->CreateCardContainer($filter, $sortString, $dataPos);

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
            $Employees->CreateCardContainer($filter, $sortString, $dataPos);

            $data = $Employees->main_data['Data'];
            break;
        case 'ordrfltr':
            require_once('Modules/OrderManager.php');

            $OrderManager = new OrderManager($userId);
            $OrderManager->CreateCardContainer($filter);

            $data = $OrderManager->main_data['Data'];
            break;
        default:
            break;
    }

    return $data;
}
