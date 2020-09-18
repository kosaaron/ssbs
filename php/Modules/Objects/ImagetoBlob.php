<?php

/**
 * ImagetoBlob
 */
class ImagetoBlob
{
    function __construct()
    {
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }
    public function Create($photos)
    {
        $main_data = array();
        $pData = array();

        foreach ($photos as $photo) {
            $path = $photo['PhotoURL'] . $photo['PhotoName'];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $photodata = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($photodata);
            
            $pData['imgId'] = $photo['PhotoId'];
            $pData['imgBlob'] = $base64;
            $pData['imgAlt'] = $photo['PhotoName'];

            array_push($main_data, $pData);

        }
        
        return $main_data;

    }

}
