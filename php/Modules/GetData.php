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

            $main_data['Title'] = $fPluginDisplay['Title'];
            $main_data['Display'] = $this->getDisplayColumns($fPluginDisplayId);

            //Childs
            $dinamicForm['Childs'] = $this->switchPlugin->checkChild(
                $fModulePluginFK,
                $fPluginPluginFK,
                '1'
            );
        }

        return $main_data;
    }

    function getDisplayColumns($fPluginDisplayId)
    {
        $result = array();

        $fDisplays = $this->pdo->query(
            "SELECT * FROM f_display INNER JOIN f_columns ON FColumnId=FColumnFK"
                . " WHERE FPluginDisplayFK" . $this->switchPlugin->ifNull($fPluginDisplayId)
        )->fetchAll(PDO::FETCH_ASSOC);

        $structure = array();
        foreach ($fDisplays as $fDisplay) {
            $column = array();
            $column['Number'] = $fDisplay['Number'];
            $column['Name'] = $fDisplay['Name'];
            $column['TableName'] = $fDisplay['TableName'];
            $column['ColumnName'] = $fDisplay['ColumnName'];


            require_once('ModuleMetadata.php');
            $cModuleId = ModuleMetadata::$cModuleId;
            $column['cModuleId'] = $cModuleId;


            $structure[] = $column;
        }

        $result['Data'] = $this->getDataByStructure($structure);
        $result['Structure'] = $structure;

        return $result;
    }

    function getDataByStructure($structure)
    {
        /** Includes */
        //ModuleMetadata
        require_once('ModuleMetadata.php');
        //FindRelationship
        require_once('FindRelationship.php');
        $findRelationship = new FindRelationship();

        $result = array();

        $cModuleId = ModuleMetadata::$cModuleId;
        $cModule = $this->pdo->query(
            "SELECT * FROM c_modules WHERE CModuleId" . $this->switchPlugin->ifNull($cModuleId)
        )->fetch(PDO::FETCH_ASSOC);
        $mainTable = $cModule['MainTable'];

        $selectValues = '';
        $innnerJoin = '';
        $pathIds = array();
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

            $newPathIds =  array();
            if ($tableName !== $mainTable) {
                $relationshipPath = $findRelationship->findPath($mainTable, $tableName);

                foreach ($relationshipPath as $relationshipPathId) {
                    $newPath = true;
                    foreach ($pathIds as $pathId) {
                        if ($pathId === $relationshipPathId) {
                            $newPath = false;
                            break;
                        }
                    }

                    if ($newPath) {
                        $newPathIds[] = $relationshipPathId;
                    }
                }
                $pathIds = array_merge($pathIds, $newPathIds);
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

        $queryString = "SELECT $selectValues FROM $mainTable $innnerJoin LIMIT 20";
        $result = $this->pdo->query($queryString)->fetchAll(PDO::FETCH_ASSOC);

        return $result;
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
