package com.ums.project.controller.appUserInfo;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ums.project.entity.AppUserCallRecord;
import com.ums.project.excel.POIExcelUtil;
import com.ums.project.excel.template.AppUserCallRecorddInfoDefine;
import com.ums.project.excel.template.UserLoanInfoDefine;
import com.ums.project.excel.vo.ExportAppUserCallRecordInfo;
import com.ums.project.queryBean.AppUserCallRecordQueryBean;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserCallRecordService;
import com.ums.project.vo.AppUserCallRecordInfoVo;

@RestController
public class AppUserCallRecordInfoController {
	
	@Resource(name="appUserCallRecordService")
	private AppUserCallRecordService appUserCallRecordService;
	
	/**
	 * 导出excel
	 * @param keyword
	 */
	@RequestMapping("/api/exportAppUserCallRecordInfos")
	public void exportExcel(@RequestParam(required=false) String keyword){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = servletRequestAttributes.getResponse();
		HttpServletRequest request = servletRequestAttributes.getRequest();		
		
		AppUserCallRecordQueryBean queryBean = new AppUserCallRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(Integer.MAX_VALUE);
		datapage.setPage(1);
		
		
		List<ExportAppUserCallRecordInfo> body = new ArrayList<ExportAppUserCallRecordInfo>();
		Page<AppUserCallRecord> userInfoPageData = appUserCallRecordService.userInfoPageData(queryBean, datapage);
		for(AppUserCallRecord record:userInfoPageData) {
			ExportAppUserCallRecordInfo vo = new ExportAppUserCallRecordInfo();
			
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setCallTime(record.getCallTimeStr());
			vo.setCallPhone(record.getCallPhone());
			vo.setCalledPhone(record.getCalledPhone());
			vo.setCallName(record.getCallName());			
			vo.setType("1".equals(record.getType())?"呼入":"2".equals(record.getType())?"呼出":"3".equals(record.getType())?"未接":"");
			body.add(vo);
		}

		String excelHeadDataPattern = AppUserCallRecorddInfoDefine.excelHeadDataPattern;
		String excelBodyDataDefine = AppUserCallRecorddInfoDefine.excelBodyDataDefine;
		String sheetName = AppUserCallRecorddInfoDefine.sheetName;
		int headRows = AppUserCallRecorddInfoDefine.headRows;
		int headCols = AppUserCallRecorddInfoDefine.headCols;   
		boolean bodySequenece = AppUserCallRecorddInfoDefine.bodySequence;//表体是否显示序号
		
		//生成excel对象
		HSSFWorkbook excel = POIExcelUtil.createExcelTemplate(null,body,excelHeadDataPattern,null,excelBodyDataDefine,headRows,headCols,sheetName,bodySequenece);		
    	try {
    		excel.write(getOutputStreamOfDownload(UserLoanInfoDefine.fileName, request, response));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@RequestMapping("/api/appUserCallRecordInfoList")
	public List<AppUserCallRecordInfoVo> AppUserCallRecordInfoList(@RequestParam(required=false) String keyword) {
		
		AppUserCallRecordQueryBean queryBean = new AppUserCallRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(Integer.MAX_VALUE);
		datapage.setPage(1);
		
		
		List<AppUserCallRecordInfoVo> userInfos = new ArrayList<AppUserCallRecordInfoVo>();
		Page<AppUserCallRecord> userInfoPageData = appUserCallRecordService.userInfoPageData(queryBean, datapage);
		for(AppUserCallRecord record:userInfoPageData) {
			AppUserCallRecordInfoVo vo = new AppUserCallRecordInfoVo();
			
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setCallTime(record.getCallTimeStr());
			vo.setCallPhone(record.getCallPhone());
			vo.setCalledPhone(record.getCalledPhone());
			vo.setCallName(record.getCallName());			
			vo.setType(record.getType());
			userInfos.add(vo);
		}
		
		return userInfos;
	}
	
	@RequestMapping("/api/appUserCallRecordInfos")
	public TableData AppUserCallRecordInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		AppUserCallRecordQueryBean queryBean = new AppUserCallRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		
		List<AppUserCallRecordInfoVo> userInfos = new ArrayList<AppUserCallRecordInfoVo>();
		Page<AppUserCallRecord> userInfoPageData = appUserCallRecordService.userInfoPageData(queryBean, datapage);
		for(AppUserCallRecord record:userInfoPageData) {
			AppUserCallRecordInfoVo vo = new AppUserCallRecordInfoVo();
			
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setCallTime(record.getCallTimeStr());
			vo.setCallPhone(record.getCallPhone());
			vo.setCalledPhone(record.getCalledPhone());
			vo.setCallName(record.getCallName());			
			vo.setType(record.getType());
			userInfos.add(vo);
		}
		
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getTotalElements());
		td.setMsg("");
		td.setData(userInfos);
		
		return td;
	}
	
	private  OutputStream getOutputStreamOfDownload(String fileName,HttpServletRequest request,HttpServletResponse response){
		response.reset();
		response.setContentType("application/force-download");
		//根据不同浏览器输出
		String agent = request.getHeader("User-Agent");
		boolean isMSIE = (agent != null && agent.indexOf("MSIE") != -1) || (agent!= null && agent.indexOf("Trident/")!=-1);
		try {
			if (isMSIE) {
				fileName = URLEncoder.encode(fileName, "UTF-8");
			} else {
				fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
			}
		}catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		response.addHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
		
		OutputStream os=null;
		try {
			os = response.getOutputStream();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return os;
	}	
}
