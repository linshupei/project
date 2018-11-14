package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.UserLiabilitiesInfo;
import com.ums.project.queryBean.UserLiabilitiesInfoQueryBean;
import com.ums.project.result.DataPage;

public interface UserLiabilitiesInfoService {
	
	public Page<UserLiabilitiesInfo> userInfoPageData(UserLiabilitiesInfoQueryBean queryBean, DataPage page);

}
