<?php
require_once('VirtualObject.php');

class AutoDataRequest
{
    /**
     * Post varibles
     */
    // {String} *vOId* - Virtual object ID
    // {String} *VOParamArr* - Array of virtual object parameters
    // {String} userId - User ID
    public $userId = 1;

    function __construct($userId, $data)
    {
        $this->userId = $userId;
        $this->main_data = array();

        $vOId = $data['VOId'];
        $vOParamArr = $data['VOParamArr'];

        $virtualObject = new VirtualObject($vOId);
        $mainData = $virtualObject->CreateVO($vOParamArr);

        print_r(json_encode($mainData));
    }
}
