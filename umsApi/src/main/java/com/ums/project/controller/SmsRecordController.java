package com.ums.project.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.result.BaseResult;
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
	
	
	@RequestMapping("/umsApi/api/smsRecord")
	public BaseResult smsRecord(@RequestBody SmsRecordRequestData apiRequestsmsRecord){
		SmsRecordUploadResult result = new SmsRecordUploadResult();
		result.setTime(System.currentTimeMillis());
		
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 
		boolean tokenTimeOut = tokenTimeOut( request,apiRequestsmsRecord.getHeader());
		if(tokenTimeOut) {
			result.setCode("003");
			result.setReason("token过期");
			return result;
		}		
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(apiRequestsmsRecord.getBody().getUserAccount());
		List<SmsRecordData> smsRecords = apiRequestsmsRecord.getBody().getSmsRecords();
		List<AppUserSmsRecord> saveDatas = new ArrayList<AppUserSmsRecord>();
		
		for(SmsRecordData record:smsRecords){
			AppUserSmsRecord ausr = new AppUserSmsRecord();
			ausr.setAppUserInfo(appUserInfo);
			ausr.setSendPhone(record.getSendPhone());
			ausr.setSendTime(DateUtil.parseDate("yyyy-MM-dd HH:mm:ss", record.getSendPhone()));
			ausr.setSendTimeFormat(record.getSendTime());
			ausr.setSmsContent(record.getSmsCcontent());
			ausr.setUserAccount(apiRequestsmsRecord.getBody().getUserAccount());
			saveDatas.add(ausr);
		}
		long currentTimeMillis = System.currentTimeMillis();
		appUserSmsRecordService.save(saveDatas);
		appUserInfoService.updateSmsRecordUploadTime(appUserInfo.getId(),currentTimeMillis);
		
		result.setTime(currentTimeMillis);
		result.setCode("0");
		result.setReason("");
		
		return result;
	}
	
	private boolean tokenTimeOut(HttpServletRequest request, Header header) {
		Object tokenInfo = request.getSession().getAttribute(header.getToken());
		if(tokenInfo==null) {
			return false;
		}
		return true;
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
	private String sendPhone;
	
	private String receivePhone;
	
	private String smsCcontent;
	
	private String sendTime;

	public SmsRecordData() {
		super();
	}

	public SmsRecordData(String sendPhone, String receivePhone, String smsCcontent, String sendTime) {
		super();
		this.sendPhone = sendPhone;
		this.receivePhone = receivePhone;
		this.smsCcontent = smsCcontent;
		this.sendTime = sendTime;
	}

	public String getSendPhone() {
		return sendPhone;
	}

	public void setSendPhone(String sendPhone) {
		this.sendPhone = sendPhone;
	}

	public String getReceivePhone() {
		return receivePhone;
	}

	public void setReceivePhone(String receivePhone) {
		this.receivePhone = receivePhone;
	}

	public String getSmsCcontent() {
		return smsCcontent;
	}

	public void setSmsCcontent(String smsCcontent) {
		this.smsCcontent = smsCcontent;
	}

	public String getSendTime() {
		return sendTime;
	}

	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}
	
	
}