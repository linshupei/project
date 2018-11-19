package com.ums.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="app_user_sms_record")
public class AppUserSmsRecord  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6607538743271245582L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")    
	private String id;
	
    @Column(name = "sms_content") 
	private String smsContent;
	
    @Column(name = "send_phone") 
	private String sendPhone;
    
    //短信名称
    @Column(name="name")
    private String name;
    
    //1：收到 2：发送
    @Column(name="type")
    private String type;
    
    @Column(name="send_time")
    private Long sendTime;
    
    @Column(name="send_time_format")
    private String sendTimeFormat;

    @Column(name = "user_account") 
	private String userAccount;

    @ManyToOne(optional=false)
    @JoinColumn(name="app_user_id")
	private AppUserInfo appUserInfo;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSmsContent() {
		return smsContent;
	}

	public void setSmsContent(String smsContent) {
		this.smsContent = smsContent;
	}

	public String getSendPhone() {
		return sendPhone;
	}

	public void setSendPhone(String sendPhone) {
		this.sendPhone = sendPhone;
	}

	public Long getSendTime() {
		return sendTime;
	}

	public void setSendTime(Long sendTime) {
		this.sendTime = sendTime;
	}

	public String getSendTimeFormat() {
		return sendTimeFormat;
	}

	public void setSendTimeFormat(String sendTimeFormat) {
		this.sendTimeFormat = sendTimeFormat;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public AppUserInfo getAppUserInfo() {
		return appUserInfo;
	}

	public void setAppUserInfo(AppUserInfo appUserInfo) {
		this.appUserInfo = appUserInfo;
	}

	@Override
	public String toString() {
		return "AppUserSmsRecord [id=" + id + ", smsContent=" + smsContent + ", sendPhone=" + sendPhone + ", sendTime="
				+ sendTime + ", sendTimeFormat=" + sendTimeFormat + ", userAccount=" + userAccount + ", appUserInfo="
				+ appUserInfo + "]";
	}

}
