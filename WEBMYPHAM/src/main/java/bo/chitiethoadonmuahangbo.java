package bo;

import java.util.ArrayList;

import bean.xacnhanmuahangbean;
import dao.chitiethoadonmuahangdao;

public class chitiethoadonmuahangbo {
	chitiethoadonmuahangdao ctdao = new chitiethoadonmuahangdao();
	ArrayList<xacnhanmuahangbean> ds;
	public int Them(String masapham, long soluongmua,long mahoadon) throws Exception{
		return ctdao.Them(masapham, soluongmua, mahoadon);
	}
	
	public int Sua(long maChiTietHoaDon) throws Exception {
		return ctdao.Sua(maChiTietHoaDon);
	}
	
	public ArrayList<xacnhanmuahangbean> getxacnhan() throws Exception {
		ds= ctdao.getxacnhan();
		return ds;
	}
}
