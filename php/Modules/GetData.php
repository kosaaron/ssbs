<?php

/**
 * Get data
 */
class GetData
{
    /**
     * Get data
     */
    function __construct($filteringType, $oneItem = false)
    {
        //PDO connection
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
        //Switch plugin
        require_once('SwitchPlugin.php');
        $this->switchPlugin = new SwitchPlugin();
        //FindRelationship
        require_once('FindRelationship.php');
        $this->findRelationship = new FindRelationship();

        $this->filteringType = $filteringType;
        $this->oneItem = $oneItem;
    }

    /**
     * Create data
     * {string} fModulePluginFK
     * {string} fPluginPluginFK
     * {string} pluginTable
     */
    function Create($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        $main_data = array();

        $fPluginDisplays = $this->pdo->query(
            "SELECT 
                c_104_fk,
                c_108_fk,
                c_101_fk,
                c_106_id,
                c_64 AS Title,
                c_65 AS 'Number'
             FROM t_106 
             WHERE c_104_fk" . $this->switchPlugin->ifNull($fModulePluginFK)
                . " && c_108_fk" . $this->switchPlugin->ifNull($fPluginPluginFK)
                . " && c_101_fk" . $this->switchPlugin->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginDisplays as $fPluginDisplay) {
            $fPluginDisplayId = $fPluginDisplay['c_106_id'];
            $number = $fPluginDisplay['Number'];

            $main_data[$number]['Title'] = $fPluginDisplay['Title'];
            $main_data[$number]['FPluginDisplayId'] = $fPluginDisplay['c_106_id'];
            $main_data[$number]['Display'] = $this->getDisplayColumns($fPluginDisplayId, $pluginTable);
        }
        //Children
        $main_data['Children'] = $this->switchPlugin->checkChild(
            $fModulePluginFK,
            $fPluginPluginFK,
            '1'
        );
        return $main_data;
    }

