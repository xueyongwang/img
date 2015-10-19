function test() {
	var lb_id = document.getElementById("lb_id").value;
	var lx_id = document.getElementById("lx_id").value;
	var ss_xklb = document.getElementById("ss_xklb").value;
	var sslbname = document.getElementById("sslbname").value;
	if (ss_xklb == "") {
		alert("请选择学科类别");
	} else {
		var lbsx = document.getElementById("lbsx").value;
		var arr_sx = lbsx.split(",");
		var str_lbsx = "";
		for ( var i = 0; i < arr_sx.length; i++) {
			var value = document.getElementById(arr_sx[i]).value;
			if (str_lbsx == "") {
				str_lbsx = value;
			} else {
				str_lbsx += "!" + value;
			}
		}
		make_session(lb_id, lx_id, ss_xklb, str_lbsx,sslbname);
	}
}

function make_session(lb_id, lx_id, ss_xklb, str_lbsx,sslbname) {
	var basePath = document.getElementById("basePath").value;
	$.ajax( {
		type : "POST",
		url : basePath + "ImageServlet",
		data : "bs=1&str_lbsx=" + str_lbsx + "&lb_id=" + lb_id + "&lx_id="
				+ lx_id + "&ss_xklb=" + ss_xklb+"&ss_lbname="+sslbname,
		beforeSend : function() {
		},
		success : function(re) {
			if (re == "yes") {
				startUploadFile();
			} else {
				alert("上传失败！请重新上传");
			}
		}
	});
}

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

