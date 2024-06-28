package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import bo.chitiethoadonmuahangbo;

/**
 * Servlet implementation class adminxacnhanmhcontroller
 */
@WebServlet("/adminxacnhanmhcontroller")
public class adminxacnhanmhcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public adminxacnhanmhcontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			String mact=request.getParameter("mact");
			chitiethoadonmuahangbo ctbo = new chitiethoadonmuahangbo();
			if(mact!=null)
				ctbo.Sua(Long.parseLong(mact));
			request.setAttribute("ds", ctbo.getxacnhan());
			RequestDispatcher rd=request.getRequestDispatcher("adminxacnhanmuahang.jsp");
		rd.forward(request, response);
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
