package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import bean.khachmuahangbean;
import bean.loaisanphambean;

public class khachmuahangdao {
	
	public ArrayList<khachmuahangbean> getkh() throws Exception {
		ArrayList<khachmuahangbean> dskh = new ArrayList<khachmuahangbean>();
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql = "select*from khachhang";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		ResultSet rs = cmd.executeQuery();
		while (rs.next()) {
			Long makh = rs.getLong("makh");
			String tenkh = rs.getString("tenkh");
			String diachi=rs.getString("diachi");
			String sodt=rs.getString("sodt");
			String email=rs.getString("email");
			String tendn=rs.getString("tendn");
			String pass=rs.getString("pass");
			dskh.add(new khachmuahangbean(makh, tenkh, diachi, sodt, email, tendn, pass));
		}
		rs.close();
		return dskh;
	}
	public int Them(String tenkh, String diachi, String sodt, String email, String tendn, String pass) throws Exception {
		//b1 ket noi vao database
		ketnoidao kn= new ketnoidao();
		kn.ketnoi();
		//b2 tao lenh sql
		String sql= "insert into khachhang ( tenkh, diachi, sodt, email, tendn, pass) values( ?, ?, ?, ?, ?, ?)";
		//b3 tao cau lenh prepareStatement
		PreparedStatement cmd= kn.cn.prepareStatement(sql);
		//b4: thuc hien cau lenh
		cmd.setString(1, tenkh);
		cmd.setString(2, diachi);
		cmd.setString(3, sodt);
		cmd.setString(4, email);
		cmd.setString(5, tendn);
		cmd.setString(6, pass);
		int kq = cmd.executeUpdate();
        return kq ;
	}
	public khachmuahangbean KtrDangKy(String tenkh, String diachi, String sodt, String email, String tendn, String pass) throws Exception{
        //b1: ket noi vao database
        ketnoidao kn= new ketnoidao();
        kn.ketnoi();
        //b2:tao cau lenh sql
        String sql= "Select * from khachhang where tendn=? and pass=?";
        //b3: tao cau lenh prepareStatement
        PreparedStatement cmd= kn.cn.prepareStatement(sql);
        //b4: thuc hien cau lenh
        cmd.setString(1, tendn);
        cmd.setString(2, pass);
        //b5: duyen rs de luu vao mang ds
        ResultSet rs= cmd.executeQuery();
        khachmuahangbean kh = null;
        if(rs.next()) { //dang nhap dung
            long makh = rs.getLong("makh");
            kh= new khachmuahangbean(makh, tenkh, diachi, sodt, email, tendn, pass);
        }
        //b6: dong ket noi va rs
        rs.close();
        kn.cn.close();
        return kh;
    }	
	public khachmuahangbean ktdn(String tendn, String pass) throws Exception{
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql="select * from khachhang where tendn=? and pass=?";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, tendn);
		cmd.setString(2, pass);
		ResultSet rs = cmd.executeQuery();	
		khachmuahangbean kh = null;
		if(rs.next()) {
			long makh = rs.getLong("makh");
			String hoten = rs.getString("tenkh");
			String diachi = rs.getString("diachi");
			String sodt = rs.getString("sodt");
			String email = rs.getString("email");
			 tendn = rs.getString("tendn");
			 pass  = rs.getString("pass");
			kh= new khachmuahangbean(makh, hoten, diachi, sodt, email, tendn, pass);
		}
		rs.close();
		return kh;
	}
	
}
