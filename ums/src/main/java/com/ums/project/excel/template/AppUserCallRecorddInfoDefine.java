package com.ums.project.excel.template;


/**
 * 用户通话记录导出模板
 * @author linsp
 * @date 2016-10-17
 */
public class AppUserCallRecorddInfoDefine {
	/**
	 * 导出的文件名称
	 */
	public static String fileName = "用户通话记录.xls";
	
	
	public static String exportChartDataFileName = "用户通话记录.xls";
	
	/** 
	 * excel中表名称
	 */
	public static String sheetName =  "用户通话记录";
	/**
	 * 表体数据开始行
	 */
	public static int headRows = 2;

	/**
	 * 头部占用的总列数
	 */
	public static int headCols = 6;
	
	/**
	 * 表体是否需要序号
	 */
	public static boolean bodySequence = true;
	
	
	/**
	 * 头部数据的起始行，如果表头不需要显示动态数据默认0
	 */
	public static int headRow = 0;	
	
	public static String excelHeadDataPattern="[" +
		"{\"value\":\"用户通话记录\",\"row\":0,\"col\":0,\"groupCols\":6,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1.5}," +
		"{\"value\":\"序号\",\"row\":1,\"col\":0,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1.5}," +
		"{\"value\":\"所属APP账号\",\"row\":1,\"col\":1,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}," +
		"{\"value\":\"呼叫类型\",\"row\":1,\"col\":2,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}," +	
		"{\"value\":\"号码\",\"row\":1,\"col\":3,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}," +	
		"{\"value\":\"备注\",\"row\":1,\"col\":4,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}," +	
		"{\"value\":\"呼叫时间\",\"row\":1,\"col\":5,\"blob\":true,\"warpText\":true,\"cellWidth\":2,\"cellHeight\":1}" 
	+ "]";
	
	public static String excelBodyDataDefine="[" +	
			"{\"attributeName\":\"userAccount\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":1,\"defineRow\":true,\"row\":2},"+
			"{\"attributeName\":\"type\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":2,\"defineRow\":true,\"row\":2},"+
			"{\"attributeName\":\"calledPhone\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":3,\"defineRow\":true,\"row\":2},"+
			"{\"attributeName\":\"callName\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":4,\"defineRow\":true,\"row\":2},"+
			"{\"attributeName\":\"callTime\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":5,\"defineRow\":true,\"row\":2}"+
			"]";

}
