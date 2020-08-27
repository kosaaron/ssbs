<?php

/**
 * AddPlugin
 */
class AddPlugin
{
    public function Create($costumPlugins)
    {
        $main_data = array();

        foreach ($costumPlugins as $costumPlugin) {
            $fPlugin = array();
            $fPlugin['Number'] = $costumPlugin['Number'];
            $fPlugin['CPluginFK'] = $costumPlugin['CPluginFK'];
            $fPlugin['TableName'] = $costumPlugin['TableName'];
            $fPlugin['FCustomPluginId'] = $costumPlugin['FCustomPluginId'];

            ModuleMetadata::$mainTable = $fPlugin['TableName'];
            ModuleMetadata::$disableFormFill = true;

            //$main_data[$costumPlugin['Number']] = $switchPlugin->switch($fPlugin, 'CP');
        }

        return $main_data;
    }

    function switchObject($object, $costumPlugins)
    {
        switch ($object) {
            case 'AddPlugin':
                
                break;
            default:
                # code...
                break;
        }
    }
}
