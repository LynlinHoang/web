
import java.io.Serializable;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ADMIN
 */
public class TaiKhoan implements Serializable{
           private String stk;
           private String tentk;
           private String sdt;
           private long soDu;
           private String trangThai;
           private String viPham;

    public TaiKhoan(String stk, String tentk, String sdt, long soDu, String trangThai, String viPham) {
        this.stk = stk;
        this.tentk = tentk;
        this.sdt = sdt;
        this.soDu = soDu;
        this.trangThai = trangThai;
        this.viPham = viPham;
    }

  


                     
}
