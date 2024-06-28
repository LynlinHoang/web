package bean;

public class adminbean {
				private String tendn;
				private String pass;
				public adminbean(String tendn, String pass) {
					super();
					this.tendn = tendn;
					this.pass = pass;
				}
				public String getTendn() {
					return tendn;
				}
				public void setTendn(String tendn) {
					this.tendn = tendn;
				}
				public String getPass() {
					return pass;
				}
				public void setPass(String pass) {
					this.pass = pass;
				}
				
				
}
