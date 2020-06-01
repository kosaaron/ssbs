<?php

/**
 * Card box
 */
class CardBox
{
    function __construct()
    {
        require_once('Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;

        
    }
}
