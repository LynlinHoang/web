<%@page import="bean.giomuahangbean"%>
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
				<li><a href="#"><span
						class="glyphicon glyphicon-shopping-cart"></span>(<%=soLuong%>)</a></li>
				<li><a href="lichsumuahangcontroller"><span class="glyphicon glyphicon-list-alt"></span> Lịch sử mua hàng</a></li>
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
					<th>Giá</th>
					<th>Số lượng</th>				
					<th>Thành tiền</th>
					<th>Sửa</th>
						<th>xóa</th>
				</tr>
			</thead>			
			<tbody>
				 <%
					if (session.getAttribute("gh") != null) {
						giomuahangbo gh = null;
						gh = (giomuahangbo) session.getAttribute("gh");
						for (giomuahangbean h : gh.ds) {
			       %>
				<tr>
					<td><%=h.getTensanpham()%></td>
					<td><%=h.getGia()%></td>
					<td><%=h.getSoluongmua()%></td>
					<td><%=h.getThanhtien()%>.000</td>
					<td><form action="suaslcontroller?msp=<%=h.getMasanpham()%>&sl=<%=h.getSoluongmua()%>" method="post">
								<input type="number" name="texts" style="width: 40px" min="1" max="1000"> 									
								<input type="submit" name="bu1" value="cập nhật" class="btn-link">
							  </form>
					</td>
					<td><a href="xoaspcontroller?ms=<%=h.getMasanpham()%>"><span class="glyphicon glyphicon-trash"></a></td>
				</tr>
				<%}%>
					
			</tbody>
		</table>
					<div class="buttom">
								<form action="xacnhanmuahangcontroller" method="post">
										<input type="submit" value="Thanh toán" class="btn btn-warning">
								</form>
								<div class="buttom_1" >															
								<p>Tổng tiền: <%=gh.tongTien()%>.000</p>
								</div>
								
								
					</div>

		<form action="xoaallsanphamcontroller" method="post">
			<input type="submit" name="delete" value="xóa tất cả"
				class="btn btn-danger">
		</form>

		<%
		}
		%>

	</div>


</body>
</html>