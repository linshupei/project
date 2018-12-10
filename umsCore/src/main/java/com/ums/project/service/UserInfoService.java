package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.UserInfo;
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.result.DataPage;

public interface UserInfoService {
	
	public Page<UserInfo> userInfoPageData(UserInfoQueryBean queryBean, DataPage page);

	public void save(UserInfo userInfo);

	public UserInfo getById(String id);

	public void removeById(String id);
}
