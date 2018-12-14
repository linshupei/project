package com.ums.project.excel.vo;

public class ExportAppUserContactInfo {
	
	private String id;
	
	private String appUserId;
	
	private String name;
	
	private String mobile;
	
	private String userAccount;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Override
	public String toString() {
		return "AppUserContactInfoVo [id=" + id + ", appUserId=" + appUserId + ", name=" + name + ", mobile=" + mobile
				+ ", userAccount=" + userAccount + "]";
	}


	
}
