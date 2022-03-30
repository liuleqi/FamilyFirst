<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <title>Calendar | Login</title>
  <link href="css/login.css" rel="stylesheet" type="text/css"/>
  <script type="text/javascript" src="js/jquery.js"></script>
  <style type="text/css">
  </style>
  <script>
    function checkform(){
	    var username = $("#username").val();
		var password = $("#password").val();
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
		return true;
	}
</script>  
</head>
<body>
<div class="login-wrapper">
	<div style="padding: 8px;">
		<div class="login-box">
			<form method="post" action="checklogin.php">
				<h3>Login</h3>
				<div class="form-group input-group-lg">
					<label class="sr-only" for="user_name">username</label>
					<input id="username" class="form-control" name="username" type="text" placeholder="username">
				</div>             
				<div class="form-group input-group-lg">
					<label class="sr-only" for="password">password</label>
					<input id="password" class="form-control" name="password" type="password" placeholder="password">
				</div>
				<!-- 
				<div class="form-group input-group-lg">
					<label class="sr-only" for="code">验证码</label>
					<input class="form-control" name="code" type="text" placeholder="验证码">
					<img src='{:U('code?rand='.NOW_TIME)}' onClick="imgloading()" id="code"> (<span onclick="imgloading();" style="color:#3399FF">点击刷新</span>)
				</div>  -->            
				<div class="form-group input-group-lg" style="margin-top:20px">
					<input onclick="return checkform()" type="submit" name="submit" class="btn btn-primary btn-lg btn-block" value=" login ">
					<a href="register.php"><input style="background-color: green;margin-top: 10px;" type="button" name="button" class="btn btn-primary btn-lg btn-block" value=" register "></a>
				</div>
			</form>
		
		</div>
	</div>
</div>
</body>
</html> 