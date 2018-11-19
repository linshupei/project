package com.ums.project.controller.userInfo;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.tagext.PageData;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ums.project.entity.UserInfo;
import com.ums.project.excel.POIExcelUtil;
import com.ums.project.excel.template.UserLoanInfoDefine;
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.UserInfoService;
import com.ums.project.vo.UserInfoVo;

@RestController
public class UserInfoController {
	
	@Resource(name="userInfoService")
	private UserInfoService userInfoService;
	
	@RequestMapping("/api/exportLoanInfo")
	public void exportLoanInfo(){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = servletRequestAttributes.getResponse();
		HttpServletRequest request = servletRequestAttributes.getRequest();
		
		 List body = new ArrayList(0);
	
		String excelHeadDataPattern = UserLoanInfoDefine.excelHeadDataPattern;
		String excelBodyDataDefine = UserLoanInfoDefine.excelBodyDataDefine;
		String sheetName = UserLoanInfoDefine.sheetName;
		int headRows = UserLoanInfoDefine.headRows;
		int headCols = UserLoanInfoDefine.headCols;   
		boolean bodySequenece = UserLoanInfoDefine.bodySequence;//表体是否显示序号
		
		//生成excel对象
		HSSFWorkbook excel = POIExcelUtil.createExcelTemplate(null,body,excelHeadDataPattern,null,excelBodyDataDefine,headRows,headCols,sheetName,bodySequenece);		
    	try {
    		excel.write(getOutputStreamOfDownload(UserLoanInfoDefine.fileName, request, response));
		} catch (IOException e) {
			e.printStackTrace();
		}
    
	}
	
	/**
	 * 分页查询列表
	 * @param keyword
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("/api/userInfos")
	public TableData UserInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		UserInfoQueryBean queryBean = new UserInfoQueryBean();
		queryBean.setKey(keyword);
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		List<UserInfoVo> userInfos = new ArrayList<UserInfoVo>();
		Page<UserInfo> userInfoPageData = userInfoService.userInfoPageData(queryBean, datapage);
		for(UserInfo userInfo:userInfoPageData) {
			UserInfoVo vo = new UserInfoVo();
			vo.setUserAccount(userInfo.getUserAccount());
			vo.setMobileRealNameTime(userInfo.getMobileRealNameTime());
			vo.setId(userInfo.getId());
			vo.setAlipayAccount(userInfo.getAlipayAccount());
			vo.setBankCard(userInfo.getBankCard());
			vo.setBankCardImage(userInfo.getBankCardImage());
			vo.setHuaBei(userInfo.getHuaBei());
			vo.setIdCard(userInfo.getIdCard());
			vo.setIdCardHand(userInfo.getIdCardHand());
			vo.setIdCardOtherSize(userInfo.getIdCardOtherSize());
			vo.setIdCardPositive(userInfo.getIdCardPositive());
			vo.setMobile(userInfo.getMobile());
			vo.setMobileServicePassword(userInfo.getMobileServicePassword());
			vo.setSex(userInfo.getSex());
			vo.setUserName(userInfo.getName());
			vo.setZhiMaFen(userInfo.getZhiMaFen());			
			vo.setZhiMaFenImage(userInfo.getZhiMaFenImage());
			vo.setHuaBeiImage(userInfo.getHuaBeiImage());
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
