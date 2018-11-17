package com.ums.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="user_work_unit_info")
public class UserWorkUnitInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3783323554069827944L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")    
	private String id;

    @Column(name = "work_unit_name") 
    private String workUnitName;

    @Column(name = "work_unit_address") 
    private String workUnitAddress;

    @Column(name = "work_unit_phone") 
    private String workUnitPhone;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")//people中的addr
	private UserInfo userInfo;

    @Column(name = "user_account") 
    private String userAccount;
    
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getWorkUnitName() {
		return workUnitName;
	}

	public void setWorkUnitName(String workUnitName) {
		this.workUnitName = workUnitName;
	}

	public String getWorkUnitAddress() {
		return workUnitAddress;
	}

	public void setWorkUnitAddress(String workUnitAddress) {
		this.workUnitAddress = workUnitAddress;
	}

	public String getWorkUnitPhone() {
		return workUnitPhone;
	}

	public void setWorkUnitPhone(String workUnitPhone) {
		this.workUnitPhone = workUnitPhone;
	}


	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}



	@Override
	public String toString() {
		return "UserWorkUnitInfo [id=" + id + ", workUnitName=" + workUnitName + ", workUnitAddress=" + workUnitAddress
				+ ", workUnitPhone=" + workUnitPhone + ", userAccount=" + userAccount + "]";
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
		UserWorkUnitInfo other = (UserWorkUnitInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
