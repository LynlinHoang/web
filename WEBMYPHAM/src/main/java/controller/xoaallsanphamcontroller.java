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
 * Servlet implementation class xoaallsanphamcontroller
 */
@WebServlet("/xoaallsanphamcontroller")
public class xoaallsanphamcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public xoaallsanphamcontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			giomuahangbo gh;
			HttpSession session = request.getSession();
			gh=(giomuahangbo)session.getAttribute("gh");
			session.removeAttribute("gh");
			response.sendRedirect("htgiohangcontroller");
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

}
