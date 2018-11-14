package com.ums.project.vo;

public class AppUserInfoVo {
	private String id;
	
	private String userAccount;
	
	private String userName;
	
	private String registedTime;
	
	private String roleId;
	
	private String loanNum;
	

	public String getLoanNum() {
		return loanNum;
	}

	public void setLoanNum(String loanNum) {
		this.loanNum = loanNum;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getRegistedTime() {
		return registedTime;
	}

	public void setRegistedTime(String registedTime) {
		this.registedTime = registedTime;
	}

	public String getUserName() {
		return userName;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((userAccount == null) ? 0 : userAccount.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AppUserInfoVo other = (AppUserInfoVo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (userAccount == null) {
			if (other.userAccount != null)
				return false;
		} else if (!userAccount.equals(other.userAccount))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AppUserInfoVo [id=" + id + ", userAccount=" + userAccount + ", userName=" + userName + ", registedTime="
				+ registedTime + ", roleId=" + roleId + "]";
	}
	
	
}
