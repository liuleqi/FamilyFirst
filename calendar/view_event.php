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
$sql = "select * from events where ID={$activity_id}";

#var_dump($sql);die();
$result=mysql_query($sql) or die(mysql_error());

$row=mysql_fetch_array($result,MYSQL_ASSOC);
if(!$row) {
	echo "not activity";
	exit();
	
	
}

$result_data["startTime"] = $row["Starttime"];
$result_data["endTime"] = $row["Endtime"];
$result_data["title"] = $row["Content"];
$result_data["user"] = $row["User"];
$result_data["id"] = $row["ID"];
echo json_encode($result_data);
exit();
   

?>
