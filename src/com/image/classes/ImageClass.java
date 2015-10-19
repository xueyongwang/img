package com.image.classes;

import java.util.List;

import com.utils.DBUtil;

public class ImageClass {
	DBUtil db = new DBUtil();
	
	public static void main(String[] args) {
		String str = "-->寒冷数据分类-->基础信息-->气候特征";
		System.out.println(str.substring(12));
	}
	
	/**
	 * 根据数据类型id获取其特性字段
	 * */
	public String getLbtx(String lxId,String lbId){
		String re = "";
		String sql = "select sx from data_lb_dj where lx_id='"+lxId+"' and lb_id='"+lbId+"'";
		List<?> list = db.query(sql);
		if(list.size()>0){
			Object[] obj = (Object[])list.get(0);
			String sx = (String)obj[0];
			re = sx.replaceAll("、", ",");
		}
		return re;
	}
	
	/**
	 * 根据数据类型id获取其下所对应表名
	 * */
	public String getDyTable(String lxId,String lbId){
		String re = "";
		String sql = "select dy_table from data_lb_dj where lx_id='"+lxId+"' and lb_id='"+lbId+"'";
		List<?> list = db.query(sql);
		if(list.size()>0){
			Object[] obj = (Object[])list.get(0);
			re = (String)obj[0];
		}
		return re;
	}
	
	public String getImageSelect(String tableName,String zd){
		String re = "<div>";
		re += "<input type=\"hidden\" name=\"hid_zds\" id=\"hid_zds\" value=\""+zd+"\" />";
		re += "<input type=\"hidden\" name=\"table_name\" id=\"table_name\" value=\""+tableName+"\" />";
		re += "<table name=\"ins_table\" id=\"ins_table\" style=\"left:200px\"  border='1' cellpadding='0' cellspacing='0' width='800'  align='center' border=\"1\">";
		String query_sql = "select kj_lx,zd_yz,zd_name,zd_Cname from table_bdms where table_name='"+tableName+"'";
		List<?> list = db.query(query_sql);
		if(list.size()>0){
			for (int i = 0; i < list.size(); i++) {
				Object [] obj = (Object[])list.get(i);
//				String kj_lx = (String)obj[0];
//				String zd_yz = (String)obj[1];
				String zd_name = (String)obj[2];
				String zd_Cname = (String)obj[3];
				re += "<tr>";
				re += "<td align=\"right\" width=\"33.3%\">"+zd_Cname+"<input type=\"hidden\" name=\""+zd_name+"_td\" id=\""+zd_name+"_td\" value=\""+zd_name+"\" /></td>";
				re += "<td><input type=\"text\" name=\""+zd_name+"\" id=\""+zd_name+"\" /></td>";
				re += "</tr>";
			}
		}
		re += "</table><div>";
		return re;
	}
	
	//根据类型id和类别id获取类型名
	public String getLxName(String lx_id,String lb_id){
		String re = "" ;
		String sql = "select lx_name from data_lb_dj where lx_id='"+lx_id+"' and lb_id='"+lb_id+"'";
		List<?> list = db.query(sql);
		if(list.size()>0){
			Object[] obj = (Object[])list.get(0);
			re = (String)obj[0];
		}
		return re ;
	}
	
	/**
	 * 根据数据类型id获取其特性字段
	 * */
	public List<?> getLBLX(String name){
		String sql = "select lb_id,lx_id from data_lb_dj where lx_name='"+name+"'";
		return db.query(sql);
	}
	
	public List<?> getGaoJiSearchTjList(String tableName){
		String query_sql = "select zd_name,zd_Cname from table_bdms where table_name='"+tableName+"'";
		return db.query(query_sql);
	}
	
	public List<?> SearchByDaohangList(String zid,String lxId){
		String sql = "select file_bh,file_name,file_uploadtime,up_user,file_path from mt_type_default  where ss_xklb = '"+zid+"' and ss_datalx = '"+lxId+"'";
		return db.query(sql);
	}
	
	
	public List<?> getImageList(String lxId,String orderFname,int limit){
		String sql = "select file_bh,file_name,file_uploadtime,up_user,file_path,ss_xklb from mt_type_default where ss_datalx = '"+lxId+"' order by "+orderFname+" desc limit 0,"+limit;
		return db.query(sql);
	}
	
