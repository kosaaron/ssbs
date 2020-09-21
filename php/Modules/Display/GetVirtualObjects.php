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
            "SELECT
                c_104_fk,
                c_108_fk,
                c_101_fk,
                c_111_fk,
                c_71 AS 'Number'
             FROM t_109 
             WHERE c_104_fk" . $this->switchPlugin->ifNull($fModulePluginFK)
                . " && c_108_fk" . $this->switchPlugin->ifNull($fPluginPluginFK)
                . " && c_101_fk" . $this->switchPlugin->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        $mainData = array();

        $uploadedVOData = ModuleMetadata::$uplodedData['VO'];

        foreach ($fPluginVOs as $fPluginVO) {
            $fVirtualObjectId = $fPluginVO['c_111_fk'];

            $virtualObject = new VirtualObject($fVirtualObjectId);
            $mainData[$fPluginVO['Number']]['VO'] = $virtualObject->CreateVO($uploadedVOData[$fPluginVO['Number']]);
        }

        $mainData['Children'] = $this->switchPlugin->checkChild(
            $fModulePluginFK,
            $fPluginPluginFK,
            '1'
        );

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
