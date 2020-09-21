<?php
class VirtualObject
{
    //Public varibles
    public $mainData;

    //Local varibles
    private $pdo;
    private $queryString;

    /**
     * {String} vOId - ID of virtual object
     */
    function __construct($vOId)
    {
        $this->main_data = array();

        /** Includes */
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        $vOQuery = $this->pdo->query(
            "SELECT 
                c_111_id,
                c_73 AS QueryString
             FROM t_111 
             WHERE c_111_id=$vOId"
        )->fetch(PDO::FETCH_ASSOC);
        $this->queryString = $vOQuery['QueryString'];
    }

    /**
     * {JSON} vOParamArr
     * <Example>
     * [
     *    testKey1: testValue1,
     *    testKey2: testValue2
     *    ...
     * ]
     * </Example>
     */
    public function CreateVO($vOParamArr)
    {
        $queryString = $this->queryString;

        foreach ($vOParamArr as $key => $value) {
            $queryString = str_replace('<' . $key . '>', $value, $queryString);
        }

        $queryResult = $this->pdo->query($queryString)->fetchAll(PDO::FETCH_ASSOC);
        $this->mainData = $queryResult;
        return $this->mainData;
    }

    public function GetNameAlias()
    {
        return $this->mainData['NameAlias'];
    }
}
