<%@page import="bean.lichsumuahangbean"%>
<%@page import="java.util.ArrayList"%>
<%@page import="bo.giomuahangbo"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="trangChu.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">lyn.shop</a>
		</div>
		<div class="navbar-body">
			<ul class="nav navbar-nav">
				<li><a href="trangchucontroller"><span
						class="glyphicon glyphicon-home"></span> Home</a></li>
			<%
								giomuahangbo gioHang = (giomuahangbo) session.getAttribute("gh");
								long soLuong = 0;
								if (gioHang != null)
									soLuong = gioHang.slgh();
						%>
				<li><a href="htgiohangcontroller"><span
						class="glyphicon glyphicon-shopping-cart"></span>(<%=soLuong%>)</a></li>
				<li class="active"><a href="#"><span class="glyphicon glyphicon-list-alt"></span>Lịch sử mua hàng</a></li>
			</ul>
			<form class="navbar-form navbar-left" action="trangchucontroller"
				metho>
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search"
						name="texttk">
				</div>
				<button type="submit" class="btn btn-default">
					<span class="glyphicon glyphicon-search"></span>
				</button>
			</form>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#"><span class="glyphicon glyphicon-user"></span><%=session.getAttribute("un")%></a></li>
				<li><a href="dangxuatmpcontroller"><span
						class="glyphicon glyphicon-log-out"></span> Đăng Xuất</a></li>
			</ul>
		</div>
	</div>
	<br>
	<br>
	<div class="container">
		<table class="table">
		
			<thead class="table-success">
				<tr class="danger">
					<th >Tên sản phẩm</th>
					<th>Số lượng mua</th>
					<th>Gía</th>				
					<th>Thành tiền</th>
					<th>Ngày mua</th>
					<th>Đã duỵêt</th>
				</tr>
			</thead>	
					<tr>
				<%
				ArrayList<lichsumuahangbean> ds = (ArrayList<lichsumuahangbean>) request.getAttribute("dsls");
				if (ds != null) {
					int n = ds.size();
					for (int i = 0; i < n; i++) {
						lichsumuahangbean h = ds.get(i);
				%>
		
				<td><%=h.getTensanpham()%></td>
				<td><%=h.getSoluongmua()%></td>
				<td><%=h.getGia()%>.000</td>
				<td><%=h.getThanhtien()%>.000</td>
				<td><%=h.getNgaymua()%></td>
				<%if(h.isDamua()==false) { %>
				<td class="text-danger">Chờ xác nhận</td>
				<%}else{%>
				<td class="text-success">Đã duyệt</td>
				<%}%>
			</tr>
			<%
			}
			%>
			<%
			}
			%>		
	</table>

	</div>
</body>
</html>