<?php
require_once('Modules/CreateFilter.php');
require_once('Modules/DataAndStructure.php');

class PartnerManager
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
        $fltrStructure = $createFilter->DefaultFilter($this->userId, "prtnrfltr");
        $this->main_data['Filters'] = $fltrStructure['Filters'];
        $this->main_data['Sorts'] = $fltrStructure['Sorts'];
    }

    public function CreateCardContainer($filter = '', $sort = '')
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        /** Partner's manager data */
        $dataAndStructure = new DataAndStructure();
        $cardCResult = $dataAndStructure->CardContainer($this->userId, "prtnrmd", "partners", $filter);
        $this->main_data['DataStructure'] = $cardCResult['DataStructure'];

        $this->main_data['Data'] = array();
        if (is_array($cardCResult['Data'])) {
            foreach ($cardCResult['Data'] as $row) {
                $tags = $pdo->query('SELECT PartnerTagId, partner_tags.Name FROM partner_tags INNER JOIN tags_for_partner ON PartnerTagFK=PartnerTagId WHERE (' . $row['PartnerId'] . '=PartnerFK)')->fetchAll(PDO::FETCH_ASSOC);

                $row['Tags'] = $tags;
                $this->main_data['Data'][] = $row;
            }
        } else {
            $this->main_data['Data'] = $cardCResult['Data'];
        }

        /** Partner's manager details */
        $cardCResult = $dataAndStructure->Details($this->userId, "prtnrdtls");
        $this->main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
        $this->main_data['DetailsStructure']['Data'] = $cardCResult['Data'];
    }
}
