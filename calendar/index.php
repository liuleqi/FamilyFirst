<?php
error_reporting(E_ALL^E_NOTICE);
session_start() ;                   
echo "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" ;
if (!isset($_SESSION['user']))
{
	header ("Location:login.php") ;   
	exit ;
}
?>
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <link href="css/calendar.css" rel="stylesheet" type="text/css"/>
	<link href="css/index.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/calendar.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){
    	var calendar = new Calendar({
    		renderTo : 'activity',
    		loadDate : $("#search_date").val(),
    		});
    	});
    </script>
  </head>
  <body onselectstart="return false" style="-moz-user-select: none;">
    <div class="header">
	<span class="header-logo">Calendar</span>
	<span class="header-user">hello,&nbsp; <?php echo $_SESSION['user'];?>, &nbsp;<a href="logout.php">logout</a></span>
	</div>
	<input type="hidden" name="search_date" id="search_date" value="<?php if(isset($_GET["searchDate"])) {echo $_GET["searchDate"];} else { echo "";}?>" />
    <div id="calendar"></div>
  </body>
</html>