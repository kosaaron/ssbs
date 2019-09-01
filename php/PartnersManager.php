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
    $contacts = $pdo->query('SELECT PartnerContactId, partner_contact.Name, Email, Phone, partner_contact.Address FROM partner_contact WHERE (' . $row['PartnerId'] . '=PartnerFK)')->fetchAll(PDO::FETCH_ASSOC);

    $row['Tags'] = $tags;
    $row['Contacts'] = $contacts;
    $main_data['Data'][] = $row;
}

/** Partner's manager details */
$resultTDtlsStructure = $pdo->query('SELECT ColumnName, dtls_structures.Name FROM dtls_structures WHERE (' . $userId . '=EmployeeFK && Place="prtnrdtls") ORDER BY Number')->fetchAll();
$structureTDtls = array();
$namesTDtls = array();
foreach ($resultTDtlsStructure as $row) {
    array_push($structureTDtls, $row['ColumnName']);
    array_push($namesTDtls, $row['Name']);
}
$main_data['DetailsStructure']['Data'] = $structureTDtls;
$main_data['DetailsStructure']['Names'] = $namesTDtls;

/** Finish */
$json = json_encode($main_data);
print_r($json);
