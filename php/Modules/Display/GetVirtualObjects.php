<?php

/**
 * Get Virtual Objects
 */
class GetVirtualObjects
{
    function __construct()
    {
        /** Includes */
        //VirtualObject
        require_once('Modules/Objects/VirtualObject.php');
        //SwitchPlugin
        require_once('Modules/SwitchPlugin.php');
        $this->switchPlugin = new SwitchPlugin();
        //PDO connect
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }

    public function createData($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        //get dinamic form(s) of plugin
        $fPluginVOs = $this->pdo->query(
            "SELECT * FROM f_plugin_vo 
             WHERE FModulePluginFK" . $this->switchPlugin->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->switchPlugin->ifNull($fPluginPluginFK)
                . " && FCustomPluginFK" . $this->switchPlugin->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        $mainData = array();

        $uploadedVOData = ModuleMetadata::$uplodedData['VO'];

        foreach ($fPluginVOs as $fPluginVO) {
            $fVirtualObjectId = $fPluginVO['FVirtualObjectFK'];

            $virtualObject = new VirtualObject($fVirtualObjectId);
            $mainData['VO'] = $virtualObject->CreateVO($uploadedVOData[$fPluginVO['Number']]);

            $mainData['Children'] = $this->switchPlugin->checkChild(
                $fModulePluginFK,
                $fPluginPluginFK,
                '1'
            );
        }

        return $mainData;
    }
}
/**
 * {JSON} uploadedVOData
 * <Example>
 * {
 *      VO: {
 *          1: {
 *              testKey1: testValue1,
 *              testKey2: testValue2
 *              ...
 *          },
 *          ...
 *      }
 * }
 * </Example>
 */
