package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bo.giomuahangbo;

/**
 * Servlet implementation class suaslcontroller
 */
@WebServlet("/suaslcontroller")
public class suaslcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public suaslcontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			giomuahangbo gh;
			String msp = request.getParameter("msp");
			String sl = request.getParameter("texts");
			long slm = Long.parseLong(sl);
			HttpSession session = request.getSession();
			if (msp != null && sl != null) {
				gh = (giomuahangbo) session.getAttribute("gh");
				gh.sua(msp, slm);
				session.setAttribute("gh", gh);
				response.sendRedirect("htgiohangcontroller");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
