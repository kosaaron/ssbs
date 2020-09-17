<?php
require_once("./../Objects/ImagetoBlob.php");

/**
 * Display Gallery
 */
class DisplayGallery
{
    function __construct()
    {
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }

    public function createData($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable)
    {
        /** Includes */
        //GetData
        // require_once('Modules/GetData.php');
        // $getData = new GetData('ManualFiltering', false);

        $photos = array();
        // $main_data = $getData->Create($fModulePluginFK, $fPluginPluginFK, $fCustomPluginId, $pluginTable);

        $imgUrl = './../../resize_image_test/images';

        $photos[]['PhotoId'] = '1';
        $photos[]['PhotoURL'] = $imgUrl;
        $photos[]['PhotoName'] = 'testpic1.jpg';

        $photos[]['PhotoId'] = '2';
        $photos[]['PhotoURL'] = $imgUrl;
        $photos[]['PhotoName'] = 'testpic2.jpg';

        $photos[]['PhotoId'] = '3';
        $photos[]['PhotoURL'] = $imgUrl;
        $photos[]['PhotoName'] = 'testpic3.jpg';

        $photos[]['PhotoId'] = '4';
        $photos[]['PhotoURL'] = $imgUrl;
        $photos[]['PhotoName'] = 'testpic4.jpg';

        $main_data = array();

        $imagetoBlob = new ImagetoBlob();
        $main_data[1]['Title'] = "Galéria";
        $main_data[1]['Display'] = $imagetoBlob->Create($photos);

        return $main_data;
    }
}
