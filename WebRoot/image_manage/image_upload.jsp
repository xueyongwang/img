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
String re = ic.getImageSelect(dytable, sx_zd); 
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>            
	<head>
		<base href="<%=basePath%>">

		<title>My JSP 'image_upload.jsp' starting page</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<link href="${pageContext.request.contextPath}/image_manage/css/swfupload-default.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/image_manage/js/jquery-latest.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/image_manage/js/swfupload.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/image_manage/js/handlers.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/image_manage/js/upload.js"></script>

		<script type="text/javascript">
var contextPath = "${pageContext.request.contextPath}";
function startLoad() {
	var url = contextPath + "/UploadImageServlet"; //处理上传的servlet
	var sizeLimit = "5 MB";// 文件的大小  注意: 中间要有空格
	var types = "*.jpg;*.jpeg;*.gif"; //注意是 " ; " 分割 
	var typesdesc = "web iamge file"; //这里可以自定义
	var uploadLimit = 30; //上传文件的 个数
	initSwfupload(url, sizeLimit, types, typesdesc, uploadLimit);
}
</script>
	</head>
	<body>
		<div style="width: 1000px; margin-left: 160px;">
			<input type="hidden" name="basePath" id="basePath" value="<%=basePath %>" />
			<input type="hidden" name="lb_id" id="lb_id" value="<%=lbId %>" />
			<input type="hidden" name="lx_id" id="lx_id" value="<%=lxId %>" />
			<fieldset style="width: 1000; height: 150; left: 200px; border: 2px LightSteelBlue solid;">
				批量上传图片
				<br>
				<p>
					图片所属学科类别
					<input type="text" name="sslbname" id="sslbname" onclick="get_Lb()" />
					<input type="hidden" name="ss_xklb" id="ss_xklb" value="" />
				</p>
				<%=re %>
				<input type="hidden" name="lbsx" id="lbsx" value="<%=sx_zd %>" />

				<input type="button" name="image_button" id="image_button"
					class="image_button" value="选择图片" onclick="startLoad()" />
			</fieldset>
		</div>
		<br />
	</body>
</html>
