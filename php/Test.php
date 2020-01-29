<?php
/**
 * Define MyClass
 */
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
$obj->printHello(); // Shows Public, Protected and Private*/

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