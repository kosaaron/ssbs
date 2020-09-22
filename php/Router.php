<?php

//Post varibles
session_start();
$_SESSION['UserId'] = '1';
if (!isset($_SESSION['UserId']))
    die('No session!');

$userId = $_SESSION['UserId'];
$module = $_POST['Module'];
$data = $_POST['Data'];

require_once('Modules/ModuleMetadata.php');
$moduleMetadata = new ModuleMetadata();
$moduleMetadata->setUplodedData($data);

switch ($module) {
    case 'AutoDataRequest':
        require_once('Modules/AutoDataRequest.php');
        new AutoDataRequest($userId, $data);
        break;
    case 'ModuleData':
        require_once('Modules/ModuleData.php');
        if (isset($data['CModuleId'])) {
            $cModuleId = $data['CModuleId'];
        } else {
            $cModuleId = null;
        }
        // RequestType: D - default frame, MP - module's plugin, PP plugin's plugin
        $requestType = $data['RequestType'];
        // $moduleData = new ModuleData(1, 102, 1004);
        $moduleData = new ModuleData($userId, $cModuleId);

        switch ($requestType) {
            case 'D':
                $moduleData->createData();
                break;
            case 'MP':
                $fModulePluginId = $data['FModulePluginId'];
                $moduleData->createDataMP($fModulePluginId);
                break;
            case 'PP':
                $fPluginPluginId = $data['FPluginPluginId'];
                $moduleData->createDataPP($fPluginPluginId);
                break;
            default:
                $moduleData->createData();
                break;
        }

        print_r(json_encode($moduleData->main_data));
        break;
    case 'InsertByParam':
        require_once('Modules/InsertByParam.php');

        $insertByParam = new InsertByParam();
        $main_data =  $insertByParam->DefaultUpload($data);

        print_r(json_encode($main_data));
        break;
    case 'CustomData':
        require_once('Modules/CustomData.php');

        $customData = new CustomData();
        $main_data =  $customData->GetData($data);

        print_r(json_encode($main_data));
        break;
    case 'AddTable':
        require_once('Modules/Objects/AddTable.php');

        $addTable = new AddTable();
        $main_data =  $addTable->Create($data);

        print_r(json_encode($main_data));
        break;
    case 'AddColumn':
        require_once('Modules/Objects/AddColumn.php');

        $addColumn = new AddColumn();
        $main_data =  $addColumn->Create($data);

        print_r(json_encode($main_data));
        break;
    case 'InsertImage':
        require_once('Modules/Objects/InsertImage.php');

        $insertImage = new InsertImage();
        $main_data =  $insertImage->Create($data);

        print_r(json_encode($main_data));
        break;
    case 'UpdateByParam':
        //Includes
        require_once('Modules/UpdateByParam.php');

        //Post varibles
        $updateData = $data['UpdateByParamData'];
        $entryId = $data['EntryId'];

        //Call upload function
        $updateByParam = new UpdateByParam();
        $main_data = [$updateByParam->Default($updateData, $entryId)];

        print_r(json_encode($main_data));
        break;
    default:
        # code...
        break;
}

/** <example>
 * $module = 'AutoDataRequest';
 * $data = array(
 *    'VOId' => 'X',
 *     'VOParamArr' => array(
 *         'Y' => 'Z'
 *     )
 * );
 * </example> 
 * 
 * <example>
 * $module = 'ModuleData';
 * $data = array(
 *    'FModulePluginId' => 'FModulePluginIdValue',
 *    'CModuleId' => 'CModuleIdValue',
 *    'RequestType' => 'RequestTypeValue',
 *    'FilterData' => array(
 *         "tasks" => array(
 *              "Name":"asd",
 *              "TaskTypeFK":"1"
 *          ),
 *         "partners" => array(
 *              "Name":"asd",
 *              "PartnerTypeFK":"1"
 *          )
 *     )
 * );
 * </example> 
 * */
