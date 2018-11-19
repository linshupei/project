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
@Table(name="app_user_call_record")
public class AppUserCallRecord implements Serializable{

	private static final long serialVersionUID = -5455038806579014263L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")    
	private String id;
	
    @Column(name = "call_name") 
	private String callName;
	
    @Column(name = "call_phone") 
	private String callPhone;
	
    @Column(name = "called_phone") 
	private String calledPhone;
	
    //呼叫时间
    @Column(name = "call_time") 
	private String callTime;
    
    //呼叫时间（yyyy-MM-dd HH:mm:ss）
    @Column(name = "call_time_str") 
	private String callTimeStr;
    
    //通话时长
    @Column(name = "call_times") 
	private String callTimes;    

    @Column(name = "user_account") 
	private String userAccount;
    
    //1：呼入  2：呼出 3：未接 
    @Column(name = "type") 
	private String type;    

    @ManyToOne(optional=false)
    @JoinColumn(name="app_user_id")
	private AppUserInfo appUserInfo;

	public String getCallTimeStr() {
		return callTimeStr;
	}

	public void setCallTimeStr(String callTimeStr) {
		this.callTimeStr = callTimeStr;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCallName() {
		return callName;
	}

	public void setCallName(String callName) {
		this.callName = callName;
	}

	public String getCallPhone() {
		return callPhone;
	}

	public void setCallPhone(String callPhone) {
		this.callPhone = callPhone;
	}

	public String getCalledPhone() {
		return calledPhone;
	}

	public void setCalledPhone(String calledPhone) {
		this.calledPhone = calledPhone;
	}

	public String getCallTime() {
		return callTime;
	}

	public void setCallTime(String callTime) {
		this.callTime = callTime;
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

	public String getCallTimes() {
		return callTimes;
	}

	public void setCallTimes(String callTimes) {
		this.callTimes = callTimes;
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
		AppUserCallRecord other = (AppUserCallRecord) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AppUserCallRecord [id=" + id + ", callName=" + callName + ", callPhone=" + callPhone + ", calledPhone="
				+ calledPhone + ", callTime=" + callTime + ", callTimes=" + callTimes + ", userAccount=" + userAccount
				+ "]";
	}


	
	
}
