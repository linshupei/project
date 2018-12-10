package com.ums.project.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ums.project.entity.UserLiabilitiesInfo;
import com.ums.project.queryBean.UserLiabilitiesInfoQueryBean;
import com.ums.project.result.DataPage;

public interface UserLiabilitiesInfoService {
	
	public Page<UserLiabilitiesInfo> userInfoPageData(UserLiabilitiesInfoQueryBean queryBean, DataPage page);

	public void saveAll(List<UserLiabilitiesInfo> savePData);

	public void deleteByUserInfo(String userInfoId);

}
