
import java.io.Serializable;
import java.util.Date;
import sun.misc.SignalHandler;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ADMIN
 */
public class LichSu implements Serializable{
            public String stk;
            public long mact;
            public Date ngayChuyen;
            public String noiDung;
            public long soTienChuyen;           
            public String soTaiKhoan;

    public LichSu(String stk, long mact, Date ngayChuyen, String noiDung, long soTienChuyen, String soTaiKhoan) {
        this.stk = stk;
        this.mact = mact;
        this.ngayChuyen = ngayChuyen;
        this.noiDung = noiDung;
        this.soTienChuyen = soTienChuyen;
        this.soTaiKhoan = soTaiKhoan;
    }

            



 
    
                      
}
