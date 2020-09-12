<?php

class ModuleData
{
    /**
     * Post varibles
     */
    // {String} userId - User ID
    public $userId;
    // {JSON} main_data - Main data
    public $main_data;

    /**
     * Local varibles
     */
    // {String} fUserModuleId
    public $fUserModuleId;

    /**
     * Construct
     * @param string $userId User ID
     * @param string $cModuleId Module ID (frame)
     */
    function __construct($userId, $cModuleId)
    {
        /** Includes */
        //Switch plugin
        require_once('SwitchPlugin.php');
        $this->switchPlugin = new SwitchPlugin();

        //PDO connection
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        //Module metadata
        require_once('ModuleMetadata.php');
        $moduleMetadata = new ModuleMetadata();

        /** Varibles definition */
        $this->userId = $userId;
        $this->main_data = array();

        /** Create frame data object */
        $this->fUserModuleId = $this->getFUserModuleId(
            $userId,
            $cModuleId
        );

        $moduleMetadata->setDefaultData($userId, $cModuleId, $this->fUserModuleId);
    }

    function createData()
    {
        $fModulePlugins = $this->getFModulePlugins($this->fUserModuleId);
        $this->main_data = $this->createModuleData($fModulePlugins);
    }

    function createDataMP($fModulePluginId)
    {
        $fModulePlugin = $this->getFModulePluginById($fModulePluginId);
        $this->main_data[] = $this->switchPlugin->switch(
            $fModulePlugin,
            'MP'
        );
    }

    function createDataPP($fPluginPluginId)
    {
        $fPluginPlugin = $this->getFPluginPluginById($fPluginPluginId);
        $this->main_data[] = $this->switchPlugin->switch(
            $fPluginPlugin,
            'PP'
        );
    }

    /** getFUserModuleId */
    function getFUserModuleId($userId, $cModuleId)
    {
        $fUserModule = $this->pdo->query(
            "SELECT * FROM t_110 WHERE c_200_fk='$userId' && c_3_fk='$cModuleId' ORDER BY t_110.Number"
        )->fetch(PDO::FETCH_ASSOC);

        return $fUserModule['c_110_id'];
    }

    /**
     * getFModulePlugins
     * @param string $fUserModuleId User module ID (frame)
     */
    function getFModulePlugins($fUserModuleId)
    {
        $modulePlugins = $this->pdo->query(
            "SELECT t_104.*, TableName FROM t_104 
             LEFT JOIN t_5 on c_5_id=c_5_fk 
             WHERE c_110_fk='$fUserModuleId' && DefaultScreen='1' 
             ORDER BY t_104.Number ASC"
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($modulePlugins as $key => $modulePlugin) {
            $modulePlugin['FModulePluginId'] = $modulePlugin['c_104_id'];
            $modulePlugin['CTableId'] = $modulePlugin['c_5_fk'];
            $modulePlugin['CPluginFK'] = $modulePlugin['c_4_fk'];
            unset($modulePlugin['c_104_id']);
            unset($modulePlugin['c_5_fk']);
            unset($modulePlugin['c_4_fk']);

            $modulePlugins[$key] = $modulePlugin;
        }

        return $modulePlugins;
    }

    /**
     * getFModulePluginById
     * @param string $fModulePluginId Module's plugin ID (frame)
     */
    function getFModulePluginById($fModulePluginId)
    {
        return $this->pdo->query(
            "SELECT t_104.*, TableName FROM t_104 
             LEFT JOIN t_5 on c_5_id=c_5_fk 
             WHERE c_104_id='$fModulePluginId'"
        )->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * getFPluginPluginById
     * @param string $fPluginPluginId Plugin ID (frame)
     */
    function getFPluginPluginById($fPluginPluginId)
    {
        return $this->pdo->query(
            "SELECT t_108.*, TableName FROM t_108 
             LEFT JOIN t_5 on c_5_id=c_5_fk 
             WHERE c_108_id='$fPluginPluginId'"
        )->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * createModuleData
     * @param json $fModulePlugins
     * @return null
     */
    function createModuleData($fModulePlugins)
    {
        $moduleData = array();

        foreach ($fModulePlugins as $fModulePlugin) {
            $moduleData[] = $this->switchPlugin->switch(
                $fModulePlugin,
                'MP'
            );
        }

        return $moduleData;
    }
}