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
         $i=0;
         foreach ($result as $row) {
             
             $row['MonthlyTaskId'] = (int) $row['MonthlyTaskId'];
             $row['StartYear'] = (int) $row['StartYear'];
             $row['StartMonth'] = (int) $row['StartMonth'];
             $row['StartDay'] = (int) $row['StartDay'];
             $row['EndYear'] = (int) $row['EndYear'];
             $row['EndMonth'] = (int) $row['EndMonth'];
             $row['EndDay'] = (int) $row['EndDay'];
             $row['Length'] = (int) $row['Length'];
             $row['State'] = (boolean) $row['State'];
             $result[$i] = $row;
             $i++;
         }
        $this->main_data = $result;
    }
}
