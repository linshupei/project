package com.ums.project.excel;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * desc：数据导出工具，根据提供的模板导出数据
 * @author linsp
 * @date 2018-03-09
 */
public class POIExcelUtil{

	
	/**
	 * 创建excel
	 * @param pmcs   查询到的具体数据集合
	 * @param excelHeadDataPattern  excel表头结构定义json字符串，用于格式化单元格
	 * @param excelHeadDataDefine  excel表头数据结构定义json字符串，用于格式化单元格
	 * @param excelbodyDataDefine	    excel表体数据结构定义json字符串，用于格式化单元格
	 * @param rows	表头结构需要占用的总行数
	 * @param cols	表头结构需要占用的总列数
	 * @param sheetName  表名称
	 * @param  bodySequence 表体是否显示序号
	 * @return   HSSFWorkbook对象
	 */
	@SuppressWarnings("rawtypes")
	public static HSSFWorkbook createExcelTemplate(List heads,List bodys,String excelHeadDataPattern,String excelHeadDataDefine,String excelBodyDataDefine, int rows,int cols,String sheetName,boolean bodySequence){
		List<ExcelCellEntity> entities = getTemplateHeadData(excelHeadDataPattern);	//解析excel表头模板

		List<ExcelDataPattern> excelBodyPattern = parseExcelDatePatternStr(excelBodyDataDefine);//解析excel数据模板
		List<ExcelCellEntity> bodyEntities = getTemplateBodyData(bodys,excelBodyPattern,rows,bodySequence);//生成excel单元格格式，内容存储Bean
		
		if(heads!=null && heads.size()>0 && excelHeadDataDefine!=null && excelHeadDataDefine.length()>0){
			List<ExcelDataPattern> excelHeadPattern = parseExcelDatePatternStr(excelHeadDataDefine);//解析excel数据模板
			List<ExcelCellEntity> headEntities = getTemplateHeadData(heads,excelHeadPattern,rows);//生成excel单元格格式，内容存储Bean
			entities.addAll(0, headEntities);
		}		
		HSSFWorkbook excel = createTemplate(entities,bodyEntities,rows,cols,sheetName);//创建模板
		
		return excel;
	}

	/**
	 * 如果模板定义的类型，和单元格传来的内容不一致，则不会保存数据到excelBean集合，并生成error信息
	 * @param excelDataPattern  数据定义模板
	 * @param file  上传的excel文件
	 * @param rowIndex  excel中要导入数据的起始行(0,1,2,3.........)
	 * @return ReadExcelBean，包含错误信息以及读取的数据内容
	 */
	public static ReadExcelBean readDataFromExcel(String excelDataPattern,Class beanClass,File file,int rowIndex) throws Exception {
		
		//上传的读取文件
		HSSFWorkbook excel = new HSSFWorkbook(new FileInputStream(file));
		HSSFSheet sheet = excel.getSheetAt(0);
		int endIndex = sheet.getLastRowNum();//获取excel的行数  下标 0开始 
		
		//将制定的excel的模义json数据转变为  对象集合
		List<ExcelDataPattern> dataPatternList = parseExcelDatePatternStr(excelDataPattern);
		
		
		List beans = new ArrayList();//保存已解析excel数据内容
		List<ExcelErrorBean> errorBeans = new ArrayList<ExcelErrorBean>();//保存错误信息
		
		while(rowIndex<=endIndex){//从数据行开始遍历数据
			
			boolean isAdd = true;
			HSSFRow row = sheet.getRow(rowIndex);
			Object excelBean  = beanClass.newInstance();
			
			//开始解析excel数据并转换为具体 数据 bean，为了便于设置数据，采用反射将数据 set至bean对象内
			for(int inx=0;inx<dataPatternList.size();inx++){
				
				ExcelDataPattern dataPatternDefine = dataPatternList.get(inx);
				String attributeName = dataPatternDefine.getAttributeName();//获取定义的属性名称
				String getMethod = dataPatternDefine.createGetMethodName(attributeName);//获取  get方法名称
				//获取 get方法返回的数据类型
				Class<?> returnType = beanClass.getMethod(getMethod).getReturnType();
				
				String setMethod = dataPatternDefine.createSetMethodName(attributeName);//创建set方法
				//根据set方法名称以及 参数类型 获取实际bean的方法
				Method method = beanClass.getMethod(setMethod,returnType);
				
				String cellValue = "";
				if(row.getCell(inx+1)!=null){
					 row.getCell(inx+1).setCellType(Cell.CELL_TYPE_STRING);
					 cellValue = row.getCell(inx+1).getStringCellValue();//获取excel的单元格数据
					 cellValue = cellValue.trim();//去除多余空格，防止空格符注入
			     }
				
				//解析单元格数据是否与定义的数据类型一致
				ParseExcelValueBean value = (ParseExcelValueBean)dataPatternDefine.parseValue(cellValue);
				ExcelErrorBean errorBean = value.getErrorBean();
				if(errorBean != null){//表格内容不正确，非法字符
					errorBean.setRow(Integer.toString(rowIndex+1));//错误发生行
					errorBean.setCol(Integer.toString(inx+2));//错误发生列
					errorBeans.add(errorBean);
					isAdd = false;
				}
				//将数据 set入 bean数据内
				method.invoke(excelBean,value.getObject());
			}		
			rowIndex++;
			if(isAdd){
				beans.add(excelBean);
			}
		}
		
		ReadExcelBean readExcelBean = new ReadExcelBean(beans,errorBeans);
		return readExcelBean;

	}
	
