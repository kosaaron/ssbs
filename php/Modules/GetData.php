<?php

/**
 * Get data
 */
class GetData
{
    /**
     * Get data
     */
    function __construct()
    {
        //PDO connection
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
        //Switch plugin
        require_once('SwitchPlugin.php');
        $this->switchPlugin = new SwitchPlugin();
    }

    /**
     * Create data
     * {string} fModulePluginFK
     * {string} fPluginPluginFK
     */
    function Create($fModulePluginFK, $fPluginPluginFK)
    {
        $fPluginDisplays = $this->pdo->query(
            "SELECT * FROM f_plugin_display WHERE FModulePluginFK" . $this->switchPlugin->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->switchPlugin->ifNull($fPluginPluginFK)
        )->fetchAll(PDO::FETCH_ASSOC);

        $main_data = array();

        foreach ($fPluginDisplays as $fPluginDisplay) {
            $fPluginDisplayId = $fPluginDisplay['FPluginDisplayId'];
            $number = $fPluginDisplay['Number'];

            $main_data[$number]['Title'] = $fPluginDisplay['Title'];
            $main_data[$number]['Display'] = $this->getDisplayColumns($fPluginDisplayId);

            //Childs
            $main_data['Childs'] = $this->switchPlugin->checkChild(
                $fModulePluginFK,
                $fPluginPluginFK,
                '1'
            );
        }

        return $main_data;
    }

    function getDisplayColumns($fPluginDisplayId)
    {
        /** Includes */
        //ModuleMetadata
        require_once('ModuleMetadata.php');
        $cModuleId = ModuleMetadata::$cModuleId;
        $uplodedData = ModuleMetadata::$uplodedData;

        /** Create displayed column structure */
        $result = array();

        //Get display columns metadata
        $fDisplays = $this->pdo->query(
            "SELECT * FROM f_display INNER JOIN f_columns ON FColumnId=FColumnFK"
                . " WHERE FPluginDisplayFK" . $this->switchPlugin->ifNull($fPluginDisplayId)
        )->fetchAll(PDO::FETCH_ASSOC);

        //Get main table
        $cModuleId = ModuleMetadata::$cModuleId;
        $cModule = $this->pdo->query(
            "SELECT * FROM c_modules WHERE CModuleId" . $this->switchPlugin->ifNull($cModuleId)
        )->fetch(PDO::FETCH_ASSOC);
        $mainTable = $cModule['MainTable'];

        //Get main table primary key
        $tableIdQueary = $this->pdo->prepare("SHOW KEYS FROM $mainTable WHERE Key_name = 'PRIMARY'");
        $tableIdQueary->execute();
        $tableIdArr = $tableIdQueary->fetchAll();
        $tableIdColumn = $tableIdArr[0]['Column_name'];

        //Structure of displayed columns
        $structure = array();

        //First is primary key column
        $column = array();

        $column['Number'] = '1';
        $column['Name'] = 'TableId';
        $column['TableName'] = $mainTable;
        $column['ColumnName'] = $tableIdColumn;
        $column['cModuleId'] = $cModuleId;
        $structure[] = $column;

        //Get more columns
        foreach ($fDisplays as $fDisplay) {
            $column = array();
            $column['Number'] = $fDisplay['Number'];
            $column['Name'] = $fDisplay['Name'];
            $column['TableName'] = $fDisplay['TableName'];
            $column['ColumnName'] = $fDisplay['ColumnName'];
            $column['cModuleId'] = $cModuleId;
            $structure[] = $column;
        }

        $result['Data'] = $this->getDataByStructure($structure, $mainTable, $uplodedData);
        $result['Structure'] = $structure;

        return $result;
    }

