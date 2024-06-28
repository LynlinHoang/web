package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import bo.khachmuahangbo;

/**
 * Servlet implementation class dangkympcontroller
 */
@WebServlet("/dangkympcontroller")
public class dangkympcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public dangkympcontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			// dat cau hinh gui len va lay ve bang utf-8
			request.setCharacterEncoding("utf-8");// gữi lên với utf-8
			response.setCharacterEncoding("utf-8");// lấy về với utf-8
			/// lay hoten, diachi, sodt, email, un va pass nhap vao
			String hoten = request.getParameter("txtht");
			String diachi = request.getParameter("txtdc");
			String sodt = request.getParameter("txtsdt");
			String email = request.getParameter("txtemail");
			String un = request.getParameter("txtun");
			String pass = request.getParameter("txtp");

			if (hoten == null && diachi == null && sodt == null && email == null && un == null && pass == null) {
				RequestDispatcher rd = request.getRequestDispatcher("dangnhapmpcontroller");
				rd.forward(request, response);
			} //
			// kiem tra nhap vao
			else {
				khachmuahangbo kh = new khachmuahangbo();
				if (kh.ktdk(hoten, diachi, sodt, email, un, pass) == null) {
					kh.Them(hoten, diachi, sodt, email, un, pass);

				}
			}
			response.sendRedirect("dangnhapmpcontroller");

		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
