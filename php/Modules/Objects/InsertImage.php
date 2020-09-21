<?php

/**
 * Insert Image
 */
class InsertImage
{
    function __construct()
    {
        require_once('Modules/Connect.php');
        $PDOConnect = new PDOConnect();
        $this->pdo = $PDOConnect->pdo;
    }
    public function Create($data)
    {
        $main_data = array();

        $data = json_decode($data, true);
        $filesData = $data['FileToUpload'];
        foreach ($filesData as $itemName) {
            $this->uploadImage($itemName);
        }

        //$main_data = $data;
        /*
        $name = $data['Name'];
        $tableId = $data['TableId'];
        $size = $data['Size'];

        $finalSQL = "INSERT INTO `t_7`(`Name`) VALUES ('$name');";
        $finalQueary = $this->pdo->prepare($finalSQL);
        $finalQueary->execute();
        $lastId = $this->pdo->lastInsertId();

        $columnName = "c_$lastId";

        $tableQueary = $this->pdo->query(
            "SELECT 
                c_5_fk,
                c_31 AS TName,
                c_51 AS TableName,
                c_52 AS TableIdName,
             FROM t_5 
             WHERE c_5_id=$tableId"
        );
        $table = $tableQueary->fetch()['TableName'];
        $newColumnSQL = "ALTER TABLE $table ADD $columnName varchar($size)";
        $this->pdo->exec($newColumnSQL);

        $updateSQL = "UPDATE `t_7` SET `c_5_fk`='$tableId',`ColumnName`='$columnName' WHERE `c_7_id`='$lastId';";
        $updateQueary = $this->pdo->prepare($updateSQL);
        $updateQueary->execute();

        if ($updateQueary) {
            $main_data['Result'] = 'S';
        } else {
            $main_data['Result'] = 'F';
        }*/

        return $main_data;
    }

    function uploadImage($name)
    {
        $target_dir = "uploads/img/";
        $target_file = $target_dir . basename($_FILES[$name]["name"]);

        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES[$name]["tmp_name"]);
        if ($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }

        // Check file size
        if ($_FILES[$name]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if (
            $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif"
        ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
            // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES[$name]["tmp_name"], $target_file)) {
                echo "The file " . basename($_FILES[$name]["name"]) . " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }
}
