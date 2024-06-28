package bo;

import dao.hoadonmuahangdao;

public class hoadonmuahangbo {
	hoadonmuahangdao hddao = new hoadonmuahangdao();
	public int Them(long makh) throws Exception{
		return hddao.Them(makh);
	}
	
	public long Maxhd() throws Exception{
		 return hddao.Maxhd();
	}
}
