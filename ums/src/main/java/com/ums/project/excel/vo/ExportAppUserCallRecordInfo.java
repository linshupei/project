package com.ums.project.excel.vo;

public class ExportAppUserCallRecordInfo {
	
	private String id;
	
	private String appUserId;
	
	private String callName;
	
	private String callPhone;
	
	private String calledPhone;
	
	private String callTime;
	
	private String userAccount;
	
	//1：呼入  2：呼出 3：未接 
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

	public String getCallTime() {
		return callTime;
	}

	public void setCallTime(String callTime) {
		this.callTime = callTime;
	}

	@Override
	public String toString() {
		return "AppUserCallRecordInfoVo [id=" + id + ", appUserId=" + appUserId + ", callName=" + callName
				+ ", callPhone=" + callPhone + ", calledPhone=" + calledPhone + ", callTime=" + callTime
				+ ", userAccount=" + userAccount + "]";
	}

}
