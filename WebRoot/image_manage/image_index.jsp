<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.image.classes.ImageClass"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
ImageClass ic = new ImageClass();

String lbId = "",lxId = "";
List<?> list = ic.getLBLX("图片");
if(list.size()>0){
	Object obj [] = (Object[])list.get(0);
	lbId = (String)obj[0];
	lxId = (String)obj[1];
}
String sx_zd = ic.getLbtx(lxId, lbId);
String dytable = ic.getDyTable(lxId, lbId);
List<?> gaoJiSearchTjList = ic.getGaoJiSearchTjList(dytable); 
List<?> laterList = ic.getImageList(lxId,"file_uploadtime",16);//最新图片16个
List<?> hotList = ic.getImageList(lxId,"file_look",8);//大图浏览8个
List<?> imageBooksOrderList = ic.getImageBooksOrderList(lxId);//最热图册

List<?> typeList = ic.getTypeList();
%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>图片网站</title>
<link type="text/css" href="./image_index/a.css" rel="stylesheet">
<link href="./image_index/bdsstyle.css" rel="stylesheet" type="text/css">
<script src="./image_index/hm.js"></script>
<script type="text/javascript" src="./image_index/jq.js"></script>
<script type="text/javascript" src="./image_index/a.js"></script>
<script src="./image_index/logger.js"></script>
<script type="text/javascript" src="<%=basePath %>image_manage/js/jquery-1.4.2.js"></script>
<script type="text/javascript" src="./js/show_image.js"></script>
</head>
<body rel="index">
	<input type="hidden" id="sx_zd" name="sx_zd" value="<%=sx_zd %>"/>
	<input type="hidden" id="basePath" name="basePath" value="<%=basePath %>"/>
	<input type="hidden" id="dytable" name="dytable" value="<%=dytable %>"/>
	<input type="hidden" id="lx_id" name="lx_id" value="<%=lxId %>"/>
	<div id="header">
		<div class="box"> 
			<div id="logo"></div>
			<ul id="menu">
				<li><a href="./image_index.jsp" rel="nofollow">首页</a></li>
				<li><a href="javascript:void(0);" onclick="tupianfenlei()">图片分类</a></li>
				<li><a href="<%=basePath %>image_manage/image_upload.jsp" target="_blank">上传图片</a></li>
				<li><a href="javascript:void(0);" onclick="gjjs()">高级检索</a></li>
			</ul>
			<div id="search" >
				<div class="inp"><input type="text" id="ser_inp" class="ser_inp"></div>
				<div class="inp-btn"><input type="button" onclick="putong_search()" value="查询&nbsp;&nbsp;" id="ser_btn" class="ser_btn"></div>
			</div>
		</div>
		<div class="hbg"></div>
	</div>
	<!-- 合成分类导航串   -->
	<div id="type_id" class="box" style="display:none">
		<div class="sort">
			<ul class="tpmenu">
				<%
				if(typeList.size()>0){
					for(int i=0;i<typeList.size();i++){
						Object []obj = (Object[])typeList.get(i);
						String zid = (String)obj[0];
						String message = (String)obj[1];
						message = message.substring(12);
						message = message.replaceAll("-->",">>");
						String open = "";
						%>
						<li id="class_li<%=i+1 %>" onclick="getResultByType('<%=zid %>',this,'<%=typeList.size() %>')" class="s<%=(i+1)+open %>"><a href="javascript:void(0);" ><%=message %></a></li>
						<%
					}
				}
				%>
			</ul>
		</div>
	</div>
	
	<!-- 高级检索的条件 -->
	<div id="gjsearch_id" class="box" style="display:none">
		<table width="80%" align="center" border="0">
			<tr>
				<td align="right" colspan="2">
					图片所属类别：
				</td>
				<td width="80%">
					<input type="text" name="sslbname" id="sslbname" size="50" onclick="get_Lb()" />
					<input type="hidden" name="ss_xklb" id="ss_xklb" value="" /><br/>
				</td>
			</tr>
			<tr></tr>
			<!-- 高级查询条件串   -->
			<%
			if(gaoJiSearchTjList.size()>0){
				for (int i = 0; i < gaoJiSearchTjList.size(); i++) {
					Object [] obj = (Object[])gaoJiSearchTjList.get(i);
					String zd_name = (String)obj[0];
					String zd_Cname = (String)obj[1];
					
					%>
					<tr>
						<td align="right" width="10%">
							<select id="luojifu_<%=zd_name %>" >
								<option value="1">并含</option>
								<option value="2">或含</option>
								<option value="3">不含</option>
							</select>
						</td>
						<td align="right" width="8%"><%=zd_Cname %>：</td>
						<td width="82%"><input type="text" id="<%=zd_name %>" name="<%=zd_name %>" size="50"><br/></td>
					</tr>
					<tr></tr>
					<%
				}
			}
			%>
			<tr>
				<td align="right" colspan="3">
					<input type="button" value="高级检索" onclick="gaojiSearch()" />
					<input type="reset" value="重置" /><br/>
				</td>
			</tr>
		</table>
		
	</div>
	<!-- 大图浏览   -->
	<div id="zSlider" style="display:block;">
		<div id="picshow">
			<div id="picshow_img">
				<ul>
					<%
					if(hotList!=null&&hotList.size()>0){
						for(int i=0;i<hotList.size();i++){
							Object []obj = (Object[])hotList.get(i);
							String file_bh = (String)obj[0];
							String file_path = (String)obj[4];
							file_path = file_path.substring(file_path.indexOf("/")+1);
							%>
							<li style="display: none;">
								<a href="<%=basePath %>image_manage/image_view.jsp?file_bh=<%=file_bh %>&dytable=<%=dytable %>&lx_id=<%=lxId %>" target="_blank" rel="nofollow">
									<img src="<%=basePath+file_path %>">
								</a>
							</li>
							<%
						}
					}
					%>
				</ul>
			</div>
		</div>
		<div id="select_btn">
			<ul>
				<%
				if(hotList!=null&&hotList.size()>0){
					for(int i=0;i<hotList.size();i++){
						Object []obj = (Object[])hotList.get(i);
						String file_bh = (String)obj[0];
						String fileName = (String)obj[1];
						String fileDate = (String)obj[2];
						String upUser = (String)obj[3];
						fileDate = fileDate.split(" ")[0];
						%>
						<li><a href="<%=basePath %>image_manage/image_view.jsp?file_bh=<%=file_bh %>&dytable=<%=dytable %>&lx_id=<%=lxId %>" target="_blank">
							<span class="select_text"><%=fileName %></span>
							<span class="select_date"> <%=upUser+"&nbsp;&nbsp;&nbsp;&nbsp;"+fileDate %></span></a>
						</li>
						<%
					}
				}
				%>
			</ul>
		</div>	
	</div>

