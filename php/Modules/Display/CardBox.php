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
            "SELECT * FROM f_plugin_cards 
             WHERE FModulePluginFK" . $this->switchPlugin->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->switchPlugin->ifNull($fPluginPluginFK)
                . " && fCustomPluginFK" . $this->switchPlugin->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginCards as $fPluginCard) {
            $main_data['FPluginCardId'][$fPluginCard['Number']] = $fPluginCard['FPluginCardId'];
            $main_data['CCardId'][$fPluginCard['Number']] = $fPluginCard['CCardFK'];
        }

        return $main_data;
    }
}
