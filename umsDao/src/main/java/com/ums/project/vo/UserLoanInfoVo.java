package com.ums.project.vo;

public class UserLoanInfoVo {
	
	private String bankCardImage;
	
	private String id;

	private String userName;
	
	private String mobile;
	
	private String mobileServicePassword;
	
	private String sex;
	
	private String idCard;
	
	private String idCardPositive;
	
	private String idCardOtherSize;
	
	private String idCardHand;
	
	private String alipayAccount;
	
	private String zhiMaFen;
	
	private String huaBei;
	
	private String bankCard;
	
	//贷款额度
	private String loanLimit;
	
	//放款额度
	private String makeLoansLimit;
	
	//总分期数
	private String allInstalment;
	
	//还款情况（0：申请中  1：申请拒绝  2：已放款   3：逾期未还  4：已还款）
	private String status;
	
	//还款日期
	private String payDate;
	
	//申请时间
	private String applyDate;
	
	//备注
	private String mark="";

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public String getBankCardImage() {
		return bankCardImage;
	}

	public void setBankCardImage(String bankCardImage) {
		this.bankCardImage = bankCardImage;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getIdCardPositive() {
		return idCardPositive;
	}

	public void setIdCardPositive(String idCardPositive) {
		this.idCardPositive = idCardPositive;
	}

	public String getIdCardOtherSize() {
		return idCardOtherSize;
	}

	public void setIdCardOtherSize(String idCardOtherSize) {
		this.idCardOtherSize = idCardOtherSize;
	}

	public String getIdCardHand() {
		return idCardHand;
	}

	public void setIdCardHand(String idCardHand) {
		this.idCardHand = idCardHand;
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
		result = prime * result + ((mobile == null) ? 0 : mobile.hashCode());
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
		UserLoanInfoVo other = (UserLoanInfoVo) obj;
		if (mobile == null) {
			if (other.mobile != null)
				return false;
		} else if (!mobile.equals(other.mobile))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UserLoanInfoVo [id=" + id + ", userName=" + userName + ", mobile=" + mobile + ", mobileServicePassword="
				+ mobileServicePassword + ", sex=" + sex + ", idCard=" + idCard + ", idCardPositive=" + idCardPositive
				+ ", idCardOtherSize=" + idCardOtherSize + ", idCardHand=" + idCardHand + ", alipayAccount="
				+ alipayAccount + ", zhiMaFen=" + zhiMaFen + ", huaBei=" + huaBei + ", bankCard=" + bankCard
				+ ", loanLimit=" + loanLimit + ", makeLoansLimit=" + makeLoansLimit + ", allInstalment=" + allInstalment
				+ ", status=" + status + ", payDate=" + payDate + ", applyDate=" + applyDate + "]";
	}
	
	
}
