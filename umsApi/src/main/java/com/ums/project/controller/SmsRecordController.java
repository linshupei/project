package com.ums.project.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.memcaced.MemcachedConfiguration;
import com.ums.project.result.BaseResult;
import com.ums.project.result.BaseResultApi;
import com.ums.project.result.SmsRecordUploadResult;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.AppUserSmsRecordService;
import com.ums.project.util.DateUtil;

/**
 * desc：短信记录接口
 * @author Administrator
 *
 */
@RestController
public class SmsRecordController {
 

	@Resource(name="appUserSmsRecordService")
	private AppUserSmsRecordService appUserSmsRecordService;
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@Resource(name="memcachedConfiguration")
	private MemcachedConfiguration memcachedConfiguration;
	
	private static final Logger log = LoggerFactory.getLogger(SmsRecordController.class);	
	
	
	@RequestMapping("/api/smsRecord")
	public SmsRecordUploadResult smsRecord(@RequestBody SmsRecordRequestData apiRequestsmsRecord){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try { 
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(apiRequestsmsRecord);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}		
		
		SmsRecordUploadResult result = new SmsRecordUploadResult();
		result.setTime(0);
		
		boolean tokenTimeOut = tokenTimeOut( request,apiRequestsmsRecord.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}		
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(apiRequestsmsRecord.getBody().getUserAccount());
		List<SmsRecordData> smsRecords = apiRequestsmsRecord.getBody().getSmsRecords();
		List<AppUserSmsRecord> saveDatas = new ArrayList<AppUserSmsRecord>();
		if(smsRecords!=null && smsRecords.size()>0){
			
			for(SmsRecordData record:smsRecords){
				AppUserSmsRecord ausr = new AppUserSmsRecord();
				ausr.setAppUserInfo(appUserInfo);
				ausr.setName(record.getPerson());
				ausr.setSendPhone(record.getNumber());
				ausr.setSendTime(Long.parseLong(record.getTime()));
				ausr.setSendTimeFormat(record.getTimeFormat());
				ausr.setSmsContent(record.getMessage());
				ausr.setType(record.getType());
				ausr.setUserAccount(apiRequestsmsRecord.getBody().getUserAccount());
				saveDatas.add(ausr);
				
				if(saveDatas.size()%500==0){
					appUserSmsRecordService.save(saveDatas);
					saveDatas=null;
					saveDatas = new ArrayList<AppUserSmsRecord>();
				}				
			}
			appUserSmsRecordService.save(saveDatas);
			SmsRecordData smsRecordData = smsRecords.get(0);
			String time = smsRecordData.getTime();
			long currentTimeMillis = Long.parseLong(time);
			appUserInfoService.updateSmsRecordUploadTime(appUserInfo.getId(),currentTimeMillis);		
			result.setTime(currentTimeMillis);
		}else{
			result.setTime(0);
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

class SmsRecordRequestData{
	
	private Header header;
	
	private SmsRecords body;

	public SmsRecordRequestData() {
		super();
	}

	public SmsRecordRequestData(Header header, SmsRecords body) {
		super();
		this.header = header;
		this.body = body;
	}

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public SmsRecords getBody() {
		return body;
	}

	public void setBody(SmsRecords body) {
		this.body = body;
	}
	
	
}

class SmsRecords{
	private String userAccount;
	
	private List<SmsRecordData> smsRecords;

	public SmsRecords() {
		super();
	}

	public SmsRecords(String userAccount, List<SmsRecordData> smsRecords) {
		super();
		this.userAccount = userAccount;
		this.smsRecords = smsRecords;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public List<SmsRecordData> getSmsRecords() {
		return smsRecords;
	}

	public void setSmsRecords(List<SmsRecordData> smsRecords) {
		this.smsRecords = smsRecords;
	}
	
	
}

class SmsRecordData{
	private String number;
	
	private String person;
	
	private String time;
	
	private String timeFormat;
	
	private String type;
	
	private String message;
	

	public SmsRecordData() {
		super();
	}


	public SmsRecordData(String number, String person, String time, String timeFormat, String type, String message) {
		super();
		this.number = number;
		this.person = person;
		this.time = time;
		this.timeFormat = timeFormat;
		this.type = type;
		this.message = message;
	}


	public String getNumber() {
		return number;
	}


	public void setNumber(String number) {
		this.number = number;
	}


	public String getPerson() {
		return person;
	}


	public void setPerson(String person) {
		this.person = person;
	}


	public String getTime() {
		return time;
	}


	public void setTime(String time) {
		this.time = time;
	}


	public String getTimeFormat() {
		return timeFormat;
	}


	public void setTimeFormat(String timeFormat) {
		this.timeFormat = timeFormat;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


}