	/**
	 * 解析数据格式模板
	 * @param excelDataPattern
	 * @return
	 */
	private static List<ExcelDataPattern> parseExcelDatePatternStr(
			String excelDataPattern) {
		ObjectMapper objectMapper = new ObjectMapper();
		JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, ExcelDataPattern.class); 
		List<ExcelDataPattern> p;
		try {
			p = (List<ExcelDataPattern>)objectMapper.readValue(excelDataPattern, javaType);
			return p;
		} catch (IOException e) {
			e.printStackTrace();
		}

		return new ArrayList<ExcelDataPattern>(0);
	}
	
	/**
	 * 获取具体头数据集合
	 * @param dataset	数据库中查询到的数据
	 * @param colNames  列名称集合，用于反射获取具体对象具体属性值
	 * @param headRows  头部所占的行数
	 * @return
	 */
	private static List<ExcelCellEntity> getTemplateHeadData(List dataset,List<ExcelDataPattern> excelPattern,int headRows){
		List<ExcelCellEntity> bodies  = new ArrayList<ExcelCellEntity>();
		for(int index=0;index<dataset.size();index++){
			//bodies.add(new ExcelCellEntity(Integer.toString(index+1),(short)(index+headRows),(short)0));
			for(int index1=0;index1<excelPattern.size();index1++){
				try {
					ExcelDataPattern excelDataPattern = excelPattern.get(index1);
					Object value = dataset.get(index).getClass().getMethod(excelDataPattern.createGetMethodName(excelDataPattern.getAttributeName())).invoke(dataset.get(index));
					ExcelCellEntity ece= new ExcelCellEntity();
					if(excelDataPattern.isDefineCol()){
						ece.setCol(excelDataPattern.getCol());
					}else{
						ece.setCol((short)(index1+1));
					}
					if(excelDataPattern.isDefineRow()){
						ece.setRow(excelDataPattern.getRow());
					}else{
						ece.setRow(index+headRows);
					}
					if(excelDataPattern.isDefineGroup()){
						ece.setGroupRows(excelDataPattern.getGroupRows());
						ece.setGroupCols(excelDataPattern.getGroupCols());
					}
					ece.setValue(value);
				
					ece.setLock(excelDataPattern.isLock());
					ece.setHidden(excelDataPattern.isHidden());
					ece.setValueType(excelDataPattern.getTypeName());//String Integer,Double,Float Date Boolean
					bodies.add(ece);						

				} catch (Exception e) {
					e.printStackTrace();
				}
			}			
		}

		return bodies;		
	}
	/**
	 * 获取具体数据集合
	 * @param dataset	数据库中查询到的数据
	 * @param colNames  列名称集合，用于反射获取具体对象具体属性值
	 * @param headRows  头部所占的行数
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static List<ExcelCellEntity> getTemplateBodyData(List dataset,List<ExcelDataPattern> excelPattern,int headRows,boolean bodySequence) {
		
		List<ExcelCellEntity> bodies  = new ArrayList<ExcelCellEntity>();
		for(int index=0;index<dataset.size();index++){
			int colColumn = 0;
			if(bodySequence){//表体添加序号每行的第一个单元格
				bodies.add(new ExcelCellEntity(Integer.toString(index+1),(short)(index+headRows),(short)0));
				colColumn=colColumn+1;
			}
			for(int index1=0;index1<excelPattern.size();index1++){
				try {
					ExcelDataPattern excelDataPattern = excelPattern.get(index1);
					Object value = dataset.get(index).getClass().getMethod(excelDataPattern.createGetMethodName(excelDataPattern.getAttributeName())).invoke(dataset.get(index));					
					ExcelCellEntity ece= new ExcelCellEntity(value,(short)(index+headRows),(short)colColumn);
					ece.setLock(excelDataPattern.isLock());
					ece.setHidden(excelDataPattern.isHidden());
					ece.setValueType(excelDataPattern.getTypeName());//String Integer,Double,Float Date Boolean
					bodies.add(ece);						
					colColumn++;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}			
		}

		return bodies;
	}

	
	/**
	 * 将读取到的表头数据填充到excel单元格
	 * @param sheet
	 * @param rows 头部所占用的总行数
	 * @param entities
	 */
	private static void fillUpData(HSSFWorkbook excel,HSSFSheet sheet,
			List<ExcelCellEntity> entities) {
		for(ExcelCellEntity e:entities){
			HSSFRow row = sheet.getRow(e.getRow());
			if(row==null){
				row = sheet.createRow(e.getRow());
			}
			HSSFCell cell = row.getCell((int)e.getCol());
			if(cell==null){
				cell = row.createCell((int)e.getCol());
			}
			cell.setCellValue(e.getValue()!=null?e.getValue().toString():"");
			cell.setCellStyle(e.getBaseHSSFCellStyle(excel,e));
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			sheet.addMergedRegion(e.getBaseCellRangeAddress());
		}
	}
	
	/**
	 * 将读取到的表头数据填充到excel单元格
	 * @param sheet
	 * @param rows 头部所占用的总行数
	 * @param entities
	 */
	private static void fillUpBodyData(HSSFWorkbook excel,HSSFSheet sheet,int rows,
			List<ExcelCellEntity> entities) {
		for(ExcelCellEntity e:entities){
			HSSFRow row = sheet.getRow(e.getRow());
			if(row==null){
				row = sheet.createRow(e.getRow());
			}
			HSSFCell cell = row.getCell((int)e.getCol());
			if(cell==null){
				cell = row.createCell((int)e.getCol());
			}
			//cell.setCellValue(e.getValue().toString());
			/*if(StringUtils.equals("Double", e.getValueType()) || StringUtils.equals("Integer", e.getValueType())){
				cell.setCellValue(Double.parseDouble(e.getValue().toString()));
			}else{
				cell.setCellValue(e.getValue().toString());
			}*/
			
			
			if(e.getValue() instanceof Double){
				cell.setCellValue(Double.parseDouble(e.getValue().toString()));
			}else if(e.getValue() instanceof Integer){
				cell.setCellValue(Integer.parseInt(e.getValue().toString()));
			}else{
				if(e.getValue() ==null){
					if("Double".equals(e.getValueType())){
						cell.setCellValue(0);
					}
					else{
						cell.setCellValue("");
					}
				}
				else{
					cell.setCellValue(e.getValue().toString());
				}
			}
			HSSFCell firstCell = sheet.getRow(rows).getCell(e.getCol());
			if(firstCell !=null && e.getRow()>rows){
				HSSFCellStyle celvlStyle = firstCell.getCellStyle();
				cell.setCellStyle(celvlStyle);
			}else{
				cell.setCellStyle(e.getBaseHSSFCellStyle(excel,e));
			}
			
			sheet.addMergedRegion(e.getBaseCellRangeAddress());
		}
	}	

	/**
	 * 获取excel模板表头内容
	 * @return
	 */
	private static List<ExcelCellEntity> getTemplateHeadData(String excelHeadDataPattern) {
		ObjectMapper objectMapper = new ObjectMapper();
		JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, ExcelCellEntity.class); 
		List<ExcelCellEntity> p;
		try {
			p = (List<ExcelCellEntity>)objectMapper.readValue(excelHeadDataPattern, javaType);
			return p;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ArrayList<ExcelCellEntity>(0);
	}
	/**
	 * 初始化整个excel，设置表格中默认样式
	 * @param excel  excel对象
	 * @param sheet  具体表
	 * @param sheetName 表名字
	 * @param rows   模板头部结构所占用的行数
	 * @param cols	  模板头部结构所占用的列数
	 */
	private static HSSFSheet initBaseExcelStyle(HSSFWorkbook excel,String sheetName,int rows, int cols) {
		
		HSSFSheet sheet = excel.createSheet(sheetName);
		//sheet.protectSheet(""); //设置表单保护密码
		
		for(int r=0;r<rows;r++){
			HSSFRow createRow = sheet.createRow(r);
			for(int c=0;c<cols;c++){
				HSSFCell createCell = createRow.createCell(c);
				initBaseCellStyle(excel,createCell);
			}
		}
		return sheet;
	}
	
	/**
	 * 初始化整个excel，设置表格中默认样式
	 * @param excel  excel对象
	 * @param sheet  具体表
	 * @param sheetName 表名字
	 * @param rows   模板头部结构所占用的行数
	 * @param cols	  模板头部结构所占用的列数
	 */
	private static HSSFSheet initBaseExcelStyle(HSSFWorkbook excel,String sheetName,int rows, int cols,List<ExcelCellEntity> entities,List<ExcelCellEntity> bodyEntities) {
		
		HSSFSheet sheet = excel.createSheet(sheetName);
		//sheet.protectSheet(""); //设置表单保护密码
		
		for(int r=0;r<rows;r++){
			for(int c=0;c<cols;c++){
				for(ExcelCellEntity ece:entities){
					if(ece.getCol()==r && ece.getRow()==c){
						HSSFRow createRow = sheet.getRow(r);
						if(createRow==null){
							 createRow = sheet.createRow(r);
						}
						HSSFCell createCell = createRow.getCell(c);
						if(createCell==null){
							createCell = createRow.createCell(c);
							initBaseCellStyle(excel,createCell);							
						}
					}
				}
				for(ExcelCellEntity ece:bodyEntities){
					if(ece.getCol()==r && ece.getRow()==c){
						HSSFRow createRow = sheet.getRow(r);
						if(createRow==null){
							 createRow = sheet.createRow(r);
						}
						HSSFCell createCell = createRow.getCell(c);
						if(createCell==null){
							createCell = createRow.createCell(c);
							initBaseCellStyle(excel,createCell);							
						}
					}
				}				
			}
		}
		return sheet;
	}

	/**
	 * 设置默认样式
	 * @param excel
	 * @param cell
	 */
	private static void initBaseCellStyle(HSSFWorkbook excel,HSSFCell cell){
		HSSFCellStyle cellStyle = excel.createCellStyle();
		//设置边框
/*		cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);	*/
		
		//水平方向对齐
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// 垂直方向的对齐方式
		cellStyle.setVerticalAlignment(HSSFCellStyle.ALIGN_CENTER);
		cell.setCellStyle(cellStyle);
		//设置单元格为文本
		cell.setCellType(HSSFCell.CELL_TYPE_STRING);  
	}
	
	/**
	 * 创建excel中头部结构以及标题内容
	 * @param entities  头部数据
	 * @param bodyEntities  具体数据
	 * @param headRows  头部结构占用行数
	 * @param headCols  头部结构占用的列数
	 * @return
	 */
	private static HSSFWorkbook createTemplate(List<ExcelCellEntity> entities,List<ExcelCellEntity> bodyEntities,int headRows,int headCols,String sheetName){
		
		HSSFWorkbook excel = new HSSFWorkbook();//定义excel对象
		
		//初始化整个excel，设置表格中默认样式
		HSSFSheet sheet= initBaseExcelStyle(excel,sheetName,headRows,headCols,entities,bodyEntities);
		
		//将读取到的表头数据填充到excel单元格
		fillUpData(excel,sheet,entities);
		
		//将具体数据填充到excel单元格
		fillUpBodyData(excel,sheet,headRows,bodyEntities);
		
		return excel;
	}		
    
}