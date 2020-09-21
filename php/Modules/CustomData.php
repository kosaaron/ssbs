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
            "SELECT 
                c_4_fk,
                c_5_fk,
                c_31 AS TName,
                c_51 AS TableName,
                c_52 AS TableIdName,
                c_101_id,
                c_56 AS Place,
                c_57 AS 'Number',
                c_58 AS Privilege
             FROM t_101 
             INNER JOIN t_5
             ON c_5_fk=c_5_id
             WHERE c_56='$place';"
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($costumPlugins as $costumPlugin) {
            $fPlugin = array();
            $fPlugin['Number'] = $costumPlugin['Number'];
            $fPlugin['CPluginFK'] = $costumPlugin['c_4_fk'];
            $fPlugin['TableName'] = $costumPlugin['TableName'];
            $fPlugin['FCustomPluginId'] = $costumPlugin['c_101_id'];

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
