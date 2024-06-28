package bean;

import java.util.Date;

public class lichsumuahangbean {
	private long makh;
	private String masanpham;
	private String tensanpham;				
	private long gia;	
	private int soluongmua;
	private Date ngaymua;
	private boolean damua;
	private long thanhtien;
	public lichsumuahangbean(long makh, String masanpham, String tensanpham, long gia, int soluongmua, Date ngaymua,
			boolean damua, long thanhtien) {
		super();
		this.makh = makh;
		this.masanpham = masanpham;
		this.tensanpham = tensanpham;
		this.gia = gia;
		this.soluongmua = soluongmua;
		this.ngaymua = ngaymua;
		this.damua = damua;
		this.thanhtien = thanhtien;
	}
	public long getMakh() {
		return makh;
	}
	public void setMakh(long makh) {
		this.makh = makh;
	}
	public String getMasanpham() {
		return masanpham;
	}
	public void setMasanpham(String masanpham) {
		this.masanpham = masanpham;
	}
	public String getTensanpham() {
		return tensanpham;
	}
	public void setTensanpham(String tensanpham) {
		this.tensanpham = tensanpham;
	}
	public long getGia() {
		return gia;
	}
	public void setGia(long gia) {
		this.gia = gia;
	}
	public int getSoluongmua() {
		return soluongmua;
	}
	public void setSoluongmua(int soluongmua) {
		this.soluongmua = soluongmua;
	}
	public Date getNgaymua() {
		return ngaymua;
	}
	public void setNgaymua(Date ngaymua) {
		this.ngaymua = ngaymua;
	}
	public boolean isDamua() {
		return damua;
	}
	public void setDamua(boolean damua) {
		this.damua = damua;
	}
	public long getThanhtien() {
		return thanhtien;
	}
	public void setThanhtien(long thanhtien) {
		this.thanhtien = thanhtien;
	}
	
}
