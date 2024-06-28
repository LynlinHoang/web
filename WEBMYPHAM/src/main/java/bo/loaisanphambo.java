package bo;

import java.util.ArrayList;
import bean.loaisanphambean;
import dao.loaisanphamdao;

public class loaisanphambo {
	loaisanphamdao ldao= new loaisanphamdao();
	ArrayList<loaisanphambean> ds;
			public ArrayList<loaisanphambean> getloai()throws Exception{
				ds= ldao.getloai();	
				return ds;
			}
			public int Them(String maloai, String tenloai) throws Exception{
				 for(loaisanphambean loai:ds) {
					 if(loai.getMaloai().equals(maloai))
						 return 0;
				 }				
				 return ldao.Them(maloai, tenloai);
			 }
			 public String Tim(String maloai) throws Exception{
				 for(loaisanphambean loai: ds)
					 if(loai.getMaloai().equals(maloai))
						 return loai.getTenloai();
				 return null;
			 }
			 public int Xoa(String maloai) throws Exception{
				 return ldao.Xoa(maloai);
			 }
			 public int Sua(String maloai, String tenloaimoi) throws Exception{			
						 return ldao.Sua(maloai, tenloaimoi);
				
			 }
}
