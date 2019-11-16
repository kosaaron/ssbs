<?php
require_once('Modules/CreateFilter.php');
require_once('Modules/DataAndStructure.php');

class Employees
{
    //Post varibles
    public $userId;

    //Local varibles
    public $main_data;

    function __construct($userId)
    {
        $this->userId = $userId;
        $this->main_data = array();
    }

    public function CreateFilter()
    {
        /** Partner's manager filters */
        $createFilter = new CreateFilter();
        $fltrStructure = $createFilter->DefaultFilter($this->userId, "emlpfltr");
        $this->main_data['Filters'] = $fltrStructure['Filters'];
        $this->main_data['Sorts'] = $fltrStructure['Sorts'];
    }

    public function CreateCardContainer($filter)
    {
        /** Partner's manager data */
        $dataAndStructure = new DataAndStructure();
        $cardCResult = $dataAndStructure->CardContainer($this->userId, "emplmd", "employees", $filter);
        $this->main_data['DataStructure'] = $cardCResult['DataStructure'];
        $this->main_data['Data'] = $cardCResult['Data'];

        /** Partner's manager details */
        $cardCResult = $dataAndStructure->Details($this->userId, "empldtls");
        $this->main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
        $this->main_data['DetailsStructure']['Data'] = $cardCResult['Data'];
    }
}
