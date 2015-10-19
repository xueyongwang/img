package com.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public class DBUtil {
	String dbname = "my_best";

	public static Connection getConn() throws ClassNotFoundException {
		Connection conn = null;
		try {
			Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");
			conn = DriverManager.getConnection("proxool.cold_data");

//			 Class.forName("com.mysql.jdbc.Driver");
//			 DriverManager.getConnection("jdbc:mysql://localhost:3306/my_best?useUnicode=true&CharacterEncoding=utf-8",
//			 "root", "123456");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}

	public static void useSQL(String sql) {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			stmt = conn.createStatement();
			stmt.executeUpdate(sql);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(rs, stmt, conn);
		}
	}

	public List query(String sql) {
		System.out.println("--"+sql);
		Vector content = new Vector();
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			stmt = conn.createStatement();
			stmt.execute("SET NAMES 'GBK'");
			rs = stmt.executeQuery(sql);
			ResultSetMetaData rsMeta = rs.getMetaData();
			while (rs.next()) {
				int columnNum = rsMeta.getColumnCount();
				String[] field = new String[columnNum];
				String fieldValue = null;
				for (int i = 1; i <= columnNum; i++) {
					fieldValue = rs.getString(i);
					if (fieldValue == null) {
						fieldValue = "";
					}
					field[i - 1] = fieldValue;
				}
				content.add(field);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(rs, stmt, conn);
		}
		return content;
	}

	public static void close(ResultSet rs, Statement stmt,
			java.sql.Connection conn) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (stmt != null) {
				stmt.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public ArrayList<Map<String, Object>> find(String sql) {
		ArrayList<Map<String, Object>> rsList = null;
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = DBUtil.getConn();
			rsList = new ArrayList<Map<String, Object>>();

			stmt = getConn().createStatement();
			ResultSet rs = stmt.executeQuery(sql);

			ResultSetMetaData rsmd = rs.getMetaData();

			while (rs.next()) {
				Map<String, Object> rsMap = new HashMap<String, Object>();

				for (int i = 1; i <= rsmd.getColumnCount(); i++) {
					String columnName = rsmd.getColumnName(i);
					Object columnValue = null;
					if (rsmd.getColumnType(i) == -4) {
						columnValue = rs.getBinaryStream(columnName);
					} else {
						columnValue = rs.getObject(columnName);
					}
					rsMap.put(columnName, columnValue);
				}
				rsList.add(rsMap);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				stmt.close();
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return rsList;
	}

	public String useBatch(List<String> list) {
		Statement stmt = null;
		Connection conn = null;
		String jud = "1";
		try {
			conn = DBUtil.getConn();
			boolean autoCommit = conn.getAutoCommit();
			conn.setAutoCommit(false);
			stmt = conn.createStatement();
			stmt.execute("SET NAMES 'GBK'");
			for (int i = 0; i < list.size(); i++) {
				String sql = list.get(i);
				stmt.addBatch(sql);
			}
			stmt.executeBatch();
			conn.commit();
			conn.setAutoCommit(autoCommit);
			stmt.close();
			System.out.println("操作成功！");
		} catch (ClassNotFoundException e) {
			jud = "0";
			System.out.println("操作失败、任务撤消！");
			e.printStackTrace();
		} catch (SQLException e) {
			jud = "0";
			e.printStackTrace();
		}
		return jud;
	}

	public String shiwu(String comsql, String fgf) {
		Statement stmt = null;
		Connection conn = null;
		String jud = "0";
		try {
			conn = DBUtil.getConn();
			boolean autoCommit = conn.getAutoCommit();
			conn.setAutoCommit(false);
			stmt = conn.createStatement();
			String[] zsql = comsql.split(fgf);
			for (int i = 0; i < zsql.length; i++) {
				stmt.addBatch(zsql[i]);
			}
			stmt.executeBatch();
			conn.commit();
			conn.setAutoCommit(autoCommit);
			stmt.close();
			System.out.println("操作成功！");
		} catch (Exception e) {
			jud = "1";
			System.out.println("操作失败、任务撤消！");
			try {
				conn.rollback();
			} catch (Exception e1) {
				jud = "1";
				e.printStackTrace();
			}
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (Exception e) {
				jud = "1";
				e.printStackTrace();
			}
		}
		return jud;
	}

	public String fun_sql_shiwu_x(String comsql, String fgf) {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String jud = "0";
		try {
			conn = DBUtil.getConn();
			boolean autoCommit = conn.getAutoCommit();
			conn.setAutoCommit(false);
			stmt = conn.createStatement();
			String[] zsql = comsql.split(fgf);
			for (int i = 0; i < zsql.length; i++) {
				stmt.addBatch(zsql[i]);
			}
			stmt.executeBatch();
			conn.commit();
			conn.setAutoCommit(autoCommit);
			stmt.close();
			System.out.println("操作成功！");
		} catch (Exception e) {
			jud = "1";
			System.out.println("操作失败、任务撤消！");
			try {
				conn.rollback();
			} catch (Exception e1) {
				jud = "1";
				e.printStackTrace();
			}
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (Exception e) {
				jud = "1";
				e.printStackTrace();
			}
		}
		return jud;
	}

	public List selectTablename(String tablename) {
		String sql = "select `TABLE_NAME` from `INFORMATION_SCHEMA`.`TABLES` where `TABLE_SCHEMA`='"
				+ dbname + "' and `TABLE_NAME`='" + tablename + "'";
		List list = query(sql);
		return list;
	}
}
