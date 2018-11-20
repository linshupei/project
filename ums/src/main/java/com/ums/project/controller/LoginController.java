package com.ums.project.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ums.project.entity.AdminUser;
import com.ums.project.result.BaseResult;
import com.ums.project.result.LoginResult;
import com.ums.project.result.ResultCode;
import com.ums.project.service.AdminUserService;

@RestController
public class LoginController {
	
	@Resource(name="adminUserService")
	private AdminUserService adminUserService;
	
	
	@RequestMapping("/api/loginOut")	
	public void loginOut(){
		 ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		 HttpServletRequest request = servletRequestAttributes.getRequest(); 
		 HttpServletResponse response = servletRequestAttributes.getResponse();
		 Object attribute = request.getSession().getAttribute("session_user");
		request.getSession().setAttribute("session_user",null);
		request.getSession().setAttribute(attribute==null?"":attribute.toString(),null);
		
		try {
			response.sendRedirect("/html/login.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
		 
	}
	
	@RequestMapping("/api/loginOutTime")
	public BaseResult loginOutTime(){
		 ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		 HttpServletRequest request = servletRequestAttributes.getRequest(); 
		 
		 BaseResult result = new BaseResult();
		 result.setCode("0");
		 result.setReason("");
		 result.setTime(System.currentTimeMillis());
		 
		 Object attribute = request.getSession().getAttribute("session_user");
		 if(attribute==null){
			 result.setCode("1");
			 result.setReason("登录超时");		
			 return result;
		 }
		Object timeStrs = request.getSession().getAttribute(attribute.toString());		 
		if(timeStrs==null){
			 result.setCode("1");
			 result.setReason("登录超时");		
			 return result;			
		}
		
		Long times = Long.parseLong(timeStrs.toString());
		if(System.currentTimeMillis()-times>900000){
			//15分钟超时
			 result.setCode("1");
			 result.setReason("登录超时");		
			 return result;				
		}
		
		return result;
	}
	@RequestMapping("/api/login")
	public LoginResult ResultData(String userName, String password) {
		 ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		 HttpServletRequest request = servletRequestAttributes.getRequest(); 
		 
		LoginResult result = new LoginResult();
		result.setTime(System.currentTimeMillis());
		result.setReason("");
		result.setToken("");
		
		 AdminUser user = adminUserService.findAccountAndPassword(userName, password);
		 if(user==null){
				result.setCode(ResultCode.FAIL);
				result.setReason("账号或密码错误");				 
		 }else{
				result.setCode(ResultCode.SUCCESS);
				result.setReason("");
				result.setToken(""+System.currentTimeMillis());
				result.setTime(System.currentTimeMillis());
				
				request.getSession().setAttribute("session_user",user.getAccount());
				request.getSession().setAttribute(user.getAccount(),System.currentTimeMillis());
				request.getSession().setMaxInactiveInterval(1800);			 
		 }

		return result;
	}

}
