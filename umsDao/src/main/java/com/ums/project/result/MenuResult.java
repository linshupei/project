package com.ums.project.result;

import java.util.List;

import com.ums.project.vo.MenuVo;

public class MenuResult extends BaseResult{

	private String msg;
	
	private List<MenuVo> data;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public List<MenuVo> getData() {
		return data;
	}

	public void setData(List<MenuVo> data) {
		this.data = data;
	}
	
	
}
