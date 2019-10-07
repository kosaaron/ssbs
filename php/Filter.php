<?php
include('Connect.php');
include('Modules/QueryByStructure.php');
include('Modules/DataAndStructure.php');

//Post varibles
$userId = 1;
$filters = $_POST['Filters'];

//Local varibles
$main_data = array();

$filterString = '';
$first = true;

foreach ($filters as $filter) {
    if ($filter['Value'] === '' || $filter['Value'] === '0') {
        continue;
    }

    $resultFltrStructure = $pdo->query('SELECT ColumnName, TableName FROM filters WHERE (FilterId="' . $filter['FilterId'] . '") ORDER BY Number;')->fetchAll(PDO::FETCH_ASSOC);
    if ($first) {
        $filterString .= ' WHERE';
        $first = false;
    } else {
        $filterString .= ' &&';
    }
    $row = $resultFltrStructure[0];
    $splittedColumn = explode('.', $row['ColumnName']);
    if (sizeof($splittedColumn) === 1) {
        $filterString .= ' ' . $row['TableName'] . '.' . $splittedColumn[0] . ' LIKE "%' . $filter['Value'] . '%"';
    } else {
        $filterString .= ' ' . $row['TableName'] . '.' . $splittedColumn[0] . 'Id="' . $filter['Value'] . '"';
    }
}

/** Get card container filtered data */
$cardCParam = getCardCParam('taskfltr');
$dataAndStructure = new DataAndStructure();
$cardCResult = $dataAndStructure->CardContainer($userId, $cardCParam['place'], $cardCParam['main_table'], $filterString);
$main_data['Data'] = $cardCResult['Data'];

$json = json_encode($main_data);
print_r($json);

//functions
function getCardCParam($type)
{
    $param = array();
    switch ($type) {
        case 'taskfltr':
            $param['place'] = 'taskmd';
            $param['main_table'] = 'tasks';
            break;

        default:
            break;
    }
    return $param;
}
