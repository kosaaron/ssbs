<?php

class MonthlyCalendar
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

    public function GetTaskData()
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $pdo = $PDOConnect->pdo;

        /** Get monthly task data */
         $result = $pdo->query('SELECT * FROM monthly_tasks')->fetchAll(PDO::FETCH_ASSOC);
        $this->main_data = $result;
    }
}
