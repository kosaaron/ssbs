<?php

class CreateFrame
{
    /**
     * Post varibles
     */
    // {String} userId - User ID
    public $userId;
    // {JSON} main_data - Main data
    public $main_data;

    /**
     * Construct
     * @param string $userId User ID
     * @param string $cTabId Tab ID (frame)
     * @param string $cModuleId Module ID (frame)
     */
    function __construct($userId, $cTabId, $cModuleId)
    {
        /** Includes */
        //PDO connection
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        /** Varibles definition */
        $this->userId = $userId;
        $this->main_data = array();

        /** Create frame data object */
        $fUserModuleId = $this->getFUserModuleId(
            $userId,
            $cTabId,
            $cModuleId
        );
        $fModulePlugins = $this->getFModulePlugins($fUserModuleId);

        $this->main_data = $this->createModuleData($fModulePlugins);

        print_r(json_encode($this->main_data));
    }

    /** getFUserModuleId */
    function getFUserModuleId($userId, $cTabId, $cModuleId)
    {
        $fUserModule = $this->pdo->query(
            "SELECT * FROM f_user_modules WHERE EmployeeFK='$userId' && CTabFK='$cTabId' && CModuleFK='$cModuleId'"
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
            "SELECT * FROM f_module_plugins WHERE FUserModuleFK='$fUserModuleId' && DefaultScreen='1'"
        )->fetchAll(PDO::FETCH_ASSOC);
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
            $cPluginFK = $fModulePlugin['CPluginFK'];
            $moduleData[$cPluginFK] = $this->switchPlugin(
                $cPluginFK,
                $fModulePlugin['FModulePluginId'],
                null
            );
        }

        return $moduleData;
    }

    /**
     * switchPlugin
     * @param json $fModulePlugin
     * @return null
     */
    function switchPlugin($cPluginFK, $fModulePluginId, $fPluginPluginFK)
    {
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

            default:
                //error
                break;
        }

        return $pluginData;
    }

    /** Plugins **/
    # Dinamic Popup Form
    function creatDinamicForm($fModulePluginFK, $fPluginPluginFK)
    {
        //includes
        require_once('CreateFormInputs.php');


        $dinamicForm = array();
        $dinamicForm['Data name'] = 'Dinamic forms';

        //get dinamic form(s) of plugin
        $fPluginDinamicForms = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginDinamicForms as $fPluginDinamicForm) {
            $fPluginFormInputId = $fPluginDinamicForm['FPluginFormInputId'];
            $place = $fPluginDinamicForm['Place'];

            $createFormInputs = new CreateFormInputs();
            $fDinamicFormInputs = $createFormInputs->Create($this->userId, $fPluginFormInputId);

            $dinamicForm['Forms'][$place]['Title'] = $fPluginDinamicForm['Title'];
            $dinamicForm['Forms'][$place]['Inputs'] = $fDinamicFormInputs;
            $dinamicForm['Forms'][$place]['Childs'] = $this->checkChild(
                $fModulePluginFK,
                $fPluginPluginFK,
                '1',
                $place
            );
        }

        return $dinamicForm;
    }

    # Step Box
    function creatStepBox($fModulePluginFK, $fPluginPluginFK)
    {
        //includes
        require_once('CreateFormInputs.php');
        require_once('VirtualObject.php');

        $dinamicForm = array();
        $dinamicForm['Data name'] = 'Step Box';

        $fPluginFormInput = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
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
        
        $virtualObject = new VirtualObject($fPluginVO['VirtualObjectFK']);
        $vOParamArr['0'] = 'input';
        $dinamicForm['Template'] = $virtualObject->CreateVO($);*/

        return $dinamicForm;
    }

    function checkChild($fModulePluginFK, $fPluginPluginFK, $defaultScreen, $parentPlace = '1')
    {
        $data = array();

        $fPluginPlugins = $this->pdo->query(
            "SELECT * FROM f_plugin_plugins WHERE FModulePluginFK='$fModulePluginFK' && 
            FPluginPluginFK" . $this->ifNull($fPluginPluginFK) . " && DefaultScreen='$defaultScreen' && 
            ParentPlace='$parentPlace'"
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginPlugins as $fPluginPlugin) {
            $cPluginFK = $fPluginPlugin['CPluginFK'];

            $data[$cPluginFK] = $this->switchPlugin(
                $cPluginFK,
                null,
                $fPluginPlugin['FPluginPluginId']
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
$stg = new CreateFrame(1, 102, 1004);
