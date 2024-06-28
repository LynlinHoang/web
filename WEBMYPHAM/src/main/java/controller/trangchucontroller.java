package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bean.loaisanphambean;
import bean.sanphambean;
import bo.loaisanphambo;
import bo.sanphambo;


/**
 * Servlet implementation class trangchucontroller
 */
@WebServlet("/trangchucontroller")
public class trangchucontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public trangchucontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			// dat cau hinh va gui len
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			// Sai loaibo lay ve ds loai
			loaisanphambo lbo=new loaisanphambo();
			ArrayList<loaisanphambean> dsloai=lbo.getloai();			
			// Sai sachbo lay ve ds sach			
			sanphambo spbo= new sanphambo();
			ArrayList<sanphambean> dssanpham=spbo.getsp();
			String ml=request.getParameter("ml");
			String key=request.getParameter("texttk");
			if(ml!=null)
				dssanpham=spbo.TimMa(ml);
			else
				if(key!=null)
					dssanpham=spbo.Tim(key); 
			// chuyen dsloai va dssach ve ht.sach
			request.setAttribute("dsloai",dsloai);
			request.setAttribute("dssanpham",dssanpham);
			RequestDispatcher id= request.getRequestDispatcher("trangChu.jsp");
			id.forward(request, response);		
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
