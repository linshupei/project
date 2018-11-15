package com.ums.project.interceptor;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ums.project.result.TableData;

public class UmsInterceptor extends HandlerInterceptorAdapter{
	
	private static String[] IGNORE_URI = {"/api/login","/api/loginOutTime"};
	
	public UmsInterceptor() {
	}
			
	@Override
	 public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
				
		        String url = request.getRequestURL().toString();
	        	Object userAccount = request.getSession().getAttribute("session_user");  
		        //登录超时，未指定的接口都返回空数据
		        if(url.contains("/api/")){
					for (String s : IGNORE_URI) {
			            if (url.contains(s)) {
			            	  return super.preHandle(request, response, handler);
			            }
			        }
		            if (null == userAccount) {
		            	//超时
		        		ObjectMapper mapper = new ObjectMapper();
			    		TableData td = new TableData();
			    		td.setCode("0");
			    		td.setCount(0L);
			    		td.setMsg("");
			    		td.setData(new ArrayList(0));
			    		response.getWriter().write(mapper.writeValueAsString(td));
		            	return false;
		            }				
		        }else if(url.contains(".html") && !url.contains("login.html")){
		        	if(userAccount!=null){
		        		Object sessionTimeObj = request.getSession().getAttribute(userAccount.toString());
		        		Long sessionTime = Long.parseLong(sessionTimeObj.toString());
		        		if(System.currentTimeMillis()-sessionTime<=900000){
		        			request.getSession().setAttribute(userAccount.toString(),sessionTime+900000);			
		        		}else{
		        			return false;
		        		}
		        	}else{
		        		return false;
		        	}
		        }
		        return super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}

	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		super.afterConcurrentHandlingStarted(request, response, handler);
	}

	
}
