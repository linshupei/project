package com.ums.project.excel;

/**
 * 日志记录bean
 * 用于记录导入账单时出错信息
 * @author linsp
 *
 */
public class ExcelErrorBean {

	/**
	 * 错误所在行
	 */
	private String row;
	
	/**
	 * 错误所在列
	 */
	private String col;
	
	/**
	 * 错误原因
	 */
	private String reason;

	public String getRow() {
		return row;
	}

	public void setRow(String row) {
		this.row = row;
	}

	public String getCol() {
		return col;
	}

	public void setCol(String col) {
		this.col = col;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
	
	
}
