package bo;

import java.util.ArrayList;

import bean.khachmuahangbean;
import dao.khachmuahangdao;

public class khachmuahangbo {
	khachmuahangdao khdao=new khachmuahangdao();
	ArrayList<khachmuahangbean> ds;
	public ArrayList<khachmuahangbean> getkh() throws Exception {
		     ds=khdao.getkh();
		     return ds;
	}
	public khachmuahangbean ktdn(String tendn, String pass) throws Exception{		
		return khdao.ktdn(tendn, pass);
	}
	
	public khachmuahangbean ktdk(String tenkh, String diachi, String sodt, String email, String tendn, String pass)
			throws Exception {
		return khdao.KtrDangKy(tenkh, diachi, sodt, email, tendn, pass);
	}

	public int Them(String hoten, String diachi, String sodt, String email, String tendn, String pass)
			throws Exception {
		return khdao.Them(hoten, diachi, sodt, email, tendn, pass);
	}
}
