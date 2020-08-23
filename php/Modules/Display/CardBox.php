<?php

/**
 * Card box
 */
class CardBox
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
        $getData = new GetData('AutoFiltering', false);
        require_once('Modules/SwitchPlugin.php');
        $this->switchPlugin = new SwitchPlugin();

        $main_data = array();
        $main_data = $getData->Create($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable);

        //Get card design for CardBox
        $fPluginCards = $this->pdo->query(
            "SELECT * FROM f_plugin_cards 
             WHERE FModulePluginFK" . $this->switchPlugin->ifNull($fModulePluginFK)
               . " && FPluginPluginFK" . $this->switchPlugin->ifNull($fPluginPluginFK)
               . " && fCustomPluginFK" . $this->switchPlugin->ifNull($fCustomPluginId)
        )->fetch(PDO::FETCH_ASSOC);

        $main_data['CCardId'] = $fPluginCards['CCardFK'];

        return $main_data;
    }
}
