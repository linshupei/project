package com.ums.project.result;

public class ResetPasswordResult extends BaseResult{

	private String password;
	
	public ResetPasswordResult() {
		super();
	}

	public ResetPasswordResult(String code, String reason,long time,String password){
		super(code,reason,time);
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
