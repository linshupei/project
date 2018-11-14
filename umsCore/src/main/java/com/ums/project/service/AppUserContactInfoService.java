package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.AppUserContactInfo;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.result.DataPage;

public interface AppUserContactInfoService {
	
	public Page<AppUserContactInfo> userInfoPageData(AppUserContactInfoQueryBean queryBean, DataPage page);

}
