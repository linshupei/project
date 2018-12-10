package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.UserWorkUnitInfo;
import com.ums.project.queryBean.UserWorkUnitInfoQueryBean;
import com.ums.project.result.DataPage;

public interface UserWorkUnitInfoService {
	
	public Page<UserWorkUnitInfo> userInfoPageData(UserWorkUnitInfoQueryBean queryBean, DataPage page);

	public void save(UserWorkUnitInfo workInfo);

	public void deleteByUserInfo(String userInfoId);

}
