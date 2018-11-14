package com.ums.project.vo;

public class useWorkUnitInfoVo {
	
	private String id;
	
	private String workUnitName;
	
	private String workUnitPhone;
	
	private String workUnitAddress;
	
	private String userId;

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

	public String getWorkUnitName() {
		return workUnitName;
	}

	public void setWorkUnitName(String workUnitName) {
		this.workUnitName = workUnitName;
	}

	public String getWorkUnitPhone() {
		return workUnitPhone;
	}

	public void setWorkUnitPhone(String workUnitPhone) {
		this.workUnitPhone = workUnitPhone;
	}

	public String getWorkUnitAddress() {
		return workUnitAddress;
	}

	public void setWorkUnitAddress(String workUnitAddress) {
		this.workUnitAddress = workUnitAddress;
	}

	@Override
	public String toString() {
		return "useWorkUnitInfoVo [id=" + id + ", workUnitName=" + workUnitName + ", workUnitPhone=" + workUnitPhone
				+ ", workUnitAddress=" + workUnitAddress + ", userId=" + userId + "]";
	}

}
