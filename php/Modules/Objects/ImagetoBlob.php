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

        foreach ($photos as $photo) {
            $path = $photo["PhotoURL"] . $photo["PhotoName"];
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $photodata = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($photodata);
            
            $main_data[]["imgId"] = $photo["PhotoId"];
            $main_data[]["imgBlob"] = $base64;
            $main_data[]["imgAlt"] = $photo["PhotoName"];
            
        }
        
        return $main_data;

    }

}
