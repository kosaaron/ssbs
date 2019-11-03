<?php
require_once('CreateFilter.php');
require_once('DataAndStructure.php');

class OrderManager
{
    //Post varibles
    public $userId = 1;

    //Local varibles
    public $main_data = array();

    function __construct($userId)
    {
        $this->userId = $userId;
        $this->main_data = array();
    }

    public function CreateFilter()
    {
        /** Task's manager filters */
        $createFilter = new CreateFilter();
        $fltrStructure = $createFilter->DefaultFilter($this->userId, "ordrfltr");
        $this->main_data['Filters'] = $fltrStructure;
    }
    public function CreateCardContainer($filter)
    {
        /** Task's manager data */
        $dataAndStructure = new DataAndStructure();
        $cardCResult = $dataAndStructure->CardContainer($this->userId, "ordrmd", "orders", $filter);
        $this->main_data['DataStructure'] = $cardCResult['DataStructure'];
        $this->main_data['Data'] = $cardCResult['Data'];

        /** Task's manager details */
        $cardCResult = $dataAndStructure->Details($this->userId, "ordrdtls");
        $this->main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
        $this->main_data['DetailsStructure']['Data'] = $cardCResult['Data'];
    }
}
