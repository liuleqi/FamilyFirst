<?php
error_reporting(E_ALL^E_NOTICE);
session_start() ;                   
echo "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" ;
if (isset ($_SESSION['user']))
{
	header ("Location:index.php") ;   
	exit ;
}                       
$username=trim($_POST['username']);  
$password=trim($_POST['password']);
$repassword=trim($_POST['repassword']);

if($username=="" || $password=="" || $repassword=="")
{
	echo "<script language='javascript'>" ;
	echo "alert('username or password!');" ;
	echo "window.location.href='register.php';";
	echo "</script>";
	exit();
}

if ($repassword != $password) {   
	echo "<script language='javascript'>" ;
	echo "alert('password is not equal repassword!');" ;
	echo "window.location.href='register.php';";
	echo "</script>";
	exit();
}


require_once('mysql_connect.php');
$qry="select * from users where Username='$username'";

//var_dump($qry);die();

$result=mysql_query($qry) or die(mysql_error());
$row=mysql_fetch_array($result);
//var_dump($row);die();

if(!$row)
{   
    $colors = array();
    for($i = 0;$i<6;$i++){
        $colors[] = dechex(rand(0,15));
    }
    $color_value = implode('',$colors);


    $sql = "insert into users(Username, Password, Name, Color) values('{$username}',SHA('{$password}'),'{$username}', '{$color_value}')";
    $result=mysql_query($sql) or die(mysql_error());
    echo "<script language='javascript'>" ;
    echo "alert('register success');" ;
    echo "window.location.href='login.php';";
    echo "</script>"; 	   
}
else
{
	mysql_close();
	echo "<script language='javascript'>" ;
	echo "alert('username is exist');" ;
	echo "window.location.href='register.php';";
	echo "</script>";
}
?>
