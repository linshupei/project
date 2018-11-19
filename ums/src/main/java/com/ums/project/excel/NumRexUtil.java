package com.ums.project.excel;

public class NumRexUtil {

	
	/**
	 * 验证是否为数字（整数或者小数）
	 * @param str
	 * @return
	 */
	public static boolean isNumber(String str){
		return str.matches("^(\\d+[.]{1}\\d+)|(\\d+)$");
	}
}