    function getDisplayColumns($fPluginDisplayId, $pluginTable, $isFormInputs = false)
    {
        /** Includes */
        //IsSelectItem
        require_once('IsSelectItem.php');
        //ModuleMetadata
        require_once('ModuleMetadata.php');

        $cModuleId = ModuleMetadata::$cModuleId;
        $uplodedData = ModuleMetadata::$uplodedData;
        $isSelectItem = new IsSelectItem();

        /** Global varibles */
        //No gobal varibles

        /** Create displayed column structure */
        $result = array();

        if ($isFormInputs) {
            $fDisplays = $this->pdo->query(
                "SELECT 
                    c_107_fk,
                    c_5_fk,
                    c_31 AS TName,
                    c_51 AS TableName,
                    c_52 AS TableIdName,
                    c_7_fk,
                    c_33 AS 'Name',
                    c_54 AS ColumnName,
                    c_103_id,
                    c_32 AS 'Number',
                    c_61 AS 'Type',
                    c_35 AS 'DefaultValue',
                    c_36 AS 'UploadName',
                    c_37 AS 'Required',
                    c_38 AS 'Visible',
                    c_62 AS 'Upload'
                 FROM t_103 
                 INNER JOIN t_7 ON c_7_id=c_7_fk
                 INNER JOIN t_5 ON c_5_id=c_5_fk 
                 WHERE c_107_fk" . $this->switchPlugin->ifNull($fPluginDisplayId)
            )->fetchAll(PDO::FETCH_ASSOC);

            foreach ($fDisplays as $fDKey => $fDValue) {
                $fDValue['CTableFK'] = $fDValue['c_7_fk'];
                $fDValue['FColumnFK'] = $fDValue['c_5_fk'];
                $fDisplays[$fDKey] = $fDValue;

                if ($isSelectItem->Decide($fDValue['Type'])) {
                    $fDisplays[$fDKey]['ColumnName'] = $fDValue['TableIdName'];
                }
            }
        } else {
            //Get display columns metadata
            $fDisplays = $this->pdo->query(
                "SELECT 
                    c_106_fk,
                    c_5_fk,
                    c_31 AS TName,
                    c_51 AS TableName,
                    c_52 AS TableIdName,
                    c_7_fk,
                    c_33 AS 'Name',
                    c_54 AS ColumnName,
                    c_60 AS 'Number'
                 FROM t_102 
                 INNER JOIN t_7 ON c_7_id=c_7_fk
                 INNER JOIN t_5 ON c_5_id=c_5_fk 
                 WHERE c_106_fk" . $this->switchPlugin->ifNull($fPluginDisplayId)
            )->fetchAll(PDO::FETCH_ASSOC);

            foreach ($fDisplays as $fDKey => $fDValue) {
                $fDValue['CTableFK'] = $fDValue['c_7_fk'];
                $fDValue['FColumnFK'] = $fDValue['c_5_fk'];
                $fDisplays[$fDKey] = $fDValue;
            }
        }

        //Get main table
        if (isset(ModuleMetadata::$mainTable)) {
            $mainTable = ModuleMetadata::$mainTable;
        } else {
            $cModule = $this->pdo->query(
                "SELECT 
                    c_3_id,
                    c_24 AS ModuleName, 
                    c_49 AS ModuleDescription,
                    c_5_fk,
                    c_31 AS TName,
                    c_51 AS TableName,
                    c_52 AS TableIdName
                 FROM t_3 
                 INNER JOIN t_5 ON c_5_id=c_5_fk 
                 WHERE c_3_id" . $this->switchPlugin->ifNull($cModuleId)
            )->fetch(PDO::FETCH_ASSOC);
            $mainTable = $cModule['TableName'];
        }

        //Get main table primary key
        $tableIdQueary = $this->pdo->prepare("SHOW KEYS FROM $mainTable WHERE Key_name = 'PRIMARY'");
        $tableIdQueary->execute();
        $tableIdArr = $tableIdQueary->fetchAll();
        $tableIdColumn = $tableIdArr[0]['Column_name'];

        //Structure of displayed columns
        $structure = array();

        //First is primary key column
        $column = array();

        //Get plugin table primary key
        $pTableIdQueary = $this->pdo->prepare("SHOW KEYS FROM $pluginTable WHERE Key_name = 'PRIMARY'");
        $pTableIdQueary->execute();
        $pTableIdArr = $pTableIdQueary->fetchAll();
        $pTableIdColumn = $pTableIdArr[0]['Column_name'];

        $column['Number'] = '1';
        $column['Name'] = 'TableId';
        $column['TableName'] = $pluginTable;
        $column['ColumnName'] = $pTableIdColumn;
        $column['CModuleId'] = $cModuleId;
        $structure[] = $column;

        //Get more columns
        foreach ($fDisplays as $fDisplay) {
            $column = array();
            $column['Number'] = $fDisplay['Number'];
            $column['Name'] = $fDisplay['Name'];
            $column['TableName'] = $fDisplay['TableName'];
            $column['ColumnName'] = $fDisplay['ColumnName'];
            $column['CModuleId'] = $cModuleId;
            $structure[] = $column;
        }

        $result['Data'] = $this->getDataByStructure($structure, $mainTable, $tableIdColumn, $uplodedData, $pluginTable);
        $result['Structure'] = $structure;

        return $result;
    }

