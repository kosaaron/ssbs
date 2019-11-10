<?php
require_once('CreateFilter.php');
require_once('TableByStructure.php');

class ProductsOverview
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
        /** Products overview filters */
        $createFilter = new CreateFilter();
        $fltrStructure = $createFilter->DefaultFilter($this->userId, "prodfltr");
        $this->main_data['Filters'] = $fltrStructure;
    }

    public function CreateTableData($filter)
    {
        $tableByStructure = new TableByStructure($this->userId);
        $tableByStructure->CreateTable($this->userId, "prodtbl", "products", $filter);

        $this->main_data['Data'] = $tableByStructure->main_data['Data'];
        $this->main_data['DataStructure'] = $tableByStructure->main_data['DataStructure'];
        $this->main_data['TableStructre'] = $tableByStructure->main_data['TableStructre'];
    }
}
