<?php
error_reporting(E_ALL^E_NOTICE);
session_start() ;                  
echo "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" ;
if (isset ($_SESSION['user']))
{
	header ("Location:index.php") ;    
	exit ;
}                       
$user_name=trim($_POST['username']);    
$password=trim($_POST['password']);
if($user_name=="" || $password=="")
{
	echo "<script language='javascript'>" ;
	echo "alert('username or password is null!');" ;
	echo "window.location.href='login.php';";
	echo "</script>";
	exit();
}
//check username
require_once('mysql_connect.php');
$qry="select * from users where Username='$user_name' and Password=SHA('$password') and status=1";
$result=mysql_query($qry) or die(mysql_error());
$row=mysql_fetch_array($result,MYSQL_ASSOC);

if($row)
{
	$_SESSION["user"]=$user_name ;        //save session

	mysql_close();
	echo "<script language='javascript'>window.location.href='index.php';</script>" ;
}
else
{
	mysql_close();
	echo "<script language='javascript'>" ;
	echo "alert('username or password error');" ;
	echo "window.location.href='login.php';";
	echo "</script>";
}
?>
