<?php
error_reporting(E_ALL^E_NOTICE);
session_start();
unset($_SESSION['user']);
header ("Location:index.php") ;  
?>
