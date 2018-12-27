package com.ums.project.controller;

import java.util.ArrayList;
import java.util.Date;
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
import com.ums.project.entity.AppUserCallRecord;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.memcaced.MemcachedConfiguration;
import com.ums.project.result.BaseResult;
import com.ums.project.result.BaseResultApi;
import com.ums.project.result.SmsRecordUploadResult;
import com.ums.project.service.AppUserCallRecordService;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.AppUserSmsRecordService;
import com.ums.project.util.DateUtil;

/**
 * desc：通话记录接口
 * @author Administrator
 *
 */
@RestController
public class CallRecordController {


	@Resource(name="appUserCallRecordService")
	private AppUserCallRecordService appUserCallRecordService;
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@Resource(name="memcachedConfiguration")
	private MemcachedConfiguration memcachedConfiguration;
	
	private static final Logger log = LoggerFactory.getLogger(CallRecordController.class);
	
	@RequestMapping("/api/callRecord")
	public SmsRecordUploadResult callRecord(@RequestBody CallRecordRequestData apiRequestCallRecord){
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(apiRequestCallRecord);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}	
		
		SmsRecordUploadResult result = new SmsRecordUploadResult();
		
		boolean tokenTimeOut = tokenTimeOut( request,apiRequestCallRecord.getHeader());
/*		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}	*/	
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(apiRequestCallRecord.getBody().getUserAccount());
		List<CallRecord> callRecords = apiRequestCallRecord.getBody().getCallRecords();
		List<AppUserCallRecord> saveDatas = new ArrayList<AppUserCallRecord>();
		if(callRecords!=null && callRecords.size()>0){
			for(CallRecord record:callRecords){
				AppUserCallRecord ausr = new AppUserCallRecord();
				ausr.setAppUserInfo(appUserInfo);
				ausr.setCalledPhone(record.getNumber());
				ausr.setCallName(record.getName());
				ausr.setCallPhone("");
				ausr.setCallTime(record.getTime());
				ausr.setCallTimeStr(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date(Long.parseLong(record.getTime()))));
				ausr.setCallTimes(record.getDuration());
				ausr.setType(record.getType());
				ausr.setUserAccount(apiRequestCallRecord.getBody().getUserAccount());
				saveDatas.add(ausr);
				if(saveDatas.size()%500==0){
					appUserCallRecordService.save(saveDatas);
					saveDatas=null;
					saveDatas = new ArrayList<AppUserCallRecord>();
				}
			}
			appUserCallRecordService.save(saveDatas);
			String time = callRecords.get(0).getTime();
			long currentTimeMillis = Long.parseLong(time);
			result.setTime(currentTimeMillis);
			appUserInfoService.updateCallRecordUploadTime(appUserInfo.getId(),currentTimeMillis);			
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

class CallRecordRequestData{
	
	private Header header;
	
	private CallRecords body;

	public CallRecordRequestData() {
		super();
	}

	public CallRecordRequestData(Header header, CallRecords body) {
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

	public CallRecords getBody() {
		return body;
	}

	public void setBody(CallRecords body) {
		this.body = body;
	}
	
	
}

class CallRecords{
	private String userAccount;
	
	private List<CallRecord> callRecords;

	public CallRecords() {
		super();
	}

	public CallRecords(String userAccount, List<CallRecord> callRecords) {
		super();
		this.userAccount = userAccount;
		this.callRecords = callRecords;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public List<CallRecord> getCallRecords() {
		return callRecords;
	}

	public void setCallRecords(List<CallRecord> callRecords) {
		this.callRecords = callRecords;
	}


	
}

class CallRecord{
	private String number;
	
	private String name;
	
	private String type;
	//呼叫时间（毫秒数）
	private String time;
	//时长
	private String duration;

	public CallRecord() {
		super();
	}

	public CallRecord(String number, String name, String type, String time, String duration) {
		super();
		this.number = number;
		this.name = name;
		this.type = type;
		this.time = time;
		this.duration = duration;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

}
