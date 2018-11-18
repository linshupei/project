package com.ums.project.result;

public class ApplyLoanResult extends BaseResult{
	
	private String loanInfoId="";

	
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
