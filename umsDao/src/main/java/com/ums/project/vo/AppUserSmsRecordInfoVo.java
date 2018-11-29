package com.ums.project.vo;

public class AppUserSmsRecordInfoVo {
	
	private String id;
	
	private String appUserId;
	
	private String smsContent;
	
	private String sendTime;
	
	private String userAccount;
	
	//发送手机号
	private String sendPhone;
	
	  //1：收到 2：发送
    private String type;
    
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getAppUserId() {
		return appUserId;
	}

	public void setAppUserId(String appUserId) {
		this.appUserId = appUserId;
	}

	public String getSmsContent() {
		return smsContent;
	}

	public void setSmsContent(String smsContent) {
		this.smsContent = smsContent;
	}

	public String getSendTime() {
		return sendTime;
	}

	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}

	public String getSendPhone() {
		return sendPhone;
	}

	public void setSendPhone(String sendPhone) {
		this.sendPhone = sendPhone;
	}

	@Override
	public String toString() {
		return "AppUserSmsRecordInfoVo [id=" + id + ", appUserId=" + appUserId + ", smsContent=" + smsContent
				+ ", sendTime=" + sendTime + ", userAccount=" + userAccount + ", sendPhone=" + sendPhone + "]";
	}




	
}