    function getDataByStructure($structure, $mainTable, $uplodedData)
    {
        /** Includes */
        //FindRelationship
        require_once('FindRelationship.php');
        $findRelationship = new FindRelationship();

        $result = array();
        $pathIds = array();
        $filterAndSort = array();
        $where = '';
        $sort = '';

        $isFilter = false;
        if (array_key_exists("FilterData", $uplodedData)) {
            $uplodedFilter = $uplodedData['FilterData'];
            $isFilter = true;
        }

        $filterAndSort = $this->getFilterAndSort();
        foreach ($filterAndSort as $key => $row) {
            if ($row['FilterOrSort'] === '2') {
                break;
            }

            $splittedUploadName = explode('.', $row['UploadName']);
            $tableName = $splittedUploadName[0];
            $columnName = $splittedUploadName[1];

            if ($isFilter) {
                $filterData[$tableName][$columnName]['Value'] = $uplodedFilter[$tableName][$columnName];
            } else {
                $filterData[$tableName][$columnName]['Value'] = $row['DefaultValue'];
            }
            $filterData[$tableName][$columnName]['Type'] = $row['Type'];

            unset($filterAndSort[$key]);
        }


        if (array_key_exists("SortData", $uplodedData)) {
            $sortData = $uplodedData['SortData'];
        } else {
            $sortData = [];
            foreach ($filterAndSort as $key => $row) {
                $splittedUploadName = explode('.', $row['UploadName']);
                $tableName = $splittedUploadName[0];
                $columnName = $splittedUploadName[1];
                $sortData[$tableName][$columnName] = $row['DefaultValue'];
            }
        }

        if (count($filterData) > 0) {
            $where = 'WHERE ';
        }
        if (count($sortData) > 0) {
            //$sort = 'ORDER BY ';
        }

        $first = true;
        foreach ($filterData as $tableName => $columns) {
            if ($tableName !== $mainTable) {
                $newPathIds = $findRelationship->findPath($mainTable, $tableName);
                $pathIds = array_unique(array_merge($pathIds, $newPathIds));
            }

            foreach ($columns as $column => $valueObject) {
                if ($first) {
                    $first = false;
                } else {
                    $where .= " && ";
                }

                $value = $valueObject['Value'];
                $type = $valueObject['Type'];
                if (($type === 'S' || $type === 'SN' || $type === 'SO' || $type === 'SP')
                    && !($value === '' || $value === null)
                ) {
                    $where .= "$tableName.$column='$value'";
                } else {
                    $where .= "$tableName.$column LIKE '%$value%'";
                }
            }
        }

        foreach ($sortData as $tableName => $columns) {
            if ($tableName !== $mainTable) {
                $newPathIds = $findRelationship->findPath($mainTable, $tableName);
                $pathIds = array_unique(array_merge($pathIds, $newPathIds));
            }
        }

        $selectValues = '';
        $innnerJoin = '';
        $first = true;
        foreach ($structure as $object) {
            $tableName = $object['TableName'];
            $columnName = $object['ColumnName'];
            $number = $object['Number'];

            if ($first) {
                $first = false;
            } else {
                $selectValues .= ", ";
            }
            $selectValues .= "$tableName.$columnName AS '$number'";

            if ($tableName !== $mainTable) {
                $newPathIds = $findRelationship->findPath($mainTable, $tableName);
                $pathIds = array_unique(array_merge($pathIds, $newPathIds));
            }
        }

        $relationships = $findRelationship->getFullRelationship($pathIds);
        foreach ($relationships as $relationship) {
            $innnerJoin .= ' INNER JOIN ';
            if ($relationship['TABLE_NAME'] === $mainTable) {
                $innnerJoin .= $relationship['REFERENCED_TABLE_NAME'] . ' ON ';
            } else {
                $innnerJoin .= $relationship['TABLE_NAME'] . ' ON ';
            }
            $innnerJoin .= $relationship['COLUMN_NAME'] . '=' . $relationship['REFERENCED_COLUMN_NAME'];
        }

        $queryString = "SELECT $selectValues FROM $mainTable $innnerJoin $where $sort LIMIT 20";
        $result = $this->pdo->query($queryString)->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    function getFilterAndSort()
    {
        /** Includes */
        //ModuleMetadata
        require_once('ModuleMetadata.php');

        $fUserModuleId = ModuleMetadata::$fUserModuleId;
        //Filter plugin ID
        $cPluginFK = '3';

        $queryString = "SELECT f_plugin_form_inputs.Number AS 'FilterOrSort', 
                            f_form_inputs.Number, f_form_inputs.UploadName,
                            f_form_inputs.Type, f_form_inputs.DefaultValue
                        FROM f_module_plugins 
                        INNER JOIN f_plugin_form_inputs ON FModulePluginId=FModulePluginFK
                        INNER JOIN f_form_inputs ON FPluginFormInputFK=FPluginFormInputId
                        WHERE FUserModuleFK='$fUserModuleId' && CPluginFK=$cPluginFK 
                        ORDER BY f_plugin_form_inputs.Number ASC, f_form_inputs.Number ASC;";
        return $this->pdo->query($queryString)->fetchAll(PDO::FETCH_ASSOC);
    }

    function ifNull($varible)
    {
        if ($varible === null) {
            return   " IS NULL";
        } else {
            return "='$varible'";
        }
    }
}
