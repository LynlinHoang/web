<!DOCTYPE html>
<%@page import="bean.khachmuahangbean"%>
<%@page import="bo.giomuahangbo"%>
<%@page import="bean.loaisanphambean"%>
<%@page import="bean.sanphambean"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zxx">

<head>
<meta charset="UTF-8">
<meta name="description" content="Ogani Template">
<meta name="keywords" content="Ogani, unica, creative, html">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Ogani | Template</title>
<link rel="stylesheet" type="text/css" href="trangChu.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<!-- Google Font -->
<link
	href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;900&display=swap"
	rel="stylesheet">

</head>

<body>

	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">lyn.shop</a>
		</div>
		<div class="navbar-body">
			<ul class="nav navbar-nav">
				<li><a href="trangchucontroller"><span class="glyphicon glyphicon-home"></span>
						Home</a></li>
						<%
								giomuahangbo gioHang = (giomuahangbo) session.getAttribute("gh");
								long soLuong = 0;
								if (gioHang != null)
									soLuong = gioHang.slgh();
						%>
				<li><a href="htgiohangcontroller"><span
						class="glyphicon glyphicon-shopping-cart"></span>(<%=soLuong%>)</a></li>
				<li><a href="lichsumuahangcontroller"><span class="glyphicon glyphicon-list-alt"></span> Lịch sử mua hàng</a></li>
			</ul>
			<form class="navbar-form navbar-left" action="trangchucontroller">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search" name="texttk">
				</div>
				<button type="submit" class="btn btn-default">
					<span class="glyphicon glyphicon-search"></span>
				</button>
			</form>
			<ul class="nav navbar-nav navbar-right">
	  			 <%
				if (session.getAttribute("kh") != null) {
					khachmuahangbean kh = (khachmuahangbean) session.getAttribute("kh");
				%>
				<li><a href=""><span
						class="glyphicon glyphicon-user"></span><%=kh.getTenkh()%></a></li>
				<li><a href="dangxuatmpcontroller"><span
						class="glyphicon glyphicon-log-out"></span> Đăng Xuất</a></li>
				<%
				}
				%> 
				</ul>
			<ul class="nav navbar-nav navbar-right">	
			  <%
				if (session.getAttribute("kh") == null) {
					khachmuahangbean kh = (khachmuahangbean) session.getAttribute("kh");
			  %> 
				<li><a href="#" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-user"></span> Đăng nhập</a></li>
				<li><a href="dangxuatcontroller" data-toggle="modal" data-target="#myModal2"><span
						class="glyphicon glyphicon-log-out"></span> Đăng ký</a></li>
						
						
			<div class="modal fade" id="myModal" role="dialog">
					<div class="modal-dialog">
							<div class="center">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<div class="header">Login Form</div>
								<form class="form_dn"  method="post" action="dangnhapmpcontroller">
									<input type="text" name="txtname" placeholder="Username"> 
									<input  type="password" name="txtpass" placeholder="Password"> 
									<input type="submit" value="Sign in">
								</form>
							</div>
					</div>
				</div>				
				<div class="modal fade" id="myModal2" role="dialog">
					<div class="modal-dialog">
						<div class="center">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<div class="header">Register Form</div>
							<form class="form_dn" method="post" action="dangkympcontroller">
								<input type="text" name="txtht" placeholder="Nhập họ tên"> 								
								<input type="text"name="txtdc" placeholder="Nhập địa chỉ"> 
								<input type="text" name="txtsdt" placeholder="Nhập số điện thoại">
								<input type="text" name="txtemail" placeholder="Nhập email">
								<input type="text" name="txtun" placeholder="Nhập tên đăng nhập">
								<input type="text" name="txtp"placeholder="Nhập Password"> 
								<input type="submit" value="Sign in">
							</form>
						</div>
					</div>
				</div>
				
			</ul>
			<%} %>
			
		</div>
		


	</div>


	<section class="section-showcase">
		<div class="container">
			<div class="row">
				<div class="col-md-3 col-lg-3">
					<nav class="main-nav"">
						<h3>
							<span class="glyphicon glyphicon-list"></span> DANH MỤC SẢN PHẨM
						</h3>
						<ul class="main-nav-ul">
							<%
							ArrayList<loaisanphambean> dsloai = (ArrayList<loaisanphambean>) request.getAttribute("dsloai");
							for (loaisanphambean dsl : dsloai) {
							%>
							<li class="has-sub"><a
								href="trangchucontroller?ml=<%=dsl.getMaloai()%>"><%=dsl.getTenloai()%><samp
										class="sub-arrow"></samp></a></li>

							<%
							}
							%>
						</ul>
					</nav>
				</div>
				<div class="col-md-9 col-lg-9 block-main-silder">
					<div id="myCarousel" class="carousel slide" data-ride="carousel">
						<!-- Indicators -->
						<ol class="carousel-indicators">
							<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
							<li data-target="#myCarousel" data-slide-to="1"></li>
							<li data-target="#myCarousel" data-slide-to="2"></li>
						</ol>

						<!-- Wrapper for slides -->
						<div class="carousel-inner">
							<div class="item active">
								<img src="nav1.jpg" style="width: 100%;">
							</div>

							<div class="item">
								<img src="nav1.jpg"  style="width: 100%;">
							</div>

							<div class="item">
								<img src="nav1.jpg"  style="width: 100%;">
							</div>
						</div>

						<!-- Left and right controls -->
						<a class="left carousel-control" href="#myCarousel"
							data-slide="prev"> <span
							class="glyphicon glyphicon-chevron-left"></span> <span
							class="sr-only">Previous</span>
						</a> <a class="right carousel-control" href="#myCarousel"
							data-slide="next"> <span
							class="glyphicon glyphicon-chevron-right"></span> <span
							class="sr-only">Next</span>
						</a>
					</div>
				</div>
			</div>
		</div>

	</section>
<br>
<br>	 
	<div class="container">
			<h2 class="text-center" style="font-family: italic; color: white;">SẢN PHẨM</h2>
	</div>

	<div class="container">
		<div class="row">
			<br>

			<%
			ArrayList<sanphambean> dssanpham = (ArrayList<sanphambean>) request.getAttribute("dssanpham");
			for (sanphambean sp : dssanpham) {
			%>

			<div class="col-lg-3 col-lg-6 col-md-6 mb-4">
				<div class="card">
					<div
						class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
						data-mdb-ripple-color="light">
						<img  style="width:225px; height: 225px;" src="<%=sp.getAnh()%>" class="w-80" > 
												
					</div>
					<div class="card-body">
						<div class="mask">
								<div class="d-flex justify-content-start align-items-end h-100">
									<h4 class="text-danger text-center">
										<%=sp.getGia()%>.000đ
										<a href="giohangcontroller?msp=<%=sp.getMasanpham()%>&tsp=<%=sp.getTensanpham()%>&gia=<%=sp.getGia()%>" class="text-warning" ><span class="glyphicon glyphicon-shopping-cart"></span></a>									
									</h4>
									
								</div>
							</div>
						<a class="text-secondary text-center">
							<h5 class="card-title mb-2"><%=sp.getTensanpham()%></h5></a>
					</div>
				</div>
			</div>

			<%
			}
			%>

		</div>
	</div>

	</div>
</body>

</html>