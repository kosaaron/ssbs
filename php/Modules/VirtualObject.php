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
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        $vOQuery = $this->pdo->query('SELECT * FROM virtual_objects WHERE VirtualObjectId="' . $vOId . '"')->fetchAll(PDO::FETCH_ASSOC);
        $this->mainData['Card'] = $vOQuery[0]['Card'];
        $this->mainData['NameAlias'] = $vOQuery[0]['ObjNameAlias'];
        $this->queryString = $vOQuery[0]['QueryString'];
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
        $this->mainData['Data'] = $queryResult;
        return $this->mainData;
    }

    public function GetNameAlias()
    {
        return $this->mainData['NameAlias'];
    }
}
