package com.ums.project.excel;

import java.util.List;

/**
 * 读取excel后，存储的信息
 * @author linsp
 * @date 2015-12-07
 */
public class ReadExcelBean {

	private List<ExcelErrorBean> errors;
	
	private List datas;
	
	public ReadExcelBean(List datas,List<ExcelErrorBean> errors){
		this.errors = errors;
		this.datas = datas;
	}

	public List<ExcelErrorBean> getErrors() {
		return errors;
	}

	public void setErrors(List<ExcelErrorBean> errors) {
		this.errors = errors;
	}

	public List getDatas() {
		return datas;
	}

	public void setDatas(List<ExcelCellEntity> datas) {
		this.datas = datas;
	}
}
