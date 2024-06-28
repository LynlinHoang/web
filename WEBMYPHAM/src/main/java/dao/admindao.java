package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import bean.adminbean;


public class admindao {
	public adminbean dn(String tendn, String pass) throws Exception{
		ketnoidao kn = new ketnoidao();
		kn.ketnoi();
		String sql="select * from adminDangNHap where tenTK=? and pass=?";
		PreparedStatement cmd = kn.cn.prepareStatement(sql);
		cmd.setString(1, tendn);
		cmd.setString(2, pass);
		ResultSet rs = cmd.executeQuery();	
		adminbean ad = null;
		if(rs.next()) {
			tendn = rs.getString("TenTK");
			 pass  = rs.getString("pass");
			 ad = new adminbean(tendn, pass);
			
		}
		rs.close();
		return ad;
	}
}
