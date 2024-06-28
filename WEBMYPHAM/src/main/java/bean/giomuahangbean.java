package bean;

public class giomuahangbean {
	private String masanpham;
	private String tensanpham;
	private long gia;
	private long soluongmua;
	private long thanhtien;
	public giomuahangbean(String masanpham, String tensanpham, long gia, long soluongmua) {
		super();
		this.masanpham = masanpham;
		this.tensanpham = tensanpham;
		this.gia = gia;
		this.soluongmua = soluongmua;
		this.thanhtien =soluongmua*gia ;
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

	public long getSoluongmua() {
		return soluongmua;
	}
	public void setSoluongmua(long soluongmua) {
		this.soluongmua = soluongmua;
	}
	public long getThanhtien() {
		return soluongmua*gia;
	}
	public void setThanhtien(long thanhtien) {
		this.thanhtien = thanhtien;
	}
	
}
