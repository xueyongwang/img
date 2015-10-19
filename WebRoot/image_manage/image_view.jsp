<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.image.classes.ImageClass"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

ImageClass ic = new ImageClass();

String imageBh = request.getParameter("file_bh");
String dyTable = request.getParameter("dytable");
String lxId = request.getParameter("lx_id");
List<?> viewList = ic.getImageMsgList(imageBh,lxId);//获取图片信息

String imageName = "";//图片名
String imageUpUser = "";//上传图片者
String imageType = "";//图片所属的学科类别
String imageTypeId = "";//图片所属的学科类别ID
String imageUpDate = "";//图片上传日期
String imagePath = "";//图片上传路径
String imageJianjie = "";//图片简介
String imageViews = "";//图片总浏览量
String TeXingMiaoshu = "";//主题、简介。。。
if(viewList.size()>0){
	Object []obj = (Object[])viewList.get(0);
	imageName = (String)obj[0];
	imageUpUser = (String)obj[1];
	imageType = (String)obj[2];
	imageUpDate = (String)obj[3];
	imagePath = (String)obj[4];
	imageViews = (String)obj[5];
	imageTypeId = (String)obj[6];
	TeXingMiaoshu = ic.getTeXingMiaoshu(imageBh,dyTable,lxId);//获取特性描述
	imagePath = imagePath.substring(imagePath.indexOf("upload_files"));
}
%>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><%=imageName %></title>
		<meta name="description" content="">
		<link type="text/css" href="<%=basePath %>image_manage/css/show_image.css" rel="stylesheet">
	</head>
	<body rel="picview">
		<div id="header">
			<div class="box"> 
				<div id="logo"></div>
				<ul id="menu">
					<li><a href="./image_index.jsp" rel="nofollow">首页</a></li>
					<li><a href="javascript:void(0);" onclick="tupianfenlei()">图片分类</a></li>
					<li><a href="javascript:void(0);" onclick="upload_images()">上传图片</a></li>
					<li><a href="javascript:void(0);" onclick="gjjs()">高级检索</a></li>
				</ul>
				<div id="search" >
					<div class="inp"><input type="text" id="ser_inp" class="ser_inp"></div>
					<div class="inp-btn"><input type="button" onclick="putong_search()" value="查询&nbsp;&nbsp;" id="ser_btn" class="ser_btn"></div>
				</div>
			</div>
			<div class="hbg"></div>
		</div>
		<div class="box">
			<div class="album">
				<div class="al_tit" id="al_tit">
					<h1>
						<%=imageName %>
					</h1>
					<div class="al_h3">
						<%=imageUpUser %>
						<span id="arc_pubtime" rel="1393895402"><%=imageUpDate %>上传</span>到
						<a href="http://www.ivsky.com/tupian/arches_national_park_v20111/"><%=imageType %></a>
					</div>
				</div>
			</div>
			<div>
				<img width="960" height="500" src="<%=basePath+imagePath %>" />
			</div>
			<div class="left">
				<div id="pic_tag">
					所属分类：
					<a href="http://www.ivsky.com/tupian/meiguo_t603/" target="_blank"><%=imageType %></a>
				</div>
				<div id="pic_info">
					<span>浏览量：<%=imageViews %></span>
					<%=TeXingMiaoshu %>
				</div>
			</div>
		</div>
		<div id="footer">
			<div class="box">
				<div id="fl">
					<dl>
						<dt>
							关于
						</dt>
						<dd>
							<a href="http://www.ivsky.com/about/about.html" rel="nofollow">关于天堂</a>
						</dd>
						<dd>
							<a href="http://www.ivsky.com/about/team.html" rel="nofollow">团队成员</a>
						</dd>
						<dd>
							<a href="http://www.ivsky.com/about/disclaimer.html"
								rel="nofollow">免责声明</a>
						</dd>
					</dl>
					<dl>
						<dt>
							帮助
						</dt>
						<dd>
							<a href="http://www.ivsky.com/about/tougao.html" rel="nofollow">用户投稿</a>
						</dd>
						<dd>
							<a href="http://www.ivsky.com/about/faq.html" rel="nofollow">常见问题</a>
						</dd>
					</dl>
					<dl>
						<dt>
							联系
						</dt>
						<dd>
							<a href="http://www.ivsky.com/about/contact.html" rel="nofollow">联系我们</a>
						</dd>
						<dd>
							<a href="http://www.ivsky.com/about/guestbook.html"
								rel="nofollow">留言反馈</a>
						</dd>
						<dd>
							<a href="http://www.ivsky.com/about/ad.html" rel="nofollow">广告投放</a>
						</dd>
					</dl>
					<dl>
						<dt>
							关注
						</dt>
						<dd class="sina">
							<a href="http://weibo.com/ivskycom" target="_blank"
								rel="nofollow">新浪微博</a>
						</dd>
						<dd class="q">
							<a href="http://t.qq.com/ivskycom" target="_blank" rel="nofollow">腾讯微博</a>
						</dd>
					</dl>
				</div>
				<div id="fr">
					<p>
						© 2005-2013 天堂图片网 闽ICP备：05021777号
					</p>
					<p>
						本站提供的图片仅供学习和交流使用，版权归原作者所有，请勿用于任何商业用途
					</p>
					<p>
						主机服务商：
						<a
							href="http://www.aliyun.com/cps/rebate?from_uid=jJfSOSVZ99F3GCoDuIogFvjezZSHMCm8"
							target="_blank">阿里云</a> &nbsp;
						<a href="http://www.chinaccnet.com/" target="_blank">中电云集</a>
					</p>
				</div>
				<a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">
				</a>
			</div>
			<a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">
			</a>
		</div>
	</body>
</html>