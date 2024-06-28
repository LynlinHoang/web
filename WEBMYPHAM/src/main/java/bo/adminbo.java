package bo;

import bean.adminbean;
import dao.admindao;

public class adminbo {
		admindao addao= new admindao();
	public adminbean dn(String tendn, String pass) throws Exception{
		return addao.dn(tendn, pass);
	}
}
