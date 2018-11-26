package com.ums.project.result;

public class BaseResultApi {
	
	private String result="0";
	
	private String reason;

	private long time;

	
	public BaseResultApi() {
		super();
	}


	public BaseResultApi(String result, String reason, long time) {
		super();
		this.result = result;
		this.reason = reason;
		this.time = time;
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

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
	
}
