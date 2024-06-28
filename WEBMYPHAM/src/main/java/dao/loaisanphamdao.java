package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import bean.loaisanphambean;

public class loaisanphamdao {
	public ArrayList<loaisanphambean> getloai() throws Exception {
		ArrayList<loaisanphambean> ds = new ArrayList<loaisanphambean>();
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "select*from loaisanpham";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		ResultSet rs = cmd.executeQuery();
		while (rs.next()) {
			String maloai = rs.getString("maloai");
			String tenloai = rs.getString("tenloai");
			ds.add(new loaisanphambean(maloai, tenloai));
		}
		rs.close();
		return ds;
	}
	public int Them(String maloai, String tenloai) throws Exception{
			 ketnoidao kn = new ketnoidao();
			 kn.ketnoi();
			 String sql="insert into loaisanpham(maloai,tenloai) values (?,?)";
			 PreparedStatement cmd= kn.cn.prepareStatement(sql);
			 cmd.setString(1, maloai);
			 cmd.setString(2, tenloai);
			 int kq=cmd.executeUpdate();
			 cmd.close();
			 kn.cn.close();
			 return kq;
	 }
	public int Tim(String maloai, String tenloai) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "select * from loaisanpham";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, maloai);
		cmd.setString(2, tenloai);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}

	public int Xoa(String maloai) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "delete loaisanpham where maloai = ?";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, maloai);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}

	public int Sua(String maloai, String tenloaimoi) throws Exception {
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "update loaisanpham set tenloai =? where maloai=?";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, maloai);
		cmd.setString(2, tenloaimoi);
		int kq = cmd.executeUpdate();
		cmd.close();
		kn.cn.close();
		return kq;
	}

}
