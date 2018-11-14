package com.ums.project.vo;

public class userEmergencyContactInfoVo {
	
	private String id;
	
	private String userId;
	
	private String name;
	
	private String mobile;
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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
		return "userEmergencyContactInfoVo [id=" + id + ", userId=" + userId + ", name=" + name + ", mobile=" + mobile
				+ "]";
	}

	
}
