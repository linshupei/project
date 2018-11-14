package com.ums.project.vo;

public class UserLiabilitiesInfoVo {
	
	private String id;
	
	private String liabilitiesAmount;
	
	private String liabilitiesPlatform;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLiabilitiesAmount() {
		return liabilitiesAmount;
	}

	public void setLiabilitiesAmount(String liabilitiesAmount) {
		this.liabilitiesAmount = liabilitiesAmount;
	}

	public String getLiabilitiesPlatform() {
		return liabilitiesPlatform;
	}

	public void setLiabilitiesPlatform(String liabilitiesPlatform) {
		this.liabilitiesPlatform = liabilitiesPlatform;
	}

	@Override
	public String toString() {
		return "UserLiabilitiesInfoVo [id=" + id + ", liabilitiesAmount=" + liabilitiesAmount + ", liabilitiesPlatform="
				+ liabilitiesPlatform + "]";
	}


	
	
}
