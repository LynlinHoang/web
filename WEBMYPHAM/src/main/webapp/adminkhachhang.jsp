<%@page import="bean.khachmuahangbean"%>
<%@page import="bean.loaisanphambean"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<style>
.row.content {
	height: 1500px
}

.sidenav {
	background-color: #d9edf7;
	height: 100%;
}

footer {
	background-color: #555;
	color: white;
	padding: 15px;
}

@media screen and (max-width: 767px) {
	.sidenav {
		height: auto;
		padding: 15px;
	}
	.row.content {
		height: auto;
	}
}
</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row content">
			<div class="col-sm-3 sidenav">
				<h4 style="  font-size: 25px;font-family: Forte;margin-left: 24px;color: #1b35aa;"><samp class="glyphicon glyphicon-grain"></samp>Lyn.shop</h4>
				<ul class="nav nav-pills nav-stacked">
					<li><a href="adminxacnhanmhcontroller"><samp class="glyphicon glyphicon-check" ></samp>Xác nhận đơn hàng</a></li>
					<li><a href="adminloaispcontroller"><samp class="glyphicon glyphicon-list-alt"></samp>  Quản lý loại sản phẩm</a></li>
					<li><a href="adminsanphamcontroller"><samp class="glyphicon glyphicon-list-alt"></samp> Quản lý sản phẩm</a></li>
					<li class="active"><a href="#section3"><samp class="glyphicon glyphicon-user"></samp> Danh sách khách hàng</a></li>
				</ul>

				<br>
			</div>

			<div class="col-sm-9">
				<ul class="nav nav-pills nav-stacked" style="text-align: right">
					<li><a href="admindangxuatcontroller"><samp class="glyphicon glyphicon-share" ></samp> Đăng xuất</a></li>
				</ul>
				
				<%
				String msp = (String) request.getAttribute("masp");
				String tensp = (String) request.getAttribute("tensp");
				%>
				<table class="table" aligh="center">
					<thead class="table-primary">
						<tr class="info">
							<th>Mã khách hàng</th>
							<th>Tên khách hàng</th>
							<th>Địa chỉ</th>
							<th>Số điện thoại</th>
							<th>Email</th>
							<th>Tên đăng nhập</th>
							
						</tr>
					</thead>
					<%
					ArrayList<khachmuahangbean> dskh = (ArrayList<khachmuahangbean>) request.getAttribute("dskh");
					for (khachmuahangbean kh : dskh) {
					%>
					<tr>
						<td><%=kh.getMakh()%></td>
						<td><%=kh.getTenkh()%></td>
						<td><%=kh.getDiachi()%></td>
						<td><%=kh.getSodt()%></td>
						<td><%=kh.getEmail()%></td>
						<td><%=kh.getTendn()%></td>
						<%
						}
						%>
					</tr>
					
				</table>



			</div>
</body>
</html>