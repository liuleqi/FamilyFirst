<?php
error_reporting(E_ALL^E_NOTICE);
session_start() ;
if (!isset ($_SESSION['user']))
{
	header ("Location:login.php") ;   
	exit ;
}       
   
$activity_startTime=trim($_POST['activity_startTime']);  
$activity_endTime=trim($_POST['activity_endTime']);
$activity_title=trim($_POST['activity_title']);


$result_data = Array("returnStr"=>"error", "id"=>-1);
if($activity_startTime=="" || $activity_endTime=="" || $activity_title=="")
{
    echo json_encode($result_data);
	exit();
}

require_once('mysql_connect.php');
$sql = "insert into Events(Starttime, Endtime, Content, User, Createtime) values('{$activity_startTime}', '{$activity_endTime}','{$activity_title}', '{$_SESSION["user"]}', NOW())";
$result=mysql_query($sql) or die(mysql_error());

$event_id = mysql_insert_id();

$result_data["returnStr"] = "success";
$result_data["id"] = $event_id;

echo json_encode($result_data);
exit();
   

?>
