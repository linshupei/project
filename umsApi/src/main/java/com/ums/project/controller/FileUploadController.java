package com.ums.project.controller;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ums.project.result.BaseResult;
import com.ums.project.util.Base64Utils;
import com.ums.project.vo.FileUploadResult;

/**
 * desc：文件上传
 * @author Administrator
 *
 */
@RestController
public class FileUploadController {

	 @Autowired
	 private Environment env;
	 
	@RequestMapping("/api/imageUpload")
	public BaseResult uploadImage(@RequestBody Map<String,Object> params) {
		String base64Data = (String) params.get("base64Data");
		String fileType = (String) params.get("fileType");
		 ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		 HttpServletRequest request = servletRequestAttributes.getRequest(); 
		 
		 String strDirPath = request.getSession().getServletContext().getRealPath(""); 
		 
		 String fileName =System.currentTimeMillis()+"."+fileType; 
		 File file = new File(strDirPath);
		 file = file.getParentFile();
		 strDirPath = file.getAbsolutePath();
		 strDirPath = strDirPath+File.separator+"upload"+File.separator+"image";
		  file = new File(strDirPath);
		  if(!file.exists()) {
			  file.mkdirs();
		  }
		 strDirPath = strDirPath+File.separator+fileName;
		 Base64Utils.Base64ToImage(base64Data, strDirPath);
		 
		 String imageUrl = env.getProperty("serverDomain")+"/upload/image/"+fileName;
		 FileUploadResult result = new FileUploadResult();
		 result.setCode("");
		 result.setReason("");
		 result.setTime(System.currentTimeMillis());
		 result.setImageUrl(imageUrl);
		 
		 return result;
		 
	}
}
