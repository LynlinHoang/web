
import java.net.InetAddress;
import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ADMIN
 */
public class MyServerkt {
public static void main(String[] args) {
        try {
            InetAddress ip = InetAddress.getLocalHost();
            System.out.println(ip);
            TinhToankt tt = new TinhToankt();
            LocateRegistry.createRegistry(1099);
            Naming.bind("rmi://" + ip.getHostName()+ "/TinhToankt", tt);
            System.out.print("Dang cho Client yeu cau: ");
        } catch (Exception tt) {
            System.out.print(tt);
        }
    }
}
