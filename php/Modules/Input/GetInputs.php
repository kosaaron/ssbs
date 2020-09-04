<?php

/**
 * Get Inputs
 */
class GetInputs
{
    function __construct()
    {
        /** Includes */
        //SwitchPlugin
        require_once('Modules/SwitchPlugin.php');
        $this->switchPlugin = new SwitchPlugin();
        //PDO connection
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }

    public function createData($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        //includes
        //GetData
        require_once('Modules/GetData.php');
        $getData = new GetData('ManualFiltering', true);
        //CreateFormInputs
        require_once('Modules/CreateFormInputs.php');
        //ItemFromTree
        require_once('Modules/ItemFromTree.php');

        //get dinamic form(s) of plugin
        $fPluginDinamicForms = $this->pdo->query(
            "SELECT * FROM f_plugin_form_inputs 
             WHERE FModulePluginFK" . $this->switchPlugin->ifNull($fModulePluginFK)
                . " && FPluginPluginFK" . $this->switchPlugin->ifNull($fPluginPluginFK)
                . " && FCustomPluginFK" . $this->switchPlugin->ifNull($fCustomPluginId)
        )->fetchAll(PDO::FETCH_ASSOC);

        $dinamicForm = array();

        foreach ($fPluginDinamicForms as $fPluginDinamicForm) {
            $fPluginFormInputId = $fPluginDinamicForm['FPluginFormInputId'];

            $createFormInputs = new CreateFormInputs();
            $fDinamicFormInputs = $createFormInputs->Create($fPluginFormInputId);

            $dinamicForm[$fPluginDinamicForm['Number']]['Title'] = $fPluginDinamicForm['Title'];

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

            $dinamicForm[$fPluginDinamicForm['Number']]['Inputs'] = $fDinamicFormInputs;
        }

        $dinamicForm['Children'] = $this->switchPlugin->checkChild(
            $fModulePluginFK,
            $fPluginPluginFK,
            '1'
        );

        return $dinamicForm;
    }
}
