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
    function __construct($userId, $cModuleId = null)
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
        if (isset($cModuleId)) {
            $this->fUserModuleId = $this->getFUserModuleId(
                $userId,
                $cModuleId
            );

            $moduleMetadata->setDefaultData($userId, $cModuleId, $this->fUserModuleId);
        }
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
            "SELECT 
                c_110_id,
                c_200_fk,
                c_6_fk,
                c_3_fk,
                c_72 AS 'Number'
             FROM t_110 WHERE c_200_fk='$userId' && c_3_fk='$cModuleId' ORDER BY t_110.c_72"
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
            "SELECT 
                c_104_id,
                t_104.c_4_fk,
                t_104.c_5_fk,
                t_104.c_110_fk,    
                c_28 AS 'Number',
                c_27 AS Place,
                c_29 AS 'DefaultScreen',
                c_51 AS TableName
             FROM t_104 
             LEFT JOIN t_5 on c_5_id=c_5_fk 
             WHERE c_110_fk='$fUserModuleId' && c_29='1' 
             ORDER BY t_104.c_28 ASC"
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
        $fModulePlugin = $this->pdo->query(
            "SELECT 
                c_104_id,
                t_104.c_4_fk,
                t_104.c_5_fk,
                t_104.c_110_fk,         
                c_28 AS 'Number',
                c_27 AS Place,
                c_29 AS 'DefaultScreen',
                c_51 AS TableName
             FROM t_104 
             LEFT JOIN t_5 on c_5_id=c_5_fk 
             WHERE c_104_id='$fModulePluginId'"
        )->fetch(PDO::FETCH_ASSOC);

        $fModulePlugin['FModulePluginId'] = $fModulePlugin['c_104_id'];
        $fModulePlugin['FUserModuleFK'] = $fModulePlugin['c_110_fk'];
        $fModulePlugin['CPluginFK'] = $fModulePlugin['c_4_fk'];
        $fModulePlugin['CTableFK'] = $fModulePlugin['c_5_fk'];
        
        unset($fModulePlugin['c_104_id']);
        unset($fModulePlugin['c_108_fk']);
        unset($fModulePlugin['c_4_fk']);
        unset($fModulePlugin['c_5_fk']);

        return $fModulePlugin;
    }

    /**
     * getFPluginPluginById
     * @param string $fPluginPluginId Plugin ID (frame)
     */
    function getFPluginPluginById($fPluginPluginId)
    {
        $fPluginPlugin = $this->pdo->query(
            "SELECT 
                c_104_fk, 
                c_108_fk, 
                c_4_fk, 
                c_5_fk, 
                c_108_id, 
                c_68 AS Place, 
                c_69 AS 'Number', 
                c_70 AS DefaultScreen, 
                c_51 AS TableName
             FROM t_108 
             LEFT JOIN t_5 on c_5_id=c_5_fk 
             WHERE c_108_id='$fPluginPluginId'"
        )->fetch(PDO::FETCH_ASSOC);

        $fPluginPlugin['FPluginPluginId'] = $fPluginPlugin['c_108_id'];
        $fPluginPlugin['FModulePluginFK'] = $fPluginPlugin['c_104_fk'];
        $fPluginPlugin['FPluginPluginFK'] = $fPluginPlugin['c_108_fk'];
        $fPluginPlugin['CPluginFK'] = $fPluginPlugin['c_4_fk'];
        $fPluginPlugin['CTableFK'] = $fPluginPlugin['c_5_fk'];

        unset($fPluginPlugin['c_108_id']);
        unset($fPluginPlugin['c_104_fk']);
        unset($fPluginPlugin['c_108_fk']);
        unset($fPluginPlugin['c_4_fk']);
        unset($fPluginPlugin['c_5_fk']);

        return $fPluginPlugin;
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