    function getDataByStructure($structure, $mainTable, $tableIdColumn, $uplodedData, $pluginTable)
    {
        $result = array();
        $pathIds = array();
        $where = "";
        $sort = "";
        $limit = "LIMIT 21";

        if (array_key_exists('LimiterData', $uplodedData)) {
            $limiterData = $uplodedData['LimiterData'];
            $offset = $limiterData['Offset'];
            $limitValue = $limiterData['Limit'];
            $limit = "LIMIT $offset, $limitValue";
        }

        if ($this->filteringType === 'AutoFiltering') {
            $filterAndSort = $this->getFilterAndSort($uplodedData, $mainTable);
            $pathIds = $filterAndSort['PathIds'];
            $where = $filterAndSort['Where'];
            $sort = $filterAndSort['Sort'];
        } else if ($this->filteringType === 'ManualFiltering') {
            if (array_key_exists("IdOfData", $uplodedData)) {
                $idOfData = $uplodedData['IdOfData'];
                $where = "WHERE $tableIdColumn='$idOfData'";
            } else {
                $filterAndSort = $this->getFilterAndSort($uplodedData, $mainTable);
                $pathIds = $filterAndSort['PathIds'];
                $where = $filterAndSort['Where'];
                $sort = $filterAndSort['Sort'];
            }
        }

        if ($this->oneItem) {
            $limit = "LIMIT 1";
        }

        if ($sort === "") {
            $sort = "ORDER BY $tableIdColumn DESC";
        }

        //Plugin table is the relative table in query
        $realtiveTable = $pluginTable;

        if ($realtiveTable !== $mainTable) {
            $subqueryQuery = $this->getQueryString(
                $pathIds,
                $mainTable,
                $tableIdColumn,
                $where,
                $sort,
                $limit
            );

            $subqueryQueryResult = $this->pdo->query($subqueryQuery)->fetch(PDO::FETCH_ASSOC);
            $mainId = $subqueryQueryResult[$tableIdColumn];

            $pathIds = $this->findRelationship->findPath($mainTable, $realtiveTable);

            $result = array();
            $where = "WHERE $tableIdColumn = $mainId";
            $sort = "";
        }

        $selectValues = '';
        $connectedTables = array();
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

            if ($realtiveTable !== $tableName) {
                //Is the table alraedy declared
                $isNew = true;
                foreach ($connectedTables as $connectedTable => $connectedTableData) {
                    if ($connectedTable === $tableName) {
                        $isNew = false;
                        break;
                    }
                }

                if ($isNew) {
                    //Get id column of the foreign table
                    $ctTableIdQueary = $this->pdo->prepare("SHOW KEYS FROM $tableName WHERE Key_name = 'PRIMARY'");
                    $ctTableIdQueary->execute();
                    $ctTableIdArr = $ctTableIdQueary->fetch();
                    $ctTableIdColumn = $ctTableIdArr['Column_name'];

                    $selectValues .= "$tableName.$ctTableIdColumn AS '$tableName', ";
                }

                $connectedTables[$tableName][$number] = 'null';
            }

            $selectValues .= "$tableName.$columnName AS '$number'";

            if ($tableName !== $realtiveTable) {
                $newPathIds = $this->findRelationship->findPath($realtiveTable, $tableName);
                $pathIds = array_unique(array_merge($pathIds, $newPathIds));
            }
        }

        $relationships = $this->findRelationship->getFullRelationship($pathIds);

        //Processes the database connections
        foreach ($relationships as $key => $relationship) {
            $innnerJoin .= ' LEFT JOIN ';

            //start
            if ($relationship['TABLE_NAME'] === $realtiveTable) {
                $innnerJoin .= $relationship['REFERENCED_TABLE_NAME'] . ' ON ';
            } else if ($relationship['REFERENCED_TABLE_NAME'] === $realtiveTable) {
                $innnerJoin .= $relationship['TABLE_NAME'] . ' ON ';
            } else if ($key !== 0) {
                //middle
                if (
                    $relationship['TABLE_NAME'] === $relationships[$key - 1]['REFERENCED_TABLE_NAME']
                    || $relationship['TABLE_NAME'] === $relationships[$key - 1]['TABLE_NAME']
                ) {
                    $innnerJoin .= $relationship['REFERENCED_TABLE_NAME'] . ' ON ';
                } else if (
                    $relationship['REFERENCED_TABLE_NAME'] === $relationships[$key - 1]['TABLE_NAME']
                    || $relationship['REFERENCED_TABLE_NAME'] === $relationships[$key - 1]['REFERENCED_TABLE_NAME']
                ) {
                    $innnerJoin .= $relationship['TABLE_NAME'] . ' ON ';
                }
            }

            $innnerJoin .= $relationship['TABLE_NAME'] . '.' . $relationship['COLUMN_NAME'] . '='
                . $relationship['REFERENCED_TABLE_NAME'] . '.' . $relationship['REFERENCED_COLUMN_NAME'];
        }

        //Select data
        $queryString = "SELECT $selectValues FROM $realtiveTable $innnerJoin $where $sort $limit;";
        $result = $this->pdo->query($queryString)->fetchAll(PDO::FETCH_ASSOC);

        //Restructure the data
        foreach ($result as $key => $row) {
            $nRow = $row;
            foreach ($connectedTables as $table => $ctObject) {
                $nRow[$table] = array();
                $nRow[$table]['1'] = $row[$table];

                foreach ($ctObject as $number => $value) {
                    $nRow[$table][$number] = $row[$number];

                    unset($nRow[$number]);
                }
            }

            $result[$key] = $nRow;
        }

