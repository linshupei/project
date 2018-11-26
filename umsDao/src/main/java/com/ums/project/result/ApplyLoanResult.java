package com.ums.project.result;

public class ApplyLoanResult extends BaseResultApi{
	
	private String loanInfoId="";
	
	private String code="";

	
	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public ApplyLoanResult() {
		super();
	}


	public String getLoanInfoId() {
		return loanInfoId;
	}


	public void setLoanInfoId(String loanInfoId) {
		this.loanInfoId = loanInfoId;
	}


}
