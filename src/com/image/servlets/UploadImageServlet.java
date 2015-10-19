package com.image.servlets;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.image.classes.ImageClass;
import com.utils.DBUtil;
import com.utils.UtilsTime;

public class UploadImageServlet extends HttpServlet {

	private static final long serialVersionUID = -6609618028577451649L;
	ServletContext sc;
	private boolean bool_jud=false;     //上传成功标识
	private static final int UPLOAD_SUCCSSS=0;    // "上传文件成功！",
	
	public void init(ServletConfig config) {
		sc = config.getServletContext();
		System.out.println(sc.getContextPath());
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setCharacterEncoding("utf-8");
		request.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		
		UtilsTime ut = new UtilsTime(); 
		DBUtil db = new DBUtil();
		ImageClass ic = new ImageClass();

		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(10240000);// 设置内存缓冲区，超过后写入临时文件

		String base = sc.getRealPath("/") + "filesMiddle";// 设置临时文件存储位置
		System.out.println("临时文件存储路径==" + base);
		File file = new File(base);
		if (!file.exists()) {
			file.mkdirs();
		}
		factory.setRepository(file);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(10002400000l);// 设置单个文件的最大上传值
		upload.setSizeMax(10002400000l);// 设置整个request的最大值
		upload.setHeaderEncoding("UTF-8");

		// 获取上传参数
		HttpSession session = request.getSession();
		String lb_id = (String) session.getAttribute("lb_id");
		String lx_id = (String) session.getAttribute("lx_id");
		String ss_xklb = (String) session.getAttribute("ss_xklb");
		String ss_lbname = (String) session.getAttribute("ss_lbname");

		String str_lbsx = (String) session.getAttribute("str_lbsx");

		String user_name = (String) session.getAttribute("user_name");
		if (user_name == null) {
			user_name = "admin";
		}
		String savePath = sc.getRealPath("/") + "/upload_files/office_upload";
		savePath = savePath + "/" + lx_id;
		String uplx = "";

		try {
			List<?> items = upload.parseRequest(request);
			FileItem item = null;
			for (int i = 0; i < items.size(); i++) {
				item = (FileItem) items.get(i);

				// 保存文件
				if (!item.isFormField() && item.getName().length() > 0) {
					String fileNameReplaced = fileNameReplace(item.getName());
					uplx = fileNameReplaced.substring(fileNameReplaced
							.lastIndexOf(".") + 1); // 文件类型
					savePath = savePath + "/" + ss_xklb; // 存储路径文件夹
			   		System.out.println("savePath===" + savePath);
					File save_file = new File(savePath);
					if (!save_file.exists()) {
						save_file.mkdirs();
					}
					String timeStr = getNormalTime();
					String new_filename = timeStr + "." + uplx;
					File file_jud = new File(savePath, new_filename);
					// 这里需补一个判断是否文件是否重复

					try {
						item.write(file_jud); // 写入文件
						Thread.sleep(100); // 线程等待
						bool_jud = true;
					} catch (Exception e) {
						bool_jud = false;
					}

					if (bool_jud) {
						String file_bh = ut.getSysTime("0", "1"); // 文档编号
						String file_uploadtime = ut.getSysTime("0", "0"); // 文档上传时间
						// String file_path =
						// file_jud.getPath().replaceAll("\\\\", "/") ; //文件存储路径

						String file_path = savePath + "/" + timeStr + "."
								+ uplx; // 文件存储路径
						System.out.println("file_path===" + file_path);
						String file_name = fileNameReplaced.substring(0,
								fileNameReplaced.indexOf("."));
						List<String> list = new ArrayList<String>();
						String in_sql1 = "insert into mt_type_default(file_bh,file_lx,file_name,up_user,file_path,ss_xklb,ss_datalb,ss_datalx,file_uploadtime,sslbname) values('"
								+ file_bh
								+ "','"
								+ uplx
								+ "','"
								+ file_name
								+ "','"
								+ user_name
								+ "','"
								+ file_path
								+ "','"
								+ ss_xklb
								+ "','"
								+ lb_id
								+ "','"
								+ lx_id
								+ "','" + file_uploadtime + "','"+ss_lbname+"');";
						list.add(in_sql1);
						String dytable = ic.getDyTable(lx_id, lb_id); 
						String sx = ic.getLbtx(lx_id, lb_id);
						String in_sql2 = "insert into " + dytable
								+ "(doc_bh) values('" + file_bh + "');";
						list.add(in_sql2);
						db.useBatch(list);
						mak_sql_inlbtb(str_lbsx, sx, file_bh, dytable);
						String path = "/upload_files/office_upload/" + lx_id + "/" + ss_xklb
								+ "/" + new_filename + "";
						out.print("{status:" + this.UPLOAD_SUCCSSS
								+ ",message:'" + path.replaceAll("\\\\", "/")
								+ "'}");
					}

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	// 处理文档数据类型属性登记
	public void mak_sql_inlbtb(String str_value, String str_zd, String doc_bh,
			String dytable) {
		DBUtil db = new DBUtil();
		String str_set = mak_set(str_value, str_zd);
		String up_sql = "update " + dytable + " set " + str_set
				+ " where doc_bh='" + doc_bh + "'";
		System.out.println("up_sql====lb=====" + up_sql);
		db.useSQL(up_sql);
	}

	// 合成update set语句 +描述表字段类型信息
	public String mak_set(String str_value, String str_zd) {
		String re = "";
		String[] arr_value = str_value.split("!");
		String[] arr_zd = str_zd.split(",");
		for (int i = 0; i < arr_zd.length; i++) {
			if (re.equals("")) {
				re = arr_zd[i] + "=" + "'" + arr_value[i] + "'";
			} else {
				re += "," + arr_zd[i] + "=" + "'" + arr_value[i] + "'";
			}
		}
		return re;
	}

	public String getNormalTime() {
		String timeStr = "";
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
				"yyyyMMddHHmmss");
		Date currentTime = new Date();
		timeStr = formatter.format(currentTime);
		return timeStr;
	}

	/*
	 * 实现功能：对上传名里含有的特殊字符做相应的替换处理，使其命名满足系统下载浏览规则 入参说明：name ----- 要上传的文件名
	 * 函数输出说明：返回相应替换后的文件名
	 */
	private String fileNameReplace(String name) {
		System.out.println("name00==" + name);
		if (name.length() > 0) {
			name = name.replaceAll(" ", "");
			name = name.replaceAll("\'", "^");
			name = name.replaceAll("!", "");
			name = name.replaceAll(",", "_");
			name = name.replaceAll("，", "_");
			name = name.replaceAll("#", "");
			name = name.replaceAll("@", "");
			name = name.replaceAll("&", "");
			// name = name.replaceAll("*", "");
			name = name.replaceAll("%", "");
			name = name.replaceAll("~", "");
		}
		System.out.println("name==" + name);
		return name;
	}

}
