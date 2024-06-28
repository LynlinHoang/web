



import java.io.Serializable;
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
public class ChiTietHoaDon implements Serializable {

    private String stk;
    private Date ngayChuyen;
    private String noDung; 
    
 

    public ChiTietHoaDon(String stk, Date ngayChuyen, long soTienChuyen) {
        this.stk = stk;
        this.ngayChuyen = ngayChuyen;
        this.noDung = noDung;
       
    }

  

}
