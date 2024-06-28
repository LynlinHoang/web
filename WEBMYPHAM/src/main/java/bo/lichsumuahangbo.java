package bo;

import java.util.ArrayList;

import bean.lichsumuahangbean;
import dao.lichsumuahangdao;



public class lichsumuahangbo {
	 lichsumuahangdao lsd=new lichsumuahangdao();
		public ArrayList<lichsumuahangbean> ls(long makh) throws Exception{
			return lsd.getlichsu(makh);
		} 
}
