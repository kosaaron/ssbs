<?php

/**
 * Card box
 */
class CardBox
{
    function __construct()
    {
        /** Includes */
        //PDO connection
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
        //SwitchPlugin
        require_once('Modules/SwitchPlugin.php');
        $this->switchPlugin = new SwitchPlugin();
    }

    public function createData($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        /** Includes */
        //GetData
        require_once('Modules/GetData.php');
        $getData = new GetData('AutoFiltering', false);


        $main_data = array();
        $main_data = $getData->Create($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable);

        //Get card design for CardBox
        $fPluginCards = $this->pdo->query(
            "SELECT 
                c_104_fk,
                c_108_fk,
                c_101_fk,
                c_1_fk,
                c_105_id,
                c_63 AS 'Number'
             FROM t_105 
             WHERE c_104_fk" . $this->switchPlugin->ifNull($fModulePluginFK)
                . " && c_108_fk" . $this->switchPlugin->ifNull($fPluginPluginFK)
                . " && c_101_fk" . $this->switchPlugin->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginCards as $fPluginCard) {
            $main_data['FPluginCardId'][$fPluginCard['Number']] = $fPluginCard['c_105_id'];
            $main_data['CCardId'][$fPluginCard['Number']] = $fPluginCard['c_1_fk'];
        }

        return $main_data;
    }
}
