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
        //Module metadata
        require_once('ModuleMetadata.php');

        $plugin = array();

        $place = $fPlugin['Place'];
        $cPluginFK = $fPlugin['CPluginFK'];
        $number = $fPlugin['Number'];
        $pluginTable = $fPlugin['TableName'];

        $plugin['Place'] = $place;
        $plugin['Number'] = $number;
        $plugin['CPluginId'] = $cPluginFK;
        $plugin['CModuleId'] = ModuleMetadata::$cModuleId;
        $plugin['RequestType'] = $type;

        switch ($type) {
            case 'MP':
                $fModulePluginId = $fPlugin['FModulePluginId'];
                $fPluginPluginFK = null;

                $plugin['FModulePluginId'] = $fModulePluginId;
                break;
            case 'PP':
                $fModulePluginId = null;
                $fPluginPluginFK = $fPlugin['FPluginPluginId'];

                $plugin['FPluginPluginId'] = $fPluginPluginFK;
                break;
        }

        $cPlugin = $this->pdo->query(
            "SELECT * FROM c_plugins WHERE CPluginId='$cPluginFK'"
        )->fetch(PDO::FETCH_ASSOC);

        $plugin['Plugin name'] = $cPlugin['Name'];

        $pluginData = array();
        switch ($cPluginFK) {
            case '1':
                # Step Box
                $pluginData = $this->creatStepBox($fModulePluginId, $fPluginPluginFK, $pluginTable);
                break;
            case '2':
                # Dinamic Popup Form
                $pluginData = $this->creatDinamicForm($fModulePluginId, $fPluginPluginFK, $pluginTable);
                break;
            case '3':
                # Filter And Sort
                $pluginData = $this->creatFilter($fModulePluginId, $fPluginPluginFK, $pluginTable);
                break;
            case '4':
                # Card box
                require_once('Display/CardBox.php');
                $cardBox = new CardBox();
                $pluginData = $cardBox->createData($fModulePluginId, $fPluginPluginFK, $pluginTable);
                break;
            case '5':
                # Details
                require_once('Display/Details.php');
                $details = new Details();
                $pluginData = $details->createData($fModulePluginId, $fPluginPluginFK, $pluginTable);
                break;
            case '6':
                # Connected object
                require_once('Display/ConnectedObject.php');
                $connectedObject = new ConnectedObject();
                $pluginData = $connectedObject->createData($fModulePluginId, $fPluginPluginFK, $pluginTable);
                break;
            case '7':
                # Table
                require_once('Display/Table.php');
                $table = new Table();
                $pluginData = $table->createData($fModulePluginId, $fPluginPluginFK, $pluginTable);
                break;
            case '8':
                # Step Box (display)
                require_once('Display/StepBox.php');
                $stepBox = new StepBox();
                $pluginData = $stepBox->createData($fModulePluginId, $fPluginPluginFK, $pluginTable);
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
    function creatDinamicForm($fModulePluginFK, $fPluginPluginFK, $pluginTable)
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
    function creatStepBox($fModulePluginFK, $fPluginPluginFK, $pluginTable)
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
    function creatFilter($fModulePluginFK, $fPluginPluginFK, $pluginTable)
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
