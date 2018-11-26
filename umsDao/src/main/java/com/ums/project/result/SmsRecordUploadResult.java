package com.ums.project.result;

public class SmsRecordUploadResult extends BaseResultApi{

	private String code="";
	
	public SmsRecordUploadResult() {
		// TODO Auto-generated constructor stub
	}

	private long time;

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
	
	
}
