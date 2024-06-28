package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import bean.xacnhanmuahangbean;

public class chitiethoadonmuahangdao {
	public int Them(String masanpham, long soluongmua, long mahoadon) throws Exception{
		  ketnoidao kn= new ketnoidao();
		  kn.ketnoi();
		  String sql="INSERT INTO  chitiethoadon(masanpham,soluongmua,mahoadon,damua) values (?,?,?,?)";
		  PreparedStatement cmd= kn.cn.prepareStatement(sql);
		  cmd.setString(1, masanpham);
		  cmd.setLong(2, soluongmua);
		  cmd.setLong(3, mahoadon);
		  cmd.setBoolean(4, false);
		  int kq=cmd.executeUpdate();
		  cmd.close();
		  kn.cn.close();
		  return kq;
	}
	
	public ArrayList<xacnhanmuahangbean> getxacnhan() throws Exception {
		ArrayList<xacnhanmuahangbean> ds = new ArrayList<xacnhanmuahangbean>();
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "select *from adminxacnhan";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		ResultSet rs = cmd.executeQuery();
		while (rs.next()) {
			long maChiTietHD = rs.getLong("maChiTietHoaDon");
			String tenkh = rs.getString("tenkh");
			String tensanpham = rs.getString("tensanpham");
			long soluongmua = rs.getLong("soluongmua");
			long gia = rs.getLong("gia");		
			long thanhtien = rs.getLong("thanhtien");
			boolean damua = rs.getBoolean("damua");
			ds.add(new xacnhanmuahangbean(maChiTietHD, tenkh, tensanpham, gia, soluongmua, thanhtien, damua));
		}
		cmd.close();
		kn.cn.close();
		return ds;
	}
	public int Sua(long maChiTietHoaDon) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "update chitiethoadon set damua=1 where maChiTietHoaDon=?";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setLong(1, maChiTietHoaDon);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}
}
