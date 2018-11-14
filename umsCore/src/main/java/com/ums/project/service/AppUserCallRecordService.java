package com.ums.project.service;

import org.springframework.data.domain.Page;

import com.ums.project.entity.AppUserCallRecord;
import com.ums.project.queryBean.AppUserCallRecordQueryBean;
import com.ums.project.result.DataPage;

public interface AppUserCallRecordService {
	
	public Page<AppUserCallRecord> userInfoPageData(AppUserCallRecordQueryBean queryBean, DataPage page);

}
