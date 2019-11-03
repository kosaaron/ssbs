<?php

class VirtualObject
{
    //Local varibles
    public $main_data;
    private $vOName;
    private $vOSelectString;
    private $vOWhereString;

    function __construct($vOId)
    {
        $this->main_data = array();
        $this->pdo;

        /** Includes */
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        $vOQuery = $this->pdo->query('SELECT * FROM virtual_objects WHERE VirtualObjectId="' . $vOId . '"')->fetchAll(PDO::FETCH_ASSOC);
        $this->vOName = $vOQuery[0]['Name'];
        $this->vOSelectString = $vOQuery[0]['SelectString'];
        $this->vOWhereString = $vOQuery[0]['WhereString'];
    }

    public function CreateVO($selectArr, $whereArr)
    {
        foreach ($selectArr as $key => $value) {
            $this->vOSelectString = str_replace('<' . $key . '>', $value, $this->vOSelectString);
        }

        foreach ($whereArr as $key => $value) {
            $this->vOWhereString = str_replace('<' . $key . '>', $value, $this->vOWhereString);
        }

        $queryResult = $this->pdo->query($this->vOSelectString . ' WHERE ' . $this->vOWhereString)->fetchAll(PDO::FETCH_ASSOC);

        $this->main_data[$this->vOName] = $queryResult;
    }
}
