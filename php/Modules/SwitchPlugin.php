<?php

/**
 * Switch plugin
 */
class SwitchPlugin
{
    function __construct()
    {
        //PDO connection
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }

    /**
     * switch
     * @param json $plugin
     * @param json $type - type of plugin
     * @return null
     */
    function switch($fPlugin, $type)
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
                //$getData = new GetData($fModulePluginId, $fPluginPluginFK);
                $pluginData;
                break;
            default:
                //error
                break;
        }
        $plugin['Data'] = $pluginData;

        return $plugin;
    }

    public function checkChild($fModulePluginFK, $fPluginPluginFK, $defaultScreen)
    {
        $data = array();

        $defScreenCond = '';
        if ($defaultScreen === 1) {
            $defScreenCond = "&& DefaultScreen='$defaultScreen'";
        }

        $fPluginPlugins = $this->pdo->query(
            "SELECT * FROM f_plugin_plugins WHERE FModulePluginFK='$fModulePluginFK' && 
            FPluginPluginFK" . $this->ifNull($fPluginPluginFK) . " $defScreenCond"
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginPlugins as $fPluginPlugin) {
            $data[] = $this->switch(
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

    /** Plugins **/
    # Dinamic Popup Form
    function creatDinamicForm($fModulePluginFK, $fPluginPluginFK)
    {
        //includes
        require_once('CreateFormInputs.php');

        //get dinamic form(s) of plugin
        $fPluginDinamicForms = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($fPluginDinamicForms as $fPluginDinamicForm) {
            $fPluginFormInputId = $fPluginDinamicForm['FPluginFormInputId'];

            $createFormInputs = new CreateFormInputs();
            $fDinamicFormInputs = $createFormInputs->Create($fPluginFormInputId);

            $dinamicForm['Title'] = $fPluginDinamicForm['Title'];
            $dinamicForm['Inputs'] = $fDinamicFormInputs;
            $dinamicForm['Childs'] = $this->checkChild(
                $fModulePluginFK,
                $fPluginPluginFK,
                '1'
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

        $fPluginFormInput = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetch(PDO::FETCH_ASSOC);

        $createFormInputs = new CreateFormInputs();
        $fPluginFormInputId = $fPluginFormInput['FPluginFormInputId'];
        $dinamicForm['Inputs'] = $createFormInputs->Create($fPluginFormInputId);

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
            "SELECT * FROM f_plugin_form_inputs WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($formInputMetaDataArr as $formInputMetaData) {
            $fPluginFormInputId = $formInputMetaData['FPluginFormInputId'];

            $createFormInputs = new CreateFormInputs();
            $formInputs = $createFormInputs->Create($fPluginFormInputId);

            $dinamicForm[$formInputMetaData['Number']]['Title'] = $formInputMetaData['Title'];
            $dinamicForm[$formInputMetaData['Number']]['Inputs'] = $formInputs;
        }

        $dinamicForm['Childs'] = $this->checkChild(
            $fModulePluginFK,
            $fPluginPluginFK,
            '1'
        );

        return $dinamicForm;
    }
}
