<?php

session_start() ;
if (!isset ($_SESSION['user']))
{
	header ("Location:login.php") ;   
	exit ;
}       
   

$result_data = Array();


require_once('mysql_connect.php');
$sql = "select * from users where Username!='{$_SESSION["user"]}'";

#var_dump($sql);die();
$result=mysql_query($sql) or die(mysql_error());

while($row=mysql_fetch_array($result,MYSQL_ASSOC)) {

	$temp = Array();
	$temp["username"] = $row["Username"];
	array_push($result_data, $temp);
	
}

echo json_encode($result_data);
exit();
   

?>
