<?php
error_reporting(E_ALL^E_NOTICE);
session_start() ;
if (!isset ($_SESSION['user']))
{
	header ("Location:login.php") ;   
	exit ;
}       

   
$activity_id=trim($_POST['activity_id']);  
$activity_title=trim($_POST['activity_title']);


$result_data = Array("returnStr"=>"error", "id"=>-1);

if($activity_id=="" || $activity_title=="")
{
    echo "param error";
	exit();
}

require_once('mysql_connect.php');
$sql = "update Events set Content='{$activity_title}' where ID={$activity_id}";

$result=mysql_query($sql) or die(mysql_error());



$result_data["returnStr"] = "success";


echo json_encode($result_data);
exit();
   

?>
