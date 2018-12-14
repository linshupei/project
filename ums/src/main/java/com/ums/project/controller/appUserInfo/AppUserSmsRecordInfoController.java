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

import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.excel.POIExcelUtil;
import com.ums.project.excel.template.AppUserCallRecorddInfoDefine;
import com.ums.project.excel.template.AppUserSmsInfoDefine;
import com.ums.project.excel.template.UserLoanInfoDefine;
import com.ums.project.excel.vo.ExportAppUserSmsInfo;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.queryBean.AppUserSmsRecordQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserSmsRecordService;
import com.ums.project.vo.AppUserSmsRecordInfoVo;

@RestController
public class AppUserSmsRecordInfoController {
	
	@Resource(name="appUserSmsRecordService")
	private AppUserSmsRecordService appUserSmsRecordService;
	
	
	@RequestMapping("/api/appUserSmsRecordInfoList")
	public List<AppUserSmsRecordInfoVo> AppUserSmsRecordInfoList(@RequestParam(required=false) String keyword) {
		
		AppUserSmsRecordQueryBean queryBean = new AppUserSmsRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(Integer.MAX_VALUE);
		datapage.setPage(1);
		
		
		List<AppUserSmsRecordInfoVo> userInfos = new ArrayList<AppUserSmsRecordInfoVo>();
		Page<AppUserSmsRecord> userInfoPageData = appUserSmsRecordService.userInfoPageData(queryBean, datapage);
		
		for(AppUserSmsRecord record:userInfoPageData) {
			AppUserSmsRecordInfoVo vo = new AppUserSmsRecordInfoVo();
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setSendTime(record.getSendTimeFormat());
			vo.setSendPhone(record.getSendPhone());
			vo.setSmsContent(record.getSmsContent());
			vo.setType(record.getType());
			userInfos.add(vo);
		}
		
		return userInfos;
	}
	
	/**
	 * 数据导出
	 * @param keyword
	 */
	@RequestMapping("/api/exportAppUserSmsRecordInfos")
	public void exportAppUserSmsRecordInfoPageData(@RequestParam(required=false) String keyword){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = servletRequestAttributes.getResponse();
		HttpServletRequest request = servletRequestAttributes.getRequest();		
		
		AppUserSmsRecordQueryBean queryBean = new AppUserSmsRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(Integer.MAX_VALUE);
		datapage.setPage(1);
		
		
		List<ExportAppUserSmsInfo> userInfos = new ArrayList<ExportAppUserSmsInfo>();
		Page<AppUserSmsRecord> userInfoPageData = appUserSmsRecordService.userInfoPageData(queryBean, datapage);
		
		for(AppUserSmsRecord record:userInfoPageData) {
			ExportAppUserSmsInfo vo = new ExportAppUserSmsInfo();
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setSendTime(record.getSendTimeFormat());
			vo.setSendPhone(record.getSendPhone());
			vo.setSmsContent(record.getSmsContent());
			vo.setType("1".equals(record.getType())?"收到":"2".equals(record.getType())?"发送":"");
			userInfos.add(vo);
		}		
		

		String excelHeadDataPattern = AppUserSmsInfoDefine.excelHeadDataPattern;
		String excelBodyDataDefine = AppUserSmsInfoDefine.excelBodyDataDefine;
		String sheetName = AppUserSmsInfoDefine.sheetName;
		int headRows = AppUserSmsInfoDefine.headRows;
		int headCols = AppUserSmsInfoDefine.headCols;   
		boolean bodySequenece = AppUserSmsInfoDefine.bodySequence;//表体是否显示序号
		
		//生成excel对象
		HSSFWorkbook excel = POIExcelUtil.createExcelTemplate(null,userInfos,excelHeadDataPattern,null,excelBodyDataDefine,headRows,headCols,sheetName,bodySequenece);		
    	try {
    		excel.write(getOutputStreamOfDownload(AppUserSmsInfoDefine.fileName, request, response));
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}
	
	@RequestMapping("/api/appUserSmsRecordInfos")
	public TableData AppUserSmsRecordInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		AppUserSmsRecordQueryBean queryBean = new AppUserSmsRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		
		List<AppUserSmsRecordInfoVo> userInfos = new ArrayList<AppUserSmsRecordInfoVo>();
		Page<AppUserSmsRecord> userInfoPageData = appUserSmsRecordService.userInfoPageData(queryBean, datapage);
		
		for(AppUserSmsRecord record:userInfoPageData) {
			AppUserSmsRecordInfoVo vo = new AppUserSmsRecordInfoVo();
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setSendTime(record.getSendTimeFormat());
			vo.setSendPhone(record.getSendPhone());
			vo.setSmsContent(record.getSmsContent());
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
