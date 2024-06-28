<%@page import="bean.sanphambean"%>
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
					<li class="active"><a href="adminsanphamcontroller"><samp class="glyphicon glyphicon-list-alt"></samp> Quản lý sản phẩm</a></li>
					<li ><a href="adminkhachhangmpcontroller"><samp class="glyphicon glyphicon-user"></samp> Danh sách khách hàng</a></li>
				</ul>
				<br>
			</div>

			<div class="col-sm-9">
				<ul class="nav nav-pills nav-stacked" style="text-align: right">
					<li><a href="admindangxuatcontroller"><samp class="glyphicon glyphicon-share" ></samp> Đăng xuất</a></li>
				</ul>
		<%
				String msp = (String) request.getAttribute("msp");
				String tensp = (String) request.getAttribute("tensp");
				String sl= (String) request.getAttribute("slsp");
				String gia= (String) request.getAttribute("giasp");
				String anh= (String) request.getAttribute("anhsp");
				String ml= (String) request.getAttribute("mlsp");
				%> 
				<div align="center">
					<form class="form-inline" action="adminsanphamcontroller" enctype="multipart/form-data"
						method="post">
						<div class="form-group">
							<label>Mã sản phẩm:</label> <input name="txtmsp" type="text"
								class="form-control" value="<%=(msp == null) ? "" : msp%>">
						</div>
						<div class="form-group">
							<label>Gía:</label> <input name="txtgia" type="text"
								class="form-control" value=" <%=(gia == null) ? "" : gia%>">
						</div>
						<div class="form-group">
							<label>Số lượng:</label> <input name="txtsl" type="text"
								class="form-control" value="<%=(sl == null) ? "" : sl%>">
						</div>
						<br>
						<br>
						
						<div class="form-group">
							<label>Tên sản phẩm:</label> <input name="txttensp" type="text"
								class="form-control" value="<%=(tensp == null) ? "" : tensp%>">
						</div>
						
						<div class="form-group">
							<label>ảnh:</label> 
							<%if(anh==null ){ %>
							<input name="txtanh" type="file" class="form-control" value="">
							<%}else{%>
							<input name="txtanh" type="file" class="form-control" value="<%=anh%>">
							<img style="width:50px" src="<%=anh%>" class="w-80" >
							<%}%>
						</div>
						<div class="form-group">
							<label>Mã loại:</label> <input name="txtml" type="text"
								class="form-control" value="<%=(ml == null) ? "" : ml%>">
						</div>
							<br>
							<br>
						<input type="submit" name="butadd" value="Add"
							class="btn btn-default btn btn-info"> 
							
						<input
							type="submit" name="butupdate" value="Update"
							class="btn btn-default btn-danger">
					</form>
				</div>

				<br>
						<table class="table" aligh="center">
					<thead class="table-success">
						<tr class="info">
							<th>Mã sản phẩm</th>
							<th>Tên sản phẩm</th>
							<th>Số lượng</th>
							<th>Gía</th>
							<th>File ảnh</th>
							<th>Mã loại</th>
							<th></th>
							<th></th>
							
						</tr>
					</thead>
					 <%
					ArrayList<sanphambean> ds = (ArrayList<sanphambean>) request.getAttribute("dssp");
					for (sanphambean sp : ds) {
					%>
					<tr>
						<td><%=sp.getMasanpham()%></td>
						<td><%=sp.getTensanpham()%></td>
						<td><%=sp.getSoluong()%></td>
						<td><%=sp.getGia()%></td>
						<td><img style="width:50px" src="<%=sp.getAnh()%>" class="w-80" > </td>
						<td><%=sp.getMaloai()%></td>
						
						<td><a
							href="adminsanphamcontroller?msp=<%=sp.getMasanpham()%>&tensp=<%=sp.getTensanpham()%>
							&sl=<%=sp.getSoluong()%>&gia=<%=sp.getGia()%>&anh=<%=sp.getAnh()%>&ml=<%=sp.getMaloai()%>&tab=select">
								<span class="glyphicon glyphicon-ok"></span>
						</a></td>
						<td><a
							href="adminsanphamcontroller?msp=<%=sp.getMasanpham()%>&tab=delete">
								<span class="glyphicon glyphicon-trash"></span>
						</a></td>
						<%
						}
						%> 
					
				</table> 



			</div>
</body>
</html>