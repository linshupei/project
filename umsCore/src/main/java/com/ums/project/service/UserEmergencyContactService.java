package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.UserEmergencyContact;
import com.ums.project.queryBean.UserEmergencyContactQueryBean;
import com.ums.project.result.DataPage;

public interface UserEmergencyContactService {
	
	public Page<UserEmergencyContact> userInfoPageData(UserEmergencyContactQueryBean queryBean, DataPage page);

}
