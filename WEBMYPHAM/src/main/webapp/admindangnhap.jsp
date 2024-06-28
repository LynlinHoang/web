<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<style>
body{
			margin: 0;
			padding: 0;
			background: #0e1b3d;
		}
		.center{
			width: 430px;
			margin: 130px auto;
			position: relative;
		}
		.center .header{
			font-size: 28px;
			font-weight: bold;
			color: white;
			padding: 25px 0 30px 25px;
			background: #344eba;
		}
		.center form{
			position: absolute;
			background: white;
			width: 100%;
			padding: 50px 10px 0 30px;
			border: 1px solid #344eba;
			border-radius: 0 0 5px 5px;
		}
		form input{
			height: 50px;
			width: 90%;
			padding: 0 10px;
			border-radius: 3px;
			border: 1px solid silver;
			font-size: 18px;
			outline: none;
			margin-top: 20px;
			font-size: 15px;
		
		}
		form input[type="submit"]{
			margin-top: 40px;
			margin-bottom: 40px;
			width: 130px;
			height: 45px;
			color: white;
			cursor: pointer;
			line-height: 45px;
			border-radius: 45px;
			border-radius: 5px;
			background: #344eba;
		}

}
</style>
</head>
<body>
	<div class="center">
		<div class="header">Login Form</div>
		<form method="post" action="admindangnhapcontroller">
			<input type="text" name="textus"placeholder="Username">	
			<input  type="password" name="textps" placeholder="Password">
			<input type="submit" value="Sign in">
			
		</form>
	</div>
	
</html>