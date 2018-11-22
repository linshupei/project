package com.ums.project.excel.template;


/**
 * 小区用户数据统计模板定义
 * @author linsp
 * @date 2016-10-17
 */
public class UserLoanInfoDefine {
	/**
	 * 导出的文件名称
	 */
	public static String fileName = "用户贷款信息.xls";
	
	
	public static String exportChartDataFileName = "用户贷款信息.xls";
	
	/** 
	 * excel中表名称
	 */
	public static String sheetName =  "用户贷款信息";
	/**
	 * 表体数据开始行
	 */
	public static int headRows = 3;

	/**
	 * 头部占用的总列数
	 */
	public static int headCols = 16;
	
	/**
	 * 表体是否需要序号
	 */
	public static boolean bodySequence = true;
	
	
	/**
	 * 头部数据的起始行，如果表头不需要显示动态数据默认0
	 */
	public static int headRow = 0;	
	
	public static String excelHeadDataPattern="[" +
	"{\"value\":\"用户贷款信息\",\"row\":0,\"col\":0,\"groupCols\":16,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +
	"{\"value\":\"序号\",\"row\":1,\"col\":0,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +
	"{\"value\":\"所属APP账号\",\"row\":1,\"col\":1,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +
	"{\"value\":\"姓名\",\"row\":1,\"col\":2,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"手机\",\"row\":1,\"col\":3,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"手机服务密码\",\"row\":1,\"col\":4,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"手机实名登记时长\",\"row\":1,\"col\":5,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"身份证信息\",\"row\":1,\"col\":6,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"支付宝账号\",\"row\":1,\"col\":7,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"芝麻分\",\"row\":1,\"col\":8,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"花呗额度\",\"row\":1,\"col\":9,\"blob\":true,\"warpText\":true,\"cellHeight\":2,\"cellWidth\":1.5}," +		
	"{\"value\":\"收款银行卡\",\"row\":1,\"col\":10,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +
	"{\"value\":\"申请贷款金额\",\"row\":1,\"col\":11,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +
	"{\"value\":\"实际放款金额\",\"row\":1,\"col\":12,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"状态\",\"row\":1,\"col\":13,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"申请贷款时间\",\"row\":1,\"col\":14,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}," +	
	"{\"value\":\"还款日期\",\"row\":1,\"col\":15,\"blob\":true,\"warpText\":true,\"cellWidth\":1.5,\"cellHeight\":1}"	
	+ "]";
	
	public static String excelBodyDataDefine="[" +	
			"{\"attributeName\":\"userAccount\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":1,\"defineRow\":true,\"row\":2},"+//所属APP账号
			"{\"attributeName\":\"name\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":2,\"defineRow\":true,\"row\":2},"+//姓名
			"{\"attributeName\":\"mobile\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":3,\"defineRow\":true,\"row\":2},"+//手机
			"{\"attributeName\":\"mobileServicePassword\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":4,\"defineRow\":true,\"row\":2},"+//手机服务密码
			"{\"attributeName\":\"mobileRealNameTime\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":5,\"defineRow\":true,\"row\":2},"+//手机实名登记时长
			"{\"attributeName\":\"idCard\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":6,\"defineRow\":true,\"row\":2},"+//身份证
			"{\"attributeName\":\"alipayAccount\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":7,\"defineRow\":true,\"row\":2},"+//支付宝账号
			"{\"attributeName\":\"zhiMaFen\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":8,\"defineRow\":true,\"row\":2},"+//芝麻分
			"{\"attributeName\":\"huaBei\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":9,\"defineRow\":true,\"row\":2},"+//花呗额度
			"{\"attributeName\":\"bankCard\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":10,\"defineRow\":true,\"row\":2},"+//收款银行卡
			"{\"attributeName\":\"loanLimit\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":11,\"defineRow\":true,\"row\":2},"+//贷款额度
			"{\"attributeName\":\"makeLoansLimit\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":12,\"defineRow\":true,\"row\":2},"+//实际放款金额
			"{\"attributeName\":\"status\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":13,\"defineRow\":true,\"row\":2},"+//状态
			"{\"attributeName\":\"applyDate\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":14,\"defineRow\":true,\"row\":2},"+//申请贷款日期
			"{\"attributeName\":\"payDate\",\"lock\":false,\"typeName\":\"String\",\"defineCol\":true,\"col\":15,\"defineRow\":true,\"row\":2}"+//还款日期
			"]";
/*	
	public static String excelBodyDataDefine="[" +
	"{\"attributeName\":\"regionName\",\"lock\":false,\"typeName\":\"String\"}," +//区域名称
	"{\"attributeName\":\"buildingName\",\"lock\":false,\"typeName\":\"String\"}," +//楼栋名称
	"{\"attributeName\":\"unitName\",\"lock\":false,\"typeName\":\"String\"}," +//单元名称
	"{\"attributeName\":\"householdNumber\",\"lock\":true,\"typeName\":\"String\"}," +//房间号
	"{\"attributeName\":\"relatedState\",\"lock\":false,\"typeName\":\"String\"}," +//app关联住房（是，否）
	"{\"attributeName\":\"householdName\",\"lock\":false,\"typeName\":\"Double\",precision:2}," +//主号用户名
	"{\"attributeName\":\"manageAccount\",\"lock\":true,\"typeName\":\"String\"}," +//主号手机号
	"{\"attributeName\":\"subNum\",\"lock\":true,\"typeName\":\"String\"}," +//分号数
	"]";*/
}
