package bean;

public class sanphambean {
	private String masanpham;
	private String tensanpham;
	private long gia;
	private long soluong;
	private String anh;
	private String maloai;
	public sanphambean(String masanpham, String tensanpham,long soluong, long gia,  String anh, String maloai) {
		super();
		this.masanpham = masanpham;
		this.tensanpham = tensanpham;
		this.gia = gia;
		this.soluong = soluong;
		this.anh = anh;
		this.maloai = maloai;
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
	public long getSoluong() {
		return soluong;
	}
	public void setSoluong(long soluong) {
		this.soluong = soluong;
	}
	public String getAnh() {
		return anh;
	}
	public void setAnh(String anh) {
		this.anh = anh;
	}
	public String getMaloai() {
		return maloai;
	}
	public void setMaloai(String maloai) {
		this.maloai = maloai;
	}
	
}
