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
        $plugin['TableName'] = $pluginTable;

        $cPlugin = $this->pdo->query(
            "SELECT 
                c_4_id,
                c_30 AS 'Name'
             FROM t_4 WHERE c_4_id='$cPluginFK'"
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
                require_once('Display/GetDisplayGallery.php');
                $gallery = new DisplayGallery();
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
             WHERE c_104_fk='$fModulePluginFK' && 
             c_108_fk" . $this->ifNull($fPluginPluginFK) . " $defScreenCond"
        )->fetchAll(PDO::FETCH_ASSOC);

        foreach ($fPluginPlugins as $fPluginPlugin) {
            $fPluginPlugin['FPluginPluginId'] = $fPluginPlugin['c_108_id'];
            $fPluginPlugin['CTableId'] = $fPluginPlugin['c_5_fk'];
            $fPluginPlugin['CPluginFK'] = $fPluginPlugin['c_4_fk'];
            unset($fPluginPlugin['c_108_id']);
            unset($fPluginPlugin['c_5_fk']);
            unset($fPluginPlugin['c_4_fk']);

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
            "SELECT 
                c_104_fk,
                c_108_fk,
                c_101_fk,
                c_107_id,
                c_66 AS Title,
                c_67 AS 'Number'
             FROM t_107 
             WHERE c_104_fk" . $this->ifNull($fModulePluginFK)
                . " && c_108_fk" . $this->ifNull($fPluginPluginFK)
                . " && c_101_fk" . $this->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        if (array_key_exists('IdOfData', ModuleMetadata::$uplodedData)) {
            if (
                ModuleMetadata::$uplodedData['IdOfData'] === 'null'
                || ModuleMetadata::$uplodedData['IdOfData'] === ''
                || ModuleMetadata::$uplodedData['IdOfData'] === null
            ) {
                ModuleMetadata::$disableFormFill = true;
            } else {
                ModuleMetadata::$disableFormFill = false;
            }
        } else {
            ModuleMetadata::$disableFormFill = true;
        }

        $dinamicForm = array();

        foreach ($fPluginDinamicForms as $fPluginDinamicForm) {
            $fPluginFormInputId = $fPluginDinamicForm['c_107_id'];

            $createFormInputs = new CreateFormInputs();
            $fDinamicFormInputs = $createFormInputs->Create($fPluginFormInputId);

            if (true) {
                $dinamicForm[$fPluginDinamicForm['Number']]['Title'] = $fPluginDinamicForm['Title'];
                $dinamicForm[$fPluginDinamicForm['Number']]['FPluginFormInputId'] = $fPluginFormInputId;
            } else {
                $dinamicForm['Title'] = $fPluginDinamicForm['Title'];
            }

            if (ModuleMetadata::$disableFormFill === false) {
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
            if (true) {
                $dinamicForm[$fPluginDinamicForm['Number']]['Inputs'] = $fDinamicFormInputs;
            } else {
                $dinamicForm['Inputs'] = $fDinamicFormInputs;
            }
        }

        $dinamicForm['Children'] = $this->checkChild(
            $fModulePluginFK,
            $fPluginPluginFK,
            '1'
        );

        return $dinamicForm;
    }

    # Step Box
    function creatStepBox($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        //includes
        require_once('CreateFormInputs.php');

        $dinamicForm = array();

        $fPluginFormInput = $this->pdo->query(
            "SELECT 
                c_104_fk,
                c_108_fk,
                c_101_fk,
                c_107_id,
                c_66 AS Title,
                c_67 AS 'Number'
             FROM t_107 
             WHERE c_104_fk" . $this->ifNull($fModulePluginFK)
                . " && c_108_fk" . $this->ifNull($fPluginPluginFK)
                . " && c_101_fk" . $this->ifNull($fCustomPluginId)
        )->fetch(PDO::FETCH_ASSOC);

        $createFormInputs = new CreateFormInputs();
        $fPluginFormInputId = $fPluginFormInput['c_107_id'];
        $dinamicForm['Inputs'] = $createFormInputs->Create($fPluginFormInputId);

        return $dinamicForm;
    }

    # Filter And Sort
    function creatFilter($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        //includes
        require_once('CreateFormInputs.php');

        //get dinamic form(s) of plugin
        $formInputMetaDataArr = $this->pdo->query(
            "SELECT 
                c_104_fk,
                c_108_fk,
                c_101_fk,
                c_107_id,
                c_66 AS Title,
                c_67 AS 'Number'
             FROM t_107 
             WHERE c_104_fk" . $this->ifNull($fModulePluginFK)
                . " && c_108_fk" . $this->ifNull($fPluginPluginFK)
                . " && c_101_fk" . $this->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($formInputMetaDataArr as $formInputMetaData) {
            $fPluginFormInputId = $formInputMetaData['c_107_id'];

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
