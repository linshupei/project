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
@Table(name="app_user_contact_info")
public class AppUserContactInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8830112050931198150L;

	@Id
	@Column(name = "id") 
	@GeneratedValue(generator = "system-uuid")     
	@GenericGenerator(name = "system-uuid", strategy = "uuid") 
	private String id;
	
    @Column(name = "mobile") 
	private String mobile;
	
    @Column(name = "name") 
	private String name;

    @Column(name = "user_account") 
	private String userAccount;

    @ManyToOne(optional=false)
    @JoinColumn(name="app_user_id")
	private AppUserInfo appUserInfo;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
		AppUserContactInfo other = (AppUserContactInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AppUserContactInfo [id=" + id + ", mobile=" + mobile + ", name=" + name + ", userAccount=" + userAccount
				+ ", appUserInfo=" + appUserInfo + "]";
	}

}
