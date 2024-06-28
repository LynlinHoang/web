package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bean.adminbean;
import bean.khachmuahangbean;
import bo.adminbo;
import bo.khachmuahangbo;

/**
 * Servlet implementation class admindangnhapcontroller
 */
@WebServlet("/admindangnhapcontroller")
public class admindangnhapcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public admindangnhapcontroller() {
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
			adminbo adbo= new adminbo();
			String us = request.getParameter("textus");
			String ps = request.getParameter("textps");
			if (us!= null && ps!= null) {				
				adminbean ad=adbo.dn(us, ps);
				if (ad != null) {
					session.setAttribute("ad", ad);
					response.sendRedirect("adminxacnhanmhcontroller");
				} else {
					
					RequestDispatcher rd = request.getRequestDispatcher("admindangnhap.jsp");
					rd.forward(request, response);
					
				}
			} else {
				RequestDispatcher rd = request.getRequestDispatcher("admindangnhap.jsp");
				rd.forward(request, response);
			}
		} catch (Exception e) {
			e.printStackTrace();
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
