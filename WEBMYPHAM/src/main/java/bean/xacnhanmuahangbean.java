package bean;

public class xacnhanmuahangbean {
	private long maChiTietHoaDon;
	private String tenkh;
	private String tensanpham;
	private long gia;
	private long  soluongmua;
	private long thanhtien;
	private boolean damua;
	public xacnhanmuahangbean(long maChiTietHoaDon, String tenkh, String tensanpham, long gia, long soluongmua,
			long thanhtien, boolean damua) {
		super();
		this.maChiTietHoaDon = maChiTietHoaDon;
		this.tenkh = tenkh;
		this.tensanpham = tensanpham;
		this.gia = gia;
		this.soluongmua = soluongmua;
		this.thanhtien = thanhtien;
		this.damua = damua;
	}
	public long getMaChiTietHoaDon() {
		return maChiTietHoaDon;
	}
	public void setMaChiTietHoaDon(long maChiTietHoaDon) {
		this.maChiTietHoaDon = maChiTietHoaDon;
	}
	public String getTenkh() {
		return tenkh;
	}
	public void setTenkh(String tenkh) {
		this.tenkh = tenkh;
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
		return thanhtien;
	}
	public void setThanhtien(long thanhtien) {
		this.thanhtien = thanhtien;
	}
	public boolean isDamua() {
		return damua;
	}
	public void setDamua(boolean damua) {
		this.damua = damua;
	}
	
	
}
