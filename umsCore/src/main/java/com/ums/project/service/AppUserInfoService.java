package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.result.DataPage;

public interface AppUserInfoService {
	
	public Page<AppUserInfo> userInfoPageData(AppUserInfoQueryBean queryBean, DataPage page);

	public String resetPassword(String id);

	public AppUserInfo findByUserAccount(String userAccount);
	
	public AppUserInfo findByUserAccountAndPassword(String userAccount,String password);

	public void save(AppUserInfo info);
}
