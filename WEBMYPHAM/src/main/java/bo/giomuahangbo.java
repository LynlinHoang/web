package bo;

import java.util.ArrayList;

import bean.giomuahangbean;

public class giomuahangbo {
	public ArrayList<giomuahangbean> ds = new ArrayList<giomuahangbean>();
	private giomuahangbean h;

	public void Them(String masanpham, String tensanpham, long gia, long soluongmua) throws Exception {
		for (giomuahangbean h : ds)
			if (h.getMasanpham().equals(masanpham)) {
				h.setSoluongmua(h.getSoluongmua() + soluongmua);
				return;
			}
		giomuahangbean g = new giomuahangbean(masanpham, tensanpham, gia, soluongmua);
		ds.add(g);
	}

	public long tongTien() throws Exception {
		int n = ds.size();
		long s = 0;
		for (int i = 0; i < n; i++) {
			s = s + ds.get(i).getThanhtien();
		}
		return s;
	}

	public void sua(String masanpham, long slmoi) throws Exception {
		int n = ds.size();
		for (int i = 0; i < n; i++) {
			;
			giomuahangbean h = ds.get(i);
			if (h.getMasanpham().equals(masanpham)) {
				h.setSoluongmua(slmoi);
				ds.set(i, h);
				return;
			}
		}
	}
	
	public void xoa(String masanpham)throws Exception{
		for (giomuahangbean h : ds) {
			if(h.getMasanpham().equals(masanpham)){
				ds.remove(h);
				return;
			}
		}	
	}
	public long slgh()throws Exception {
		int n=ds.size();
		long s=0;
		for(int i=0;i<n;i++){
			s=s+ds.get(i).getSoluongmua();
		}
		return s;
	}
	
}
