


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ADMIN
 */
public class CoSokt {

   public static Connection cn;

      public static void MoKetNoi() throws Exception{
                        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
                        String url="jdbc:sqlserver://MSI\\SQLEXPRESS\\SQLEXPRESS:1433;databaseName=QLATM;user=sa;password=123";
                        cn=DriverManager.getConnection(url);
                        System.out.println("Da ket noi");
    }
    public static ResultSet LayBang(String tb) {
        try {
            Statement cmd = cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
            return cmd.executeQuery("select * from " + tb);
        } catch (Exception t2) {
            System.out.print(t2.getMessage());
            return null;
        }
    }
}
