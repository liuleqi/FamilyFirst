<?php
error_reporting(E_ALL^E_NOTICE);
session_start() ;
if (!isset ($_SESSION['user']))
{
	header ("Location:login.php") ;   
	exit ;
}       
 
$activity_id=trim($_POST['activity_id']);  




$result_data = Array();
if($activity_id=="")
{
    echo "param error";
	exit();
}



require_once('mysql_connect.php');
$sql = "delete from events where ID={$activity_id}";

#var_dump($sql);die();
$result=mysql_query($sql) or die(mysql_error());


$result_data["result"] = "sucess";

echo json_encode($result_data);
exit();
   

?>
