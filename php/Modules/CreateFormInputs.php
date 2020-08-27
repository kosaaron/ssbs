<?php

/**
 * Create form
 */
class CreateFormInputs
{
    public function Create($fPluginFormInputFK)
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;
        //Result form structure
        $resultFormStructure = $pdo->query(
            "SELECT * FROM f_form_inputs 
             INNER JOIN f_columns ON FColumnId=FColumnFK 
             INNER JOIN c_tables ON CTableId=CTableFK 
             WHERE FPluginFormInputFK='$fPluginFormInputFK' 
             ORDER BY Number;"
        )->fetchAll(PDO::FETCH_ASSOC);

        $mainResult = array();

        //Form structure add opportunities
        foreach ($resultFormStructure as $input) {
            $new_input = $input;
            //opportunities
            if (
                $input['Type'] == 'S' || $input['Type'] == 'SN' || $input['Type'] == 'SP' 
                || $input['Type'] == 'SC'
            ) {
                $oppArr = array();

                $oppTable = $input['TableName'];
                $oppTableId = $input['TableIdName'];
                $oppColumn = $input['ColumnName'];
                $oppStructure = $pdo->query(
                    "SELECT DISTINCT $oppTableId, $oppColumn FROM $oppTable"
                )->fetchAll();

                $i = 0;
                foreach ($oppStructure as $row) {
                    $oppSubArr = array();
                    $oppSubArr['Id'] = $row[0];
                    $oppSubArr['Name'] = $row[1];

                    $oppArr[$i] = $oppSubArr;
                    ++$i;
                }
                $new_input['Opportunities'] = $oppArr;
            }

            $mainResult[] = $new_input;
        }

        return $mainResult;
    }
}
