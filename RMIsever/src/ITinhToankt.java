
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Date;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ADMIN
 */
public interface  ITinhToankt extends Remote {
    public boolean ktDangNhap(String un, String pwd) throws RemoteException;

    public int doiMatKhau(String stk, String pwd) throws RemoteException;

    public int setSoDu(String stk, long soDumoi) throws RemoteException;

    public int setHoaDon(String stk, String noiDung, long soTienChuyen, String soTaiKhoan) throws RemoteException;

    public String timstk(String stk) throws RemoteException;

    public ArrayList getcthd(String stk) throws RemoteException;

    public String getSdt(String stk) throws RemoteException;

    public String gettentk(String stk) throws RemoteException;

    public int setVipham(String stk) throws RemoteException;

    public int setTrangThaiFalse(String stk) throws RemoteException;

    public int setTrangThaiTrue(String stk) throws RemoteException;

    public String getvipham(String stk) throws RemoteException;

    public String getTrangThai(String stk) throws RemoteException;
    
    public int setChuyenTien(String stk, long gioiHanTien) throws RemoteException;
    
    public int setGioiHan(String stk, long gioiHan) throws RemoteException;
    
    public String getGioiHan(String stk) throws RemoteException;
    
    public String getNgay(String stk) throws RemoteException;
    
    public String getMatKhau(String stk) throws RemoteException;
    
    public String getGioiHanTien(String stk) throws RemoteException;
    
    public String getNgayChuyenTien(String stk) throws RemoteException;
           
}
