package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import bean.giomuahangbean;

import bean.khachmuahangbean;

import bo.chitiethoadonmuahangbo;

import bo.giomuahangbo;

import bo.hoadonmuahangbo;

/**
 * Servlet implementation class xacnhanmuahangcontroller
 */
@WebServlet("/xacnhanmuahangcontroller")
public class xacnhanmuahangcontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public xacnhanmuahangcontroller() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
try {
			
			HttpSession session = request.getSession();
			khachmuahangbean kh=(khachmuahangbean)session.getAttribute("kh");
			if(kh==null) {
				RequestDispatcher rd = request.getRequestDispatcher("trangchucontroller");
				rd.forward(request, response);
			}
			if(kh!=null) {
				hoadonmuahangbo hdbo= new hoadonmuahangbo();
				long mkh= kh.getMakh();
				hdbo.Them(mkh);
				chitiethoadonmuahangbo ctbo= new chitiethoadonmuahangbo();
				long maxhd=hdbo.Maxhd();
				giomuahangbo gh=(giomuahangbo)session.getAttribute("gh");
				for(giomuahangbean h:gh.ds) {
					  ctbo.Them(h.getMasanpham(),h.getSoluongmua(),maxhd);
				}
				 session.removeAttribute("gh");
				 response.sendRedirect("lichsumuahangcontroller");
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
