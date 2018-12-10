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
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.excel.POIExcelUtil;
import com.ums.project.excel.template.UserLoanInfoDefine;
import com.ums.project.excel.vo.ExportLoanInfo;
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.result.BaseResult;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.SystemMsgInfoService;
import com.ums.project.service.UserEmergencyContactService;
import com.ums.project.service.UserInfoService;
import com.ums.project.service.UserLiabilitiesInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.service.UserWorkUnitInfoService;
import com.ums.project.vo.UserInfoVo;
import com.ums.project.vo.UserLoanInfoVo;

@RestController
public class UserInfoController {
	
	@Resource(name="userInfoService")
	private UserInfoService userInfoService;
	
	@Resource(name="userLoanInfoService")
	private UserLoanInfoService userLoanInfoService;
	
	@Resource(name="userWorkUnitInfoService")
	private UserWorkUnitInfoService userWorkUnitInfoService;
	
	@Resource(name="userEmergencyContactService")
	private UserEmergencyContactService userEmergencyContactService;
	
	@Resource(name="userLiabilitiesInfoService")
	private UserLiabilitiesInfoService userLiabilitiesInfoService;
	
	@Resource(name="systemMsgInfoService")
	private SystemMsgInfoService systemMsgInfoService;
	 
	@RequestMapping("/api/deleteUserInfo")
	public BaseResult deleteUserInfo(@RequestBody UserInfoQueryBean bean){
		
		BaseResult result = new BaseResult();
		result.setCode("0");
		result.setTime(System.currentTimeMillis());
		result.setReason("ok");
		UserInfo userInfo= userInfoService.getById(bean.getId());
		UserLoanInfo userLoanInfo = userLoanInfoService.findbyUserInfo(userInfo.getId());
		if(!"1".equals(userLoanInfo.getStatus())
				&&!"4".equals(userLoanInfo.getStatus())){//存在未完成贷款
			result.setCode("1");
			result.setReason("存在未完成贷款信息，无法删除。");
		}else{
			userInfoService.removeById(bean.getId());
			userLoanInfoService.deleteByUserInfo(userInfo.getId());
			userWorkUnitInfoService.deleteByUserInfo(userInfo.getId());
			userEmergencyContactService.deleteByUserInfo(userInfo.getId());
			userLiabilitiesInfoService.deleteByUserInfo(userInfo.getId());
			systemMsgInfoService.deleteByUserLoanInfoId(userLoanInfo.getId());
		}
		return result;
	}
	
	
	/**
	 * 数据导出
	 * @param loanStatus
	 * @param keyword
	 */
	@RequestMapping("/api/exportLoanInfo")
	public void exportLoanInfo(@RequestParam(required=false) String loanStatus,@RequestParam(required=false) String keyword){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = servletRequestAttributes.getResponse();
		HttpServletRequest request = servletRequestAttributes.getRequest();
		
		UserLoanInfoQueryBean queryBean = new UserLoanInfoQueryBean();
		queryBean.setKey(keyword);
		queryBean.setLoanStatus(loanStatus);
		DataPage page = new DataPage();
		page.setLimit(Integer.MAX_VALUE);
		page.setPage(1);
		Page<UserLoanInfo> userInfoPageData = userLoanInfoService.userInfoPageData(queryBean, page);
		
		
		 List<ExportLoanInfo> body = new ArrayList<ExportLoanInfo>(0);
		 for(UserLoanInfo loanInfo:userInfoPageData.getContent()) {
			 ExportLoanInfo excelData = new ExportLoanInfo();
			 excelData.setAlipayAccount(loanInfo.getUserInfo().getAlipayAccount());
			 excelData.setAllInstalment(loanInfo.getAllInstalment());
			 excelData.setApplyDate(loanInfo.getApplyTime());
			 excelData.setBankCard(loanInfo.getUserInfo().getBankCard());
			 excelData.setHuaBei(loanInfo.getUserInfo().getHuaBei());
			 excelData.setId(loanInfo.getId());
			 excelData.setIdCard(loanInfo.getUserInfo().getIdCard());
			 excelData.setLoanLimit(loanInfo.getLoanLimit());
			 excelData.setMakeLoansLimit(loanInfo.getMakeLoansLimit());
			 excelData.setMobile(loanInfo.getUserInfo().getMobile());
			 excelData.setMobileServicePassword(loanInfo.getUserInfo().getMobileServicePassword());
			 excelData.setPayDate(loanInfo.getPayDate());
			 excelData.setMobileRealNameTime(loanInfo.getUserInfo().getMobileRealNameTime());
			 excelData.setUserAccount(loanInfo.getUserInfo().getUserAccount());
			 excelData.setName(loanInfo.getUserInfo().getName());
			// 0：申请中  1：申请拒绝  2：已放款   3：逾期未还  4：已还款
			 if("0".equals(loanInfo.getStatus())) {
				 excelData.setStatus("申请中");
			 }else if("1".equals(loanInfo.getStatus())) {
				 excelData.setStatus("申请拒绝");
			 }else if("2".equals(loanInfo.getStatus())) {
				 excelData.setStatus("已放款");
			 }else if("3".equals(loanInfo.getStatus())) {
				 excelData.setStatus("逾期未还");
			 }else if("4".equals(loanInfo.getStatus())) {
				 excelData.setStatus("已还款");
			 }else if("5".equals(loanInfo.getStatus())) {
				 excelData.setStatus("申请还款");
			 }
			 
			 excelData.setZhiMaFen(loanInfo.getUserInfo().getZhiMaFen());
			 
			 body.add(excelData);
		 }
	
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
	public TableData UserInfoPageData(@RequestParam(required=false) String loanStatus,@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		UserInfoQueryBean queryBean = new UserInfoQueryBean();
		queryBean.setLoanStatus(loanStatus);
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

