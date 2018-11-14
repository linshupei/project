package com.ums.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.result.LoginResult;
import com.ums.project.result.ResultCode;

@RestController
public class LoginController {
	
	@RequestMapping("/api/login")
	public LoginResult ResultData(String userName, String password) {
		LoginResult result = new LoginResult();
		result.setTime(System.currentTimeMillis());
		result.setReason("");
		result.setTicket("");
		if("linsp".equals(userName) && "linsp".equals(password)) {
			result.setCode(ResultCode.SUCCESS);
			result.setReason("");
			result.setTicket(""+System.currentTimeMillis());
			result.setTime(System.currentTimeMillis());
		}else{
			result.setCode(ResultCode.FAIL);
			result.setReason("账号或密码错误");			
		}
		return result;
	}

}
