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
            "SELECT 
                c_107_fk,
                c_5_fk,
                c_31 AS TName,
                c_51 AS TableName,
                c_52 AS TableIdName,
                c_7_fk,
                c_33 AS 'Name',
                c_54 AS ColumnName,
                c_103_id,
                c_32 AS 'Number',
                c_61 AS 'Type',
                c_35 AS 'DefaultValue',
                c_36 AS 'UploadName',
                c_37 AS 'Required',
                c_38 AS 'Visible',
                c_62 AS 'Upload'
             FROM t_103 
             INNER JOIN t_7 ON c_7_id=c_7_fk 
             INNER JOIN t_5 ON c_5_id=c_5_fk 
             WHERE c_107_fk='$fPluginFormInputFK' 
             ORDER BY Number;"
        )->fetchAll(PDO::FETCH_ASSOC);

        $mainResult = array();

        //Form structure add opportunities
        foreach ($resultFormStructure as $key => $input) {
            $new_input = $input;
            //opportunities
            if (
                $input['Type'] == 'S' || $input['Type'] == 'SN' || $input['Type'] == 'SP'
                || $input['Type'] == 'SC'
            ) {
                $input['CTableFK'] = $input['c_7_fk'];
                $input['FColumnFK'] = $input['c_5_fk'];
                $resultFormStructure[$key] = $input;

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
