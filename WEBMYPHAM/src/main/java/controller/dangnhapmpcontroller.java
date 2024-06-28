package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bean.khachmuahangbean;
import bo.khachmuahangbo;

/**
 * Servlet implementation class dangnhapmpcontroller
 */
@WebServlet("/dangnhapmpcontroller")
public class dangnhapmpcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public dangnhapmpcontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		try {
			khachmuahangbo khbo = new khachmuahangbo();
			String un = request.getParameter("txtname");
			String pw = request.getParameter("txtpass");
			if (un!= null && pw!= null) {				
				khachmuahangbean kh = khbo.ktdn(un, pw);
				if (kh != null) {
					session.setAttribute("kh", kh);
					session.setAttribute("un", kh.getTenkh());
					response.sendRedirect("trangchucontroller");
				} else {
					
					RequestDispatcher rd = request.getRequestDispatcher("trangchucontroller");
					rd.forward(request, response);
					
				}
			} else {
				RequestDispatcher rd = request.getRequestDispatcher("trangchucontroller");
				rd.forward(request, response);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
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
