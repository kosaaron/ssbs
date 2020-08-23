<?php

/**
 * Connected object
 */
class ConnectedObject
{
    function __construct()
    {
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }

    public function createData($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        /** Includes */
        //GetData
        require_once('Modules/GetData.php');
        $getData = new GetData('ManualFiltering', false);

        $main_data = array();
        $main_data = $getData->Create($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable);

        return $main_data;
    }
}
