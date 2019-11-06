<?php

class VirtualObject
{
    //Public varibles
    public $oNameAlias;

    //Local varibles
    private $pdo;
    private $vOSelectString;
    private $vOWhereString;


    function __construct($vOId)
    {
        $this->main_data = array();

        /** Includes */
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        $vOQuery = $this->pdo->query('SELECT * FROM virtual_objects WHERE VirtualObjectId="' . $vOId . '"')->fetchAll(PDO::FETCH_ASSOC);
        $this->oNameAlias = $vOQuery[0]['ObjNameAlias'];
        $this->vOSelectString = $vOQuery[0]['SelectString'];
        $this->vOWhereString = $vOQuery[0]['WhereString'];
    }

    public function CreateVO($selectArr, $whereArr)
    {
        $vOSelectString = $this->vOSelectString;
        $vOWhereString = $this->vOWhereString;

        foreach ($selectArr as $key => $value) {
            $vOSelectString = str_replace('<' . $key . '>', $value, $this->vOSelectString);
        }

        foreach ($whereArr as $key => $value) {
            $vOWhereString = str_replace('<' . $key . '>', $value, $this->vOWhereString);
        }

        $queryResult = $this->pdo->query($vOSelectString . ' WHERE ' . $vOWhereString)->fetchAll(PDO::FETCH_ASSOC);
        $mainData = array();
        $mainData['NameAlias'] = $this->oNameAlias;
        $mainData['Data'] = $queryResult;
        return $mainData;
    }

    public function GeneratingToArray($mainData)
    {

        foreach ($mainData as $key => $value) { }


        return;
    }
}
