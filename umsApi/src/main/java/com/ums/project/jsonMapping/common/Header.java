package com.ums.project.jsonMapping.common;

public class Header {
	private String token;
	
	private String time_stamp;

	public Header() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Header(String token, String time_stamp) {
		super();
		this.token = token;
		this.time_stamp = time_stamp;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getTime_stamp() {
		return time_stamp;
	}

	public void setTime_stamp(String time_stamp) {
		this.time_stamp = time_stamp;
	}
	
	
}
