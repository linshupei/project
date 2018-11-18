package com.ums.project.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "app_user_info") 
public class AppUserInfo  implements Serializable{ 
	/**
	 * 
	 */
	private static final long serialVersionUID = -2006415701951143355L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")    
	private String id;

    @Column(name = "user_name") 
    private String userName;

    @Column(name = "user_account") 
    private String userAccount;

    @Column(name = "login_password") 
    private String loginPassword;

    @Column(name = "registed_time")
    private String registedTime;
    
    @Column(name="loan_num")
    private String loanNum;
    
    @Column(name="sms_upload_time")
    private String smsUploadTime;
    
    @Column(name="call_upload_time")
    private String callUploadTime;
    
    @Column(name="contact_upload_time")
    private String contactUploadTime;    
    
    //级联保存、更新、删除、刷新;延迟加载。当删除用户，会级联删除该用户的所有文章
    //拥有mappedBy注解的实体类为关系被维护端
    //mappedBy="appUserInfo"中的appUserInfo是AppUserCallRecord中的appUserInfo属性
    //APP呼叫记录
    @OneToMany(mappedBy = "appUserInfo",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<AppUserCallRecord> appUserCallRecords;
    
    
    @OneToMany(mappedBy = "appUserInfo",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<AppUserContactInfo> appUserContactInfos;    
    
    @OneToMany(mappedBy = "appUserInfo",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<AppUserSmsRecord> appUserSmsRecords;
    
    @OneToMany(mappedBy = "appUserInfo",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<UserInfo> userInfos;    

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<AppUserCallRecord> getAppUserCallRecords() {
		return appUserCallRecords;
	}

	public void setAppUserCallRecords(List<AppUserCallRecord> appUserCallRecords) {
		this.appUserCallRecords = appUserCallRecords;
	}

	public List<AppUserContactInfo> getAppUserContactInfos() {
		return appUserContactInfos;
	}

	public void setAppUserContactInfos(List<AppUserContactInfo> appUserContactInfos) {
		this.appUserContactInfos = appUserContactInfos;
	}

	public List<AppUserSmsRecord> getAppUserSmsRecords() {
		return appUserSmsRecords;
	}

	public void setAppUserSmsRecords(List<AppUserSmsRecord> appUserSmsRecords) {
		this.appUserSmsRecords = appUserSmsRecords;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getLoginPassword() {
		return loginPassword;
	}

	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}

	public String getRegistedTime() {
		return registedTime;
	}

	public void setRegistedTime(String registedTime) {
		this.registedTime = registedTime;
	}

	public String getLoanNum() {
		return loanNum;
	}

	public void setLoanNum(String loanNum) {
		this.loanNum = loanNum;
	}

	public List<UserInfo> getUserInfos() {
		return userInfos;
	}

	public void setUserInfos(List<UserInfo> userInfos) {
		this.userInfos = userInfos;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
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
		AppUserInfo other = (AppUserInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AppUserInfo [id=" + id + ", userName=" + userName + ", userAccount=" + userAccount + ", loginPassword="
				+ loginPassword + ", registedTime=" + registedTime + ", loanNum=" + loanNum + ", smsUploadTime="
				+ smsUploadTime + ", callUploadTime=" + callUploadTime + ", contactUploadTime=" + contactUploadTime
				+ "]";
	}

}

    


