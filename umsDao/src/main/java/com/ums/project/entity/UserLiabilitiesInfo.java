package com.ums.project.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * desc：借款人负债信息实体
 * @author Administrator
 *
 */
@Entity
@Table(name="user_liabilities_info")
public class UserLiabilitiesInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2912620899662085695L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")    
	private String id;

    @Column(name = "liabilities_amount") 
    private String liabilitiesAmount;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")//people中的addr
	private UserInfo userInfo;
    
    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "liabilities_platform", referencedColumnName = "liabilities_platform")//people中的addr
	private LiabilitiesPlatformInfo liabilitiesPlatformInfo;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLiabilitiesAmount() {
		return liabilitiesAmount;
	}

	public void setLiabilitiesAmount(String liabilitiesAmount) {
		this.liabilitiesAmount = liabilitiesAmount;
	}



	public LiabilitiesPlatformInfo getLiabilitiesPlatformInfo() {
		return liabilitiesPlatformInfo;
	}

	public void setLiabilitiesPlatformInfo(LiabilitiesPlatformInfo liabilitiesPlatformInfo) {
		this.liabilitiesPlatformInfo = liabilitiesPlatformInfo;
	}

	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
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
		UserLiabilitiesInfo other = (UserLiabilitiesInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "userLiabilitiesInfo [id=" + id + ", liabilitiesAmount=" + liabilitiesAmount + ", userInfo=" + userInfo
				+ ", liabilitiesPlatformInfo=" + liabilitiesPlatformInfo + "]";
	}

}
