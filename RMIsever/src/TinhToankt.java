
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
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
public class TinhToankt extends UnicastRemoteObject implements ITinhToankt{
            public TinhToankt() throws RemoteException{};
    @Override
    public boolean ktDangNhap(String un, String pwd) throws RemoteException {
        try {
            CoSokt.MoKetNoi();  
            String sql = "select * from TaiKhoan where stk=? and matKhau=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, un);
            cmd.setString(2, pwd);
            ResultSet rs = cmd.executeQuery();
            return rs.next();
        } catch (Exception loi) {
            System.out.print("Loi o ktDangNhap: " + loi);
            return false;
        }
    }

    @Override
    public int doiMatKhau(String stk, String pwd) throws RemoteException {
         try {
             CoSokt.MoKetNoi(); 
            String sql = "update TaiKhoan set matKhau=? where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, pwd);
            cmd.setString(2, stk);
            return cmd.executeUpdate();
        } catch (Exception loi){
            loi.printStackTrace();
            return 0;
        }

    }

    @Override
    public int setSoDu(String stk, long soDumoi) throws RemoteException {
        try {
            CoSokt.MoKetNoi(); 
            String sql = "update TaiKhoan set soDu=? where stk=?";           
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setLong(1, soDumoi);
            cmd.setString(2, stk);
            return cmd.executeUpdate();
        } catch (Exception loi) {
            loi.printStackTrace();
            return 0;
        }  
    }

    @Override
    public int setHoaDon(String stk,String noiDung,long soTienChuyen,String soTaiKhoan) throws RemoteException {
              try {
                  CoSokt.MoKetNoi(); 
            String sql = "insert into ChiTietHoaDon(stk,ngayChuyen,noiDung,soTienChuyen,soTaiKhoan) values(?,?,?,?,?)";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
                  cmd.setString(1,stk);
                  Date n = new Date();
                  SimpleDateFormat dd = new SimpleDateFormat("yyyy-MM-dd");
                  String nn = dd.format(n);
                  Date n2 = dd.parse(nn);
                  cmd.setDate(2, new java.sql.Date(n2.getTime()));
                  cmd.setString(3, noiDung);
                  cmd.setLong(4, soTienChuyen);
                  cmd.setString(5,soTaiKhoan);
                  
            return cmd.executeUpdate();
           
        } catch (Exception loi) {
            loi.printStackTrace();
            return 0;
        }
    }

    @Override
    public ArrayList getcthd(String stk) throws RemoteException {
            try {
            ArrayList ds = new ArrayList();           
            CoSokt.MoKetNoi();      
           String sql = "select * from lichsuruttien where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
		while (rs.next()) {
                        
			long mact = rs.getLong("mact");                   
			Date ngayChuyen = rs.getDate("ngayChuyen");
                        String noidung=rs.getString("noiDung");
			long sotien = rs.getLong("soTienChuyen");                       
                        String stkc=rs.getString("soTaiKhoan");                   
                        ds.add(new LichSu(stk, mact, ngayChuyen, noidung, sotien, stkc));                      
		}
		CoSokt.cn.close();
		return ds;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }       
        }
    @Override
    public String timstk(String stk) throws RemoteException {
            try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next())
            {
                return rs.getString("soDu");//Trả về Ip
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }

    @Override
    public String getSdt(String stk) throws RemoteException {
        try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("sdt");//Trả về Ip
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }

    }

    @Override
    public String gettentk(String stk) throws RemoteException {
        try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("tentk");//Trả về Ip
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }

    }

    @Override
    public int setVipham(String stk) throws RemoteException {
         try {
            CoSokt.MoKetNoi(); 
            String sql = "update TaiKhoan set viPham=? where stk=?";           
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, "false");
            cmd.setString(2, stk);
            return cmd.executeUpdate();
        } catch (Exception loi) {
            loi.printStackTrace();
            return 0;
        }  
    }

    @Override
    public int setTrangThaiFalse(String stk) throws RemoteException {
        try {
            CoSokt.MoKetNoi(); 
            String sql = "update TaiKhoan set trangThai=? where stk=?";           
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, "false");
            cmd.setString(2, stk);
            return cmd.executeUpdate();
        } catch (Exception loi) {
            loi.printStackTrace();
            return 0;
        }  
    }

    @Override
    public String getvipham(String stk) throws RemoteException {
        try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("viPham");//Trả về Ip
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }

    @Override
    public String getTrangThai(String stk) throws RemoteException {
          try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("trangThai");//Trả về Ip
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }

    @Override
    public int setTrangThaiTrue(String stk) throws RemoteException {
        try {
            CoSokt.MoKetNoi(); 
            String sql = "update TaiKhoan set trangThai=? where stk=?";           
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, "true");
            cmd.setString(2, stk);
            return cmd.executeUpdate();
        } catch (Exception loi) {
            loi.printStackTrace();
            return 0;
        }  
    }


    @Override
    public int setGioiHan(String stk,long gioiHan) throws RemoteException {
        try {
            CoSokt.MoKetNoi();
            String sql = "update TaiKhoan set gioiHan=?,ngay=? where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setLong(1,gioiHan );
            Date n = new Date();
            SimpleDateFormat dd = new SimpleDateFormat("yyyy-MM-dd");
            String nn = dd.format(n);
            Date n2 = dd.parse(nn);
            cmd.setDate(2, new java.sql.Date(n2.getTime()));
            cmd.setString(3, stk);
            return cmd.executeUpdate();
        } catch (Exception loi) {
            loi.printStackTrace();
            return 0;
        }  
    }

    @Override
    public String getGioiHan(String stk) throws RemoteException {
         try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("gioiHan");
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }

    @Override
    public String getNgay(String stk) throws RemoteException {
         try {
            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("ngay");
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }

    @Override
    public String getMatKhau(String stk) throws RemoteException {
         try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("matKhau");
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }

    @Override
    public int setChuyenTien(String stk, long gioiHanTien) throws RemoteException {
           try {
            CoSokt.MoKetNoi();
            String sql = "update TaiKhoan set gioiHanTien=?,ngayChuyenTien=? where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setLong(1,gioiHanTien);
            Date n = new Date();
            SimpleDateFormat dd = new SimpleDateFormat("yyyy-MM-dd");
            String nn = dd.format(n);
            Date n2 = dd.parse(nn);
            cmd.setDate(2, new java.sql.Date(n2.getTime()));
            cmd.setString(3, stk);
            return cmd.executeUpdate();
        } catch (Exception loi) {
            loi.printStackTrace();
            return 0;
        } 
    }

    @Override
    public String getGioiHanTien(String stk) throws RemoteException {
        try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("gioiHanTien");
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }

    @Override
    public String getNgayChuyenTien(String stk) throws RemoteException {
       try {

            CoSokt.MoKetNoi();
            String sql = "select * from TaiKhoan where stk=?";
            PreparedStatement cmd = CoSokt.cn.prepareStatement(sql);
            cmd.setString(1, stk);
            ResultSet rs = cmd.executeQuery();
            if (rs.next()) {
                return rs.getString("ngayChuyenTien");
            } else {
                return null;
            }
        } catch (Exception loi) {
            System.out.print("Loi o LayIp: " + loi);
            return null;
        }
    }
  
}
