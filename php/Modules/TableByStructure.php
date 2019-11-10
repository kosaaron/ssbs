<?php
require_once('CreateFilter.php');
require_once('QueryByStructure.php');

class TableByStructure
{
    //Local varibles
    public $main_data;

    function __construct()
    {
        $this->main_data = array();
    }

    public function CreateTable($userId, $place, $mainTable, $filter)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        $tableStructreQResult = $pdo->query('SELECT * FROM table_structures WHERE "' . $place . '"=Place && EmployeeFK="' . $userId . '"')->fetchAll(PDO::FETCH_ASSOC);

        $columns = array();
        $tables = array();
        $tableStructre = array();
        $dataStructre = array();

        foreach ($tableStructreQResult as $structure) {
            array_push($columns, $structure['ColumnName']);
            array_push($tables, $structure['Tables']);

            if ($structure['ColumnWidth'] === '0') {
                $dataStructure[$structure['Number']] = $structure['ColumnName'];
                continue;
            }

            $structureItem = array();
            $structureItem['ColumnTitle'] = $structure['ColumnTitle'];
            $structureItem['ColumnName'] = $structure['ColumnName'];
            $structureItem['ColumnWidth'] = $structure['ColumnWidth'];
            $tableStructre[$structure['Number']] = $structureItem;
        }

        $queryByStructure = new QueryByStructure();
        $tableQuery = $queryByStructure->DefaultQuery($columns, $tables, $mainTable, $filter);

        $tableResult = $pdo->query($tableQuery)->fetchAll(PDO::FETCH_ASSOC);
        $this->main_data['Data'] = $tableResult;
        $this->main_data['TableStructre'] = $tableStructre;
        $this->main_data['DataStructure'] = $dataStructure;
    }
}
