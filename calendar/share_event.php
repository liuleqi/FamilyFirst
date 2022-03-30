<?php
error_reporting(E_ALL^E_NOTICE);
session_start() ;
if (!isset ($_SESSION['user']))
{
	header ("Location:login.php") ;   
	exit ;
}

if (!isset($_GET["share_user"])) {
	
	echo "<script language='javascript'>" ;
	echo "alert('share user is null');" ;
	echo "window.location.href='index.php';";
	echo "</script>";	
	
}

$share_user = $_GET["share_user"];

require_once('mysql_connect.php');
$sql = "select * from event_user where UseridFrom='{$_SESSION["user"]}' and UseridTo='{$share_user}'";

$result=mysql_query($sql) or die(mysql_error());
$row=mysql_fetch_array($result,MYSQL_ASSOC);
if(!$row) {
	
	$sql = "insert into event_user(UseridFrom, UseridTo) value('{$_SESSION["user"]}', '{$share_user}')";
	$result=mysql_query($sql) or die(mysql_error());

}


echo "<script language='javascript'>" ;
echo "alert('share user success');" ;
echo "window.location.href='index.php';";
echo "</script>";	
   

?>
