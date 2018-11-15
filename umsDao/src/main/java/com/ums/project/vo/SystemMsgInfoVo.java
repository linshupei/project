package com.ums.project.vo;

public class SystemMsgInfoVo {

	private String id;

	/**
	 * 	消息内容
	 */
    private String msgContent;

    /**
     *  	 消息类型（1：申请贷款消息 2：贷款逾期未还消息）
     */
	private String msgType;
    
    /**
     * 	消息发生时间
     */
    private String msgTime;

   
    /**
     *  	状态（0：未读  1：已读）
     */
    private String readStatus;
    
    
    /**
     *  	状态（0：未提醒  1：已提醒）
     */
    private String tipStatus;


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


	public String getTipStatus() {
		return tipStatus;
	}


	public void setTipStatus(String tipStatus) {
		this.tipStatus = tipStatus;
	}    
    
    
}
