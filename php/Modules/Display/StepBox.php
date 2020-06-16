<?php

/**
 * Step box
 */
class StepBox
{
    function __construct()
    {
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }

    public function createData($fModulePluginFK, $fPluginPluginFK)
    {
        /** Includes */
        //GetData
        require_once('Modules/GetData.php');
        $getData = new GetData('ManualFiltering', false);

        $main_data = array();
        $main_data = $getData->Create($fModulePluginFK, $fPluginPluginFK);

        return $main_data;
    }
}
