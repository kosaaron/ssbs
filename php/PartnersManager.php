<?php
include('Connect.php');
include('Modules/QueryByStructure.php');
include('Modules/CreateFilter.php');
include('Modules/DataAndStructure.php');

//Post varibles
$userId = 1;

//Local varibles
$main_data = array();

/** Partner's manager filters */
$createFilter = new CreateFilter();
$fltrStructure = $createFilter->DefaultFilter($userId, "prtnrfltr");
$main_data['Filters'] = $fltrStructure;

/** Partner's manager data */
$dataAndStructure = new DataAndStructure();
$cardCResult = $dataAndStructure->CardContainer($userId, "prtnrmd", "partners");
$main_data['DataStructure'] = $cardCResult['DataStructure'];


foreach ($cardCResult['Data'] as $row) {
    $tags = $pdo->query('SELECT PartnerTagId, partner_tags.Name FROM partner_tags WHERE (' . $row['PartnerId'] . '=PartnerFK)')->fetchAll(PDO::FETCH_ASSOC);
    
    $contWhereCond='WHERE (' . $row['PartnerId'] . '=PartnerFK)';
    $contacts = $dataAndStructure->CardContainer($userId, "prtnrdcnt", "partner_contact", $contWhereCond);

    $row['Tags'] = $tags;
    $row['Contacts'] = $contacts;
    $main_data['Data'][] = $row;
}

/** Partner's manager details */
$cardCResult = $dataAndStructure->Details($userId, "prtnrdtls");
$main_data['DetailsStructure']['Names'] = $cardCResult['Names'];
$main_data['DetailsStructure']['Data'] = $cardCResult['Data'];

/** Finish */
$json = json_encode($main_data);
print_r($json);
