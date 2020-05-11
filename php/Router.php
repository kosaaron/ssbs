<?php

//Post varibles
$userId = 1;
$module = $_POST['Module'];
$data = $_POST['Data'];

switch ($module) {
    case 'AutoDataRequest':
        require_once('Modules/AutoDataRequest.php');
        new AutoDataRequest($userId, $data);
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
 * </example> */