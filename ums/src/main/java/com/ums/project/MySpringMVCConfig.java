package com.ums.project;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ums.project.interceptor.UmsInterceptor;

@Configuration
public class MySpringMVCConfig implements WebMvcConfigurer  {

	public MySpringMVCConfig() {
	}

	 @Override
	  public void addInterceptors(InterceptorRegistry registry) {
	        registry.addInterceptor(new UmsInterceptor());
	  }	
}
