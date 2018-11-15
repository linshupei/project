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
 * desc：系统消息实体
 * @author Administrator
 *
 */
@Entity
@Table(name="system_msg_info")
public class SystemMsgInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6106192693972546123L;

	@Id
	@Column(name = "id") 
	@GenericGenerator(name = "system-uuid", strategy = "com.ums.project.util.UUIDGenerator") 
	@GeneratedValue(generator = "system-uuid")     
	private String id;

	/**
	 * 	消息内容
	 */
    @Column(name = "msg_content") 
    private String msgContent;

    /**
     *  	 消息类型（1：申请贷款消息 2：贷款逾期未还消息）
     */
    @Column(name = "msg_type") 
	private String msgType;
    
    /**
     * 	消息发生时间
     */
    @Column(name = "msg_time") 
    private String msgTime;

   
    /**
     *  	状态（0：未读  1：已读）
     */
    @Column(name = "read_status") 
    private String readStatus;
    
    
    /**
     *  	状态（0：未提醒  1：已提醒）
     */
    @Column(name = "tip_status") 
    private String tipStatus;    
    
    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "loan_info_id", referencedColumnName = "id")//people中的addr    
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

	public String getMsgContent() {
		return msgContent;
	}

	public void setMsgContent(String msgContent) {
		this.msgContent = msgContent;
	}

	public String getMsgType() {
		return msgType;
	}

	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}

	public String getMsgTime() {
		return msgTime;
	}

	public void setMsgTime(String msgTime) {
		this.msgTime = msgTime;
	}

	public String getReadStatus() {
		return readStatus;
	}

	public void setReadStatus(String readStatus) {
		this.readStatus = readStatus;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getTipStatus() {
		return tipStatus;
	}

	public void setTipStatus(String tipStatus) {
		this.tipStatus = tipStatus;
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
		SystemMsgInfo other = (SystemMsgInfo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "SystemMsgInfo [id=" + id + ", msgContent=" + msgContent + ", msgType=" + msgType + ", msgTime="
				+ msgTime + ", readStatus=" + readStatus + ", tipStatus=" + tipStatus + "]";
	}




	
}
