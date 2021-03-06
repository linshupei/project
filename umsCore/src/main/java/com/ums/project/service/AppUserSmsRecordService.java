package com.ums.project.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.queryBean.AppUserSmsRecordQueryBean;
import com.ums.project.result.DataPage;

public interface AppUserSmsRecordService {
	
	public Page<AppUserSmsRecord> userInfoPageData(AppUserSmsRecordQueryBean queryBean, DataPage page);

	public void save(List<AppUserSmsRecord> saveDatas);

}
