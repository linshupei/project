package com.ums.project.result;

public class ValidMsgResult extends BaseResultApi{
	
	private String code="";
	
	private String reason;

	private long time;

	
	public ValidMsgResult() {
		super();
	}




	public ValidMsgResult(String code, String reason, long time) {
		super();
		this.code = code;
		this.reason = reason;
		this.time = time;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}


	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
}
