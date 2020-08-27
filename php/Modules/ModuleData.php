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
            "SELECT * FROM f_user_modules WHERE EmployeeFK='$userId' && CModuleFK='$cModuleId'"
        )->fetch(PDO::FETCH_ASSOC);

        return $fUserModule['FUserModuleId'];
    }

    /**
     * getFModulePlugins
     * @param string $fUserModuleId User module ID (frame)
     */
    function getFModulePlugins($fUserModuleId)
    {
        return $this->pdo->query(
            "SELECT f_module_plugins.*, TableName FROM f_module_plugins 
             LEFT JOIN c_tables on CTableId=CTableFK 
             WHERE FUserModuleFK='$fUserModuleId' && DefaultScreen='1' 
             ORDER BY f_module_plugins.Number ASC"
        )->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * getFModulePluginById
     * @param string $fModulePluginId Module's plugin ID (frame)
     */
    function getFModulePluginById($fModulePluginId)
    {
        return $this->pdo->query(
            "SELECT f_module_plugins.*, TableName FROM f_module_plugins 
             LEFT JOIN c_tables on CTableId=CTableFK 
             WHERE FModulePluginId='$fModulePluginId'"
        )->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * getFPluginPluginById
     * @param string $fPluginPluginId Plugin ID (frame)
     */
    function getFPluginPluginById($fPluginPluginId)
    {
        return $this->pdo->query(
            "SELECT f_plugin_plugins.*, TableName FROM f_plugin_plugins 
             LEFT JOIN c_tables on CTableId=CTableFK 
             WHERE FPluginPluginId='$fPluginPluginId'"
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

    /**
     * switchPlugin
     * @param json $plugin
     * @param json $type - type of plugin
     * @return null
     */
    function switchPlugin($fPlugin, $type)
    {
        $place = $fPlugin['Place'];
        $cPluginFK = $fPlugin['CPluginFK'];
        $number = $fPlugin['Number'];
        switch ($type) {
            case 'MP':
                $fModulePluginId = $fPlugin['FModulePluginId'];
                $fPluginPluginFK = null;
                break;
            case 'PP':
                $fModulePluginId = null;
                $fPluginPluginFK = $fPlugin['FPluginPluginId'];
                break;
        }

        $plugin = array();
        $plugin['Place'] = $place;
        $plugin['Number'] = $number;
        $plugin['CPluginId'] = $cPluginFK;

        $cPlugin = $this->pdo->query(
            "SELECT * FROM c_plugins WHERE CPluginId='$cPluginFK'"
        )->fetch(PDO::FETCH_ASSOC);

        $plugin['Plugin name'] = $cPlugin['Name'];

        $pluginData = array();
        switch ($cPluginFK) {
            case '1':
                # Step Box
                $pluginData = $this->creatStepBox($fModulePluginId, $fPluginPluginFK);
                break;
            case '2':
                # Dinamic Popup Form
                $pluginData = $this->creatDinamicForm($fModulePluginId, $fPluginPluginFK);
                break;
            case '3':
                # Filter And Sort
                $pluginData = $this->creatFilter($fModulePluginId, $fPluginPluginFK);
                break;
            case '4':
                # Card box
                require_once('Display/GetData.php');
                $getData = new GetData($fModulePluginId, $fPluginPluginFK);
                break;
            default:
                //error
                break;
        }
        $plugin['Data'] = $pluginData;

        return $plugin;
    }

    /** Plugins **/
    # Dinamic Popup Form
    function creatDinamicForm($fModulePluginFK, $fPluginPluginFK)
    {
        //includes
        require_once('CreateFormInputs.php');

        //get dinamic form(s) of plugin

        $fPluginDinamicForms = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs 
             WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($fPluginDinamicForms as $fPluginDinamicForm) {
            $fPluginFormInputId = $fPluginDinamicForm['FPluginFormInputId'];

            $createFormInputs = new CreateFormInputs();
            $fDinamicFormInputs = $createFormInputs->Create($this->userId, $fPluginFormInputId);

            $dinamicForm['Title'] = $fPluginDinamicForm['Title'];
            $dinamicForm['Inputs'] = $fDinamicFormInputs;
        }

        $dinamicForm['Children'] = $this->checkChild(
            $fModulePluginFK,
            $fPluginPluginFK,
            '1'
        );
        
        return $dinamicForm;
    }

    # Step Box
    function creatStepBox($fModulePluginFK, $fPluginPluginFK)
    {
        //includes
        require_once('CreateFormInputs.php');
        require_once('VirtualObject.php');

        $dinamicForm = array();

        $fPluginFormInput = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs 
             WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetch(PDO::FETCH_ASSOC);

        $createFormInputs = new CreateFormInputs();
        $fPluginFormInputId = $fPluginFormInput['FPluginFormInputId'];
        $dinamicForm['Inputs'] = $createFormInputs->Create($this->userId, $fPluginFormInputId);

        /*
        $fPluginVO = $this->pdo->query(
            "SELECT * FROM f_plugin_vo WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetch(PDO::FETCH_ASSOC);

        $dinamicForm['VoId'] = $fPluginVO['VirtualObjectFK'];
        /*
        $virtualObject = new VirtualObject($fPluginVO['VirtualObjectFK']);
        $vOParamArr['0'] = 'input';
        $dinamicForm['Template'] = $virtualObject->CreateVO($);*/

        return $dinamicForm;
    }

    # Filter And Sort
    function creatFilter($fModulePluginFK, $fPluginPluginFK)
    {
        //includes
        require_once('CreateFormInputs.php');

        //get dinamic form(s) of plugin
        $formInputMetaDataArr = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs 
             WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($formInputMetaDataArr as $formInputMetaData) {
            $fPluginFormInputId = $formInputMetaData['FPluginFormInputId'];

            $createFormInputs = new CreateFormInputs();
            $formInputs = $createFormInputs->Create($this->userId, $fPluginFormInputId);

            $dinamicForm[$formInputMetaData['Number']]['Title'] = $formInputMetaData['Title'];
            $dinamicForm[$formInputMetaData['Number']]['Inputs'] = $formInputs;
        }

        $dinamicForm['Children'] = $this->checkChild(
            $fModulePluginFK,
            $fPluginPluginFK,
            '1'
        );

        return $dinamicForm;
    }

    public function checkChild($fModulePluginFK, $fPluginPluginFK, $defaultScreen)
    {
        $data = array();

        $defScreenCond = '';
        if ($defaultScreen === 1) {
            $defScreenCond = "&& DefaultScreen='$defaultScreen'";
        }

        $fPluginPlugins = $this->pdo->query(
            "SELECT f_plugin_plugins.*, TableName FROM f_plugin_plugins 
             LEFT JOIN c_tables on CTableId=CTableFK  
             WHERE FModulePluginFK='$fModulePluginFK' && 
             FPluginPluginFK" . $this->ifNull($fPluginPluginFK) . " $defScreenCond"
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginPlugins as $fPluginPlugin) {
            $data[] = $this->switchPlugin->switch(
                $fPluginPlugin,
                'PP'
            );
        }

        return $data;
    }

    function ifNull($varible)
    {
        if ($varible === null) {
            return   " IS NULL";
        } else {
            return "='$varible'";
        }
    }
}
/*
$moduleData = new ModuleData(1, 102, 1004);
$moduleData->createData();
print_r(json_encode($moduleData->main_data));
*/
