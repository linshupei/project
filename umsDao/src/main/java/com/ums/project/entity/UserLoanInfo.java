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

@Entity
@Table(name="user_loan_info")
public class UserLoanInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6106192693972546123L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")    
	private String id;

    @Column(name = "loan_limit") 
    private String loanLimit;

    //放款额度
    @Column(name = "make_loans_limit") 
	private String makeLoansLimit;
    
    @Column(name = "all_instalment") 
    private String allInstalment;

    //0：申请中  1：审核不通过  2：已放款 3：逾期未还 4：已还款
    @Column(name = "status") 
    private String status;
    
    @Column(name = "pay_date") 
    private String payDate;    
    
    @Column(name = "apply_time") 
    private String applyTime;    
    
    @OneToOne(fetch=FetchType.EAGER)
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

	public String getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(String applyTime) {
		this.applyTime = applyTime;
	}

	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	public String getMakeLoansLimit() {
		return makeLoansLimit;
	}

	public void setMakeLoansLimit(String makeLoansLimit) {
		this.makeLoansLimit = makeLoansLimit;
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
		UserLoanInfo other = (UserLoanInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UserLoanInfo [id=" + id + ", loanLimit=" + loanLimit + ", makeLoansLimit=" + makeLoansLimit
				+ ", allInstalment=" + allInstalment + ", status=" + status + ", payDate=" + payDate + ", applyTime="
				+ applyTime + ", userAccount=" + userAccount + "]";
	}




	
}
