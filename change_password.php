<?php
if(!(isset($_GET['act_code']))){
     die("Something went wrong... :(");
}
require_once('php/Modules/Connect.php');

$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

$act_code = $_GET['act_code'];

$query = "SELECT
            c_200_id,
            c_8 AS FirstName,
            c_74 AS LastName,
            c_75 AS UserPassword,
            c_76 AS Email,
            c_77 AS ActivationCode,
            c_78 AS VerificationStatus 
          FROM t_200
            WHERE c_77 = :ActivationCode && c_78=0";
            
$resultSet = $pdo->prepare($query);
$resultSet->execute(
    array(
		':ActivationCode'	=>	$act_code
	)    
);

$no_of_row = $resultSet->rowCount();

if(!($no_of_row == 1)){
    echo $no_of_row;
    die("Invalid validation or already validated device");
}else{
    foreach($resultSet as $result){
        $userId = $result['c_200_id'];
    }
    echo '<script>localStorage.setItem("UserId", '.  $userId . ')</script>';
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>SSB System</title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <link rel="icon" href="images/logo/logo03.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css'
        integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.min.css">
    <!-- <link rel="icon" href="images/favicon.ico" type="image/x-icon"> - Ádám: kell ikon-->
    <link rel="stylesheet" href="css/main.css">
</head>

<body id="body" class="display-flex flex-column">

    <header id="page_header" class="display-flex">
        <div class="header-item flex-1">

        </div>
        <div class="header-item flex-1">

        </div>
        <div class="header-item flex-1">

        </div>
    </header>
    <div id="content_frame" class="flex-1 display-flex flex-row">
        <div id="main_menu">
            <div id="tab_i_101" class="menu-item display-flex flex-column">
                <div class="text-center">
                    <div>
                        <div class="blured-fig"></div>
                    </div>
                    <div>
                        <div class="blured-mid3"></div>
                    </div>
                </div>
            </div>

            <div id="tab_i_102" class="menu-item display-flex flex-column">
                <div class="text-center">
                    <div>
                        <div class="blured-fig"></div>
                    </div>
                    <div>
                        <div class="blured-mid3"></div>
                    </div>
                </div>
            </div>

            <div id="tab_i_103" class="menu-item display-flex flex-column menu-item-active">
                <div class="text-center">
                    <div>
                        <div class="blured-fig"></div>
                    </div>
                    <div>
                        <div class="blured-mid3"></div>
                    </div>
                </div>
            </div>

            <div id="tab_i_104" class="menu-item display-flex flex-column">
                <div class="text-center">
                    <div>
                        <div class="blured-fig"></div>
                    </div>
                    <div>
                        <div class="blured-mid3"></div>
                    </div>
                </div>
            </div>

            <div id="tab_i_105" class="menu-item display-flex flex-column">
                <div class="text-center">
                    <div>
                        <div class="blured-fig"></div>
                    </div>
                    <div>
                        <div class="blured-mid3"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="content_shell" class="flex-1">
            <div id="content">
                <div id="tab_c_103" class="menu-content">
                    <div class="finance-shell display-flex flex-column full-screen">
                        <div class="display-flex flex-row">
                            <div id="tab_102_stab_1003" class="102-subtab finance-subtab flex-1">
                                <div class="blured-mid4"></div>
                            </div>
                            <div id="tab_102_stab_1004" class="102-subtab finance-subtab flex-1 finance-subtab-active">
                                <div class="blured-mid4"></div>
                            </div>
                            <div id="tab_102_stab_1005" class="102-subtab finance-subtab flex-1">
                                <div class="blured-mid5"></div>
                            </div>
                            <div id="tab_102_stab_1006" class="102-subtab finance-subtab flex-1">
                                <div class="blured-mid4"></div>
                            </div>
                            <div id="tab_102_stab_1007" class="102-subtab finance-subtab flex-1">
                                <div class="blured-mid5"></div>
                            </div>
                            <div id="tab_102_stab_1008" class="102-subtab finance-subtab flex-1">
                                <div class="blured-mid4"></div>
                            </div>
                        </div>
                        <div id="tab_103_mdl" class="flex-fill full-screen auto-scroll-default" style="height: 915px;">
                            <div id="prtnrm" class="display-flex flex-row full-screen">
                                <div id="prtnrm_1" class="flex-fill col-2 filter-box">
                                    <h5 class="taskfilter-title"><i class="fas fa-filter"></i>Szűrők</h5>
                                    <div id="prtnrm_filters" class="task-filters">
                                        <div class="blured-small blured-filter"></div>
                                        <div class="blured-mid2 blured-filter"></div>
                                        <div class="blured-mid2 blured-filter"></div>
                                    </div>
                                    <h5 class="taskfilter-title"><i class="fas fa-sort-amount-down-alt"></i>Rendezés
                                    </h5>
                                    <div id="prtnrm_sorts" class="task-filters">
                                        <div class="blured-small blured-filter"></div>
                                        <div class="blured-mid2 blured-filter"></div>
                                        <div class="blured-small blured-filter"></div>
                                        <div class="blured-mid2 blured-filter"></div>
                                    </div>
                                </div>
                                <div class="card-container col-7">
                                    <div id="prtnrm_2" class="row">
                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_1" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="1">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_2" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="2">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_9" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="9">
                                                <div class="card-body">
                                                    <div class="blured-mid2"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_10" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="10">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_11" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="11">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_13" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="13">
                                                <div class="card-body">
                                                    <div class="blured-mid2"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_14" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="14">
                                                <div class="card-body">
                                                    <div class="blured-mid2"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_15" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="15">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_16" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="16">
                                                <div class="card-body">
                                                    <div class="blured-mid2"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_17" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="17">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_18" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="18">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_19" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="19">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_21" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="21">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_22" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="22">
                                                <div class="card-body">
                                                    <div class="blured-mid2"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_23" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="23">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_24" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="24">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_25" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="25">
                                                <div class="card-body">
                                                    <div class="blured-mid2"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_26" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="26">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_27" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="27">
                                                <div class="card-body">
                                                    <div class="blured-mid"></div>
                                                    <div class="blured-small"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="prtnrm_2_card_28" class="card taskcard prtnrm_2-show-details"
                                                data-place="prtnrm_2" object-id="28">
                                                <div class="card-body">
                                                    <div class="blured-mid2"></div>
                                                    <div class="blured-short"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="prtnrm_3" class="col-3 cc-details">
                                    <h2 id="prtnrm_3_title" class="name-grey">
                                        <div class="blured-large"></div>
                                    </h2>
<!--                                     <div class="display-flex justify-content-center">
                                        <div id="prtnrm_3_tab" class="btn-group btn-group-toggle btn-group-detailmenu"
                                            data-toggle="buttons"><label id="prtnrm_3_data_btn"
                                                class="prtnrm_3_tab btn btn-detail-menu">Adatok</label><label
                                                id="prtnrm_3_content_2_tab"
                                                class="prtnrm_3_tab btn btn-detail-menu btn-detail-menu-active active"
                                                aria-pressed="true">Lépések</label><label id="prtnrm_3_content_1_tab"
                                                class="prtnrm_3_tab btn btn-detail-menu">Rendelések</label></div>
                                    </div> -->
                                    <div id="prtnrm_3_content" class="co-shell auto-scroll-default"
                                        style="height: 793px;">
                                        <div id="prtnrm_3_cdb_g" class="prtnrm_3_content" style="display: none;">

                                        </div>
                                        <div id="prtnrm_3_content_2" class="prtnrm_3_content task-timeline">
                                            <li>
                                                <div class="task-timeline-item">
                                                    <span class="">1</span>
                                                    <div class="task-timeline-item-content">
                                                        <a data-toggle="collapse" href="#prtnrm_3_content_2_1"
                                                            role="button" aria-expanded="false"
                                                            aria-controls="task_timel" class="collapsed">
                                                            <div class="blured-mid"></div>
                                                        </a>
                                                        <div id="prtnrm_3_content_2_1" class="collapse">
                                                            <div class="row add-employee-card">
                                                                <div employee="prtnrm_3_content_2_1_Ádám"
                                                                    class="btn btn-sm employee-box employee-button">
                                                                    <i
                                                                        class="addemployee-icon fas fa-check empl-status-ready"></i>
                                                                    <div class="blured-short"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="task-timeline-item">
                                                    <span class="actual-step">2</span>
                                                    <div class="task-timeline-item-content">
                                                        <a data-toggle="collapse" href="#prtnrm_3_content_2_2"
                                                            role="button" aria-expanded="true"
                                                            aria-controls="task_timel" class="">
                                                            <div class="blured-mid2"></div>
                                                        </a>
                                                        <div id="prtnrm_3_content_2_2" class="collapse show">
                                                            <div class="row add-employee-card">
                                                                <div employee="prtnrm_3_content_2_2_Áron"
                                                                    class="btn btn-sm employee-box employee-button">
                                                                    <i
                                                                        class="addemployee-icon fas fa-user empl-status-work"></i>
                                                                    <div class="blured-short"></div><i
                                                                        id="prtnrm_3_content_2_2_Áron_check"
                                                                        class="tsk-way-empl-icon-check fas fa-check"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="task-timeline-item">
                                                    <span class="">3</span>
                                                    <div class="task-timeline-item-content">
                                                        <a data-toggle="collapse" href="#prtnrm_3_content_2_3"
                                                            role="button" aria-expanded="true"
                                                            aria-controls="task_timel" class="">
                                                            <div class="blured-mid2"></div>
                                                        </a>
                                                        <div id="prtnrm_3_content_2_3" class="collapse show">
                                                            <div class="row add-employee-card">
                                                                <div employee="prtnrm_3_content_2_3_Ádám"
                                                                    class="btn btn-sm employee-box employee-button">
                                                                    <i
                                                                        class="addemployee-icon fas fa-user empl-status-work"></i>
                                                                    <div class="blured-short"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="task-timeline-item">
                                                    <span class="">4</span>
                                                    <div class="task-timeline-item-content">
                                                        <a data-toggle="collapse" href="#prtnrm_3_content_2_4"
                                                            role="button" aria-expanded="true"
                                                            aria-controls="task_timel" class="">
                                                            <div class="blured-mid"></div>
                                                        </a>
                                                        <div id="prtnrm_3_content_2_4" class="collapse show">
                                                            <div class="row add-employee-card">
                                                                <div employee="prtnrm_3_content_2_4_Ádám"
                                                                    class="btn btn-sm employee-box employee-button">
                                                                    <i
                                                                        class="addemployee-icon fas fa-user empl-status-work"></i>
                                                                    <div class="blured-short"></div>
                                                                </div>
                                                            </div>
                                                            <div class="row add-employee-card">
                                                                <div employee="prtnrm_3_content_2_4_Dávid"
                                                                    class="btn btn-sm employee-box employee-button">
                                                                    <i
                                                                        class="addemployee-icon fas fa-user empl-status-work"></i>
                                                                    <div class="blured-short"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                        <div id="prtnrm_3_content_1" style="display: none;" class="prtnrm_3_content">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="darkened-bg">

    </div>
    <div class="dnmcppp-container display-flex flex-column login-popup">
        <div class="dnmcppp-header">Jelszó létrehozása</div>
        <div class="dnmcppp-content flex-1 password-popup-content">
            <div class="new-password-form-container">
                    <div class="password-form">
                        <i class="fas fa-user-circle profile-picture profile-picture-dark"></i>
                        <h3 id="username"></h3>
                        <input value="" type="password" name="new_password1" id="new_password1" class="form-control newpassword-formcontrol" placeholder="Jelszó" required autofocus></input>
                        <input value="" type="password" name="new_password1" id="new_password2" class="form-control newpassword-formcontrol" placeholder="Jelszó ismét" required></input>
                    </div>
            </div>
        </div>
        <div class="dnmcppp-footer">
            <div id="btn_create_password" class="save-btn-1 btn btn-sm">
                létrehoz
            </div>
        </div>
    </div>
    <div id="password_message" class="toast-message">
            
    </div>
    <script src="js/new_password.js"></script>
</body>

</html>



