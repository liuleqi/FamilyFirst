<!DOCTYPE html>
<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]><html class="lt-ie9"> <![endif]-->
<head>
  <meta charset="UTF-8">
  <title>Calendar | Register</title>
  <link href="css/login.css" rel="stylesheet" type="text/css"/>
  <script type="text/javascript" src="js/jquery.js"></script>
  <script>
    function checkform(){
	    var username = $("#username").val();
		var password = $("#password").val();
		var repassword = $("#repassword").val();
		if(username.length == 0){
		    alert("username is null");
			$("#username").focus();
			return false;
		}
		if( password.length == 0){
		    alert("password is null");
			$("#password").focus();
			return false;
		}	

		if( repassword.length == 0){
		    alert("repassword is null");
			$("#repassword").focus();
			return false;
		}
		if( repassword != password){
		    alert("password is not equal repassword");
			$("#password").focus();
			return false;
		}
		return true;
	}
</script>  
</head>
<body>
<div class="login-wrapper">
	<div style="padding: 8px;">
		<div class="login-box">
			<form method="post" action="checkregister.php">
				<h3>Register</h3>
				<div class="form-group input-group-lg">
					<label class="sr-only" for="user_name">username</label>
					<input id="username" class="form-control" name="username" type="text" placeholder="username">
				</div>     
				        
				<div class="form-group input-group-lg">
					<label class="sr-only" for="password">password</label>
					<input id="password" class="form-control" name="password" type="password" placeholder="password">
				</div>

				<div class="form-group input-group-lg">
					<label class="sr-only" for="password">repassword</label>
					<input id="repassword" class="form-control" name="repassword" type="password" placeholder="repassword">
				</div>
				         
				<div class="form-group input-group-lg" style="margin-top:20px">
					<input onclick="return checkform()" type="submit" name="submit" class="btn btn-primary btn-lg btn-block" value=" register ">
					<a href="login.php"><input style="background-color: green;margin-top: 10px;" type="button" name="button" class="btn btn-primary btn-lg btn-block" value=" login "></a>
				</div>
			</form>
		
		</div>
	</div>
</div>
</body>
</html> 