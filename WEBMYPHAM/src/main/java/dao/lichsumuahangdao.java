package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;

import bean.lichsumuahangbean;
import bean.loaisanphambean;

public class lichsumuahangdao {
	public ArrayList<lichsumuahangbean> getlichsu(long makh) throws Exception{
		ArrayList<lichsumuahangbean> ds = new ArrayList<lichsumuahangbean>();
		ketnoidao kn= new ketnoidao();
		kn.ketnoi();
		String sql= "select * from lichsumuahang where makh=?";	
		PreparedStatement cmd= kn.cn.prepareStatement(sql);
		cmd.setLong(1, makh);
		ResultSet rs= cmd.executeQuery();
	     while(rs.next()) {
	    	 makh = rs.getLong("makh");
	    	 String masach= rs.getString("masanpham");
				String tensach= rs.getString("tensanpham");
				long gia= rs.getLong("gia");
				int soluongmua = rs.getInt("soluongmua");
				Date ngaymua= rs.getDate("ngaymua");	
				boolean damua = rs.getBoolean("damua");
				long tt= rs.getLong("thanhtien");
				ds.add(new lichsumuahangbean(makh, masach, tensach, gia, soluongmua, ngaymua, damua, tt));
	     }
		cmd.close();
		kn.cn.close();
        return ds;
	}
}
