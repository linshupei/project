package com.ums.project.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.memcaced.MemcachedConfiguration;
import com.ums.project.result.AppRegisterResult;
import com.ums.project.result.BaseResultApi;
import com.ums.project.result.LoginResult;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.util.DateUtil;
import com.ums.project.util.MD5Util;
import com.ums.project.util.UUIDGeneratorUtil;

/**
 * desc：APP用户注册、登录接口
 * @author Administrator
 *
 */
@Controller
@RestController
public class AppUserInfoController {

	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@Resource(name="userLoanInfoService")
	private UserLoanInfoService userLoanInfoService;
	
	@Resource(name="memcachedConfiguration")
	MemcachedConfiguration memcachedConfiguration;
	
	private static final Logger log = LoggerFactory.getLogger(AppUserInfoController.class);
	
	/**
	 * APP用户注册接口
	 * @return
	 */
	@RequestMapping("/api/appUser")
	public AppRegisterResult appUserRegister(@RequestBody LoginRequestData apiRequestDat) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(apiRequestDat);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}		
		
		String userAccount = apiRequestDat.getBody().getUserAccount();
		String password = apiRequestDat.getBody().getPassword();
		
		AppRegisterResult result = new AppRegisterResult();
		result.setTime(System.currentTimeMillis());
		AppUserInfo info = appUserInfoService.findByUserAccount(userAccount);
		if(info!=null) {//账号已存在
			result.setCode("1");
			result.setReason("手机号已存在，无法注册。");
		}else {
			String time = "0";
			info = new AppUserInfo();
			info.setAppUserCallRecords(null);
			info.setAppUserContactInfos(null);
			info.setAppUserSmsRecords(null);
			info.setId(null);
			info.setLoanNum("0");
			info.setLoginPassword(MD5Util.getMD5(password));
			info.setRegistedTime(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date()));
			info.setUserAccount(userAccount);
			info.setUserInfos(null);
			info.setUserName(userAccount);
			info.setCallUploadTime(time);
			info.setContactUploadTime(time);
			info.setSmsUploadTime(time);
			appUserInfoService.save(info);
			
			result.setCode("0");
			result.setReason("");
		}
		
		return result;
	}
	
	
	/**
	 * APP用户登录接口
	 * @return
	 */
	@RequestMapping("/api/appUser/login")
	public LoginResult appUserLogin(@RequestBody LoginRequestData apiRequestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(apiRequestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}	
		
		LoginResult result = new LoginResult();
		result.setTime(System.currentTimeMillis());
		AppUserInfo info = appUserInfoService.findByUserAccountAndPassword(apiRequestData.getBody().getUserAccount(),apiRequestData.getBody().getPassword());
		if(info==null) {//账号或密码错误
			result.setCode("1");
			result.setReason("账号或密码错误");
		}else {
			result.setCode("0");
			result.setReason("");
			
			UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(apiRequestData.getBody().getUserAccount());
			if(info!=null){
				result.setCallUploadTime(info.getCallUploadTime());
				result.setContactUploadTime(info.getContactUploadTime());
				result.setSmsUploadTime(info.getSmsUploadTime());			
			}			
			if(loanInfo!=null) {
				result.setLoanLimit(loanInfo.getLoanLimit());
				result.setLoanStatus(loanInfo.getStatus());
				result.setPayDate(loanInfo.getPayDate());
				result.setUserStatus("1");		
				result.setLoanInfoId(loanInfo.getId());
				result.setApplyId("-1".equals(loanInfo.getStatus())?loanInfo.getId():"");
			}
			
			UserLoanInfo findRecentSuccessLoanInfo = userLoanInfoService.findRecentSuccessLoanInfo(apiRequestData.getBody().getUserAccount());
			if(findRecentSuccessLoanInfo!=null){
				result.setInputFlag("0");
			}
				result.setToken(UUIDGeneratorUtil.generateUUID());
				memcachedConfiguration.add(result.getToken(), info);
/*				
			 ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
			 HttpServletRequest request = servletRequestAttributes.getRequest(); 
			 request.getSession().setMaxInactiveInterval(1800);
			 request.getSession().setAttribute(result.getToken(), info);*/
		}
		
		return result;
	}	
	

	/**
	 * 查询信息
	 * @return
	 */
	@RequestMapping("/api/appUser/query")
	public LoginResult queryAppUserInfo(@RequestBody LoginRequestData apiRequestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(apiRequestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}	
		
		LoginResult result = new LoginResult();
		result.setTime(System.currentTimeMillis());
		
		boolean tokenTimeOut = tokenTimeOut( request,apiRequestData.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}
		
		AppUserInfo info = appUserInfoService.findByUserAccount(apiRequestData.getBody().getUserAccount());
		UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(apiRequestData.getBody().getUserAccount());
		if(info!=null){
			result.setCallUploadTime(info.getCallUploadTime());
			result.setContactUploadTime(info.getContactUploadTime());
			result.setSmsUploadTime(info.getSmsUploadTime());			
		}
		if(loanInfo!=null) {
			result.setLoanLimit(loanInfo.getLoanLimit());
			result.setLoanStatus(loanInfo.getStatus());
			result.setPayDate(loanInfo.getPayDate());
			result.setLoanInfoId(loanInfo.getId());
			result.setUserStatus("1");			
			result.setApplyId("-1".equals(loanInfo.getStatus())?loanInfo.getId():"");
		}
		UserLoanInfo findRecentSuccessLoanInfo = userLoanInfoService.findRecentSuccessLoanInfo(apiRequestData.getBody().getUserAccount());
		if(findRecentSuccessLoanInfo!=null){
			result.setInputFlag("0");
		}
		result.setCode("0");
		result.setReason("");
		return result;
	}		

	private boolean tokenTimeOut(HttpServletRequest request, Header header) {
		Object tokenInfo = memcachedConfiguration.get(header.getToken());
		//Object tokenInfo = request.getSession().getAttribute(header.getToken());
		if(tokenInfo==null) {
			return true;
		}
		return false;
	}
}

class LoginBody {

	private String userAccount;
	
	private String password;
	
	

	public LoginBody() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LoginBody(String userAccount, String password) {
		super();
		this.userAccount = userAccount;
		this.password = password;
	}
	
	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	

}

class LoginRequestData {
	private Header header;
	
	private LoginBody body;

	
	public LoginRequestData(Header header, LoginBody body) {
		super();
		this.header = header;
		this.body = body;
	}

	public LoginRequestData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public LoginBody getBody() {
		return body;
	}

	public void setBody(LoginBody body) {
		this.body = body;
	}
	
}