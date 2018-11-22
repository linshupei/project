package com.ums.project.vo;

public class ResetPasswordVo {

	public ResetPasswordVo() {
		// TODO Auto-generated constructor stub
	}
	
	private String oldPassword;
	
	private String newPassword;
	
	private String newConfirmPassword;

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getNewConfirmPassword() {
		return newConfirmPassword;
	}

	public void setNewConfirmPassword(String newConfirmPassword) {
		this.newConfirmPassword = newConfirmPassword;
	}

	public ResetPasswordVo(String oldPassword, String newPassword, String newConfirmPassword) {
		super();
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
		this.newConfirmPassword = newConfirmPassword;
	}
	
	

}
