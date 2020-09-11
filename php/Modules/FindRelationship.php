<?php

/**
 * Find relationship
 */
class FindRelationship
{
    function __construct()
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        $this->relationships = $this->getRelationships();
    }

    function getRelationships()
    {
        $finalSQL = 'SELECT (@row_number:=@row_number + 1) AS RelationshipId,  TABLE_NAME, COLUMN_NAME, 
                            REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
                        FROM information_schema.KEY_COLUMN_USAGE, (SELECT @row_number:=-1) AS t
                        WHERE CONSTRAINT_SCHEMA="ssbsyste_ssbs" AND TABLE_SCHEMA="ssbsyste_ssbs" 
                            AND REFERENCED_TABLE_SCHEMA="ssbsyste_ssbs"';
        return $this->pdo->query($finalSQL)->fetchAll(PDO::FETCH_ASSOC);;
    }

    public function findPath($sourceTable, $targetTable)
    {
        $relationships = $this->relationships;

        $currentTables = [];
        $newCurrentTable = array(
            'path' => array(),
            'table' => $sourceTable
        );
        $currentTables[] = $newCurrentTable;

        $finalPath = array();
        $isFinish = false;
        for ($i = 0; $i < count($relationships); $i++) {
            $newCurrentTables = [];

            foreach ($relationships as $relationship) {
                foreach ($currentTables as $currentTable) {
                    $currentPath = $currentTable['path'];
                    $currentPath[] = $relationship['RelationshipId'];

                    if (($relationship['TABLE_NAME'] === $targetTable &&
                            $currentTable['table']  === $relationship['REFERENCED_TABLE_NAME']) ||
                        ($relationship['REFERENCED_TABLE_NAME'] === $targetTable &&
                            $currentTable['table'] === $relationship['TABLE_NAME'])
                    ) {
                        $finalPath = $currentPath;
                        $isFinish = true;
                        break 3;
                    } else if (
                        $currentTable['table']  === $relationship['TABLE_NAME']
                    ) {
                        $newCurrentTable = array(
                            'path' => $currentPath,
                            'table' => $relationship['REFERENCED_TABLE_NAME']
                        );
                        $newCurrentTables[] = $newCurrentTable;
                    } else if (
                        $currentTable['table']  === $relationship['REFERENCED_TABLE_NAME']
                    ) {
                        $newCurrentTable = array(
                            'path' => $currentPath,
                            'table' => $relationship['TABLE_NAME']
                        );
                        $newCurrentTables[] = $newCurrentTable;
                    }
                }
            }

            $currentTables = $newCurrentTables;
        }

        if ($isFinish) {
            return $finalPath;
        } else {
            return '';
        }
    }

    public function getFullRelationship($finalPath)
    {
        $relationships = $this->relationships;
        $mainData = array();

        foreach ($finalPath as $index) {
            $mainData[] = $relationships[$index];
        }

        return $mainData;
    }
}

/** Example **/
/*
$findRelatioinship = new FindRelationship();
$finalPath = $findRelatioinship->findPath('t_103', 't_110');
$mainData = $findRelatioinship->getFullRelationship($finalPath);
print_r(json_encode($mainData));
*/