<div id="right" class="box">
		<!-- 左侧的最新上传浏览   -->
		<div class="ileft" id="sy_load" rel="1395714892" loadday="3">
			<div class="date">
			     <div style="font-size: 16px; margin-top: 10px;">最新上传</div>
			</div>
			<ul class="sy_list">
				<%
				if(laterList!=null&&laterList.size()>0){
					for(int i=0;i<laterList.size();i++){
						Object []obj = (Object[])laterList.get(i);
						String file_bh = (String)obj[0];
						String fileName = (String)obj[1];
						String fileDate = (String)obj[2];
						String upUser = (String)obj[3];
						String file_path = (String)obj[4];
						file_path = file_path.substring(file_path.indexOf("/")+1);
						%>
						<li>
							<div class="syl_pic">
								 <a href="<%=basePath %>image_manage/image_view.jsp?file_bh=<%=file_bh %>&dytable=<%=dytable %>&lx_id=<%=lxId %>" title="<%=fileName %>" target="_blank">
							     <img src="<%=basePath+file_path %>" alt="<%=fileName %>"></a>
							</div>
							<div class="syl_info">
							     <span><%=upUser+"&nbsp;&nbsp;"+fileDate %></span>
							     <a href="<%=basePath %>image_manage/image_view.jsp?file_bh=<%=file_bh %>&dytable=<%=dytable %>&lx_id=<%=lxId %>" target="_blank"><%=fileName %></a>
							</div>
						</li>
						<%
					}
				}
				%>
			</ul>
		</div>
		<!-- 右侧的最热图册浏览   -->
		<div class="iright">
			<div class="rb">
				<div class="rtit">最热图册</div>
				<ul class="rlist">
					<%
					if(imageBooksOrderList.size()>0){
						for(int i=0;i<imageBooksOrderList.size();i++){
							Object obj[] = (Object[])imageBooksOrderList.get(i);
							String sumViews = (String)obj[0];
							String lbid = (String)obj[1];
							String lbname = (String)obj[2];
							%>
							<li class="rli" style="display:none;"><b><%=(i+1) %></b><%=lbname %></li>
							<li class="rlib" style="display:block;">
								<b><%=(i+1) %></b>
								<div class="rb_info">
									<p><a href="javascript:void(0);" onclick="getResultByImageBooks('<%=lbid %>')" rel="nofollow"><%=lbname %></a></p>
									<span>浏览数：<%=sumViews %></span>
								</div>
							</li>
							<%
						}
					}
					%>
				</ul>
			</div>
		</div>	
	</div>
<div id="footer">
	<div class="box">
		<div id="fl">
			<dl>
				<dt>关于</dt>
				<dd><a href="http://www.ivsky.com/about/about.html" rel="nofollow">关于天堂</a></dd>
				<dd><a href="http://www.ivsky.com/about/team.html" rel="nofollow">团队成员</a></dd>
				<dd><a href="http://www.ivsky.com/about/disclaimer.html" rel="nofollow">免责声明</a></dd>
			</dl>
			<dl>
				<dt>帮助</dt>
				<dd><a href="http://www.ivsky.com/about/tougao.html" rel="nofollow">用户投稿</a></dd>
				<dd><a href="http://www.ivsky.com/about/faq.html" rel="nofollow">常见问题</a></dd>
			</dl>
			<dl>
				<dt>联系</dt>
				<dd><a href="http://www.ivsky.com/about/contact.html" rel="nofollow">联系我们</a></dd>
				<dd><a href="http://www.ivsky.com/about/guestbook.html" rel="nofollow">留言反馈</a></dd>
				<dd><a href="http://www.ivsky.com/about/ad.html" rel="nofollow">广告投放</a></dd>
			</dl>
			<dl>
				<dt>关注</dt>
				<dd class="sina"><a href="http://weibo.com/ivskycom" target="_blank" rel="nofollow">新浪微博</a></dd>
				<dd class="q"><a href="http://t.qq.com/ivskycom" target="_blank" rel="nofollow">腾讯微博</a></dd>
			</dl>
		</div>
		<div id="fr"><p>© 2005-2013 天堂图片网　　闽ICP备：05021777号</p><p>本站提供的图片仅供学习和交流使用，版权归原作者所有，请勿用于任何商业用途</p><p>主机服务商：<a href="http://www.aliyun.com/cps/rebate?from_uid=jJfSOSVZ99F3GCoDuIogFvjezZSHMCm8" target="_blank">阿里云</a> &nbsp; <a href="http://www.chinaccnet.com/" target="_blank">中电云集</a></p></div><a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">
	</a></div><a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">
</a></div>


</body></html>