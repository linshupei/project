package com.ums.project.excel;


import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFShape;
import org.apache.poi.hssf.usermodel.HSSFSimpleShape;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * desc:单元格bean定义，用于封装单元格数据；便于操作和维护
 * @author linsp
 * @date 2015-11-19
 */
public class ExcelCellEntity {

	//内容值
	private Object value = "";
	
	private String valueType = "String";
	
	//单元格高度倍数，默认1倍
	private double cellHeight = 1;
	
	//单元格宽度倍数，默认1倍
	private double cellWidth = 1;
	
	//字体大小
	private int fontSize=200;
	
	//字体是否加粗
	private boolean blob = false;
	
	//长字体是否自动换行
	private boolean warpText = true;
	
	//所在行
	private int row = 0;
	
	//所在列
	private int col = 0;
	
	//合并的行
	private int groupRows = 1;
	
	//合并的列
	private int groupCols = 1;
	
	//单元格是否锁定，不可修改
	private boolean lock = true;
	
	private boolean hidden = false;
	
	//单元格中是否划斜线
	private boolean patriarch = false;
	
	//单元格背景颜色
	private String bgcolor;
	
	//字体颜色
	private String color;
	
	public ExcelCellEntity(){}
	
	/**
	 * 
	 * @param value 单元格内容
	 * @param row  单元格所在的行
	 * @param col  单元格所在的列
	 */
	public ExcelCellEntity(Object value,short row,short col){
		this.setValue(value);
		this.setRow(row);
		this.setCol(col);
	}
	
	public IndexedColors getCellBgColor(){
		IndexedColors[] values = IndexedColors.values();
		
		for (IndexedColors indexedColors : values) {
			if(indexedColors.name().equals(bgcolor)){
				return indexedColors;
			}
		}
		return null;
	}
	
	public IndexedColors getCellFontColor(){
		IndexedColors[] values = IndexedColors.values();
		
		for (IndexedColors indexedColors : values) {
			if(indexedColors.name().equals(color)){
				return indexedColors;
			}
		}
		return null;
	}
	
	/**
	 * 获取合并单元格，默认自身
	 * @return
	 */
	public CellRangeAddress getBaseCellRangeAddress(){
		CellRangeAddress cra = new CellRangeAddress(row,row+groupRows-1,col,col+groupCols-1);
		return cra;
	}
	
	/**
	 * 创建该单元格格式 
	 * @param excel
	 * @param e 
	 * @return
	 */
	public HSSFCellStyle getBaseHSSFCellStyle(HSSFWorkbook excel, ExcelCellEntity e){
		HSSFCellStyle cellStyle = excel.createCellStyle();
		excel.getSheetAt(0).setColumnWidth(col, (int)(excel.getSheetAt(0).getColumnWidth((int)col)*cellWidth));
		excel.getSheetAt(0).getRow(row).setHeight((short)(excel.getSheetAt(0).getRow(row).getHeight()*cellHeight));

		cellStyle.setFont(getBaseFontStyle(excel));
		//水平方向对齐
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// 垂直方向的对齐方式
		cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		//设置自动换行 
		cellStyle.setWrapText(warpText);
		
		IndexedColors cellBgColor = getCellBgColor();
		if(cellBgColor!=null){

			cellStyle.setFillForegroundColor(cellBgColor.getIndex());//AUTOMATIC
			
			cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

		}
		
		//设置边框
		cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		
		cellStyle.setBottomBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
		cellStyle.setLeftBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
		cellStyle.setRightBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
		cellStyle.setTopBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());

		
		excel.getSheetAt(0).setColumnHidden(col, hidden);
		HSSFDataFormat format = excel.createDataFormat();  
		if((e.getValue() instanceof Double)){
			cellStyle.setDataFormat(format.getBuiltinFormat("0.00"));
		}
		else if((e.getValue() instanceof Integer)){
			cellStyle.setDataFormat(format.getBuiltinFormat("0"));
		}
		else{
			cellStyle.setDataFormat(format.getFormat("@")); 
		}
		//设置单元格锁定
		cellStyle.setLocked(lock);
		if(patriarch){//单元格划线
			HSSFPatriarch patriarch =excel.getSheetAt(0).createDrawingPatriarch();
			HSSFClientAnchor anchor = new HSSFClientAnchor();
			//anchor.setAnchor((short)col, (short)row, (short)(col+groupCols), (short)(row+groupRows),(short)col, (short)row,(short)(col), (short)(row));
			anchor.setAnchor((short)col, (short)row, 0, 0, (short) (col + 1),row + 1, 0, 0);
			HSSFSimpleShape line = patriarch.createSimpleShape(anchor);			
			 line.setShapeType(HSSFSimpleShape.OBJECT_TYPE_LINE);//设置图形类型
			 line.setLineStyle(HSSFShape.LINESTYLE_SOLID);//设置图形样式
			 line.setLineWidth(12700);//在POI中线的宽度12700表示1pt,所以这里是0.5pt粗的线条。 	

			 //设置斜线颜色为灰色
			 line.setLineStyleColor( 128,128,128);
		}
		return cellStyle;
	}
	
	/**
	 * 创建默认的单元格字体格式
	 * @param excel
	 * @return
	 */
	private HSSFFont getBaseFontStyle(HSSFWorkbook excel){
		HSSFFont font = excel.createFont();
		// 字体加粗
		if(blob)
			font.setBoldweight(Font.BOLDWEIGHT_BOLD);
		//设置字体大小
		font.setFontHeight((short)fontSize);
		
		//设置字体颜色
		IndexedColors cellFontColor = getCellFontColor();
		if(cellFontColor!=null){
			font.setColor(cellFontColor.getIndex());
		}
		
		return font;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public double getCellHeight() {
		return cellHeight;
	}

	public void setCellHeight(double cellHeight) {
		this.cellHeight = cellHeight;
	}

	public double getCellWidth() {
		return cellWidth;
	}

	public void setCellWidth(double cellWidth) {
		this.cellWidth = cellWidth;
	}

	public void setCellWidth(short cellWidth) {
		this.cellWidth = cellWidth;
	}

	public int getFontSize() {
		return fontSize;
	}

	public void setFontSize(int fontSize) {
		this.fontSize = fontSize;
	}

	public boolean isBlob() {
		return blob;
	}

	public void setBlob(boolean blob) {
		this.blob = blob;
	}

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getCol() {
		return col;
	}

	public void setCol(int col) {
		this.col = col;
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

	public boolean isWarpText() {
		return warpText;
	}

	public void setWarpText(boolean warpText) {
		this.warpText = warpText;
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

	public String getValueType() {
		return valueType;
	}

	public void setValueType(String valueType) {
		this.valueType = valueType;
	}

	public boolean isPatriarch() {
		return patriarch;
	}

	public void setPatriarch(boolean patriarch) {
		this.patriarch = patriarch;
	}

	public String getBgcolor() {
		return bgcolor;
	}

	public void setBgcolor(String bgcolor) {
		this.bgcolor = bgcolor;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
}
