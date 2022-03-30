<?php
include "mysql_config.php";

//connect
$dbc=@mysql_connect($db_host,$db_user,$db_pass) OR die('cannot connect!'.mysql_error());
//select db
@mysql_select_db($db_name) OR die('cannot select!'.mysql_error());
mysql_query("SET NAMES 'UTF8'");
?>
