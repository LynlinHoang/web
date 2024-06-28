package dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class ketnoidao {
	public Connection cn;//kết nối sql
	public void ketnoi() throws Exception {
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");		
			String url= "jdbc:sqlserver://MSI\\SQLEXPRESS\\SQLEXPRESS:1433;databaseName=QLMyPham;user=sa;password=123";
			cn=DriverManager.getConnection(url);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
	}
}
