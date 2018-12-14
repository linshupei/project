package com.ums.project.excel.template;


/**
 * 用户通话记录导出模板
 * @author linsp
 * @date 2016-10-17
 */
public class AppUserContactInfoDefine {
	/**
	 * 导出的文件名称
	 */
	public static String fileName = "用户通讯录.xls";
	
	
	public static String exportChartDataFileName = "用户通讯录.xls";
	
	/** 
	 * excel中表名称
	 */
	public static String sheetName =  "用户通讯录";
	/**
	 * 表体数据开始行
	 */
	public static int headRows = 2;

	/**
	 * 头部占用的总列数
	 */
	public static int headCols = 4;
	
	/**
	 * 表体是否需要序号
	 */
	public static boolean bodySequence = true;
	
	
	/**
	 * 头部数据的起始行，如果表头不需要显示动态数据默认0
	 */
	public static int headRow = 0;	
	
	public static String excelHeadDataPattern="[" +
		"{\"value\":\"用户通话记录\",\"row\":0,\"col\":0,\"groupCols\":4,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1.5}," +
		"{\"value\":\"序号\",\"row\":1,\"col\":0,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1.5}," +
		"{\"value\":\"所属APP账号\",\"row\":1,\"col\":1,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}," +
		"{\"value\":\"联系人\",\"row\":1,\"col\":2,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}," +	
		"{\"value\":\"联系方式\",\"row\":1,\"col\":3,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}"  
	+ "]";
	
	public static String excelBodyDataDefine="[" +	
			"{\"attributeName\":\"userAccount\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":1,\"defineRow\":true,\"row\":2},"+
			"{\"attributeName\":\"name\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":2,\"defineRow\":true,\"row\":2},"+
			"{\"attributeName\":\"mobile\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":3,\"defineRow\":true,\"row\":2}"
			+"]";

}
