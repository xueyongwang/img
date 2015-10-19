package com.utils;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class UtilsTime {
	
	public String getTimeStr(){
		String timeStr = "" ;		
        java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss"); 
        Date currentTime = new Date();//得到当前系统时间 
        String str_date1 = formatter.format(currentTime); //将日期时间格式化 
        timeStr = str_date1.toString().replaceAll("/","").replaceAll(":","").replaceAll(" ",""); //将Date型日期时间转换成字符串形式 		
		return timeStr ;
	}
	//获取两段日期之间的天数
	public long getQuot(String time1,String time2){
		long quot = 0;
		SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date d1 = ft.parse(time1);
			Date d2 = ft.parse(time2);
			quot = d1.getTime()-d2.getTime();
			quot = quot/1000/60/60/24;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return quot;
	}
	
	//time格式  2012-09-10 12:10:22
	public String[] reTime(String time){
		String timeArray[] = new String[6];
		String dateValue = time.split(" ")[0];
		String timeValue = time.split(" ")[1];
		String dateArr[] = dateValue.split("-");
		String timeArr[] = timeValue.split(":");
		timeArray[0] = dateArr[0];
		timeArray[1] = dateArr[1];
		timeArray[2] = dateArr[2];
		timeArray[3] = timeArr[0];
		timeArray[4] = timeArr[1];
		timeArray[5] = timeArr[2];
		return timeArray;
	}
	
	//获取某年某月天数
	public int get_days(int year,int month){
		Calendar c = Calendar.getInstance();
		c.set(year, month,1);
		c.add(Calendar.DAY_OF_YEAR, -1);
		return c.get(Calendar.DAY_OF_MONTH);
	}
	
	//获取从某年某月至某年某月的各个年月值
	public String get_year$month(int stY,int stM,int eY,int eM){
		String year$month = "";
		int c_Y = eY - stY ;
		int c_M = eM - stM + c_Y*12 + 1;
		for (int j = 0; j < c_M; j++) {//19
			int month = stM%12;
			if(month==0){
				year$month+=stY+"-"+12+",";
				stY++;
			}else{
				year$month+=stY+"-"+month+",";
			}
			stM++;
		}
		return year$month;
	}
	
	//合成周期
	public String hcZqStr(String tjZq) {
		String reValue = "", starTime = "";
		if(tjZq.equals("1")){
			reValue = "";
		} else if (tjZq.equals("2")) {// 当天
			starTime = getNowdayTime();
			reValue = " up_time>'" + starTime + "'";
		} else if (tjZq.equals("3")) {// 本周
			starTime = getMondayOfWeek();
			reValue = " up_time>'" + starTime + "'";
		} else if (tjZq.equals("4")) {// 本月
			starTime = getFirstDayOfMonth();
			reValue = " up_time>'" + starTime + "'";
		}
		reValue = reValue.replaceAll("-", "/");
		return reValue;
	}
	
	// 获取当月第一天
	public String getFirstDayOfMonth() {
		String str = "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar lastDate = Calendar.getInstance();
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1号
		str = sdf.format(lastDate.getTime());
		str += " 00:00:00";
		System.out.println("本月第一天:"+str);
		return str;
	}


	//获取每周的第一天
	public String getMondayOfWeek() {
		Calendar calendar = Calendar.getInstance();
		int min = calendar.getActualMinimum(Calendar.DAY_OF_WEEK); // 获取周开始基准
		int current = calendar.get(Calendar.DAY_OF_WEEK); // 获取当天周内天数
		java.text.SimpleDateFormat formatter = null;
		formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		calendar.add(Calendar.DAY_OF_WEEK, min - current); // 当天-基准，获取周开始日期
		Date start = calendar.getTime();
		calendar.add(Calendar.DAY_OF_WEEK, 6); // 开始+6，获取周结束日期
		String reTime = formatter.format(start); // 将日期时间格式化
		reTime = reTime.split(" ")[0] + " 00:00:00";
		return reTime;
	}

	// 获取当天时间
	public String getNowdayTime() {
		String re_time = "";
		re_time = getSysTime("0", "0");
		re_time = re_time.split(" ")[0];
		return re_time;
	}

	//获取系统时间
	public String getSysTime(String bs,String isMode) {//bs:时间格式；isMode：是否去掉分割标识
		String SysTime = "";
		java.text.SimpleDateFormat formatter=null;
		if(bs.equals("0")){
			formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		}else if(bs.equals("1")){
			formatter = new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		}
		Date currentTime = new Date();// 得到当前系统时间
		String str_date = formatter.format(currentTime); // 将日期时间格式化
		SysTime = str_date.toString(); // 将Date型日期时间转换成字符串形式
		if(isMode.equals("1")){
			SysTime = SysTime.replaceAll("/","").replaceAll(" ","").replaceAll(":","").replaceAll("-","");
		}
		return SysTime;
	}
	
	
	public static void main(String[] args) {
		UtilsTime ut = new UtilsTime();
//		ut.getSysTime("0", "0");
//		long days = ut.getQuot("2012-03-01", "2013-03-01");
		String days = ut.getMondayOfWeek();
		System.out.println("days="+days);
	}

}
