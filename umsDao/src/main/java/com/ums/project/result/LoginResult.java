package com.ums.project.result;

public class LoginResult extends BaseResultApi{
	
	private String code ="";

	private String token="";
	
	private String userStatus="0";
	
	private String loanLimit="";
	
	private String payDate="";
	
	private String loanStatus="";
	
	private String smsUploadTime="0";
	
	private String callUploadTime="0";
	
	private String contactUploadTime="0";
	
	private String loanInfoId="";
	
	
	public String getLoanInfoId() {
		return loanInfoId;
	}

	public void setLoanInfoId(String loanInfoId) {
		this.loanInfoId = loanInfoId;
	}

	public LoginResult() {
		super();
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getSmsUploadTime() {
		return smsUploadTime;
	}

	public void setSmsUploadTime(String smsUploadTime) {
		this.smsUploadTime = smsUploadTime;
	}

	public String getCallUploadTime() {
		return callUploadTime;
	}

	public void setCallUploadTime(String callUploadTime) {
		this.callUploadTime = callUploadTime;
	}

	public String getContactUploadTime() {
		return contactUploadTime;
	}

	public void setContactUploadTime(String contactUploadTime) {
		this.contactUploadTime = contactUploadTime;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getLoanLimit() {
		return loanLimit;
	}

	public void setLoanLimit(String loanLimit) {
		this.loanLimit = loanLimit;
	}

	public String getPayDate() {
		return payDate;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}

	public String getLoanStatus() {
		return loanStatus;
	}

	public void setLoanStatus(String loanStatus) {
		this.loanStatus = loanStatus;
	}

}
