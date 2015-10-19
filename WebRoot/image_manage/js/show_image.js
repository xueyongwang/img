/**
 * 显示图片分类
 */
function tupianfenlei(){
	document.getElementById("type_id").style.display="block";
	document.getElementById("zSlider").style.display="none";
	document.getElementById("gjsearch_id").style.display="none";
}

/**
 * 显示高级检索
 */
function gjjs(){
	document.getElementById("gjsearch_id").style.display="block";
	document.getElementById("zSlider").style.display="none";
	document.getElementById("type_id").style.display="none";
}

/**
 * 快速检索
 */
function putong_search(){
	var basePath = document.getElementById("basePath").value;
	var dytable = document.getElementById("dytable").value;
	var lx_id = document.getElementById("lx_id").value;
	var sx_zd = document.getElementById("sx_zd").value;
	var ser_inp = document.getElementById("ser_inp").value;
	$.ajax( {
		type : "POST",
		url : basePath + "ImageServlet",
		data : "bs=2&dytable=" + dytable + "&sx_zd=" + sx_zd + "&ser_inp=" + ser_inp +"&lx_id="+lx_id,
		beforeSend : function() {
		},
		success : function(re) {
			if(re!=""){
				document.getElementById("gjsearch_id").style.display="none";
				document.getElementById("zSlider").style.display="none";
				document.getElementById("type_id").style.display="none";
				document.getElementById("sy_load").innerHTML=re;
			}
		}
	});
}

/**
 * 显示分类结果
 */
function getResultByType(zid,oa,size){
	var basePath = document.getElementById("basePath").value;
	var dytable = document.getElementById("dytable").value;
	var lx_id = document.getElementById("lx_id").value;
	$.ajax( {
		type : "POST",
		url : basePath + "ImageServlet",
		data : "bs=3&zid=" + zid+"&dytable=" + dytable + "&lx_id="+lx_id,
		beforeSend : function() {
		},
		success : function(re) {
			if(re!=""){
				document.getElementById("gjsearch_id").style.display="none";
				document.getElementById("zSlider").style.display="none";
				document.getElementById("type_id").style.display="block";
				document.getElementById("sy_load").innerHTML=re;
				clearTagOn(size);
				oa.className = oa.className +"on";
			}
		}
	});
}

/**
 * 清除定位的分类
 */
function clearTagOn(size){
	for(i=1;i<=size;i++){
		document.getElementById("class_li"+i).className = "s"+i;
	}
}

/**
 * 显示相册分类结果
 */
function getResultByImageBooks(zid){
	var basePath = document.getElementById("basePath").value;
	var dytable = document.getElementById("dytable").value;
	var lx_id = document.getElementById("lx_id").value;
	$.ajax( {
		type : "POST",
		url : basePath + "ImageServlet",
		data : "bs=3&zid=" + zid+"&dytable=" + dytable + "&lx_id="+lx_id,
		beforeSend : function() {
		},
		success : function(re) {
			if(re!=""){
				document.getElementById("gjsearch_id").style.display="none";
				document.getElementById("zSlider").style.display="none";
				document.getElementById("type_id").style.display="none";
				document.getElementById("sy_load").innerHTML=re;
			}
		}
	});
}

/**
 * 模态窗口获取系统类别
 */
function get_Lb() {
	var basePath = document.getElementById("basePath").value;
	var url = basePath + "wh_tree/show_type.jsp?tree_table=sys_tree";
	var features = 'dialogHeight:400px; dialogWidth:750px; status:no;';
	var result = window.showModalDialog(url, "_blank", features);
	if (result != null) {
		var type_arr = result.split("&&");
		document.getElementById("sslbname").value = type_arr[1];
		document.getElementById("ss_xklb").value = type_arr[0];
	}
}

/**
 * 高级检索
 */
function gaojiSearch(){
	var all_select_str = "";
	var	ss_xklb = document.getElementById("ss_xklb").value;
	var dytable = document.getElementById("dytable").value;
	var lx_id = document.getElementById("lx_id").value;
	var basePath = document.getElementById("basePath").value;
	var sx_zd = document.getElementById("sx_zd").value;
	var sx_arr = sx_zd.split(",");
	all_select_str += " and ss_xklb = '"+ss_xklb+"' ";
	for(i=0;i<sx_arr.length;i++){
		var ljf_value = document.getElementById("luojifu_"+sx_arr[i]).value;//获取逻辑符值
		var tj_value = document.getElementById(sx_arr[i]).value;//获取条件值
		if(ljf_value!=""&&tj_value){
			if(ljf_value=="1"){
				all_select_str += " and "+sx_arr[i]+" = '"+tj_value+"' ";
			}else if(ljf_value=="2"){
				all_select_str += " or "+sx_arr[i]+" = '"+tj_value+"' ";
			}else if(ljf_value=="3"){
				all_select_str += " and "+sx_arr[i]+" != '"+tj_value+"' ";
			}
		}
	}
	$.ajax( {
		type : "POST",
		url : basePath + "ImageServlet",
		data : "bs=4&all_select_str=" + all_select_str+"&dytable=" + dytable + "&lx_id="+lx_id,
		beforeSend : function() {
		},
		success : function(re) {
			if(re!=""){
				document.getElementById("gjsearch_id").style.display="block";
				document.getElementById("zSlider").style.display="none";
				document.getElementById("type_id").style.display="none";
				document.getElementById("sy_load").innerHTML=re;
			}
		}
	});
}