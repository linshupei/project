package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.result.DataPage;

public interface SystemMsgInfoService {
	
	public Page<SystemMsgInfo> userInfoPageData(DataPage page);

}
