package com.ums.project.result;

public class LoginResult extends BaseResult{

	private String ticket;
	
	public LoginResult() {
		super();
	}

	public LoginResult(String code, String reason, String ticket, long time) {
		super(code,reason, time);
		this.ticket = ticket;
	}

	public String getTicket() {
		return ticket;
	}

	public void setTicket(String ticket) {
		this.ticket = ticket;
	}
}
