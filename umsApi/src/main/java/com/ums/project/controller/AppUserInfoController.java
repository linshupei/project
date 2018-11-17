package com.ums.project.controller;

import java.util.Date;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.result.BaseResult;
import com.ums.project.result.LoginResult;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.util.DateUtil;
import com.ums.project.util.UUIDGeneratorUtil;

/**
 * desc：APP用户注册、登录接口
 * @author Administrator
 *
 */
@RestController
public class AppUserInfoController {

	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@Resource(name="userLoanInfoService")
	private UserLoanInfoService userLoanInfoService;
	
	/**
	 * APP用户注册接口
	 * @return
	 */
	@RequestMapping("/api/appUser")
	public BaseResult appUserRegister(@RequestBody String userAccount,@RequestBody String password) {
		BaseResult result = new BaseResult();
		result.setTime(System.currentTimeMillis());
		AppUserInfo info = appUserInfoService.findByUserAccount(userAccount);
		if(info!=null) {//账号已存在
			result.setCode("1");
			result.setReason("手机号已存在，无法注册。");
		}else {
			info = new AppUserInfo();
			info.setAppUserCallRecords(null);
			info.setAppUserContactInfos(null);
			info.setAppUserSmsRecords(null);
			info.setId(null);
			info.setLoanNum("0");
			info.setLoginPassword(password);
			info.setRegistedTime(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date()));
			info.setUserAccount(userAccount);
			info.setUserInfos(null);
			info.setUserName(userAccount);
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
	public LoginResult appUserLogin(@RequestBody String userAccount,@RequestBody String password) {
		LoginResult result = new LoginResult();
		result.setTime(System.currentTimeMillis());
		AppUserInfo info = appUserInfoService.findByUserAccount(userAccount);
		if(info==null) {//账号或密码错误
			result.setCode("1");
			result.setReason("账号或密码错误");
		}else {
			result.setCode("0");
			result.setReason("");
			
			UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(userAccount);
			if(loanInfo!=null) {
				result.setLoanLimit(loanInfo.getLoanLimit());
				result.setLoanStatus(loanInfo.getStatus());
				result.setPayDate(loanInfo.getPayDate());
				result.setToken(UUIDGeneratorUtil.generateUUID());
				result.setUserStatus("1");				
			}

		}
		
		return result;
	}	
}
