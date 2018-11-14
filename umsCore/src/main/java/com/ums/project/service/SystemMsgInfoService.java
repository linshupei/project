package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.result.DataPage;

/**
 * desc：系统消息service
 * @author Administrator
 *
 */
public interface SystemMsgInfoService {
	
	public Page<SystemMsgInfo> userInfoPageData(DataPage page);

	public void updateSystemMsgReadStatus(String id, String value);

	public void batchDeleteSystemMsgReadStatus(String[] idStr);

}
