package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import bean.sanphambean;

public class sanphamdao {
	public ArrayList<sanphambean> getsp() throws Exception {
		ArrayList<sanphambean> ds = new ArrayList<sanphambean>();
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "select*from sanpham";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		ResultSet rs = cmd.executeQuery();
		while (rs.next()) {
			String masp = rs.getString("masanpham");
			String tensanpham = rs.getString("tensanpham");
			long soluong = rs.getLong("soluong");
			long gia = rs.getLong("gia");
			String anh = rs.getString("anh");
			String maloai = rs.getString("maloai");
			ds.add(new sanphambean(masp, tensanpham, soluong, gia, anh, maloai));
		}
		rs.close();
		return ds;
	}

	public int Them(String masanpham, String tensanpham, long gia, long soluong, String anh, String maloai) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "insert into sanpham(masanpham,tensanpham,gia,soluong,anh,maloai) values (?,?,?,?,?,?)";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, masanpham);
		cmd.setString(2, tensanpham);
		cmd.setLong(3, gia);
		cmd.setLong(4, soluong);
		cmd.setString(5, anh);
		cmd.setString(6, maloai);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}

	public int Tim(String masanpham, String tensanpham, long gia, long soluong, String anh, String maloai) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "select * from sanpham";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, masanpham);
		cmd.setString(2, tensanpham);
		cmd.setLong(3, gia);
		cmd.setLong(4, soluong);
		cmd.setString(5, anh);
		cmd.setString(6, maloai);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}

	public int Xoa(String masanpham) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "delete sanpham where masanpham = ?";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, masanpham);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}

	public int Sua(String masanpham, String tensanphammoi, long giamoi, long soluongmoi, String anhmoi, String maloaimoi) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "update sanpham set tensanpham =?, gia =?,  soluong =?,  anh =?,  maloai =? where masanpham=?";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, masanpham);
		cmd.setString(2, tensanphammoi);
		cmd.setLong(3, giamoi);
		cmd.setLong(4, soluongmoi);
		cmd.setString(5, anhmoi);
		cmd.setString(6, maloaimoi);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}

}
