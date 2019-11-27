<?php
require_once('CreateFilter.php');
require_once('DataAndStructure.php');

class TaskManager
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
        $fltrStructure = $createFilter->DefaultFilter($this->userId, "tskfltr");
        $this->main_data['Filters'] = $fltrStructure['Filters'];
        $this->main_data['Sorts'] = $fltrStructure['Sorts'];
    }
    public function CreateCardContainer($filter = '', $sort = '')
    {
        /** Task's manager data */
        $dataAndStructure = new DataAndStructure();
        $cardCResult = $dataAndStructure->CardContainer($this->userId, "taskmd", "tasks", $filter, $sort);
        $this->main_data['DataStructure'] = $cardCResult['DataStructure'];
        $this->main_data['Data'] = $cardCResult['Data'];

        /** Task's manager details */
        $cardCResult = $dataAndStructure->Details($this->userId, "taskdtls");
        $this->main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
        $this->main_data['DetailsStructure']['Data'] = $cardCResult['Data'];
    }
}
