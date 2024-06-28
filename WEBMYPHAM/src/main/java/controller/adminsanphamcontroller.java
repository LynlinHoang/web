package controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;

import bean.sanphambean;
import bo.sanphambo;

/**
 * Servlet implementation class adminsanphamcontroller
 */
@WebServlet("/adminsanphamcontroller")
public class adminsanphamcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public adminsanphamcontroller() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
try {
			
			
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			String masanpham = request.getParameter("txtmsp");
			String tensanpham = request.getParameter("txttensp");
			String sl = request.getParameter("txtsl");
			String g = request.getParameter("txtgia");
			String anh = request.getParameter("txtanh");
			String maloai = request.getParameter("txtml");

			String tenspm = request.getParameter("txttensp");
			String slm = request.getParameter("txtsl");
			String gm = request.getParameter("txtgia");
			String anhm = request.getParameter("txtanh");
			String mlm = request.getParameter("txtml");

			sanphambo spbo = new sanphambo();
			ArrayList<sanphambean> dssp = spbo.getsp();
			System.out.println(dssp);

			if (request.getParameter("butadd") != null)
				spbo.Them(masanpham, tensanpham, Long.parseLong(g), Long.parseLong(sl), anh, maloai);
			else {
				if (request.getParameter("butupdate") != null)
					spbo.Sua(masanpham, tenspm, Long.parseLong(gm), Long.parseLong(slm), anhm, mlm);
				else {
					String tab = request.getParameter("tab");
					String msp = request.getParameter("msp");
					String tensp = request.getParameter("tensp");
					String slsp = request.getParameter("sl");
					String giasp = request.getParameter("gia");
					String anhsp = request.getParameter("anh");
					String mlsp = request.getParameter("ml");
						
					if (tab != null) {
						if (tab.equals("delete")) {
							spbo.Xoa(msp);
						} else {
							request.setAttribute("msp", msp);
							request.setAttribute("tensp", tensp);
							request.setAttribute("slsp", slsp);
							request.setAttribute("giasp", giasp);
							request.setAttribute("anhsp", anhsp);
							request.setAttribute("mlsp", mlsp);

						}
					}
				}
			}
			request.setAttribute("dssp", dssp);
			RequestDispatcher rd = request.getRequestDispatcher("adminsanpham.jsp");
			rd.forward(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {	
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		DiskFileItemFactory factory = new DiskFileItemFactory();
		DiskFileItemFactory fileItemFactory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(fileItemFactory);
		String dirUrl1 = request.getServletContext().getRealPath("")+ "jpg";
		response.getWriter().println(dirUrl1); 
		System.out.println(dirUrl1);
		sanphambo sbo= new sanphambo();
		String masp = null;
		String tensp = null;
		String gia = null;
		String sl = null;
		String maloai = null;
		String anh = null; 
		String tab = null;
		String btnadd = null;
		String btnupdate = null;
		try {		
			//List<FileItem> fileItems = upload.parseRequest(request);// Lấy về các đối tượng gửi lên
			List<FileItem> fileItems = upload.parseRequest(new ServletRequestContext(request));
			// duyệt qua các đối tượng gửi lên từ client gồm file và các control
			for (FileItem fileItem : fileItems) {
				if (!fileItem.isFormField()) {// Nếu ko phải các control=>upfile lên
					// xử lý file
					String nameimg = fileItem.getName();
					if (!nameimg.equals("")) {
						// Lấy đường dẫn hiện tại, chủ ý xử lý trên dirUrl để có đường dẫn đúng
						String dirUrl =  request.getServletContext().getRealPath("")+ "jpg";
						File dir = new File(dirUrl);
						if (!dir.exists()) {// nếu ko có thư mục thì tạo ra
							dir.mkdir();
						}//File.separator +
						String fileImg = dirUrl + "/" +nameimg;
						anh ="jpg"+ "/" + nameimg;
						System.out.println(anh);
						response.getWriter().println(fileImg); 
						File file = new File(fileImg);// tạo file
						try {
							fileItem.write(file);// lưu file
							System.out.println("UPLOAD THÀNH CÔNG...!");
							System.out.println("Đường dẫn lưu file là: " + dirUrl);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} else
				{
					String tentk = fileItem.getFieldName();
					if (tentk.equals("txtmsp")) {
						masp = fileItem.getString();
					}	
					if (tentk.equals("txttensp")) {
						tensp = fileItem.getString();
					}	
					if (tentk.equals("txtgia")) {
						gia = fileItem.getString();
					}	
					if (tentk.equals("txtsl")) {
						sl = fileItem.getString();	
					}					
					if (tentk.equals("txtml")) {
						maloai = fileItem.getString();	
					}	
					if (tentk.equals("tab")) {
						tab = fileItem.getString();
					}	
					if (tentk.equals("butadd")) {
						btnadd = fileItem.getString();
					}	
					if (tentk.equals("butupdate")) {
						btnupdate = fileItem.getString();
					}	
				}
			}
			System.out.println(tab);
			if(btnadd != null) {
				sbo.Them(masp, tensp, Long.parseLong(gia.trim()), Long.parseLong(sl.trim()),anh, maloai);
			} else if(btnupdate!=null) {
				sbo.Sua(masp, tensp, Long.parseLong(gia.trim()), Long.parseLong(sl.trim()),anh, maloai);
			} else {
				/*
				 * if(tab != null) { if(tab.equals("select")) { sbo.Timsp(masp, tensp,
				 * Long.parseLong(gia), Long.parseLong(sl), anh, maloai); }else if
				 * (tab.equals("delete")) { sbo.Xoa(masp); request.setAttribute("dssp",
				 * sbo.getsp()); response.sendRedirect("adminsanphamcontroller"); } }
				 */
 			}
			response.sendRedirect("adminsanphamcontroller"); 
		} catch (FileUploadException e) {
			System.out.println(e.getMessage());
		} catch (NumberFormatException e) {
			System.out.println(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

		

}
