<?php

//Post varibles
$userId = 1;
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
        $cModuleId = $data['CModuleId'];
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
