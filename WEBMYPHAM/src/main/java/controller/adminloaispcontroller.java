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

import bo.lichsumuahangbo;
import bo.loaisanphambo;

/**
 * Servlet implementation class adminloaispcontroller
 */
@WebServlet("/adminloaispcontroller")
public class adminloaispcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public adminloaispcontroller() {
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
			String maloai = request.getParameter("txtmaloai");
			String tenloai = request.getParameter("txttenloai");
			String tenloaimoi = request.getParameter("txttenloai");
			loaisanphambo lbo = new loaisanphambo();
			ArrayList<loaisanphambean> ds = lbo.getloai();
			if (request.getParameter("butadd") != null)
				lbo.Them(maloai, tenloaimoi);
			else if (request.getParameter("butupdate") != null)
				lbo.Sua(maloai, tenloaimoi);
			else {
				String tab = request.getParameter("tab");
				String ml = request.getParameter("ml");
				if (tab != null) {
					if (tab.equals("select")) {
						request.setAttribute("tenloai", lbo.Tim(ml));
						request.setAttribute("maloai", ml);
					} else
						lbo.Xoa(ml);
				}
			}
			request.setAttribute("ds", ds);
			RequestDispatcher rd = request.getRequestDispatcher("adminloaisp.jsp");
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
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
