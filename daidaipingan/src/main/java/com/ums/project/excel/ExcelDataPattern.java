package com.ums.project.excel;
import java.util.Date;

import org.apache.commons.lang.math.NumberUtils;

import com.ums.project.util.DateUtil;


/**
 * 用于定义每个excel单元格中数据的格式
 * @author linsp
 * @date 2015-11-19
 */
public class ExcelDataPattern {

	/**
	 * 属性名称，考虑到属性关联问题，如果获取的是关联属性的值，则以下划线(_)区分
	 *  cities_0_cityName   cities数组第一个下标的城市名称
	 *  idCard_cardNo  idCard对象的cardNo的值
	 */
	private String attributeName;
	
	//属性值类型（String Integer,Double,Float Date Boolean）
	private String typeName;
	
	//日期格式化规则
	private String pattern;
	
	//小数保留的位数
	private String precision;
	
	//该数据在单元格中是否锁定无法修改
	private boolean lock = false;
	
	private boolean hidden = false;
	
	private boolean warpText = true;
	
	//是否自定义列索引位置
	private boolean defineCol = false;
	//自定义的列索引
	private int col = 0;
	
	//是否自定义行索引
	private boolean defineRow = false;
	//自定义的行索引
	private int row = 0;
	//是否自定义合并行和列
	private boolean defineGroup = false;
	//合并的行
	private int groupRows = 1;
	//合并的列
	private int groupCols = 1;
	
	/**
	 * 根据JavaBean规范，生成获取属性值的get方法名
	 * @return
	 */
	public String createGetMethodName(String attName){
		StringBuilder methodName = new StringBuilder();
		if("Boolean".equals(typeName)){
			methodName.append("is");
		}else{
			methodName.append("get");
		}
		methodName.append(attName.substring(0,1).toUpperCase()).append(attName.substring(1)).toString();
		return methodName.toString();
	}
	
	/**
	 * 根据JavaBean规范，生成获取属性值的get方法名
	 * @return
	 */
	public String createSetMethodName(String attName){
		String methodName = new StringBuilder("set").append(attName.substring(0,1).toUpperCase()).append(attName.substring(1)).toString();
		return methodName;
	}	
	
	/**
	 * 根据类型获取
	 * @return
	 */
	public Class getTypeClass(Object value){
		return value.getClass();
	}
	
	/**
	 * 根据数据类型以及规则，格式化数据
	 * @param value
	 * @return
	 */
	public String patternValue(Object value){
		if("String".equals(typeName)){
			if(value==null) return "";
			return value.toString();
		}else if("Double".equals(typeName)||"Float".equals(typeName)||"Integer".equals(typeName)){
			Double num = 0.0;
			if(value!=null){
				num= new Double(value.toString());
			}
			String result = String.format(new StringBuilder().append("%.").append(precision).append("f").toString(),num);
			return result;
		}else if("Date".equals(typeName)){
			if(value==null) return "";
			return DateUtil.getDateFormat(pattern,(Date)value);
		}
		return "";
	}
	
	/*
	 *将excel导入的数据转化为指定类型数据 
	 */
	public Object parseValue(String value){
		ParseExcelValueBean parseBean = new ParseExcelValueBean();
			ExcelErrorBean  errorBean = null;
			Object object = null;
		if("String".equals(typeName)){
			object = value;
		}else if("Date".equals(typeName)){
			object = DateUtil.parseDate(pattern,value);
			if(object==null){
				errorBean = new ExcelErrorBean();
				errorBean.setReason("填写错误，非法字符，表格的日期格式不正确。正确格式为（"+pattern+")");				
			}
		}else if("Integer".equals(typeName)){
			object = NumberUtils.toInt(value,0);
			if(!NumRexUtil.isNumber(value)){
				errorBean = new ExcelErrorBean();
				errorBean.setReason("填写错误，非法字符，表格内容不是常规数字。");
			}
		}else if("Double".equals(typeName)){
			object = NumberUtils.toDouble(value,0.00d);
			if(!NumRexUtil.isNumber(value)){
				errorBean = new ExcelErrorBean();
				errorBean.setReason("填写错误，非法字符，表格内容不是常规数字。");
			}
		}else if("Float".equals(typeName)){
			object = NumberUtils.toFloat(value,0.00f);
			if(!NumRexUtil.isNumber(value)){
				errorBean = new ExcelErrorBean();
				errorBean.setReason("填写错误，非法字符，表格内容不是常规数字。");
			}
		}else if("Boolean".equals(typeName)){
			object =  new Boolean(value);
		}
		parseBean.setErrorBean(errorBean);
		parseBean.setObject(object);
		
		return parseBean;
	}

	public String getAttributeName() {
		return attributeName;
	}

	public void setAttributeName(String attributeName) {
		this.attributeName = attributeName;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getPrecision() {
		return precision;
	}

	public void setPrecision(String precision) {
		this.precision = precision;
	}

	public boolean isLock() {
		return lock;
	}

	public void setLock(boolean lock) {
		this.lock = lock;
	}

	public boolean isHidden() {
		return hidden;
	}

	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}

	public boolean isWarpText() {
		return warpText;
	}

	public void setWarpText(boolean warpText) {
		this.warpText = warpText;
	}

	public boolean isDefineCol() {
		return defineCol;
	}

	public void setDefineCol(boolean defineCol) {
		this.defineCol = defineCol;
	}

	public int getCol() {
		return col;
	}

	public void setCol(int col) {
		this.col = col;
	}

	public boolean isDefineRow() {
		return defineRow;
	}

	public void setDefineRow(boolean defineRow) {
		this.defineRow = defineRow;
	}

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public boolean isDefineGroup() {
		return defineGroup;
	}

	public void setDefineGroup(boolean defineGroup) {
		this.defineGroup = defineGroup;
	}

	public int getGroupRows() {
		return groupRows;
	}

	public void setGroupRows(int groupRows) {
		this.groupRows = groupRows;
	}

	public int getGroupCols() {
		return groupCols;
	}

	public void setGroupCols(int groupCols) {
		this.groupCols = groupCols;
	}
	
}
