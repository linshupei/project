package com.ums.project.vo;

public class UserInfoVo {
	
	private String id;
	
	private String userAccount;

	private String userName;
	
	private String mobile;
	
	private String mobileServicePassword;
	
	private String mobileRealNameTime;
	
	private String sex;
	
	private String idCard;
	
	private String idCardPositive;
	
	private String idCardOtherSize;
	
	private String idCardHand;
	
	private String alipayAccount;
	
	private String zhiMaFen;
	
	private String zhiMaFenImage;
	
	private String huaBei;
	
	private String huaBeiImage;
	
	private String bankCard;

	private String bankCardImage;
	
	
	public String getZhiMaFenImage() {
		return zhiMaFenImage;
	}

	public void setZhiMaFenImage(String zhiMaFenImage) {
		this.zhiMaFenImage = zhiMaFenImage;
	}

	public String getHuaBeiImage() {
		return huaBeiImage;
	}

	public void setHuaBeiImage(String huaBeiImage) {
		this.huaBeiImage = huaBeiImage;
	}

	public String getBankCardImage() {
		return bankCardImage;
	}

	public void setBankCardImage(String bankCardImage) {
		this.bankCardImage = bankCardImage;
	}

	public String getMobileRealNameTime() {
		return mobileRealNameTime;
	}

	public void setMobileRealNameTime(String mobileRealNameTime) {
		this.mobileRealNameTime = mobileRealNameTime;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
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
		UserInfoVo other = (UserInfoVo) obj;
		if (mobile == null) {
			if (other.mobile != null)
				return false;
		} else if (!mobile.equals(other.mobile))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UserInfoVo [id=" + id + ", userAccount=" + userAccount + ", userName=" + userName + ", mobile=" + mobile
				+ ", mobileServicePassword=" + mobileServicePassword + ", mobileRealNameTime=" + mobileRealNameTime
				+ ", sex=" + sex + ", idCard=" + idCard + ", idCardPositive=" + idCardPositive + ", idCardOtherSize="
				+ idCardOtherSize + ", idCardHand=" + idCardHand + ", alipayAccount=" + alipayAccount + ", zhiMaFen="
				+ zhiMaFen + ", huaBei=" + huaBei + ", bankCard=" + bankCard + ", bankCardImage=" + bankCardImage + "]";
	}


	
}
