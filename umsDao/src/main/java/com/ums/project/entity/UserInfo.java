package com.ums.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="user_info")
public class UserInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2164045367278036704L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")    
	private String id;

    @Column(name = "user_account") 
    private String userAccount;
    
    @Column(name = "name") 
    private String name;    

    @Column(name = "mobile") 
    private String mobile;

    @Column(name = "mobile_service_password") 
    private String mobileServicePassword;

    @Column(name = "mobile_real_name_time")
    private String mobileRealNameTime;
    
    @Column(name = "alipay_account")
    private String alipayAccount;
    
    @Column(name = "sex")
    private String sex;
    
    @Column(name = "id_card")
    private String idCard;    
    
    @Column(name = "id_card_positive")
    private String idCardPositive;    
    
    @Column(name = "id_card_other_size")
    private String idCardOtherSize;       
    
    @Column(name = "id_card_hand")
    private String idCardHand;        
    
    @Column(name = "birthday")
    private String birthday;         
    
    @Column(name = "zhi_ma_fen")
    private String zhiMaFen;       
    
    @Column(name = "zhi_ma_fen_image")
    private String zhiMaFenImage;       
    
    @Column(name = "hua_bei")
    private String huaBei;        
    
    @Column(name = "hua_bei_image")
    private String huaBeiImage;     
    
    @Column(name = "bank_card")
    private String bankCard;        
    
    @Column(name = "bank_card_image")
    private String bankCardImage;     
    
    @ManyToOne(optional=false)
    @JoinColumn(name="app_user_id")
	private AppUserInfo appUserInfo;
    
    @OneToOne(mappedBy = "userInfo",fetch=FetchType.LAZY)
    private UserLoanInfo userLoanInfo;

    
	public UserLoanInfo getUserLoanInfo() {
		return userLoanInfo;
	}

	public void setUserLoanInfo(UserLoanInfo userLoanInfo) {
		this.userLoanInfo = userLoanInfo;
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

	public String getMobileRealNameTime() {
		return mobileRealNameTime;
	}

	public void setMobileRealNameTime(String mobileRealNameTime) {
		this.mobileRealNameTime = mobileRealNameTime;
	}

	public String getAlipayAccount() {
		return alipayAccount;
	}

	public void setAlipayAccount(String alipayAccount) {
		this.alipayAccount = alipayAccount;
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

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
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

	public void setHuaBei(String huaBei) {
		this.huaBei = huaBei;
	}

	public String getBankCard() {
		return bankCard;
	}

	public void setBankCard(String bankCard) {
		this.bankCard = bankCard;
	}

	public AppUserInfo getAppUserInfo() {
		return appUserInfo;
	}

	public void setAppUserInfo(AppUserInfo appUserInfo) {
		this.appUserInfo = appUserInfo;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getBankCardImage() {
		return bankCardImage;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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

	public void setBankCardImage(String bankCardImage) {
		this.bankCardImage = bankCardImage;
	}

	@Override
	public String toString() {
		return "UserInfo [id=" + id + ", userAccount=" + userAccount + ", name=" + name + ", mobile=" + mobile
				+ ", mobileServicePassword=" + mobileServicePassword + ", mobileRealNameTime=" + mobileRealNameTime
				+ ", alipayAccount=" + alipayAccount + ", sex=" + sex + ", idCard=" + idCard + ", idCardPositive="
				+ idCardPositive + ", idCardOtherSize=" + idCardOtherSize + ", idCardHand=" + idCardHand + ", birthday="
				+ birthday + ", zhiMaFen=" + zhiMaFen + ", zhiMaFenImage=" + zhiMaFenImage + ", huaBei=" + huaBei
				+ ", huaBeiImage=" + huaBeiImage + ", bankCard=" + bankCard + ", bankCardImage=" + bankCardImage
				+ ", appUserInfo=" + appUserInfo + "]";
	}



    
}
