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

        $number = $fPlugin['Number'];
        $cPluginFK = $fPlugin['CPluginFK'];
        $pluginTable = $fPlugin['TableName'];

        switch ($type) {
            case 'MP':
                $place = $fPlugin['Place'];
                $plugin['Place'] = $place;

                $plugin['CModuleId'] = ModuleMetadata::$cModuleId;

                $fPluginPluginFK = null;
                $fCustomPluginId = null;
                $fModulePluginId = $fPlugin['FModulePluginId'];

                $plugin['FModulePluginId'] = $fModulePluginId;
                break;
            case 'PP':
                $place = $fPlugin['Place'];
                $plugin['Place'] = $place;

                $fModulePluginId = null;
                $fCustomPluginId = null;
                $fPluginPluginFK = $fPlugin['FPluginPluginId'];

                $plugin['FPluginPluginId'] = $fPluginPluginFK;
                break;
            case 'CP':
                $fModulePluginId = null;
                $fPluginPluginFK = null;
                $fCustomPluginId = $fPlugin['FCustomPluginId'];

                $plugin['FCustomPluginId'] = $fCustomPluginId;
                break;
        }

        $plugin['Number'] = $number;
        $plugin['CPluginId'] = $cPluginFK;
        $plugin['RequestType'] = $type;

        $cPlugin = $this->pdo->query(
            "SELECT * FROM c_plugins WHERE CPluginId='$cPluginFK'"
        )->fetch(PDO::FETCH_ASSOC);

        $plugin['Plugin name'] = $cPlugin['Name'];

        $pluginData = array();
        switch ($cPluginFK) {
            case '1':
                # Step Box
                $pluginData = $this->creatStepBox($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '2':
                # Dinamic Popup Form
                $pluginData = $this->creatDinamicForm($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '3':
                # Filter And Sort
                $pluginData = $this->creatFilter($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '4':
                # Card box
                require_once('Display/CardBox.php');
                $cardBox = new CardBox();
                $pluginData = $cardBox->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '5':
                # Details
                require_once('Display/Details.php');
                $details = new Details();
                $pluginData = $details->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '6':
                # Connected object
                require_once('Display/ConnectedObject.php');
                $connectedObject = new ConnectedObject();
                $pluginData = $connectedObject->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '7':
                # Table
                require_once('Display/Table.php');
                $table = new Table();
                $pluginData = $table->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '8':
                # Step Box (display)
                require_once('Display/StepBox.php');
                $stepBox = new StepBox();
                $pluginData = $stepBox->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '9':
                # Gallery (input)
                require_once('Input/Gallery.php');
                $gallery = new Gallery();
                $pluginData = $gallery->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '10':
                # Gallery (display)
                require_once('Input/Gallery.php');
                $gallery = new Gallery();
                $pluginData = $gallery->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '13':
                # Get Inputs
                require_once('Input/GetInputs.php');
                $getInputs = new GetInputs();
                $pluginData = $getInputs->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
                break;
            case '14':
                # Get Display
                /*
                require_once('Input/Gallery.php');
                $gallery = new Gallery();
                $pluginData = $gallery->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);*/
                break;
            case '16':
                # Get Virtual Objects
                require_once('Modules/Display/GetVirtualObjects.php');
                $getVirtualObjects = new GetVirtualObjects();
                $pluginData = $getVirtualObjects->createData($fModulePluginId, $fPluginPluginFK, $fCustomPluginId, $pluginTable);
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
            "SELECT f_plugin_plugins.*, TableName FROM f_plugin_plugins 
             LEFT JOIN c_tables on CTableId=CTableFK 
             WHERE FModulePluginFK='$fModulePluginFK' && 
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
    function creatDinamicForm($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        //includes
        //GetData
        require_once('Modules/GetData.php');
        $getData = new GetData('ManualFiltering', true);
        //CreateFormInputs
        require_once('CreateFormInputs.php');
        //ItemFromTree
        require_once('ItemFromTree.php');

        //get dinamic form(s) of plugin
        $fPluginDinamicForms = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs 
             WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
                . " && FCustomPluginFK" . $this->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($fPluginDinamicForms as $fPluginDinamicForm) {
            $fPluginFormInputId = $fPluginDinamicForm['FPluginFormInputId'];

            $createFormInputs = new CreateFormInputs();
            $fDinamicFormInputs = $createFormInputs->Create($fPluginFormInputId);

            $dinamicForm['Title'] = $fPluginDinamicForm['Title'];

            if (ModuleMetadata::$disableFormFill !== true) {
                $formData = $getData->getDisplayColumns(
                    $fPluginFormInputId,
                    $pluginTable,
                    true
                );

                foreach ($fDinamicFormInputs as $fDFIKey => $fDFInput) {
                    $fDFINumber = $fDFInput['Number'];

                    $itemFromTree = new ItemFromTree();
                    $fDFIValue = $itemFromTree->Find($formData['Data'][0], $fDFINumber);
                    $fDinamicFormInputs[$fDFIKey]['DefaultValue'] = $fDFIValue;
                }
            }

            $dinamicForm['Inputs'] = $fDinamicFormInputs;

            $dinamicForm['Children'] = $this->checkChild(
                $fModulePluginFK,
                $fPluginPluginFK,
                '1'
            );
        }

        return $dinamicForm;
    }

    # Step Box
    function creatStepBox($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        //includes
        require_once('CreateFormInputs.php');

        $dinamicForm = array();

        $fPluginFormInput = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs 
             WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
                . " && FCustomPluginFK" . $this->ifNull($fCustomPluginId)
        )->fetch(PDO::FETCH_ASSOC);

        $createFormInputs = new CreateFormInputs();
        $fPluginFormInputId = $fPluginFormInput['FPluginFormInputId'];
        $dinamicForm['Inputs'] = $createFormInputs->Create($fPluginFormInputId);
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
    function creatFilter($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        //includes
        require_once('CreateFormInputs.php');

        //get dinamic form(s) of plugin
        $formInputMetaDataArr = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs 
             WHERE FModulePluginFK" . $this->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->ifNull($fPluginPluginFK)
                . " && FCustomPluginFK" . $this->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($formInputMetaDataArr as $formInputMetaData) {
            $fPluginFormInputId = $formInputMetaData['FPluginFormInputId'];

            $createFormInputs = new CreateFormInputs();
            $formInputs = $createFormInputs->Create($fPluginFormInputId);

            $dinamicForm[$formInputMetaData['Number']]['FPluginFormInputId'] = $fPluginFormInputId;
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
}
