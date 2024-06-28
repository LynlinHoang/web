package bo;

import java.util.ArrayList;
import bean.sanphambean;
import dao.sanphamdao;

public class sanphambo {
		sanphamdao dsdao=new sanphamdao();
		ArrayList<sanphambean> ds;
		public ArrayList<sanphambean> getsp()throws Exception{
			ds= dsdao.getsp();
			return ds;
		}
		
		public ArrayList<sanphambean> TimMa(String masp) throws Exception {
			ArrayList<sanphambean> tam = new ArrayList<sanphambean>();
				for(sanphambean s:ds) {
					if(s.getMaloai().equals(masp))
						tam.add(s);			
				}
				return tam;
			
		}	
		public ArrayList<sanphambean> Tim(String key) throws Exception{
			ArrayList<sanphambean> tam = new ArrayList<sanphambean>();
			   for(sanphambean s:ds)
				   if(s.getTensanpham().toLowerCase().contains(key.toLowerCase())||s.getMasanpham().toLowerCase().contains(key.toLowerCase()))
					   tam.add(s);
			   return tam;
		}
		
		public int Them(String masanpham, String tensanpham, long gia, long soluong, String anh, String maloai) throws Exception{
			ds=dsdao.getsp();
			 for(sanphambean sp:ds) {
				 if(sp.getMasanpham().equals(masanpham))
					 return 0;
			 }				
			 return dsdao.Them(masanpham, tensanpham, gia, soluong, anh, maloai);
		 }
		 public String Timsp(String masanpham, String tensanpham, long gia, long soluong, String anh, String maloai) throws Exception{
			 for(sanphambean sp: ds)
				 if(sp.getMasanpham().equals(masanpham))
					 return sp.getTensanpham();
			 return null;
		 }
		 public int Xoa(String masanpham) throws Exception{
			 return dsdao.Xoa(masanpham);
		 }
		 public int Sua(String masanpham, String tensanphammoi, long giamoi, long soluongmoi, String anhmoi, String maloaimoi) throws Exception{
			 for(sanphambean sp: ds)
				 if(sp.getMasanpham().equals(masanpham))
					 return dsdao.Sua(masanpham, tensanphammoi, giamoi, soluongmoi, anhmoi, maloaimoi);
			 return 0; 
		 }
}
