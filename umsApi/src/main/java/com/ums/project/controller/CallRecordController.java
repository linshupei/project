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

import com.ums.project.entity.AppUserCallRecord;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.result.BaseResult;
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
	
	
	@RequestMapping("/umsApi/api/callRecord")
	public BaseResult callRecord(@RequestBody CallRecordRequestData apiRequestCallRecord){
		SmsRecordUploadResult result = new SmsRecordUploadResult();
		result.setTime(System.currentTimeMillis());
		
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 
		boolean tokenTimeOut = tokenTimeOut( request,apiRequestCallRecord.getHeader());
		if(tokenTimeOut) {
			result.setCode("003");
			result.setReason("token过期");
			return result;
		}		
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(apiRequestCallRecord.getBody().getUserAccount());
		List<CallRecord> callRecords = apiRequestCallRecord.getBody().getCallRecords();
		List<AppUserCallRecord> saveDatas = new ArrayList<AppUserCallRecord>();
		
		for(CallRecord record:callRecords){
			AppUserCallRecord ausr = new AppUserCallRecord();
			ausr.setAppUserInfo(appUserInfo);
			ausr.setCalledPhone(record.getCalledPhone());
			ausr.setCallName(record.getCallName());
			ausr.setCallPhone(record.getCallPhone());
			ausr.setCallTime(record.getCallTime());
			ausr.setCallTimes(record.getCallTimes());
			ausr.setUserAccount(apiRequestCallRecord.getBody().getUserAccount());
			saveDatas.add(ausr);
		}
		long currentTimeMillis = System.currentTimeMillis();
		appUserCallRecordService.save(saveDatas);
		appUserInfoService.updateCallRecordUploadTime(appUserInfo.getId(),currentTimeMillis);
		
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
	private String callName;
	
	private String callPhone;
	
	private String calledPhone;
	
	private String callTimes;
	
	private String callTime;

	public CallRecord() {
		super();
	}

	public CallRecord(String callName, String callPhone, String calledPhone, String callTimes, String callTime) {
		super();
		this.callName = callName;
		this.callPhone = callPhone;
		this.calledPhone = calledPhone;
		this.callTimes = callTimes;
		this.callTime = callTime;
	}

	public String getCallName() {
		return callName;
	}

	public void setCallName(String callName) {
		this.callName = callName;
	}

	public String getCallPhone() {
		return callPhone;
	}

	public void setCallPhone(String callPhone) {
		this.callPhone = callPhone;
	}

	public String getCalledPhone() {
		return calledPhone;
	}

	public void setCalledPhone(String calledPhone) {
		this.calledPhone = calledPhone;
	}

	public String getCallTimes() {
		return callTimes;
	}

	public void setCallTimes(String callTimes) {
		this.callTimes = callTimes;
	}

	public String getCallTime() {
		return callTime;
	}

	public void setCallTime(String callTime) {
		this.callTime = callTime;
	}

}
