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

import com.ums.project.entity.AppUserContactInfo;
import com.ums.project.excel.POIExcelUtil;
import com.ums.project.excel.template.AppUserContactInfoDefine;
import com.ums.project.excel.template.UserLoanInfoDefine;
import com.ums.project.excel.vo.ExportAppUserContactInfo;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserContactInfoService;
import com.ums.project.vo.AppUserContactInfoVo;

@RestController
public class AppUserContactInfoController {
	
	@Resource(name="appUserContactInfoService")
	private AppUserContactInfoService appUserContactInfoService;
	
	@RequestMapping("/api/exportAppUserContactInfos")
	public void exportAppUserContactInfo(@RequestParam(required=false) String keyword){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = servletRequestAttributes.getResponse();
		HttpServletRequest request = servletRequestAttributes.getRequest();		
		
		AppUserContactInfoQueryBean queryBean = new AppUserContactInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(Integer.MAX_VALUE);
		datapage.setPage(1);
		
		
		List<ExportAppUserContactInfo> userInfos = new ArrayList<ExportAppUserContactInfo>();
		Page<AppUserContactInfo> userInfoPageData = appUserContactInfoService.userInfoPageData(queryBean, datapage);
		for(AppUserContactInfo info:userInfoPageData) {
			ExportAppUserContactInfo vo = new ExportAppUserContactInfo();
			vo.setId(info.getId());
			vo.setMobile(info.getMobile());
			vo.setUserAccount(info.getUserAccount());
			vo.setName(info.getName());		
			
			userInfos.add(vo);
		}		

		String excelHeadDataPattern = AppUserContactInfoDefine.excelHeadDataPattern;
		String excelBodyDataDefine = AppUserContactInfoDefine.excelBodyDataDefine;
		String sheetName = AppUserContactInfoDefine.sheetName;
		int headRows = AppUserContactInfoDefine.headRows;
		int headCols = AppUserContactInfoDefine.headCols;   
		boolean bodySequenece = AppUserContactInfoDefine.bodySequence;//表体是否显示序号
		
		//生成excel对象
		HSSFWorkbook excel = POIExcelUtil.createExcelTemplate(null,userInfos,excelHeadDataPattern,null,excelBodyDataDefine,headRows,headCols,sheetName,bodySequenece);		
    	try {
    		excel.write(getOutputStreamOfDownload(AppUserContactInfoDefine.fileName, request, response));
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
	}
	
	@RequestMapping("/api/appUserContactInfoList")
	public List<AppUserContactInfoVo> AppUserContactInfoList(@RequestParam(required=false) String keyword) {
		
		AppUserContactInfoQueryBean queryBean = new AppUserContactInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(Integer.MAX_VALUE);
		datapage.setPage(1);
		
		
		List<AppUserContactInfoVo> userInfos = new ArrayList<AppUserContactInfoVo>();
		Page<AppUserContactInfo> userInfoPageData = appUserContactInfoService.userInfoPageData(queryBean, datapage);
		for(AppUserContactInfo info:userInfoPageData) {
			AppUserContactInfoVo vo = new AppUserContactInfoVo();
			vo.setId(info.getId());
			vo.setMobile(info.getMobile());
			vo.setUserAccount(info.getUserAccount());
			vo.setName(info.getName());		
			
			userInfos.add(vo);
		}
		
		return userInfos;
	}
	
	@RequestMapping("/api/appUserContactInfos")
	public TableData AppUserContactInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		AppUserContactInfoQueryBean queryBean = new AppUserContactInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		
		List<AppUserContactInfoVo> userInfos = new ArrayList<AppUserContactInfoVo>();
		Page<AppUserContactInfo> userInfoPageData = appUserContactInfoService.userInfoPageData(queryBean, datapage);
		for(AppUserContactInfo info:userInfoPageData) {
			AppUserContactInfoVo vo = new AppUserContactInfoVo();
			vo.setId(info.getId());
			vo.setMobile(info.getMobile());
			vo.setUserAccount(info.getUserAccount());
			vo.setName(info.getName());		
			
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
