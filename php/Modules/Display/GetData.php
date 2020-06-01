<?php

/**
 * Get data
 */
class GetData
{
    function __construct($fModulePluginId, $fPluginPluginFK)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

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
            $fDinamicFormInputs = $createFormInputs->Create($this->userId, $fPluginFormInputId);

            $dinamicForm['Title'] = $fPluginDinamicForm['Title'];
            $dinamicForm['Inputs'] = $fDinamicFormInputs;
            /*
            $dinamicForm['Childs'] = $this->checkChild(
                $fModulePluginFK,
                $fPluginPluginFK,
                '1'
            );*/
        }

        return $dinamicForm;
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
