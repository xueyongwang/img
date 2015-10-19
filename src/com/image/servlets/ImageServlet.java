package com.image.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.image.classes.ImageClass;

public class ImageServlet extends HttpServlet {

	private static final long serialVersionUID = -539798015790979478L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession();
		ImageClass ic = new ImageClass();
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		
		String bs = request.getParameter("bs");
		if(bs.equals("1")){
			String str_lbsx = request.getParameter("str_lbsx");
			String lb_id = request.getParameter("lb_id");
			String lx_id = request.getParameter("lx_id");  
			String ss_xklb = request.getParameter("ss_xklb"); 
			String ss_lbname = request.getParameter("ss_lbname"); 

 			session.setAttribute("str_lbsx", str_lbsx);
 			session.setAttribute("lb_id", lb_id);
 			session.setAttribute("lx_id", lx_id);
 			session.setAttribute("ss_xklb", ss_xklb);
 			session.setAttribute("ss_lbname", ss_lbname);
 			out.print("yes") ;
		}else if(bs.equals("2")){//快速检索
			String zdStr = request.getParameter("sx_zd"); 
			String dyTable = request.getParameter("dytable"); 
			String lxId = request.getParameter("lx_id"); 
			String searchValue = request.getParameter("ser_inp"); 
			List<?> queryList = ic.kuaiSuSearchList(zdStr, dyTable ,searchValue,lxId);
			String re = ic.result(basePath, queryList,dyTable,lxId);
			out.print(re);
		}else if(bs.equals("3")){//根据导航类别获取结果
			String zid = request.getParameter("zid"); 
			String dyTable = request.getParameter("dytable"); 
			String lxId = request.getParameter("lx_id"); 
			List<?> queryList = ic.SearchByDaohangList(zid,lxId);
			String re = ic.result(basePath, queryList,dyTable,lxId);
			out.print(re);
		}else if(bs.equals("4")){//高级查询
			String allSelectStr = request.getParameter("all_select_str"); 
			String dyTable = request.getParameter("dytable"); 
			String lxId = request.getParameter("lx_id"); 
			List<?> queryList = ic.gaoJiSearchList(allSelectStr,dyTable,lxId);
			String re = ic.result(basePath, queryList,dyTable,lxId);
			out.print(re);
		}
		out.flush();
		out.close();
	}

}
