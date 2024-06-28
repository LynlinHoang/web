package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bean.khachmuahangbean;

import bean.lichsumuahangbean;

import bo.lichsumuahangbo;

/**
 * Servlet implementation class lichsumuahangcontroller
 */
@WebServlet("/lichsumuahangcontroller")
public class lichsumuahangcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public lichsumuahangcontroller() {
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
			// tao 1 lich su mua sach va 1 dsls
			lichsumuahangbo lsbo = new lichsumuahangbo();
			// ktr da dang nhap hay chua
			HttpSession session = request.getSession();
			khachmuahangbean dkh = (khachmuahangbean) session.getAttribute("kh");
			if (dkh == null) {
				response.sendRedirect("dangnhapmpcontroller");
			} else {
				long makh = dkh.getMakh();
				lsbo = new lichsumuahangbo();
				ArrayList<lichsumuahangbean> dsls = lsbo.ls(makh);
				request.setAttribute("dsls", dsls);
				RequestDispatcher rd = request.getRequestDispatcher("lichsumuahang.jsp");
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
