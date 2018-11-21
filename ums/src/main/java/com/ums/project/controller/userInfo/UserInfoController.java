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
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.UserInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.vo.UserInfoVo;
import com.ums.project.vo.UserLoanInfoVo;

@RestController
public class UserInfoController {
	
	@Resource(name="userInfoService")
	private UserInfoService userInfoService;
	
	@Resource(name="userLoanInfoService")
	private UserLoanInfoService userLoanInfoService;
	
	@RequestMapping("/api/exportLoanInfo")
	public void exportLoanInfo(){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = servletRequestAttributes.getResponse();
		HttpServletRequest request = servletRequestAttributes.getRequest();
		
		DataPage page = new DataPage();
		page.setLimit(Integer.MAX_VALUE);
		page.setPage(1);
		Page<UserLoanInfo> userInfoPageData = userLoanInfoService.userInfoPageData(new UserLoanInfoQueryBean(), page);
		
		
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

class ExportLoanInfo{
	private String id="";
	
	private String userAccount="";
	
	private String name="";
	
	private String mobile="";
	
	private String mobileServicePassword="";
	
	private String mobileRealNameTime="";
	
	private String idCard="";
	
	private String alipayAccount="";
	
	private String zhiMaFen="";
	
	private String huaBei="";
	
	private String bankCard="";
	
	//贷款额度
	private String loanLimit="";
	
	//放款额度
	private String makeLoansLimit="";
	
	//总分期数
	private String allInstalment="";
	
	//还款情况（0：申请中  1：申请拒绝  2：已放款   3：逾期未还  4：已还款）
	private String status="";
	
	//还款日期
	private String payDate="";
	
	//申请时间
	private String applyDate="";

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMobileServicePassword() {
		return mobileServicePassword;
	}

	public void setMobileServicePassword(String mobileServicePassword) {
		this.mobileServicePassword = mobileServicePassword;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getAlipayAccount() {
		return alipayAccount;
	}

	public void setAlipayAccount(String alipayAccount) {
		this.alipayAccount = alipayAccount;
	}

	public String getZhiMaFen() {
		return zhiMaFen;
	}

	public void setZhiMaFen(String zhiMaFen) {
		this.zhiMaFen = zhiMaFen;
	}

	public String getHuaBei() {
		return huaBei;
	}

	public void setHuaBei(String huabei) {
		this.huaBei = huabei;
	}

	public String getBankCard() {
		return bankCard;
	}

	public void setBankCard(String bankCard) {
		this.bankCard = bankCard;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLoanLimit() {
		return loanLimit;
	}

	public void setLoanLimit(String loanLimit) {
		this.loanLimit = loanLimit;
	}

	public String getAllInstalment() {
		return allInstalment;
	}

	public void setAllInstalment(String allInstalment) {
		this.allInstalment = allInstalment;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPayDate() {
		return payDate;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}

	public String getApplyDate() {
		return applyDate;
	}

	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}

	public String getMakeLoansLimit() {
		return makeLoansLimit;
	}

	public void setMakeLoansLimit(String makeLoansLimit) {
		this.makeLoansLimit = makeLoansLimit;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExportLoanInfo other = (ExportLoanInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ExportLoanInfo [id=" + id + ", userAccount=" + userAccount + ", name=" + name + ", mobile=" + mobile
				+ ", mobileServicePassword=" + mobileServicePassword + ", mobileRealNameTime=" + mobileRealNameTime
				+ ", idCard=" + idCard + ", alipayAccount=" + alipayAccount + ", zhiMaFen=" + zhiMaFen + ", huaBei="
				+ huaBei + ", bankCard=" + bankCard + ", loanLimit=" + loanLimit + ", makeLoansLimit=" + makeLoansLimit
				+ ", allInstalment=" + allInstalment + ", status=" + status + ", payDate=" + payDate + ", applyDate="
				+ applyDate + "]";
	}


	
	
}
