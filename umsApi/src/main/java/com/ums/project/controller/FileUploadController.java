package com.ums.project.controller;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

	@RequestMapping("/api/imageUpload")
	public BaseResult uploadImage(@RequestBody Map<String,Object> params) {
		String base64Data = (String) params.get("base64Data");
		 ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		 HttpServletRequest request = servletRequestAttributes.getRequest(); 
		 
		 String strDirPath = request.getSession().getServletContext().getRealPath("/"); 
		 
		 strDirPath = strDirPath.substring(0, strDirPath.lastIndexOf(File.separator));
		 
		 String fileName =System.currentTimeMillis()+".jpg"; 
		 strDirPath = strDirPath+File.separator+"upload"+File.separator+"image"+fileName;
		 //strDirPath = "G:\\"+fileName;
		 Base64Utils.Base64ToImage(base64Data, strDirPath);
		 
		 String imageUrl = "http://127.0.0.1:8080/upload/image/"+fileName;
		 FileUploadResult result = new FileUploadResult();
		 result.setCode("");
		 result.setReason("");
		 result.setTime(System.currentTimeMillis());
		 result.setImageUrl(imageUrl);
		 
		 return result;
		 
	}
}
