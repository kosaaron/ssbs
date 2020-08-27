<?php

/**
 * Get custom data
 */
class CustomData
{
    public function GetData($data)
    {
        //PDO Connect
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;
        //Switch plugin
        require_once('SwitchPlugin.php');
        $switchPlugin = new SwitchPlugin();

        $main_data = array();

        $place = $data['Place'];
        //Result form structure
        $costumPlugins = $pdo->query(
            "SELECT * FROM f_custom_plugins WHERE Place='$place';"
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($costumPlugins as $costumPlugin) {
            $fPlugin = array();
            $fPlugin['Number'] = $costumPlugin['Number'];
            $fPlugin['CPluginFK'] = $costumPlugin['CPluginFK'];
            $fPlugin['TableName'] = $costumPlugin['TableName'];
            $fPlugin['FCustomPluginId'] = $costumPlugin['FCustomPluginId'];

            ModuleMetadata::$mainTable = $fPlugin['TableName'];
            ModuleMetadata::$disableFormFill = true;

            $main_data[$costumPlugin['Number']] = $switchPlugin->switch($fPlugin, 'CP');
        }

        return $main_data;
    }
/*
    function switchObject($objectName, $costumPlugins)
    {
        switch ($objectName) {
            case 'AddPlugin':
                //Switch plugin
                require_once('Objects/AddPlugin.php');
                $addPlugin = new AddPlugin();
                $addPlugin->Create($costumPlugins);
                break;
            default:
                # code...
                break;
        }
    }*/
}
