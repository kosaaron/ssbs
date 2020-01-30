<?php
require_once('Modules/CreateFilter.php');
require_once('Modules/DataAndStructure.php');

class Tools
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
        /** Tool's manager filters */
        $createFilter = new CreateFilter();
        $fltrStructure = $createFilter->DefaultFilter($this->userId, "tlsfltr");
        $this->main_data['Filters'] = $fltrStructure['Filters'];
        $this->main_data['Sorts'] = $fltrStructure['Sorts'];
    }

    public function CreateCardContainer(
        $filter = '',
        $sort = '',
        $dataPos = array(
            'Limit' => 20,
            'Offset' => 0
        )
    ) {
        /** Partner's manager data */
        $dataAndStructure = new DataAndStructure();
        $cardCResult = $dataAndStructure->CardContainer(
            $this->userId,
            "tlsmd",
            "tools",
            $filter,
            $sort,
            $dataPos
        );
        $this->main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
        $this->main_data['DetailsStructure']['Data'] = $cardCResult['Data'];
    
        /** Partner's manager details */
        $cardCResult = $dataAndStructure->Details($this->userId, "tlsdtls");
        $this->main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
        $this->main_data['DetailsStructure']['Data'] = $cardCResult['Data'];

    }
}
