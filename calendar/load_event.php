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



$result_data = Array();
if($activity_startTime=="" || $activity_endTime=="")
{
    echo json_encode($result_data);
	exit();
}



require_once('mysql_connect.php');
$sql = "select * from events where Starttime>'{$activity_startTime} 00:00:00' and Starttime<'{$activity_endTime} 00:00:00' and (User='{$_SESSION["user"]}' or User in (select UseridFrom from event_user where UseridTo='{$_SESSION["user"]}'))";

//var_dump($sql);die();

#var_dump($sql);die();
$result=mysql_query($sql) or die(mysql_error());

while($row=mysql_fetch_array($result,MYSQL_ASSOC)) {

	$temp = Array();
	$temp["startTime"] = $row["Starttime"];
	$temp["endTime"] = $row["Endtime"];
	$temp["title"] = $row["Content"];
	$temp["user"] = $row["User"];
	
	
	$sql_color = "select Color from Users where Username='{$row["User"]}'";
	$result_color=mysql_query($sql_color) or die(mysql_error());
	$row_color=mysql_fetch_array($result_color,MYSQL_ASSOC);
	$temp["color"] = "7589b8";
	if($row_color) {
		
		$temp["color"] = $row_color["Color"];
	}
	
	$temp["id"] = $row["ID"];
	array_push($result_data, $temp);
	
}

echo json_encode($result_data);
exit();
   

?>
