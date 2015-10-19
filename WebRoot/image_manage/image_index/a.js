//jquery-include
;(function(g){var c=[],b=[],f=0;function e(k,l){if(l.isCalled){return}var i=false;if(/webkit/i.test(navigator.userAgent)){if(k.sheet){i=true}}else{if(k.sheet){try{if(k.sheet.cssRules){i=true}}catch(j){if(j.code===1000){i=true}}}}if(i){setTimeout(function(){l()},1)}else{setTimeout(function(){e(k,l)},1)}}function d(i,j){if(i.attachEvent){i.attachEvent("onload",j)}else{setTimeout(function(){e(i,j)},0)}}function h(i,k){var j=g("<link/>").attr("rel","stylesheet").attr("href",i);g(g("head")[0]).append(j);d(j[0],k)}function a(l,m){var k,p,n,j,o,v;m=m||0;l=l||0;k=b[l];if(k){n=k.func||null;p=k.dat||[];v=p.length}else{return}if(m>=v){n();return}j=p[m];o=function(){c.push(j.src);m++;a(l,m)};if(j.type=="css"){h(j.src,o)}else{g.getScript(j.src,o)}}g.include=function(q,r,n){r=r||null;n=n||0;var o=q.split(","),p=o.length,l,j,m,t,s,k;s=[];for(l=0;l<p;l++){j=g.trim(o[l]);if(j!=""){if(g.inArray(j,c)>-1){continue}m={};m.src=(n||j.indexOf("http://")>-1)?j:"/img/"+j;m.type="."+(j.split(".")[j.split(".").length-1]).toLowerCase();m.type=m.type.indexOf(".css")>-1?"css":"js";s.push(m)}}t={};t.dat=s;t.func=r;b[f]=t;a(f);f++}})(jQuery);
//显示日期的函数
(function($){$.fn.jclock=function(options){$.fn.jclock.timerID=null;$.fn.jclock.running=false;$.fn.jclock.el=null;var version="0.1.1";var opts=$.extend({},$.fn.jclock.defaults,options);return this.each(function(){$this=$(this);$.fn.jclock.el=$this;var o=$.meta?$.extend({},opts,$this.data()):opts;$.fn.jclock.withDate=o.withDate;$.fn.jclock.withWeek=o.withWeek;$.fn.jclock.timeNotation=o.timeNotation;$.fn.jclock.am_pm=o.am_pm;$.fn.jclock.utc=o.utc;$this.css({fontFamily:o.fontFamily,fontSize:o.fontSize,backgroundColor:o.background,color:o.foreground});$.fn.jclock.startClock()})};$.fn.jclock.startClock=function(){$.fn.jclock.stopClock();$.fn.jclock.displayTime()};$.fn.jclock.stopClock=function(){if($.fn.jclock.running){clearTimeout(timerID)}$.fn.jclock.running=false};$.fn.jclock.displayTime=function(el){var date=$.fn.jclock.getDate();var week=$.fn.jclock.getWeek();var time=$.fn.jclock.getTime();$.fn.jclock.el.html(date+week+time);timerID=setTimeout("$.fn.jclock.displayTime()",1000)};$.fn.jclock.getDate=function(){if($.fn.jclock.withDate==true){var now=new Date();var year,month,date;if($.fn.jclock.utc==true){year=now.getUTCFullYear();month=now.getUTCMonth()+1;date=now.getUTCDate()}else{year=now.getFullYear();month=now.getMonth()+1;date=now.getDate()}month=((month<10)?"0":"")+month;date=((date<10)?"0":"")+date;var dateNow=year+"年"+month+"月"+date+"日 <br>"}else{var dateNow=""}return dateNow};$.fn.jclock.getWeek=function(){if($.fn.jclock.withWeek==true){var now=new Date();var week;if($.fn.jclock.utc==true){week=now.getUTCDay()}else{week=now.getDay()}$.each(["日","一","二","三","四","五","六"],function(i,n){if(i==week){week=n;return}});var weekNow="周"+week+" "}else{var weekNow=""}return weekNow};$.fn.jclock.getTime=function(){var now=new Date();var hours,minutes,seconds;if($.fn.jclock.utc==true){hours=now.getUTCHours();minutes=now.getUTCMinutes();seconds=now.getUTCSeconds()}else{hours=now.getHours();minutes=now.getMinutes();seconds=now.getSeconds()}if($.fn.jclock.timeNotation=="12h"){hours=((hours>12)?hours-12:hours)}else{hours=((hours<10)?"0":"")+hours}minutes=((minutes<10)?"0":"")+minutes;seconds=((seconds<10)?"0":"")+seconds;var timeNow=hours+":"+minutes+":"+seconds;if(($.fn.jclock.timeNotation=="12h")&&($.fn.jclock.am_pm==true)){timeNow+=(hours>=12)?" P.M.":" A.M."}return timeNow};$.fn.jclock.defaults={withDate:false,withWeek:false,timeNotation:"24h",am_pm:false,utc:false,fontFamily:"",fontSize:"",foreground:"",background:""}})(jQuery);
//cookie函数
jQuery.cookie=function(name,value,options){if(typeof value!="undefined"){options=options||{};if(value===null){value="";options.expires=-1}var expires="";if(options.expires&&(typeof options.expires=="number"||options.expires.toUTCString)){var date;if(typeof options.expires=="number"){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires="; expires="+date.toUTCString()}var path=options.path?"; path="+options.path:"";var domain=options.domain?"; domain="+options.domain:"";var secure=options.secure?"; secure":"";document.cookie=[name,"=",encodeURIComponent(value),expires,path,domain,secure].join("")}else{var cookieValue=null;if(document.cookie&&document.cookie!=""){var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+"=")){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};
//格式化时间，获取当前日期和发布日期的时间差
function getDateDiff(dateTimeStamp){var minute=1000*60;var hour=minute*60;var day=hour*24;var halfamonth=day*15;var month=day*30;var year=month*12;var now=new Date().getTime();var diffValue=now-dateTimeStamp*1000;if(diffValue<0||diffValue>12*month){return""}var yearC=diffValue/year;var monthC=diffValue/month;var weekC=diffValue/(7*day);var dayC=diffValue/day;var hourC=diffValue/hour;var minC=diffValue/minute;if(monthC>=1){result=""+parseInt(monthC)+"个月前上传"}else{if(weekC>=1){result=""+parseInt(weekC)+"个星期前上传"}else{if(dayC>=1){result=""+parseInt(dayC)+"天前上传"}else{if(hourC>=1){result=""+parseInt(hourC)+"小时前上传"}else{if(minC>=1){result=""+parseInt(minC)+"分钟前上传"}else{result="刚刚上传"}}}}}return result};
//点击到第一张
function GoPre(){
	var lis,infos,arr,len,i,htm,f,div;
	infos=[];
	//先尝试获取相关图集
	if($('.lxg_ul').length>0){
		lis=$('.lxg_ul').find('li');
		lis.each(function(i,n){
			if($(n).find('img').length>0){
				arr={};
			    arr.img=$(n).find('img').attr('src');
			    arr.txt=$(n).find('.lxg_info a').html();
			    arr.link=$(n).find('.lxg_info a').attr('href');
			    arr.view=$(n).find('.lxg_info span').html();
			    infos.push(arr);
			}
		});
	}
	htm = '';
	len=infos.length;
	if(len>0){
		for(i=0;i<len;i++){
			if(i<9){
		    	f=infos[i];
			    htm += '<li><a href="'+f.link+'" target="_blank"><img src="'+f.img+'"/><div><h3>'+f.txt+'</h3><p>'+f.view+'人看过</p></div></a></li>';
			}
		}
	}
	if(htm!=''){
		var pos;
		pos=$('#pic_con').offset();
		pos.x=Math.floor(($('#pic_con').width()-600)/2 + pos.left);
		pos.y=Math.floor(($('#pic_con').height()-300)/2 + pos.top);
		htm = '<div class="a"><div class="b"><h2><b>X</b>亲，没有上一张了，有兴趣看看下面这些吗</h2><ul>'+htm+'</ul></div><div class="c"></div></div>';
		div=$('<div class="LSwinmsg"></div>').html(htm);
		$('h2 b',div).click(function(){
			div.remove();
		});
		if($.browser.msie){
			div.css({left:pos.x,top:pos.y,height:302}).appendTo('body');
		}else{
			div.css({left:pos.x,top:pos.top,height:0}).appendTo('body').stop().animate({height:302,top:pos.y},100);
		}
	}else{
		alert('亲！这已经是第一张了');
	}
}

//点击最后一张
function GoNext(){
	var lis,infos,arr,len,i,htm,f,div;
	infos=[];
	//先尝试获取相关图集
	if($('.lxg_ul').length>0){
		lis=$('.lxg_ul').find('li');
		lis.each(function(i,n){
			if($(n).find('img').length>0){
				arr={};
			    arr.img=$(n).find('img').attr('src');
			    arr.txt=$(n).find('.lxg_info a').html();
			    arr.link=$(n).find('.lxg_info a').attr('href');
			    arr.view=$(n).find('.lxg_info span').html();
			    infos.push(arr);
			}
		});
	}
	htm = '';
	len=infos.length;
	if(len>0){
		for(i=0;i<len;i++){
			if(i<9){
		    	f=infos[i];
			    htm += '<li><a href="'+f.link+'" target="_blank"><img src="'+f.img+'"/><div><h3>'+f.txt+'</h3><p>'+f.view+'人看过</p></div></a></li>';
			}
		}
	}
	if(htm!=''){
		var pos;
		pos=$('#pic_con').offset();
		pos.x=Math.floor(($('#pic_con').width()-600)/2 + pos.left);
		pos.y=Math.floor(($('#pic_con').height()-300)/2 + pos.top);
		htm = '<div class="a"><div class="b"><h2><b>X</b>亲，这组图片已经浏览完毕，有兴趣看看下面这些吗</h2><ul>'+htm+'</ul></div><div class="c"></div></div>';
		div=$('<div class="LSwinmsg"></div>').html(htm);
		$('h2 b',div).click(function(){
			div.remove();
		});
		if($.browser.msie){
			div.css({left:pos.x,top:pos.y,height:302}).appendTo('body');
		}else{
			div.css({left:pos.x,top:pos.top,height:0}).appendTo('body').stop().animate({height:302,top:pos.y},100);
		}
	}else{
		alert('亲！这已经是最后一张了');
	}
}

//首页动态加载
var indexLoadLazy=1;  //懒加载标志  
var indexLoadPage=0; //查询页数
var indexLoadNum=0;  //实际显示次数
var indexLoadGo=1;   //防止不停点
var indexLoadTime = 0; //打点日期
//sy_load
function indexLoad()
{
	//图片替换
	var reg=function(str){
		return 'http://img.ivsky.com' + str.replace('/pic','/co');
	};
	var more=$('#sy_load .more');
	indexLoadGo=0;
	more.prepend('<img src="/img/images/loading.gif" />');
	$.getJSON('/index.php?tn=indexload&page='+indexLoadPage+'&h='+new Date().getTime(),function(data){
		var ul,i,len,li,htm,dat;
		ul=$('<ul class="sy_list"></ul>');
		len=data.length;
		for(i=0;i<len;i++){
			 dat=data[i];
		     htm='';
		     htm += '<li><div class="syl_pic"><a href="'+dat.arcurl+'" title="'+dat.title+'('+dat.imgnum+'张)" target="_blank"><img src="'+reg(dat.litpic)+'"></a><a href="'+dat.typeurl+'" class="sort_n" target="_blank">'+dat.typename+'</a></div><div class="syl_info"><span>'+dat.writer+'</span><a href="'+dat.arcurl+'" target="_blank">'+dat.title+'('+dat.imgnum+'张)</a></div></li>';
		     li=$(htm);
		     li.hover(function(){
				 $(this).fadeTo('fast',0.9).find('.sort_n').show();
			 },function(){
				 $(this).fadeTo('fast',1).find('.sort_n').hide();
			 });
			 $('img',li).load(function(){
				 var liw,lih,imgw,imgh,imgleft,imgtop;
				 liw = $('.syl_pic',li).width();
				 lih = $('.syl_pic',li).height();
				 imgw = $(this).width();
				 imgh = $(this).height();
				 imgleft = parseInt((liw - imgw)/2);
				 imgtop = parseInt((lih - imgh)/2);
				 $(this).css('margin', imgtop + 'px 0 0 ' + imgleft + 'px');
			 })
			 li.appendTo(ul);
		}
		$('img',more).remove();
		indexLoadPage++;
		
		if(len>0){
			var d,m,y;
			d=new Date(indexLoadTime);
			m= (d.getUTCMonth()+1) + '';
			m=m.length<2 ? '0'+m : m;
			y= d.getUTCDate() + '';
			y=y.length<2 ? '0'+y : y;
			$('<div class="date"><div style="font-size:24px;margin-top:2px;">'+m+'</div><div style="font-size:16px;margin-top:10px;">月</div><div style="font-size:48px;margin-top:-8px;">'+y+'</div></div>').insertBefore(more);
			ul.insertBefore(more);
			indexLoadNum++;
		}else{
			indexLoad();
		}
		indexLoadTime -= 24*3600*1000;
		indexLoadGo=1;
		/*转为手工点击懒加载 ，自动加载天数*/
		if(indexLoadNum >= 0){
			indexLoadLazy=0;
			$('#sy_load .more').unbind().click(function(){
				if(indexLoadGo){
				    indexLoad();
				}
			});
		}
	});
}

//定义宽版尺寸
var widePageWidth = 14500;
var	screenWidth = window.screen.width;
//如果当前屏幕宽度小于宽版页面宽度
var smallScreen = false;
if(screenWidth < widePageWidth) { smallScreen = true; }
//载入 ie6 css
if (($.browser.msie) && ($.browser.version == "6.0") && !$.support.style){
	$('head').append('<link type="text/css" href="/img/ie6.css" rel="stylesheet" />');	
}

//全站调用
function dy(code){
	//定义需要重复调用的广告代码
	var bdc	= '<script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/c.js"></script>';
	var bdf = '<script src="http://cpro.baidustatic.com/cpro/ui/f.js" type="text/javascript"></script>';
	var ggca = '<script type="text/javascript"><!-- '+"\r\n"+'google_ad_client = "ca-pub-9368840835396162";'+"\r\n";
	var ggcb = "\r\n"+'//-->'+"\r\n"+'</script>'+"\r\n"+'<script type="text/javascript" '+"\r\n"+'src="http://pagead2.googlesyndication.com/pagead/show_ads.js">'+"\r\n"+'</script>';

	//替换导航部分内容
	//回顶部
	if(code=="alltop"){
		var head_menu = $('#menu').html();
		$('#menu').html(head_menu+'<li><a href="/Photo/" target="_blank">旧版</a></li>');
	}
	//回顶部
	if(code=="tbox"){
		document.writeln('<div id="tbox">');
		document.writeln('	<a id="gotop" href="javascript:void(0)" target="_top" rel="nofollow"></a>');
		document.writeln('	<a id="jy" href="/about/guestbook.html" rel="nofollow"></a>');
		document.writeln('</div>');
	}
	//图集页统计 上传日期
	if(code=="artinfo"){
		$.get('/sky.php?do=articledigg&id='+$('#arc_click').attr('rel')+'&hash='+new Date().getTime(),function(rs){
			var arr=rs.split(',');
			$('#arc_click').html(arr[0]);
		});
		var t=getDateDiff($('#arc_pubtime').attr('rel'));
		if(t!=''){
			$('#arc_pubtime').html(t);
		}
	}
	//图片页统计 上传日期
	/*
	if(code=="tppictop" || code=="bzpictop"){
		$.get('/sky.php?do=articledigg&id='+arcid+'&hash='+new Date().getTime(),function(rs){
		});
		var t=getDateDiff($('#arc_pubtime').attr('rel'));
		if(t!=''){
			$('#arc_pubtime').html(t);
		}
	}
	*/

	//网站统计
	if(code=="tj"){
		/* 百度统计 异步加载*/
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?862071acf8e9faf43a13fd4ea795ff8c";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
		
		document.writeln('<script src="http://s13.cnzz.com/stat.php?id=87348&web_id=87348" language="JavaScript"></script>');
		document.writeln('<script type="text/javascript" id="bdshare_js" data="type=slide&amp;img=2&amp;mini=1&amp;pos=right&amp;uid=12407" ></script>');
		document.writeln('<script type="text/javascript" id="bdshell_js"></script>');
		document.writeln('<script type="text/javascript">document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000);</script>');
	}
	//宽屏，窄屏共用广告与调用

	//图片频道
	if(code=="tplisttop1" || code=="tpimgtop1" || code=="bzlisttop1" || code=="bzimgtop1" || code=="tppictop1" || code=="bzpictop1"){
		//天堂 全站 通栏 728-90
		document.writeln(ggca+'google_ad_slot = "4544955894"; google_ad_width = 728; google_ad_height = 90;'+ggcb);

	}
	if(code=="tplisttop2" || code=="bzlisttop2" || code=="tpimgtop2" || code=="bzimgtop2" || code=="tppictop2" || code=="bzpictop2"){
		// 广告位：天堂 全站 通栏右侧 267-90
		document.writeln('<iframe src="/img/bd_iframe.html?id=665808" width="267" height="90" scrolling="no" frameborder="0" style="margin:0"></iframe>');
	}
	if(code=="tplistleft" || code=="bzlistleft"){
		//天堂 窄屏 图片 分类 列表上 760-90
		document.writeln('<script>var cpro_id = "u1282833";</script>'+bdc);
	}
	if(code=="tplistleft1"){
		//天堂 图片 分类 列表下 760-90
		document.writeln('<script>var cpro_id = "u1264198";</script>'+bdc);
	}
	if(code=="bzlistleft1"){
		//天堂 壁纸 分类 列表下 760-90
		document.writeln('<script>var cpro_id = "u1264293";</script>'+bdc);
	}
	if(code=="tplistleft2"){
		//天堂 图片 分类 列表下 文字链
		document.writeln('<script>var cpro_id = "u1264217";</script>'+bdc);
	}
	if(code=="bzlistleft2"){
		//天堂 壁纸 分类 列表下 文字链
		document.writeln('<script>var cpro_id = "u1264294";</script>'+bdc);
	}
	if(code=="tplistr1" || code=="tpimgr1" || code=="bzlistr1" || code=="bzimgr1" ){
		//全站右侧 摩天楼 160-600
		document.writeln('<script>var cpro_id = "u1287567";</script>'+bdc);
	}
	if(code=="tplistr2" || code=="bzlistr2"){
		// 广告位：天堂 列表右侧 160*150
		document.writeln('<iframe src="/img/bd_iframe.html?id=868365" width="160" height="150" scrolling="no" frameborder="0" style="margin:0"></iframe>');
	}


	if( code=="tppicr1" || code=="bzpicr1"){
		//天堂 图片 图片页 右侧摩天楼 160-600
		document.writeln('<script>var cpro_id = "u1314897";</script>'+bdc);
	}
	if(code=="tpimgleft1" || code=="bzimgleft1"){
		//天堂 窄屏 图片 图集页 左侧 300-250
		document.writeln('<script>var cpro_id = "u1266263";</script>'+bdc);
	}
	if(code=="tpimgleft5"){
		//天堂 图片 图集页 列表下 760-90
		document.writeln('<script>var cpro_id = "u1265346";</script>'+bdc);
	}
	if(code=="bzimgleft5"){
		//天堂 壁纸 图集页 列表下 760-90
		document.writeln('<script>var cpro_id = "u1265348";</script>'+bdc);
	}
	if(code=="tpimgleft6"){
		//天堂 图片 图集页 列表下 文字链
		document.writeln('<script>var cpro_id = "u1265353";</script>'+bdc);
	}
	if(code=="bzimgleft6"){
		//天堂 壁纸 图集页 列表下 文字链
		document.writeln('<script>var cpro_id = "u1265352";</script>'+bdc);
	}
	if(code=="tppictop"){
		//天堂 窄屏 图片 图片页 大图上方 960-90
		document.writeln('<script>var cpro_id = "u1283604";</script>'+bdc);
	}
	if(code=="bzpictop"){
		//天堂 窄屏 壁纸 图片页 大图上方 960-90
		document.writeln('<script>var cpro_id = "u1284678";</script>'+bdc);
	}
	if(code=="tppicleft1"){
		//天堂 窄屏 图片 图片页 大图下方
		document.writeln('<script>var cpro_id = "u1283605";</script>'+bdc);
	}
	if(code=="bzpicleft1"){
		//天堂 窄屏 壁纸 图片页 大图下方
		document.writeln('<script>var cpro_id = "u1266075";</script>'+bdc);
	}

	if(code=="tpimgbtm" || code=="tppicbtm" | code=="bzimgbtm" || code=="bzpicbtm"){
		//天堂 窄屏 图集 图片页 底部
		 document.writeln('<a style="display:none!important" id="tanx-a-mm_10047539_141059_14772617"></a>');
		 tanx_s = document.createElement("script");
		 tanx_s.type = "text/javascript";
		 tanx_s.charset = "gbk";
		 tanx_s.id = "tanx-s-mm_10047539_141059_14772617";
		 tanx_s.async = true;
		 tanx_s.src = "http://p.tanx.com/ex?i=mm_10047539_141059_14772617";
		 tanx_h = document.getElementsByTagName("head")[0];
		 if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);
}

	if(screenWidth>1280){
		if(code=="tppagebtm" || code=="bzpagebtm"){
			//天堂 窄屏 图片 两侧悬浮
			//document.writeln('<script>var cpro_id = "u1280568";</script>'+bdf);
		}
	}

	//多频道共用
	if(code=="pic_tonext"){
		var tonext = '#pic_tit';
		if(nexturl.indexOf("javascript") != '-1' ){ tonext = ''; }
		document.writeln('<a class="page-next" href="'+nexturl+tonext+'" title="点击浏览 下一张 >">');
	}
	if(code=="pic_btm"){
		var toprev = '#pic_tit';
		var tonext = '#pic_tit';
		if(preurl.indexOf("javascript") != '-1' ){ toprev = ''; }
		if(nexturl.indexOf("javascript") != '-1' ){ tonext = ''; }
		document.writeln('<a class="page-prev" href="'+preurl+toprev+'" >上一张</a><a class="page-next" href="'+nexturl+tonext+'" >下一张</a>');
	}
	if(code=="pic_btn"){
		document.writeln('<a class="bt-blue" href="'+arcurl+'" title="'+arctitle+'" rel="nofollow">返回图集</a><a class="bt-blue" href="http://img.ivsky.com'+imgURL+'" target="_blank" rel="nofollow" >查看原图</a><a href="javascript:void(0)" class="pic_down bt-green">下载到手机</a><a class="bt-green" href="http://img.ivsky.com/download'+imgURL+'" title="下载原图" rel="nofollow">下载原图</a>');
		document.writeln('	<div class="down_qrcode"><div class="code"><img src="/img/qrcode/'+arcid+'/'+aid+'.png" /></div><p>用微信扫我~~</p></div>');
	}
	if(code=="pl"){
		//多说评论框
		document.writeln('<div class="ds-thread" data-thread-key="'+arcid+'-'+aid+'" ></div>');
		document.writeln('<script>var duoshuoQuery = {short_name: "ivsky"};');
		document.writeln("(function() {");
		document.writeln("	var ds = document.createElement('script');");
		document.writeln("	ds.type = 'text/javascript';ds.async = true;");
		document.writeln("	ds.src = 'http://static.duoshuo.com/embed.js';");
		document.writeln("	ds.charset = 'UTF-8';");
		document.writeln("	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);");
		document.writeln("})();");
		document.writeln('</script>');

	}
	if(code=="pic_do"){

	}
	//结束 - 宽屏、窄屏共用广告与调用
}



function b(){
	h = $(window).height();
	t = $(document).scrollTop();
	if(t > (h/2)){
		$('#gotop').show();
	}else{
		$('#gotop').hide();
	}
}

//主体
$(document).ready(function(){
	//home slider
	$('#select_btn li:first').css('border','none');
	if ($('#zSlider').length) {
		zSlider();
		$('#h_sns').find('img').hover(function(){
			$(this).fadeTo(200,0.5);
		}, function(){
			$(this).fadeTo(100,1);
		});
	}
	function zSlider(ID, delay){
		var ID=ID?ID:'#zSlider';
		var delay=delay?delay:8000;
		var currentEQ=0, picnum=$('#picshow_img li').size(), autoScrollFUN;
		$('#select_btn li').eq(currentEQ).addClass('current');
		$('#picshow_img li').eq(currentEQ).show();
		$('#picshow_tx li').eq(currentEQ).show();
		autoScrollFUN=setTimeout(autoScroll, delay);
		function autoScroll(){
			clearTimeout(autoScrollFUN);
			currentEQ++;
			if (currentEQ>picnum-1) currentEQ=0;
			$('#select_btn li').removeClass('current');
			$('#picshow_img li').hide();
			$('#picshow_tx li').hide().eq(currentEQ).slideDown(400);
			$('#select_btn li').eq(currentEQ).addClass('current');
			$('#picshow_img li').eq(currentEQ).show();
			autoScrollFUN = setTimeout(autoScroll, delay);
		}
		$('#picshow').hover(function(){
			clearTimeout(autoScrollFUN);
		}, function(){
			autoScrollFUN = setTimeout(autoScroll, delay);
		});
		$('#select_btn li').hover(function(){
			var picEQ=$('#select_btn li').index($(this));
			if (picEQ==currentEQ) return false;
			currentEQ = picEQ;
			$('#select_btn li').removeClass('current');
			$('#picshow_img li').hide();
			$('#picshow_tx li').hide().eq(currentEQ).slideDown(100);
			$('#select_btn li').eq(currentEQ).addClass('current');
			$('#picshow_img li').eq(currentEQ).show();
			return false;
		});
	};
	//home key word
	$('.kw_tit li').hover(function(){
			index = $('.kw_tit li').index($(this))
			$('.kw_tit li').removeClass('kw_on');
			$(this).addClass('kw_on');
			$('.kw').hide();
			$('.kw').eq(index).show();
		},function(){
			
	})
	
	//home list
	$('.date div:nth-child(1n)').css({'font-size':'24px','margin-top':'2px'});
	$('.date div:nth-child(2n)').css({'font-size':'16px','margin-top':'10px'});
	$('.date div:nth-child(3n)').css({'font-size':'48px','margin-top':'-8px'});
	
	$('.rlib:nth-child(20n)').css('border-bottom','1px solid #fff');
	$('.rli').hover(function(){
		index = $('.rli').index($(this));
		group = parseInt(index / 10);
		obj = $('.rlib:visible').eq(group);
		obj.hide();
		obj.prev().show();
		$(this).hide();	
		$(this).next().show();			
	})
	$('.rhy_info').each(function(){
		$(this).children('em').first().css('padding-left','0');	
	})
	$('.rlihy li:last').css('border','none');

	//图集页 相关图集
	$('.lxg_ul li:nth-child(3),.lxg_ul li:nth-child(6),.lxg_ul li:nth-child(9)').after('<li class="lxg_line"></li>');
	//图片页  二维码
	$('.pic_down').toggle(function(){
		$('.down_qrcode').show();
		},function(){
		$('.down_qrcode').hide();
	})

	//img name
	$('.syl_pic,.sypic_li').hover(function(){
			$(this).fadeTo('fast',0.9);
			$(this).children('.sort_n').show();
		},function(){
			$(this).fadeTo('fast',1);
			$(this).children('.sort_n').hide();
	})
	//img filter
	$('.il_img').hover(function(){
			$(this).fadeTo('fast',0.8);
		},function(){
			$(this).fadeTo('fast',1);
	});

	//show all p
	$('.al_all').toggle(function(){
		$('.al_p').css('height','auto');
		$(this).html('收起');
		},function(){
		$('.al_p').css('height','130px');
		$(this).html('阅读全部');
	})
	
	//gotop
	b();
	$('#gotop').click(function(){
		$(document).scrollTop(0);	
	})
	
	//替换全站底部说明
	$('#fr').html('<p>&copy; 2005-2013 天堂图片网　　闽ICP备：05021777号</p><p>本站提供的图片仅供学习和交流使用，版权归原作者所有，请勿用于任何商业用途</p><p>主机服务商：<a href="http://www.aliyun.com/cps/rebate?from_uid=jJfSOSVZ99F3GCoDuIogFvjezZSHMCm8" target="_blank">阿里云</a> &nbsp; <a href="http://www.chinaccnet.com/" target="_blank">中电云集</a></p>');

	//搜索
	//搜索完之后，搜索框显示当前搜索词
	$('#ser_btn').click(function(){
	   if($('#ser_inp').length<1||$('#ser_btn').length<1){
		  return ;
	   }
	   sergo();
	});
	$('#ser_inp').keydown(function(event){
		var k=event.which*1;
		if(k==13){
			sergo();
		}
	});

	//从body的rel判断页面类型 
	var ixtimer=false;
	//picview是图片页  加载全屏功能
	if($('body').attr('rel')=='picview'){
		$.include('full.js',function(){
			initfull();
		});
	}
	//首页
	else if($('body').attr('rel')=='index'){
		indexLoadTime = $('#sy_load').attr('rel')*1000 - 3*24*3700*1000;
		/*滚动页面自动加载*/
		$(window).scroll(function(){
			if(indexLoadLazy){
				if(ixtimer){
					clearTimeout(ixtimer);
				}
				ixtimer=setTimeout(function(){
					var hh=Math.max($('body').height(),$(document).height());
					var dd=hh-$(document).scrollTop()-$(window).height();
					if(dd < 300){
						indexLoad();
					}
				},100);
			}
		});
	}

})

$(window).scroll(function(e){
	b();		
})
