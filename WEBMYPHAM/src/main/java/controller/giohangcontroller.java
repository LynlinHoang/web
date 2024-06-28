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
 * Servlet implementation class giohangcontroller
 */
@WebServlet("/giohangcontroller")
public class giohangcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public giohangcontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");			
			String msp= request.getParameter("msp");
			String tsp= request.getParameter("tsp");
			String giatam= request.getParameter("gia");	
			HttpSession session=request.getSession();
			if(msp!=null&&tsp!=null&&giatam!=null){
			 	giomuahangbo gh=null;
			 	long gia=Long.parseLong(giatam);
			 			if(session.getAttribute("gh")==null){
			 				gh=new giomuahangbo();
							session.setAttribute("gh", gh);//Tao gio
		  				}
			 				gh=(giomuahangbo)session.getAttribute("gh");
			 				gh.Them(msp, tsp, gia, 1);
			 				session.setAttribute("gh", gh);
			 				response.sendRedirect("htgiohangcontroller");
		 	}

		} catch (Exception e) {
			System.out.print(e.getMessage());	
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