	public List<?> getTypeList(){
		String sql = "select zid,message from sys_tree where fid!='-1' and fbh !='01' order by zbh "; 
		return db.query(sql);
	}
	
	
	/**
	 * 获取学科类相册下所有的图片总和排行榜
	 * */
	public List<?> getImageBooksOrderList(String lxId){
		String sql = "select sum(file_look) as views,ss_xklb,sslbname from mt_type_default where ss_datalx='"+lxId+"' group by ss_xklb order by views desc limit 0,10";
		return db.query(sql);
	}
	
	
	public List<?> kuaiSuSearchList(String zdStr,String dyTable,String searchValue,String lxId ){
		zdStr = zdStr.replaceAll("、", ",");
		String []zdArr = zdStr.split(",");
		String tiaoJianStr = "";
		if(!zdStr.equals("")){
			for (int i = 0; i < zdArr.length; i++) {
				tiaoJianStr += " or "+zdArr[i]+" like '%"+searchValue+"%' ";
			}
		}
		
		String querySql = "select file_bh,file_name,file_uploadtime,up_user,file_path, "+zdStr+" from mt_type_default mtd left join  "+dyTable+" f on mtd.file_bh =  f.doc_bh " +
				"where ss_datalx = '"+lxId+"' and file_name LIKE '%"+searchValue+"%' "+tiaoJianStr+" order by file_look desc";
		return db.query(querySql);
		
	}
	
	public String result(String basePath,List<?> queryList,String dytable,String lxId){
		String re = "";
		if(queryList.size()>0){
			re = "<div class=\"date\"><div style=\"font-size: 16px; margin-top: 10px;\">检索结果</div></div>"; 
			re += "<ul class=\"sy_list\">";
			for (int i = 0; i < queryList.size(); i++) {
				Object []obj = (Object[])queryList.get(i);
				String file_bh = (String)obj[0];
				String fileName = (String)obj[1];
				String fileDate = (String)obj[2];
				String upUser = (String)obj[3];
				String file_path = (String)obj[4];
				file_path = file_path.substring(file_path.indexOf("/")+1);
				re += "<li>"+
							"<div class=\"syl_pic\">"+
								 "<a href=\""+basePath+"image_manage/image_view.jsp?file_bh="+file_bh+"&dytable="+dytable+"&lx_id="+lxId+"\" title=\""+fileName+"\" target=\"_blank\">"+
							     "<img src=\""+basePath+file_path+"\" alt=\""+fileName+"\"></a>"+
							"</div>"+
							"<div class=\"syl_info\">"+
							     "<span>"+upUser+"&nbsp;&nbsp;"+fileDate+"</span>"+
							     "<a href=\""+basePath+"image_manage/image_view.jsp?file_bh="+file_bh+"&dytable="+dytable+"&lx_id="+lxId+"\" target=\"_blank\">"+fileName+"</a>"+
							"</div>"+
						"</li>";
			}
		}else{
			re = "<div class=\"date\"><div style=\"font-size: 16px; margin-top: 10px;\">暂无结果</div></div>"; 
		}
		re += "</ul>";
		return re;
	}
	
	public List<?> getImageMsgList(String imageBh,String lxId){
		String sql = "select file_name,up_user,sslbname,file_uploadtime,file_path,file_look,ss_xklb from mt_type_default where ss_datalx = '"+lxId+"' and file_bh = '"+imageBh+"'";
		return db.query(sql);
	}
	
	public String getTeXingMiaoshu(String imageBh,String dyTable,String lxId){
		String re = "";
		String sql = "select sx,sx_c from data_lb_dj where dy_table='"+dyTable+"'";
		List<?> list = db.query(sql);
		if(list.size()>0){
			Object []obj = (Object[])list.get(0);
			String sx = (String)obj[0];
			String sx_c = (String)obj[1];
			String sxc_arr[] = sx_c.split("、");
			sx = sx.replaceAll("、", ",");
			String query_sql = "select "+sx+" from "+dyTable+" where doc_bh = '"+imageBh+"'";
			List<?> query_list = db.query(query_sql);
			if(query_list.size()>0){
				Object query_obj[] = (Object[])query_list.get(0);
				for (int i = 0; i < query_obj.length; i++) {
					re += "<span>"+sxc_arr[i]+"："+(String)query_obj[i]+"</span>";
				}	
			}
		}
		return re;
	}
	
	
	
	public List<?> gaoJiSearchList(String allSelectStr,String dyTable,String lxId){
		String sql = "select file_bh,file_name,file_uploadtime,up_user,file_path from mt_type_default mtd left join  "+dyTable+" f on mtd.file_bh =  f.doc_bh " +
				"where ss_datalx = '"+lxId+"' "+allSelectStr+" order by file_look desc";
		return db.query(sql);
	}
}
