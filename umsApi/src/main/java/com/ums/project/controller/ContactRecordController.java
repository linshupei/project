package com.ums.project.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ums.project.entity.AppUserCallRecord;
import com.ums.project.entity.AppUserContactInfo;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.memcaced.MemcachedConfiguration;
import com.ums.project.result.BaseResult;
import com.ums.project.result.BaseResultApi;
import com.ums.project.result.ContactRecordResult;
import com.ums.project.result.SmsRecordUploadResult;
import com.ums.project.service.AppUserCallRecordService;
import com.ums.project.service.AppUserContactInfoService;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.AppUserSmsRecordService;
import com.ums.project.util.DateUtil;

/**
 * desc：联系人接口
 * @author Administrator
 *
 */
@RestController
public class ContactRecordController {


	@Resource(name="appUserContactInfoService")
	private AppUserContactInfoService appUserContactInfoService;
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@Resource(name="memcachedConfiguration")
	MemcachedConfiguration memcachedConfiguration;
	
	@RequestMapping("/api/contactInfo")
	public ContactRecordResult callRecord(@RequestBody ContactRecordRequestData apiRequestContactRecord){
		ContactRecordResult result = new ContactRecordResult();
		result.setTime(System.currentTimeMillis());
		
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 
		boolean tokenTimeOut = tokenTimeOut( request,apiRequestContactRecord.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}		
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(apiRequestContactRecord.getBody().getUserAccount());
		List<ContactRecord> contactRecords = apiRequestContactRecord.getBody().getContactInfos();
		List<AppUserContactInfo> saveDatas = new ArrayList<AppUserContactInfo>();
		
		for(ContactRecord record:contactRecords){
			AppUserContactInfo ausr = new AppUserContactInfo();
			ausr.setAppUserInfo(appUserInfo);
			ausr.setName(record.getName());
			ausr.setMobile(record.getPhoneNum());
			ausr.setTime(record.getTime());
			ausr.setTimeStr(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date(Long.parseLong(record.getTime()))));
			ausr.setUserAccount(apiRequestContactRecord.getBody().getUserAccount());
			saveDatas.add(ausr);
		}
		long currentTimeMillis = System.currentTimeMillis();
		appUserContactInfoService.save(saveDatas);
		appUserInfoService.updateCallRecordUploadTime(appUserInfo.getId(),currentTimeMillis);
		
		result.setTime(currentTimeMillis);
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

class ContactRecordRequestData{
	
	private Header header;
	
	private ContactRecords body;

	public ContactRecordRequestData() {
		super();
	}

	public ContactRecordRequestData(Header header, ContactRecords body) {
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

	public ContactRecords getBody() {
		return body;
	}

	public void setBody(ContactRecords body) {
		this.body = body;
	}
	
	
}

class ContactRecords{
	private String userAccount;
	
	private List<ContactRecord> contactInfos;

	public ContactRecords() {
		super();
	}

	public ContactRecords(String userAccount, List<ContactRecord> contactRecords) {
		super();
		this.userAccount = userAccount;
		this.contactInfos = contactRecords;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public List<ContactRecord> getContactInfos() {
		return contactInfos;
	}

	public void setContactInfos(List<ContactRecord> contactInfos) {
		this.contactInfos = contactInfos;
	}

}

class ContactRecord{
	private String name;
	
	private String phoneNum;
	
	private String time;

	public ContactRecord() {
		super();
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}


	public ContactRecord(String name, String phoneNum, String time) {
		super();
		this.name = name;
		this.phoneNum = phoneNum;
		this.time = time;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}


}
