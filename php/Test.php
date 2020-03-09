<?php
/**
 * Define MyClass
 */
/*
class MyClass
{
    public $public = 'Public';
    protected $protected = 'Protected';
    private $private = 'Private';

    function printHello()
    {
        echo $this->public;
        echo $this->protected;
        echo $this->private;
    }
}
$test='valami';
echo $test;

/*
$obj = new MyClass();
echo $obj->public; // Works
//echo $obj->protected; // Fatal Error
//echo $obj->private; // Fatal Error
$obj->printHello(); // Shows Public, Protected and Private

$data = array(
    "table1" => array(
        "column1" => "data1",
        "column2" => "data2",
        "column3" => "data3",
    ),
    "table2" => array(
        "column1" => "data4",
        "column2" => "data5",
        "column3" => "data6",
    )
);
$data = json_encode($data);

print_r($data);
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="sample.csv"');
$data = array(
        'aaa,bbb,ccc,dddd',
        '123,456,789',
        '"aaa","bbb"'
);

$fp = fopen('php://output', 'wb');
foreach ( $data as $line ) {
    $val = explode(",", $line);
    fputcsv($fp, $val);
}
fclose($fp);*/
$to = "adamprofi20@gmail.com";
$subject = "My subject";
$txt = "Hello world!";
$headers = "From: webmaster@example.com" . "\r\n" .
"CC: somebodyelse@example.com";

mail($to,$subject,$txt,$headers);
