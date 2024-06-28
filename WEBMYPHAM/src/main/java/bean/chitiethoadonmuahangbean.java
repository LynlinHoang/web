package bean;

public class chitiethoadonmuahangbean {
	private String masanpham;
	private int soluongmua;
	private String damua;
	public chitiethoadonmuahangbean(String masanpham, int soluongmua, String damua) {
		super();
		this.masanpham = masanpham;
		this.soluongmua = soluongmua;
		this.damua = damua;
	}
	public String getMasanpham() {
		return masanpham;
	}
	public void setMasanpham(String masanpham) {
		this.masanpham = masanpham;
	}
	public int getSoluongmua() {
		return soluongmua;
	}
	public void setSoluongmua(int soluongmua) {
		this.soluongmua = soluongmua;
	}
	public String getDamua() {
		return damua;
	}
	public void setDamua(String damua) {
		this.damua = damua;
	}
	
}