        return $result;
    }

    function getQueryString($pathIds, $realtiveTable, $selectValues, $where = '', $sort = '', $limit = '')
    {
        $innnerJoin = '';
        $relationships = $this->findRelationship->getFullRelationship($pathIds);
        foreach ($relationships as $relationship) {
            $innnerJoin .= ' LEFT JOIN ';
            if ($relationship['TABLE_NAME'] === $realtiveTable) {
                $innnerJoin .= $relationship['REFERENCED_TABLE_NAME'] . ' ON ';
            } else {
                $innnerJoin .= $relationship['TABLE_NAME'] . ' ON ';
            }
            $innnerJoin .= $relationship['COLUMN_NAME'] . '=' . $relationship['REFERENCED_COLUMN_NAME'];
        }

        return "SELECT $selectValues FROM $realtiveTable $innnerJoin $where $sort $limit";
    }

    function getFilterAndSort($uplodedData, $mainTable)
    {
        $pathIds = array();
        $filterAndSortObject = array();
        $filterData = array();
        $sortData = array();
        $where = '';
        $sort = '';

        $isFilter = false;
        if (array_key_exists("FilterData", $uplodedData)) {
            $uplodedFilter = $uplodedData['FilterData'];
            $isFilter = true;
        }

        $filterAndSortObject = $this->getFilterAndSortObject();
        foreach ($filterAndSortObject as $key => $row) {
            if ($row['FilterOrSort'] === '2') {
                break;
            }

            $splittedUploadName = explode('.', $row['UploadName']);
            $tableName = $splittedUploadName[0];
            $columnName = $splittedUploadName[1];

            $filterValue = $row['DefaultValue'];

            if ($isFilter) {
                $filterValue = $uplodedFilter[$tableName][$columnName];
            }

            if ($filterValue !== 'null' && $filterValue !== null) {
                $filterData[$tableName][$columnName]['Value'] = $filterValue;
                $filterData[$tableName][$columnName]['Type'] = $row['Type'];
            }

            unset($filterAndSortObject[$key]);
        }


        if (array_key_exists("SortData", $uplodedData)) {
            $sortData = $uplodedData['SortData'];
        } else {
            $sortData = [];
            foreach ($filterAndSortObject as $key => $row) {
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
            $sort = 'ORDER BY ';
        }

        $first = true;
        foreach ($filterData as $tableName => $columns) {
            if ($tableName !== $mainTable) {
                $newPathIds = $this->findRelationship->findPath($mainTable, $tableName);
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

        $first = true;
        foreach ($sortData as $tableName => $columns) {
            if ($tableName !== $mainTable) {
                $newPathIds = $this->findRelationship->findPath($mainTable, $tableName);
                $pathIds = array_unique(array_merge($pathIds, $newPathIds));
            }

            foreach ($columns as $column => $value) {
                if ($first) {
                    $first = false;
                } else {
                    $sort .= " , ";
                }

                if ($value === '0') {
                    $sort .= "$tableName.$column DESC";
                } elseif ($value === '1') {
                    $sort .= "$tableName.$column ASC";
                }
            }
        }

        if ($sort === 'ORDER BY ') {
            $sort = '';
        }

        $result['Sort'] = $sort;
        $result['Where'] = $where;
        $result['PathIds'] = $pathIds;
        return $result;
    }

    function getFilterAndSortObject()
    {
        /** Includes */
        //ModuleMetadata
        require_once('ModuleMetadata.php');

        $fUserModuleId = ModuleMetadata::$fUserModuleId;
        //Filter plugin ID
        $cPluginFK = '3';

        $queryString = "SELECT 
                            t_104.c_4_fk,
                            t_104.c_5_fk,
                            t_104.c_110_fk,
                            t_103.c_107_fk,
                            t_107.c_67 AS 'FilterOrSort', 
                            c_32 AS 'Number',
                            c_61 AS 'Type',
                            c_35 AS 'DefaultValue',
                            c_36 AS 'UploadName',
                            c_104_id,
                            c_28 AS 'Number',
                            c_27 AS Place,
                            c_29 AS 'DefaultScreen'
                        FROM t_104 
                        INNER JOIN t_107 ON c_104_id=c_104_fk
                        INNER JOIN t_103 ON c_107_fk=c_107_id
                        WHERE c_110_fk='$fUserModuleId' && c_4_fk=$cPluginFK 
                        ORDER BY t_107.c_67 ASC, t_103.c_32 ASC;";
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
