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
@Table(name="liabilities_platform_info")
public class LiabilitiesPlatformInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -988335875743208184L;

	@Id
	@Column(name = "id") 
	@GeneratedValue(generator = "system-uuid")     
	@GenericGenerator(name = "system-uuid", strategy = "uuid") 
	private Integer id;

    @Column(name = "liabilities_platform_name") 
    private String liabilitiesPlatformName;

    @Column(name = "liabilities_platform") 
    private String liabilitiesPlatform;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLiabilitiesPlatformName() {
		return liabilitiesPlatformName;
	}

	public void setLiabilitiesPlatformName(String liabilitiesPlatformName) {
		this.liabilitiesPlatformName = liabilitiesPlatformName;
	}

	public String getLiabilitiesPlatform() {
		return liabilitiesPlatform;
	}

	public void setLiabilitiesPlatform(String liabilitiesPlatform) {
		this.liabilitiesPlatform = liabilitiesPlatform;
	}

	@Override
	public String toString() {
		return "LiabilitiesPlatformInfo [id=" + id + ", liabilitiesPlatformName=" + liabilitiesPlatformName
				+ ", liabilitiesPlatform=" + liabilitiesPlatform + "]";
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
		LiabilitiesPlatformInfo other = (LiabilitiesPlatformInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}


}
