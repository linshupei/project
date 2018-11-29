package com.ums.project.excel.vo;

public class ExportLoanInfo{
	private String id="";
	
	private String userAccount="";
	
	private String name="";
	
	private String mobile="";
	
	private String mobileServicePassword="";
	
	private String mobileRealNameTime="";
	
	private String idCard="";
	
	private String alipayAccount="";
	
	private String zhiMaFen="";
	
	private String huaBei="";
	
	private String bankCard="";
	
	//贷款额度
	private String loanLimit="";
	
	//放款额度
	private String makeLoansLimit="";
	
	//总分期数
	private String allInstalment="";
	
	//还款情况（0：申请中  1：申请拒绝  2：已放款   3：逾期未还  4：已还款）
	private String status="";
	
	//还款日期
	private String payDate="";
	
	//申请时间
	private String applyDate="";

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobileRealNameTime() {
		return mobileRealNameTime;
	}

	public void setMobileRealNameTime(String mobileRealNameTime) {
		this.mobileRealNameTime = mobileRealNameTime;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMobileServicePassword() {
		return mobileServicePassword;
	}

	public void setMobileServicePassword(String mobileServicePassword) {
		this.mobileServicePassword = mobileServicePassword;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getAlipayAccount() {
		return alipayAccount;
	}

	public void setAlipayAccount(String alipayAccount) {
		this.alipayAccount = alipayAccount;
	}

	public String getZhiMaFen() {
		return zhiMaFen;
	}

	public void setZhiMaFen(String zhiMaFen) {
		this.zhiMaFen = zhiMaFen;
	}

	public String getHuaBei() {
		return huaBei;
	}

	public void setHuaBei(String huabei) {
		this.huaBei = huabei;
	}

	public String getBankCard() {
		return bankCard;
	}

	public void setBankCard(String bankCard) {
		this.bankCard = bankCard;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLoanLimit() {
		return loanLimit;
	}

	public void setLoanLimit(String loanLimit) {
		this.loanLimit = loanLimit;
	}

	public String getAllInstalment() {
		return allInstalment;
	}

	public void setAllInstalment(String allInstalment) {
		this.allInstalment = allInstalment;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPayDate() {
		return payDate;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}

	public String getApplyDate() {
		return applyDate;
	}

	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}

	public String getMakeLoansLimit() {
		return makeLoansLimit;
	}

	public void setMakeLoansLimit(String makeLoansLimit) {
		this.makeLoansLimit = makeLoansLimit;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		ExportLoanInfo other = (ExportLoanInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ExportLoanInfo [id=" + id + ", userAccount=" + userAccount + ", name=" + name + ", mobile=" + mobile
				+ ", mobileServicePassword=" + mobileServicePassword + ", mobileRealNameTime=" + mobileRealNameTime
				+ ", idCard=" + idCard + ", alipayAccount=" + alipayAccount + ", zhiMaFen=" + zhiMaFen + ", huaBei="
				+ huaBei + ", bankCard=" + bankCard + ", loanLimit=" + loanLimit + ", makeLoansLimit=" + makeLoansLimit
				+ ", allInstalment=" + allInstalment + ", status=" + status + ", payDate=" + payDate + ", applyDate="
				+ applyDate + "]";
	}


	
	
}